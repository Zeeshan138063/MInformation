import { Component, OnInit , } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-influencers-datatable',
  templateUrl: './influencers-datatable.component.html',
  styles: [
  ]
})
export class InfluencersDatatableComponent implements OnInit {
  constructor(private router: Router ) {

  }

  ngOnInit() {
  }
  onClicked(e)
  {
    console.log(e);
    this.router.navigate(['/search', e])
  }
  find(e)
  {
    this.router.navigate(['/search', e])
  }

}
