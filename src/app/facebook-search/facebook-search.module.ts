import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {FacebookSearchRoutes} from "./facebook-search.routing";
import {DialogModule} from 'primeng/primeng';

import {FacebookSearchComponent} from "./facebook-search.component";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";

import {NgPipesModule} from 'ngx-pipes';
import {PagerService} from "../_services/paginator.service";
import {RoundpipeModule} from "../home/roundpipe.module";
import {MdAutocompleteModule, MdCardModule, MdPaginatorModule, MdSortModule, MdTableModule} from "@angular/material";
import {PreloaderModule} from "../components/preloader.module";

@NgModule({
    imports: [CommonModule, RouterModule.forChild(FacebookSearchRoutes),PreloaderModule,ReactiveFormsModule,MdPaginatorModule,MdSortModule,MdTableModule,DialogModule,FormsModule,RoundpipeModule,MdCardModule,NgPipesModule,MdAutocompleteModule],
    declarations: [FacebookSearchComponent],
    providers:[PagerService]
})

export class FacebookSearchModule { }
