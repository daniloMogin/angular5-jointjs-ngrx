import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
    MatAutocompleteModule,
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
    MatGridListModule,
    MatDialogModule
} from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

import { TreeModule } from 'angular-tree-component';
import { NgxMatSelectSearchModule } from './../designer/components/mat-select-search';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// // services
// import * as fromServices from './services';

import {
    DesignerSettingsComponent,
    DialogContent
} from './components/designer-settings/designer-settings.component';

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
        FormsModule,
        HttpClientModule,
        RouterModule.forChild(ROUTES),
        StoreModule.forFeature('designer', reducers),
        EffectsModule.forFeature(effects),

        MatAutocompleteModule,
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
        MatGridListModule,
        MatDialogModule,

        NgxMatSelectSearchModule,
        TreeModule
    ],
    entryComponents: [DialogContent],
    providers: [],
    declarations: [
        ...fromContainers.containers,
        ...fromComponents.components,
        DialogContent
    ],
    exports: [...fromContainers.containers, ...fromComponents.components]
})
export class DesignerModule {}
