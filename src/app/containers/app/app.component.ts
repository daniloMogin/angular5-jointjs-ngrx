import { Component } from '@angular/core';

import { environment as env } from '@env/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';
    screenWidth: number;

    isProd = env.production;
    envName = env.envName;
    version = env.versions.app;
    year = new Date().getFullYear();
    logo = require('../../../assets/images/logo.png');
    navigation = [
        { link: 'workflow/viewer', label: 'Workflow viewer', ngClass: '' },
        { link: 'workflow/designer', label: 'Workflow designer', ngClass: '' }
    ];
    navigationSideMenu = [
        ...this.navigation
    ];

    constructor() {
        // set screenWidth on page load
        this.screenWidth = window.innerWidth;
        window.onresize = () => {
            // set screenWidth on screen size change
            this.screenWidth = window.innerWidth;
        };
    }
}
