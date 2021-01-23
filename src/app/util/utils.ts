import { Router } from "@angular/router";
declare var $: any;

export default class Utils {

    constructor() { }
    static doSomething(val: string) { console.log("How are you this is utils------>"); }
    static doSomethingElse(val: string) { return val; }
    public processError(error, router) {
        if (error && error.status == 401) {
            localStorage.clear();
            localStorage.setItem("errormsg", "Your session is expired, please login again.")
            router.navigateByUrl("/login");

        }
    }
    showNotification(from, align, msg, msgType, delay: number) {

        const type = ['', 'info', 'success', 'warning', 'danger'];

        let color = Math.floor((Math.random() * 4) + 1);
        if (msgType == 's') { color = 2; }
        if (msgType == 'f') { color = 4; }

        $.notify({ icon: "notifications", message: msg }, {
            type: type[color],
            timer: 100,
            delay: delay,
            placement: {
                from: from,
                align: align
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
        });
    }


}