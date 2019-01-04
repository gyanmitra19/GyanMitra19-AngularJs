import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppService } from '../app/app.service';
import { HttpClient , HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly baseUrl = 'users/';
  constructor(private http: HttpClient, private app: AppService) { }

  // createCollege (name: String, locale: String ) {
  //   const body = { name: name ,locale : locale};
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post(this.app.getUrl(this.baseUrl + 'create'), body).pipe(map(res => res, {'headers': headers}));
  // }

  confirmPayment(_id: string){
    const body = { _id: _id};
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.app.getUrl(this.baseUrl + 'confirmPayment'), body).pipe(map(res => res, {'headers': headers}));
  }

  getAllParticipants(){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.app.getUrl(this.baseUrl)+'participants');
  }

  uploadCartDDImage(formData: FormData) {
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(this.app.getUrl(this.baseUrl) + 'uploadCartDDImage/'+formData.get('id'), formData);
  }

  confirmCart(_id){
    let data = {
      user_id: _id
    }
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.post(this.app.getUrl(this.baseUrl + 'confirmCart'), data).pipe(map(res => res, { 'headers': headers }));
  }

  getParticpants(page: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.app.getUrl(this.baseUrl)+'participants/?page='+page);
  }

  getParticipant(_id: any){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.app.getUrl(this.baseUrl)+'participants/search/?id='+_id);
  }

  isCartConfirmed(_id: any){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.app.getUrl(this.baseUrl)+'isCartConfirmed/'+_id);
  }

  // updateCollege(id: String, name: String,locale: String) {
  //   const body = { _id: id , name: name, locale: locale };
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.put(this.app.getUrl(this.baseUrl + `${id}`), body).pipe(map(res => res, {'headers': headers}));
  // }
  createUser(values:any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.app.getUrl(this.baseUrl +'create'),values).pipe(map(res => res, {'headers': headers}));
  }
   deleteUser(id: String) {
     const headers = new Headers();
     headers.append('Content-Type', 'application/json');
   return this.http.delete(this.app.getUrl(this.baseUrl + `${id}` ) ).pipe(map(res => res, {'headers': headers}));
   }
}
