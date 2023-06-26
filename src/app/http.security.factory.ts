/*
* Created by Pankush Manchanda 10,August 2017
* Http Interceptor to add diffrent function to http request like passing option in every request
* Advantage : Used to remove the code duplication
*/

import { XHRBackend, Http, RequestOptions } from '@angular/http';
import { SecurityInterceptedHttp } from './http.securityinterceptor';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from './services/authentication/auth.service';
import { ConfirmationDialogsService } from './services/dialog/confirmation.service';
import { SocketService } from './services/socketService/socket.service';

export function SecurityFactory(xhrBackend: XHRBackend,
    requestOptions: RequestOptions,
     router: Router,
      authService: AuthService,
       message: ConfirmationDialogsService,
        socketService: SocketService): Http {
    return new SecurityInterceptedHttp(xhrBackend, requestOptions, router, authService, message, socketService);
} 
