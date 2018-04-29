import * as fromDesigner from './../actions/designer.action';

export interface DesignerState {
    entities: { [id: number]: any };
    loaded: boolean;
    loading: boolean;
}

export const initialState: DesignerState = {
    entities: {},
    loaded: false,
    loading: false
};

export function reducer(
    state = initialState,
    action: fromDesigner.DesignerActions
): DesignerState {
    switch (action.type) {
        case fromDesigner.LOAD_DESIGNER: {
            return {
                ...state,
                loading: true
            };
        }
        case fromDesigner.LOAD_DESIGNER_SUCCESS: {
            const designer = action.payload;
            const entities = designer.reduce(
                (entities: { [id: number]: any }, designer) => {
                    return {
                        ...entities,
                        [designer.id]: designer
                    };
                },
                {
                    ...state.entities
                }
            );
            return {
                ...state,
                loading: false,
                loaded: true,
                entities
            };
        }
        case fromDesigner.LOAD_DESIGNER_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }

    return state;
}

export const getDesignerEntities = (state: DesignerState) => state.entities;
export const getDesignerLoading = (state: DesignerState) => state.loading;
export const getDesignerLoaded = (state: DesignerState) => state.loaded;
