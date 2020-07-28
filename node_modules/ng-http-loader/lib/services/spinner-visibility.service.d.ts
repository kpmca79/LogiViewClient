import { Observable } from 'rxjs';
import { PendingRequestsInterceptor } from './pending-requests-interceptor.service';
import * as ɵngcc0 from '@angular/core';
export declare class SpinnerVisibilityService {
    private pendingRequestsInterceptor;
    private _visibility$;
    constructor(pendingRequestsInterceptor: PendingRequestsInterceptor);
    get visibility$(): Observable<boolean>;
    show(): void;
    hide(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SpinnerVisibilityService>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci12aXNpYmlsaXR5LnNlcnZpY2UuZC50cyIsInNvdXJjZXMiOlsic3Bpbm5lci12aXNpYmlsaXR5LnNlcnZpY2UuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FBRUE7Ozs7Ozs7O0FBT0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQZW5kaW5nUmVxdWVzdHNJbnRlcmNlcHRvciB9IGZyb20gJy4vcGVuZGluZy1yZXF1ZXN0cy1pbnRlcmNlcHRvci5zZXJ2aWNlJztcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIFNwaW5uZXJWaXNpYmlsaXR5U2VydmljZSB7XG4gICAgcHJpdmF0ZSBwZW5kaW5nUmVxdWVzdHNJbnRlcmNlcHRvcjtcbiAgICBwcml2YXRlIF92aXNpYmlsaXR5JDtcbiAgICBjb25zdHJ1Y3RvcihwZW5kaW5nUmVxdWVzdHNJbnRlcmNlcHRvcjogUGVuZGluZ1JlcXVlc3RzSW50ZXJjZXB0b3IpO1xuICAgIGdldCB2aXNpYmlsaXR5JCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICAgIHNob3coKTogdm9pZDtcbiAgICBoaWRlKCk6IHZvaWQ7XG59XG4iXX0=