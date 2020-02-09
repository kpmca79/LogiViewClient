import { Injectable, SystemJsNgModuleLoader  } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {User} from '../model/User';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }
  // tslint:disable-next-line:member-ordering
  private  user: User;
   getAllUsers(): Observable<User[]> {
          return this.http.get<User[]>('api/user');
    }

    getUser(id): Observable<User> {
        console.log('In service got id = ' + id);
       // tslint:disable-next-line:no-trailing-whitespace
       return this.http.get<User>('/api/user/' + id); 

    }
    updateUser(user: User,imageToUpload: File)   {

        const formData: FormData = new FormData();
        const  jsonUser = JSON.stringify(user);
        formData.append('userProfile', imageToUpload)
        console.log("BBBBBBBBBBBBBB------image",imageToUpload);
        formData.append('user', jsonUser);
        this.http.put('/api/user/' + user.id, formData).subscribe( data => console.log('User Saved successfully'),
        _error => console.log('Cant save user'));
    }
     createUser(user: User, imageToUpload: File)   {
       const formData: FormData = new FormData();
       const  newObj = JSON.stringify(user);
        formData.append('userProfile', imageToUpload)
        formData.append('user', newObj);
        console.log("creating user with ",formData);
        this.http.post('/api/user', formData)
        .subscribe( 
            data => console.log('User created successfully'),
             _error => console.log('Cant create user' + _error));
    }
    // tslint:disable-next-line:member-ordering
    deleteUser(id: String): any {
        // tslint:disable-next-line:no-unused-expression
        this.http.delete('/api/user/' + id).subscribe( _data => { return true; },
        _error => {return false; });
    }

}
