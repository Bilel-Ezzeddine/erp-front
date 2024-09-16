import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public users:any={
    admin: {password:'1234', roles:['ADMIN']},
    user: {password:'1234', roles:['USER']}
  }
  constructor() { }

  public login(username: string, password: string){
    return !!(this.users[username] && this.users[username]['password'] == password);
  }
}
