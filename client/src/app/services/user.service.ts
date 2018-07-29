import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class UserService {
  public identity;
  public token;
  public url:string;


  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  singUp(user_to_login, gethash = null){
    if(gethash != null){
			user_to_login.gethash = gethash;
		}
		let json = JSON.stringify(user_to_login);
		let params = json;

		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'login', params, {headers: headers})
						 .pipe(map(res => res.json()));
  }

  register(user_to_register){
    let params = JSON.stringify(user_to_register);
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.post(this.url+'register', params, {headers: headers})
             .pipe(map(res => res.json()));
  }

  updateUser(user_to_update){
    let params = JSON.stringify(user_to_update);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': this.getToken() //autorizacion que obtiene el token de la base de datos
    });

    return this._http.put(this.url + 'update-user/' + user_to_update._id,
    params, {headers: headers})
               .pipe(map(res => res.json()));
  }


  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity != "undefined"){
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  getToken(){
    let token = localStorage.getItem('token');

    if(token != "undefined"){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

  }