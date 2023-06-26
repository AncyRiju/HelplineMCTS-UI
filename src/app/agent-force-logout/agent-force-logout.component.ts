import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { dataService } from '../services/dataService/data.service';
import { ConfirmationDialogsService } from '../services/dialog/confirmation.service'
import { ForceLogoutService } from './../services/supervisorService/forceLogoutService.service';
import { NgForm } from '@angular/forms';
import { SetLanguageComponent } from 'app/set-language.component';
import { HttpServices } from 'app/services/http-services/http_services.service';

@Component({
  selector: 'app-agent-force-logout',
  templateUrl: './agent-force-logout.component.html',
  styleUrls: ['./agent-force-logout.component.css']
})
export class AgentForceLogoutComponent implements OnInit {

  providerServiceMapID: any;
  @ViewChild('forceLogoutForm') agentForceLogoutForm: NgForm;
  currentLanguageSet: any;

  constructor(private dialog: MdDialog,
    public dialogRef: MdDialogRef<AgentForceLogoutComponent>,
    private commonData: dataService,
    private alertService: ConfirmationDialogsService,
    private forceLogoutService: ForceLogoutService,public httpServices:HttpServices) { }

  ngOnInit() {
    this.providerServiceMapID = this.commonData.currentService.serviceID;
  }

  kickout(obj) {
    obj['providerServiceMapID'] = this.providerServiceMapID;
    this.forceLogoutService.agentForceLogout(obj)
      .subscribe(response => {
        console.log(response, 'Success post agent force logout');
        this.alertService.alert(this.currentLanguageSet.userLoggedOutSuccessfully, 'success');
        this.agentForceLogoutForm.reset();
        this.dialogRef.close();
      }, err => {
        console.log(err, 'error post agent force logout');
        this.alertService.alert(err.errorMessage, 'error');
      });
  }
  ngDoCheck() {
		this.assignSelectedLanguage();
	  }
	
	  assignSelectedLanguage() {
			const getLanguageJson = new SetLanguageComponent(this.httpServices);
			getLanguageJson.setLanguage();
			this.currentLanguageSet = getLanguageJson.currentLanguageObject;
		  }
}
