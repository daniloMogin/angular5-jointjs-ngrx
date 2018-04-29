import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

// components
import * as fromComponents from './components';

// // containers
// import * as fromContainers from './containers';

// // services
// import * as fromServices from './services';

// routes
export const ROUTES: Routes = [
    {
        path: '',
        component: fromComponents.DesignerCommands
    }
    // {
    //     path: 'new',
    //     component: fromContainers.ProductItemComponent
    // },
    // {
    //     path: ':pizzaId',
    //     component: fromContainers.ProductItemComponent
    // }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild(ROUTES),
        StoreModule.forFeature('products', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [],
    declarations: [...fromComponents.components],
    exports: [...fromComponents.components]
})
export class DesignerModule {}
