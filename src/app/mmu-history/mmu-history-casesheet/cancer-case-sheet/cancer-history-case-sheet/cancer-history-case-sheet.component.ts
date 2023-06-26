import { Component, OnInit, Input } from '@angular/core';
import { HttpServices } from 'app/services/http-services/http_services.service';
import { SetLanguageComponent } from 'app/set-language.component';

@Component({
  selector: 'cancer-history-case-sheet',
  templateUrl: './cancer-history-case-sheet.component.html',
  styleUrls: ['./cancer-history-case-sheet.component.css']
})
export class CancerHistoryCaseSheetComponent implements OnInit {
  @Input('data')
  casesheetData: any;

  familyDiseaseHistory: any;
  patientPersonalHistory: any;
  patientObstetricHistory: any;
  beneficiaryDetails: any;

  blankRows = [1, 2, 3, 4]
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;
  

  constructor( private httpServiceService: HttpServices) { }

  ngOnInit() {
    this.fetchLanguageResponse();
  }

  ngOnChanges() {
    if (this.casesheetData) {

      if (this.casesheetData.BeneficiaryData)
        this.beneficiaryDetails = this.casesheetData.BeneficiaryData;

      if (this.casesheetData.nurseData && this.casesheetData.nurseData.familyDiseaseHistory)
        this.familyDiseaseHistory = this.casesheetData.nurseData.familyDiseaseHistory;

      if (this.casesheetData.nurseData && this.casesheetData.nurseData.benPersonalDietHistory)
        this.patientPersonalHistory = Object.assign({}, this.casesheetData.nurseData.benPersonalDietHistory);

      if (this.casesheetData.nurseData && this.casesheetData.nurseData.patientPersonalHistory)
        this.patientPersonalHistory = Object.assign(this.patientPersonalHistory, this.casesheetData.nurseData.patientPersonalHistory);

      if (this.casesheetData.nurseData && this.casesheetData.nurseData.patientObstetricHistory)
        this.patientObstetricHistory = this.casesheetData.nurseData.patientObstetricHistory;
    }
  }

  //AN40085822 23/10/2021 Integrating Multilingual Functionality --Start--
ngDoCheck(){
  this.fetchLanguageResponse();
}

fetchLanguageResponse() {
  this.languageComponent = new SetLanguageComponent(this.httpServiceService);
  this.languageComponent.setLanguage();
  this.currentLanguageSet = this.languageComponent.currentLanguageObject; 
}
//--End--
}
