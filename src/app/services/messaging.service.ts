import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private subject = new Subject<any>();  
  
  consume(): Observable<any>{
      return this.subject.asObservable();
  }
  produce(message: any)
  {
      this.subject.next(message);
  }
  constructor() { }
}
