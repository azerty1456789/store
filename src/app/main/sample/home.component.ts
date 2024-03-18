import { Component, OnInit } from '@angular/core'
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from 'app/main/sample/i18n/en'
import { locale as french } from 'app/main/sample/i18n/fr'
import { locale as arabic } from 'app/main/sample/i18n/ar'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  public contentHeader: object

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.contentHeader = {
      headerTitle: 'Home',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Sample',
            isLink: false
          }
        ]
      }
    }
  }
}
