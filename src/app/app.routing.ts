import { Routes } from '@angular/router';

import {DashboardLayoutComponent} from "./dashboard-layout/dashboard-layout.component";

import {AuthGuard} from "./_guards/auth.guard";
import {SettingsComponent} from "./settings/settings.component";

export const AppRoutes: Routes = [
    // { path: '', component: HomepageComponent },
    { path: '', component: DashboardLayoutComponent,  children: [
        { path: 'twitter/categories',  loadChildren: './home/twittercategories.module#TwittercategoriesModule' },
    //     { path: 'blogs/search/:query', component: BlogsearchComponent },
        { path: 'youtube/search', loadChildren: './youtube-search/youtube-search.module#YoutubeSearchModule'},
        { path: 'facebook/search', loadChildren: './facebook-search/facebook-search.module#FacebookSearchModule'},
        { path: 'instagram/search', loadChildren: './instagram-search/instagram-search.module#InstagramSearchModule' },
        { path: 'linkedin/search', loadChildren: './linkedin-search/linkedin-search.module#LinkedinSearchModule' },
        { path: 'pinterest/search', loadChildren: './pinterest-search/pinterest-search.module#PinterestSearchModule'},
        { path: 'twitter/search', loadChildren: './twitter-search/twitter-search.module#TwitterSearchModule' },
        { path: 'search/results/:query', loadChildren: './generic-search/generic-search.module#GenericSearchModule' },
        { path: 'blogosphere/list/:query', loadChildren: './blog-search/blogosphere-list-inf.module#BlogosphereListInfModule'},
        { path: 'blogosphere/search',  loadChildren: './blog-search/blog-search.module#BlogosphereSearchModule'},
        { path: 'blogs/search/v2/:query', loadChildren: './blogsearch/blogsearch.module#BlogsearchModule'},
    //     { path: 'blogs/search/v3/:query', component: BlogSearchCategoriesComponent },
        { path: 'blogs/list/:query', loadChildren: './blogsearch/blog-list-inf.module#BlogListInfModule'},
        { path: 'twitter/list/:query', loadChildren: './twitter-list/twitter-list.module#TwitterListModule'},
        { path: 'youtube/list/:query', loadChildren: './youtube-search/youtube-list-inf.module#YoutubeListInfModule' },
        { path: 'instagram/list/:query', loadChildren: './instagram-search/instagram-list-inf.module#InstagramListInfModule' },
        { path: 'dashboard',  loadChildren: './userdashboard-template/userdashboard.module#UserDashboardModule'},
        { path: '',  loadChildren: './userdashboard-template/userdashboard.module#UserDashboardModule'},
        { path: 'search/:query', loadChildren: './home/search.module#SearchModule' },
        { path: 'email/settings/:id', loadChildren: './email-settings/email-settings.module#EmailSettingsModule'},
        { path: 'email/settings', loadChildren: './email-settings/email-settings.module#EmailSettingsModule' },
        { path: 'multi/search',  loadChildren: './home/searchpage.module#SearchPageModule' },
        { path: 'optin/search', loadChildren: './opt-in-influencers/opt-in-influencers.module#OptInInfluencersModule' },
        { path: 'messenger', loadChildren: './messenger/messenger.module#MessengerModule' },
        { path: 'settings', loadChildren: './settings/settings.module#SettingsModule'},

        //
    ], canActivate: [AuthGuard] },

    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    // { path: 'register', component: RegisterComponent },
    // { path: 'twlogin', component: TwloginComponent },
    { path: 'reset-password',  loadChildren: './reset-password/reset-password.module#ResetPasswordModule' },
    { path: 'page-not-found', loadChildren: './error400/error400.module#Error400Module' },
    { path: 'new-password/:token', loadChildren: './reset-password/change-password.module#ChangePasswordModule' },
    { path: '**', loadChildren: './login/login.module#LoginModule' }
];
