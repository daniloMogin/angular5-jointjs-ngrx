import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatGridListModule
} from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// // services
// import * as fromServices from './services';

// routes
export const ROUTES: Routes = [
    {
        path: '',
        component: fromContainers.ViewerComponent
    },
    {
        path: 'viewer',
        component: fromContainers.ViewerComponent
    },
    {
        path: 'designer',
        component: fromContainers.DesignerComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild(ROUTES),
        StoreModule.forFeature('designer', reducers),
        EffectsModule.forFeature(effects),

        MatButtonModule,
        MatToolbarModule,
        MatSelectModule,
        MatTabsModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatCardModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatListModule,
        MatMenuModule,
        MatIconModule,
        MatTooltipModule,
        MatGridListModule
    ],
    providers: [],
    declarations: [...fromContainers.containers, ...fromComponents.components],
    exports: [...fromContainers.containers, ...fromComponents.components]
})
export class DesignerModule {}
