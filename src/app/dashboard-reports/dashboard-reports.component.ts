import { Component, OnInit } from '@angular/core';
import { HttpServices } from 'app/services/http-services/http_services.service';
import { SetLanguageComponent } from 'app/set-language.component';

@Component({
  selector: 'app-dashboard-reports',
  templateUrl: './dashboard-reports.component.html',
  styleUrls: ['./dashboard-reports.component.css']
})
export class DashboardReportsComponent implements OnInit {
  currentLanguageSet: any;

  constructor(public httpServices:HttpServices) { }

  ngOnInit() {
    this.assignSelectedLanguage();
    
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
