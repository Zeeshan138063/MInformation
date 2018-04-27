import { Component } from '@angular/core';
import '../assets/app.css';
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

@Component({
    moduleId: module.id.toString(),
    selector: 'app-component',
    templateUrl: 'app.component.html',
    styles: []
})

export class AppComponent {

    constructor(private slimLoadingBarService: SlimLoadingBarService) { this.startLoading()}

    startLoading() {
        this.slimLoadingBarService.start(() => {
            console.log('Loading complete');
        });
    }

    stopLoading() {
        this.slimLoadingBarService.stop();
    }

    completeLoading() {
        this.slimLoadingBarService.complete();
    }
}
