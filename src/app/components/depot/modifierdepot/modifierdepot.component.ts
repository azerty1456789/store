import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { DepotModule } from 'app/module/depot.module';
import { DepotService } from 'app/service/depot/depot.service';
import { CoreTranslationService } from '@core/services/translation.service'
import { locale as english } from '../i18n/en'
import { locale as french } from '../i18n/fr'
import { locale as arabic } from '../i18n/ar'
@Component({
  selector: 'app-modifierdepot',
  templateUrl: './modifierdepot.component.html',
  styleUrls: ['./modifierdepot.component.scss']
})
export class ModifierdepotComponent implements OnInit {
  depotId: number;
  depot: DepotModule;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private depotService: DepotService,
    private _translateService: CoreTranslationService) {
      this._translateService.translate(english, french, arabic);

     }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.depotId = +params.get('id');
      this.depotService.getDepot(this.depotId).subscribe(depot => {
        this.depot = depot;
      });
    });
  }
  onModify() {
    this.depotService.updateDepot(this.depot).subscribe(
      (response) => {
        console.log(response);
        // show a success message
        alert('Depot updated successfully!');
        this.router.navigate(['/depot/lister']);
      },
      (error) => {
        console.log(error);
        // show an error message
        alert('Error updating depot!');
      }
    );
  }
}
