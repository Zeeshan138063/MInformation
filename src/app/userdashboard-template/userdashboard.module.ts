import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DashboardRoutes} from "./userdashboard.routing";
import {UserdashboardTemplateComponent} from "./userdashboard-template.component";
import {MdSelectModule, MdTabsModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {PreloaderModule} from "../components/preloader.module";

import {MdCardModule} from '@angular/material';


@NgModule({
    imports: [CommonModule, RouterModule.forChild( DashboardRoutes ),FormsModule,
        MdSelectModule,MdTabsModule,PreloaderModule,MdCardModule],
    declarations: [ UserdashboardTemplateComponent ]
})

export class UserDashboardModule {

}
