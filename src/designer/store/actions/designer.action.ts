import { Action } from '@ngrx/store';

// load designer
export const LOAD_DESIGNER = '[Designer] Load Designer';
export const LOAD_DESIGNER_FAIL = '[Designer] Load Designer Fail';
export const LOAD_DESIGNER_SUCCESS = '[Designer] Load Designer Success';

export class LoadDesigner implements Action {
    readonly type = LOAD_DESIGNER;
}

export class LoadDesignerFail implements Action {
    readonly type = LOAD_DESIGNER_FAIL;
    constructor(public payload: any) {}
}

export class LoadDesignerSuccess implements Action {
    readonly type = LOAD_DESIGNER_SUCCESS;
    constructor(public payload: any) {}
}

export type DesignerActions =
    | LoadDesigner
    | LoadDesignerFail
    | LoadDesignerSuccess;
