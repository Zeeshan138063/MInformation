// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
// import {SliderModule} from 'primeng/primeng';
import { RequestOptions } from '@angular/http';
// import { HttpService } from './services/http-service';
// import { PreloaderService } from './services/preloader-service';
// import { PostService } from './services/post-service';
// import { PreloaderFull } from './components/preloader-full/preloader-full';
// import { PreloaderSmall } from './components/preloader-small/preloader-small';
import { WebSocketService } from 'angular2-websocket-service';
// import {NgPipesModule} from 'ngx-pipes';
// import { ScrollEventModule } from 'ngx-scroll-event';
// import {DialogModule} from 'primeng/primeng';
// import { BaseRequestOptions } from '@angular/http';
//
// import { AppComponent } from './app.component';
// import { routing } from './app.routing';
//
// import { AlertComponent } from './_directives/index';
// import { AuthGuard } from './_guards/index';
// import { AlertService, AuthenticationService, UserService } from './_services/index';
// import { HomeComponent } from './home/index';
// import { LoginComponent } from './login/index';
// import { RegisterComponent } from './register/index';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
// import { ColumnComponent } from './home/column.component';
// import { DatatableComponent } from './home/datatable.component';
// import { UserdashboardTemplateComponent } from './userdashboard-template/userdashboard-template.component';
// import { HeaderComponent } from './userdashboard-template/header.component';
// import { SideMenuComponent } from './userdashboard-template/side-menu.component';
// import { InfluencersDatatableComponent } from './home/influencers-datatable.component';
// import {DataTableModule, OverlayPanelModule,Paginator,  PaginatorModule, SharedModule} from 'primeng/primeng';
// import {HomepageComponent} from './home_page/homepage.component';
// import { TwloginComponent } from './login/twlogin.component';
// import { CategorycardComponent } from './home/categorycard.component';
// import { SearchComponent } from './home/search.component';
// import { BlogsearchComponent } from './blogsearch/blogsearch.component';
// import { ServerSocket } from './_services/server-socket.service'
// import {TimeAgoPipe} from 'time-ago-pipe';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PushNotificationsModule } from 'angular2-notifications';
// import { SimpleNotificationsModule } from 'angular2-notifications';
// import { Blogsearchv2Component } from './blogsearch/blogsearchv2.component';
// import { PagerService } from './_services/paginator.service';
import { MomentModule } from 'angular2-moment';
// import { SearchpageComponent } from './home/searchpage.component';
// import {AutoCompleteModule} from 'primeng/primeng';
// import { Error400Component } from './error400/error400.component';
// import {RoundPipe} from './home/search.component'
// export function httpServiceFactory(backend: XHRBackend, defaultOptions: RequestOptions, preloaderService: PreloaderService) {
//     return new HttpService(backend, defaultOptions, preloaderService);
// }
// import {enableProdMode} from '@angular/core';
// import { BlogListInfComponent } from './blogsearch/blog-list-inf.component';
//
// import {InlineEditorModule} from 'ng2-inline-editor';
// import {MdSelectModule,MdDialogModule,MdInputModule} from '@angular/material';
// import {MdButtonModule} from '@angular/material';
// import {CsvService} from "angular2-json2csv";
//
//
// import { EmailSettingsComponent } from './email-settings/email-settings.component';
// import { AddEmailComponent,AddEmailDialog } from './email-settings/add-email.component';
//
// import {ReactiveFormsModule} from '@angular/forms';
// import {MdRadioModule} from '@angular/material';
// import {MdCardModule} from '@angular/material';
// import {MdTableModule, MdPaginatorModule, MdSortModule} from '@angular/material';
//
// import { Select2Module } from 'ng2-select2';
//
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
// import { BlogSearchCategoriesComponent } from './blogsearch/blog-search-categories.component';
// import { FacebookSearchComponent } from './facebook-search/facebook-search.component';
// import { YoutubeSearchComponent } from './youtube-search/youtube-search.component';
// import {MdAutocompleteModule} from '@angular/material';
// import { InstagramSearchComponent } from './instagram-search/instagram-search.component';
// import { TwitterListComponent } from './twitter-list/twitter-list.component';
// import { BlogosphereListInfComponent } from './blog-search/blogosphere-list-inf.component';
// import { YoutubeListInfComponent } from './youtube-search/youtube-list-inf.component';
// import { InstagramListInfComponent } from './instagram-search/instagram-list-inf.component';
// import {DataService} from "./_services/data.service";
// import { TwitterSearchComponent } from './twitter-search/twitter-search.component';
// import { BlogosphereSearchComponent } from './blog-search/blog-search.component';
// import {MdTabsModule} from '@angular/material';
// import { GenericSearchComponent } from './generic-search/generic-search.component';
// import { TwitterComponent } from './generic-search/twitter/twitter.component';
// import { YoutubeComponent } from './generic-search/youtube/youtube.component';
// import { InstagramComponent } from './generic-search/instagram/instagram.component';
// import { BlogosphereComponent } from './generic-search/blogosphere/blogosphere.component';
// import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
// import { LinkedinSearchComponent } from './linkedin-search/linkedin-search.component';
// import { PinterestSearchComponent } from './pinterest-search/pinterest-search.component';
// import { ChangePasswordComponent } from './reset-password/change-password.component';
// import { OptInInfluencersComponent } from './opt-in-influencers/opt-in-influencers.component';




import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {enableProdMode, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, Http, XHRBackend} from '@angular/http';


import { AppComponent } from './app.component';

// import { PostSignupComponent } from './post-signup/post-signup.component';
// import { AuthGuard } from './_guards/index';
import {DashboardLayoutComponent} from "./dashboard-layout/dashboard-layout.component";
import {SharedModule} from "primeng/primeng";
import {AppRoutes} from "./app.routing";
import {HttpService} from "./services/http-service";
import {AlertService} from "./_services/alert.service";


import {AlertComponent} from "./_directives/alert.component";
import {AuthenticationService} from "./_services/authentication.service";
import {UserService} from "./_services/user.service";
import {ServerSocket} from "./_services/server-socket.service";
import {HeaderComponent} from "./userdashboard-template/header.component";
import {SideMenuComponent} from "./userdashboard-template/side-menu.component";
import {TimeAgoPipe} from "time-ago-pipe";
import {NgPipesModule} from "ngx-pipes";
import {PreloaderModule} from "./components/preloader.module";
import {AuthGuard} from "./_guards/auth.guard";
import {DataService} from "./_services/data.service";
import {SlimLoadingBarModule} from "ng2-slim-loading-bar";


enableProdMode();
@NgModule({
    imports: [ BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        RouterModule.forRoot(AppRoutes),
        FormsModule,
        HttpModule,
        MomentModule,PreloaderModule,PushNotificationsModule,
        SlimLoadingBarModule.forRoot()
    ],
    declarations:[

        DashboardLayoutComponent,
        AppComponent,
        // PreloaderFull,
        AlertComponent,
        HeaderComponent,
        SideMenuComponent,
        TimeAgoPipe
        // MessengerComponent,
        // PreloaderService,
    ],

    // imports: [
    //     DataTableModule,
    //     SharedModule,
    //     BrowserModule,
    //     FormsModule,
    //     HttpModule,
    //     routing,
    //     BrowserAnimationsModule,
    //     PaginatorModule,
    //     OverlayPanelModule,
    //     PushNotificationsModule,
    //     DialogModule,
    //     MomentModule,
    //     NgPipesModule,
    //     Select2Module,
    //     ReactiveFormsModule,
    //     SliderModule,
    //
    //     MdCardModule,MdSortModule,
    //     MdTableModule,MdPaginatorModule,MdAutocompleteModule,
    //     // GoogleApiModule.forRoot({
    //     //     provide: NG_GAPI_CONFIG,
    //     //     useValue: gapiClientConfig
    //     // }),
    //     InlineEditorModule,
    //     ScrollEventModule,
    //     AutoCompleteModule,
    //     MdSelectModule,
    //     MdDialogModule,
    //     MdInputModule,
    //     // MatStepperModule,
    //     MdButtonModule, MdRadioModule, MdTabsModule,
    //     SimpleNotificationsModule.forRoot(),
    //     FroalaEditorModule.forRoot(),
    //     FroalaViewModule.forRoot()
    // ],
    // declarations: [
    //     AppComponent,
    //     AlertComponent,
    //     HomeComponent,
    //     LoginComponent,
    //     RegisterComponent,
    //     ResetPasswordComponent,
    //     ColumnComponent,
    //     DatatableComponent,
    //     UserdashboardTemplateComponent,
    //     HeaderComponent,
    //     HeaderComponent,
    //     SideMenuComponent,
    //     InfluencersDatatableComponent,
    //     HomepageComponent,
    //     TwloginComponent,
    //     CategorycardComponent,
    //     SearchComponent,
    //     PreloaderFull,
    //     PreloaderSmall,
    //     BlogsearchComponent,
    //     TimeAgoPipe,
    //     RoundPipe,
    //     Blogsearchv2Component,
    //     SearchpageComponent,
    //     Error400Component,
    //     BlogListInfComponent,
    //     EmailSettingsComponent,
    //     AddEmailComponent,
    //     AddEmailDialog,
    //     BlogSearchCategoriesComponent,
    //     FacebookSearchComponent,
    //     YoutubeSearchComponent,
    //     InstagramSearchComponent,
    //     TwitterListComponent,
    //     TwitterSearchComponent,
    //     BlogosphereSearchComponent,
    //     BlogosphereListInfComponent,
    //     YoutubeListInfComponent,
    //     InstagramListInfComponent,
    //     GenericSearchComponent,
    //     TwitterComponent,
    //     YoutubeComponent,
    //     InstagramComponent,
    //     BlogosphereComponent,
    //     DashboardLayoutComponent,
    //     LinkedinSearchComponent,
    //     PinterestSearchComponent,
    //     ChangePasswordComponent,
    //     OptInInfluencersComponent
    //
    // ],
    // entryComponents: [AddEmailDialog],
    // providers: [
    //     AuthGuard,
    //     AlertService,
    //     AuthenticationService,
    //     UserService,
    //     BaseRequestOptions,
    //     PreloaderService,

    //     ServerSocket,
    //     PagerService,
    //     CsvService,
    //     PostService,
    //     DataService,
    //     {
    //         provide: HttpService,
    //         useFactory: httpServiceFactory,
    //         deps: [XHRBackend, RequestOptions, PreloaderService]
    //     }
    // ],

    providers:[WebSocketService,AuthGuard,AlertService,AuthenticationService,UserService,DataService,
           ServerSocket,


    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
