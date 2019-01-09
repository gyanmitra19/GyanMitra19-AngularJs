import { Component, OnInit } from '@angular/core';
import { EventRegistrationService } from 'src/app/services/eventRegistration/event-registration.service';
import { UserService } from 'src/app/services/user/user.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { AppService } from 'src/app/services/app/app.service';

declare var M: any;


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  workshops: Array<any>;
  events: Array<any>;
  user_id: string;
  hasWorkshops: boolean;
  hasEvents: boolean;
  amount: number;
  isCartConfirmed: boolean = false;
  paymentSent: boolean = false;
  paymentConfirmed: boolean = false;
  txnId: string;
  constructor(private eventRegistrationService: EventRegistrationService,
    private appService: AppService, private paymentService: PaymentService, private userService: UserService) {
    this.workshops = []
    this.events = []
    this.hasWorkshops = false;
    this.hasEvents = false;
    this.user_id = JSON.parse(localStorage.getItem('user')).id;

  }

  ngOnInit() {
    //this.amount = 0;
    this.calculateAmount();
    this.getWorkshops();
    this.getEvents();
    this.userService.isCartConfirmed(this.user_id).subscribe((response: any) => {
      if (!response.error) {
        this.isCartConfirmed = response.isCartConfirmed;
      }
    });
  }

  confirmCart() {
    this.userService.confirmCart(this.user_id).subscribe((response: any) => {
      if (response.error == true) {
        M.toast({ html: response.msg, classes: 'roundeds' });
      }
      else {
        M.toast({ html: response.msg, classes: 'roundeds' });
        this.getWorkshops();
        this.calculateAmount();
        this.userService.isCartConfirmed(this.user_id).subscribe((response: any) => {
          if (!response.error) {
            this.isCartConfirmed = response.isCartConfirmed;
          }
        })
      }
    })
  }

  cancelWorkshopRegistration(_id: string) {
    this.eventRegistrationService.cancelWorkshopRegistration(_id).subscribe((response: any) => {
      if (response.error == true) {
        M.toast({ html: response.msg, classes: 'roundeds' });
      }
      else {
        M.toast({ html: response.msg, classes: 'roundeds' });
        this.getWorkshops();
        this.calculateAmount();
      }
    })

  }

  cancelEventRegistration(_id: string) {
    this.eventRegistrationService.cancelEventRegistration(_id).subscribe((response: any) => {
      if (response.error == true) {
        M.toast({ html: response.msg, classes: 'roundeds' });
      }
      else {
        M.toast({ html: response.msg, classes: 'roundeds' });
        this.getEvents();
        this.calculateAmount();

      }
    })
  }

  getWorkshops() {
    this.eventRegistrationService.getWorkshops(this.user_id).subscribe((response: any) => {
      if (response.error == true) {
        M.toast({ html: response.msg, classes: 'roundeds danger' });
      }
      else {
        this.workshops = response;
        this.calculateAmount();
        if (this.workshops.length == 0) {
          this.hasWorkshops = false;
        }
        else {
          this.hasWorkshops = true;
          if (this.workshops[0].status == 'Verifying Payment') {
            this.paymentSent = true;
          }
          else {
            this.paymentSent = false;
          }
          if (this.workshops[0].status == 'Paid') {
            this.paymentConfirmed = true;
          } else {
            this.paymentConfirmed = false;
          }
        }
      }
    })
  }

  getEvents() {
    this.eventRegistrationService.getEventRegistrations(this.user_id).subscribe((response: any) => {
      if (response.error == true) {
        M.toast({ html: response.msg, classes: 'roundeds danger' });
      }
      else {
        this.events = response;
        this.calculateAmount()
        if (this.events.length == 0) {
          this.hasEvents = false;
        }
        else {
          this.hasEvents = true;
        }
        if (this.events[0].status == 'Paid') {
          this.paymentConfirmed = true;
        } else {
          this.paymentConfirmed = false;
        }
      }
    })
  }

  // processFile(hadEvent:any) {
  //   let fileList: FileList = hadEvent.target.files;
  //   if (fileList.length > 0) {
  //     let file: File = fileList[0];
  //     let formData: FormData = new FormData();
  //     formData.append('uploadFile', file, file.name);
  //     formData.append('id', this.user_id);
  //     this.userService.uploadCartDDImage(formData).subscribe((response: any) => {
  //       if (response.error == true) {
  //         M.toast({ html: response.msg, classes: 'roundeds danger' });
  //       }
  //       else {
  //         M.toast({ html: response.msg, classes: 'roundeds' });
  //         this.getEvents();
  //         this.getWorkshops();
  //       }
  //     })
  //   }
  // }

  calculateAmount() {
    this.amount = 0;
    this.workshops.forEach(workshop => {
      this.amount += workshop.event_id.amount;
    });
    if (this.events.length != 0) {
      this.amount += 200;
    }
  }
  genTxnId() {
    var d = new Date();
    console.log("Time" + " " + d.getTime());
    this.txnId = JSON.parse(localStorage.getItem('user')).gmID + '_' + this.reverseString(d.getTime().toString());
    this.txnId = this.txnId.substr(0, 25);
    return this.txnId;
  }
  payOnline() {
    var txnId = this.genTxnId();
    const body = {
      key: this.appService.getKey()
    }
  }
  hashData(amount: any) {
    var body= {
      key : this.appService.getKey(),
      salt : this.appService.getSalt(),
      totalAmount : amount + (amount * this.appService.getTransactionFee()),
      txnId : this.genTxnId(),
      productInfo : this.appService.getProductInfo(),
      name : JSON.parse(localStorage.getItem('user')).name,
      email : JSON.parse(localStorage.getItem('user')).email_id,
      mobile_number : JSON.parse(localStorage.getItem('user')).mobile_number,
      gmId : JSON.parse(localStorage.getItem('user')).gmId,
    } 
   // this.paymentService.genHash(body).su
  }
  reverseString(str: String) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]

    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]

    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"

    //Step 4. Return the reversed string
    return joinArray; // "olleh"
  }
}