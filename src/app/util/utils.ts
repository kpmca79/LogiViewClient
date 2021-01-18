import { Router } from "@angular/router";

export default class Utils {
   
    constructor(){}
    static doSomething(val: string) { console.log("How are you this is utils------>"); }
    static doSomethingElse(val: string) { return val; }
    public  processError(error,router){
        if(error && error.status==401){
            localStorage.clear();
            localStorage.setItem("errormsg","Your session is expired, please login again.")
            router.navigateByUrl("/login");
            
           }
    }
    
}