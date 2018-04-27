import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import { DragulaModule } from 'ng2-dragula/ng2-dragula';



import {AutoCompleteModule} from "primeng/primeng";
import {SearchpageComponent} from "./searchpage.component";
import {SearchPageRoutes} from "./searchpage.routing";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule, RouterModule.forChild(SearchPageRoutes),AutoCompleteModule,FormsModule],
    declarations: [SearchpageComponent]
})

export class SearchPageModule { }
