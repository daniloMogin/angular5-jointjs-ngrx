import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromDesigner from './designer.reducer';

export interface ProductsState {
    designer: fromDesigner.DesignerState;
}

export const reducers: ActionReducerMap<ProductsState> = {
    designer: fromDesigner.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>(
    'designer'
);
