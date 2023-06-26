import { Component, DoCheck, OnInit } from "@angular/core";
import { dataService } from "../services/dataService/data.service";
import { ConfigService } from "../services/config/config.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { SetLanguageComponent } from "app/set-language.component";
import { HttpServices } from "app/services/http-services/http_services.service";

@Component({
  selector: "app-supervisor-reports",
  templateUrl: "./supervisor-reports.component.html",
  styleUrls: ["./supervisor-reports.component.css"],
})
export class SupervisorReportsComponent implements OnInit, DoCheck {
  reportsURL: any;
  currentLanguageSet: any;

  constructor(
    private saved_data: dataService,
    private _config: ConfigService,
    public sanitizer: DomSanitizer,
    private httpServices: HttpServices
  ) {}

  ngOnInit() {
    this.assignSelectedLanguage();
    //http://10.201.13.17/remote_login.php?username=[value]&key=
    this.reportsURL =
      this._config.getTelephonyServerURL() +
      "remote_login.php?username=" +
      this.saved_data.Userdata.userName +
      "&key=" +
      this.saved_data.loginKey;
    this.reportsURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.reportsURL
    );
    console.log("reportsURL: " + this.reportsURL);
  }
  /* Multilingual implementation - JA354063 */
  ngDoCheck() {
    this.assignSelectedLanguage();
  }

  assignSelectedLanguage() {
    const getLanguageJson = new SetLanguageComponent(this.httpServices);
    getLanguageJson.setLanguage();
    this.currentLanguageSet = getLanguageJson.currentLanguageObject;
  }
  /* Ends*/
}
