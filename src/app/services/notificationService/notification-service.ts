import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { InterceptedHttp } from './../../http.interceptor'
import { SecurityInterceptedHttp } from '../../http.securityinterceptor';
import { SocketService } from '../socketService/socket.service';

@Injectable()
export class NotificationService {

    getNotificationTypesURL = this.configService.getCommonBaseURL() + "notification/getNotificationType";
    getRolesURL = this.configService.getCommonBaseURL() + 'user/getRolesByProviderID';
    createNotificationURL = this.configService.getCommonBaseURL() + 'notification/createNotification';
    getNotificationsURL = this.configService.getCommonBaseURL() + "notification/getNotification";
    getSupervisorNotificationsURL = this.configService.getCommonBaseURL() + "notification/getSupervisorNotification";
    updateNotificationURL = this.configService.getCommonBaseURL() + "notification/updateNotification";

    getOfficesFromRole_URL = this.configService.getCommonBaseURL() + "user/getLocationsByProviderID";
    getLanguagesURL = this.configService.getCommonBaseURL() + "beneficiary/getRegistrationData";
    getOfficesURL = this.configService.getAdminBaseURL() + "m/location/getAlllocationNew";
    getUsersByProviderID_URL = this.configService.getCommonBaseURL() + "user/getUsersByProviderID";
    getServiceProviderID_url = this.configService.getAdminBaseURL() + "getServiceProviderid";

    createEmergencyContacts_url = this.configService.getCommonBaseURL() + 'notification/createEmergencyContacts';
    getSupervisorEmergencyContacts_url = this.configService.getCommonBaseURL() + 'notification/getSupervisorEmergencyContacts';
    updateEmergencyContacts_url = this.configService.getCommonBaseURL() + 'notification/updateEmergencyContacts';

    getDesignationsUrl = this.configService.getAdminBaseURL() + 'm/getDesignation';
    sendSocketNotification_url = this.socketService.getSocketURL() + 'notification/notificationToRoom';
    getCount_url = this.configService.getCommonBaseURL() + 'notification/getAlertsAndNotificationCount';
    getNotificationDetails_url = this.configService.getCommonBaseURL() + 'notification/getAlertsAndNotificationDetail';
    changeNotificationStatus_url = this.configService.getCommonBaseURL() + 'notification/changeNotificationStatus';
    deleteNotification_url = this.configService.getCommonBaseURL() + 'notification/markDelete';
    getEmergencyContacts_Url = this.configService.getCommonBaseURL() +'notification/getEmergencyContacts';

    constructor(private http: SecurityInterceptedHttp, private configService: ConfigService, private httpIntercepto: InterceptedHttp, private socketService: SocketService) { };

    ngOnInit() {

    }

    getUsersByProviderID(psmID) {
        return this.http.post(this.getUsersByProviderID_URL, { "providerServiceMapID": psmID })
            .map((response: Response) => response.json().data);
    }

    getAllDesignations() {
        return this.http.post(this.getDesignationsUrl, {})
            .map((response: Response) => response.json().data);
    }

    getLanguages() {
        return this.http.post(this.getLanguagesURL, {})
            .map((response: Response) => response.json().data.m_language);
    }

    getOffices(psmID) {
        console.log(psmID);
        return this.http.post(this.getOfficesURL, {
            "providerServiceMapID": psmID
        })
            .map((response: Response) => response.json().data);
    }

    getOfficeByRole(providerServiceMapID, roleID) {
        return this.http.post(this.getOfficesFromRole_URL, {
            "providerServiceMapID": providerServiceMapID,
            "roleID": roleID
        })
            .map((response: Response) => response.json().data);
    }

    getServiceProviderID(providerServiceMapID) {
        return this.http.post(this.getServiceProviderID_url, { 'providerServiceMapID': providerServiceMapID })
            .map((response: Response) => response.json().data);
    }

    getNotificationTypes(providerServiceMapID) {
        let data = { "providerServiceMapID": providerServiceMapID };
        return this.http.post(this.getNotificationTypesURL, data)
            .map((response: Response) => response.json().data);
    }
    getRoles(providerServiceMapID) {
        let data = { "providerServiceMapID": providerServiceMapID };
        return this.http.post(this.getRolesURL, data)
            .map((response: Response) => response.json());
    }
    createNotification(data) {
        return this.httpIntercepto.post(this.createNotificationURL, data)
            .map((response: Response) => response.json());
    }
    getAlerts(data) {
        return this.http.post(this.getNotificationsURL, data)
            .map((response: Response) => response.json());
    }
    getNotifications(data) {
        return this.http.post(this.getNotificationsURL, data)
            .map((response: Response) => response.json());
    }
    getKMs(data) {
        return this.http.post(this.getNotificationsURL, data)
            .map((response: Response) => response.json());
    }
    getSupervisorNotifications(data) {
        return this.httpIntercepto.post(this.getSupervisorNotificationsURL, data)
            .map((response: Response) => response.json()).catch(this.handleCustomError);
    }
    updateNotification(data) {
        return this.httpIntercepto.post(this.updateNotificationURL, data)
            .map((response: Response) => response.json()).catch(this.handleCustomError);
    }

    getSupervisorEmergencyContacts(data) {
        return this.httpIntercepto.post(this.getSupervisorEmergencyContacts_url, data)
            .map((response: Response) => response.json()).catch(this.handleCustomError);
    }

    updateEmergencyContacts(data) {
        return this.httpIntercepto.post(this.updateEmergencyContacts_url, data)
            .map((response: Response) => response.json()).catch(this.handleCustomError);
    }

    createEmergencyContacts(data) {
        return this.httpIntercepto.post(this.createEmergencyContacts_url, data)
            .map((response: Response) => response.json()).catch(this.handleCustomError);
    }

    sendSocketNotification(data) {
        return this.http.post(this.sendSocketNotification_url, data)
            .map((response: Response) => response.json()).catch(this.handleCustomError);
    }

    getCount(data){
        return this.httpIntercepto.post(this.getCount_url, data)
            .map((response: Response) => response.json()).catch(this.handleCustomError);
    }

    getNotificationDetails(data){
        return this.httpIntercepto.post(this.getNotificationDetails_url, data)
            .map((response: Response) => response.json()).catch(this.handleCustomError);
    }

    changeNotificationStatus(data){
        return this.httpIntercepto.post(this.changeNotificationStatus_url, data)
            .map((response: Response) => response.json()).catch(this.handleCustomError);
    }

    deleteNotification(data){
        return this.httpIntercepto.post(this.deleteNotification_url, data)
            .map((response: Response) => response.json()).catch(this.handleCustomError);
    }
    getEmergencyContacts(data) {
        return this.httpIntercepto.post(this.getEmergencyContacts_Url,data)
        .map((response : Response )=> response.json().data).catch(this.handleCustomError);
    }
    handleError(error: Response) {
        return Observable.throw(error.json());
    }
    handleCustomError(error: Response) {
        return Observable.throw(error.json());
    }
}