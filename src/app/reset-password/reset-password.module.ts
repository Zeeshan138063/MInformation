import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {FormsModule} from "@angular/forms";
import {ResetPasswordComponent} from "./reset-password.component";
import {ResetPasswordRoutes} from "./reset-password.routing";
import {PreloaderModule} from "../components/preloader.module";


@NgModule({
    imports: [CommonModule, RouterModule.forChild(ResetPasswordRoutes),FormsModule,PreloaderModule],
    declarations: [ResetPasswordComponent]
})

export class ResetPasswordModule { }
