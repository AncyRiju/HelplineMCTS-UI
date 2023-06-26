import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ConfigService } from '../config/config.service';
import { dataService } from '../dataService/data.service';

import { InterceptedHttp } from './../../http.interceptor'
import { SecurityInterceptedHttp } from './../../http.securityinterceptor';
@Injectable()
export class SmsTemplateService {

    commonBaseURL: any;

    getSMStemplates_url: any;
    saveSMStemplate_url: any;
    updateSMStemplate_url: any;

    getFullSMSTemplate_url: any;

    getSMStypes_url: any;
    getSMSparameters_url: any;
    sendSMS_url: any;

    constructor(private _http: SecurityInterceptedHttp,
        private _config: ConfigService,
        private dataService:dataService,
        private httpIntercept: InterceptedHttp) {
        this.commonBaseURL = this._config.getCommonBaseURL();

        this.getSMStemplates_url = this.commonBaseURL + 'sms/getSMSTemplates';
        this.saveSMStemplate_url = this.commonBaseURL + 'sms/saveSMSTemplate';
        this.updateSMStemplate_url = this.commonBaseURL + 'sms/updateSMSTemplate';

        this.getSMStypes_url = this.commonBaseURL + 'sms/getSMSTypes';
        this.getSMSparameters_url = this.commonBaseURL + 'sms/getSMSParameters';
        this.getFullSMSTemplate_url = this.commonBaseURL + 'sms/getFullSMSTemplate';
        this.sendSMS_url = this.commonBaseURL + 'sms/sendSMS';



    }

    getSMStemplates(providerServiceMapID, smsTypeID?) {
        return this.httpIntercept.post(this.getSMStemplates_url,
            {
                'providerServiceMapID': providerServiceMapID,
                'smsTemplateTypeID': smsTypeID ? smsTypeID : undefined
            })
            .map(this.handleSuccess)
            .catch(this.handleError);
    }

    getSMStypes(serviceID) {
        return this.httpIntercept.post(this.getSMStypes_url,
            { 'serviceID': serviceID })
            .map(this.handleSuccess)
            .catch(this.handleError);
    }

    getSMSparameters() {
        return this.httpIntercept.post(this.getSMSparameters_url,
            {  'serviceID':  this.dataService.current_serviceID  }
        )
            .map(this.handleSuccess)
            .catch(this.handleError);
    }

    saveSMStemplate(obj) {
        return this.httpIntercept.post(this.saveSMStemplate_url, obj)
            .map(this.handleSuccess)
            .catch(this.handleError);
    }

    updateSMStemplate(obj) {
        return this.httpIntercept.post(this.updateSMStemplate_url, obj)
            .map(this.handleSuccess)
            .catch(this.handleError);
    }

    getFullSMSTemplate(providerServiceMapID, smsTemplateID) {
        return this.httpIntercept.post(this.getFullSMSTemplate_url,
            {
                'providerServiceMapID': providerServiceMapID,
                'smsTemplateID': smsTemplateID
            })
            .map(this.handleSuccess)
            .catch(this.handleError);
    }

    sendSMS(obj) {
        return this.httpIntercept.post(this.sendSMS_url, obj)
            .map(this.handleSuccess)
            .catch(this.handleError);
    }



    handleSuccess(response: Response) {
        if (response.json().data) {
            return response.json().data;
        } else {
            return Observable.throw(response.json());
        }
    }

    private handleError(error: Response | any) {
        return Observable.throw(error.json());
    };

}