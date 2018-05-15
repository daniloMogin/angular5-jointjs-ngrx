//#region Import
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {
    TreeModule,
    TreeModel,
    TREE_ACTIONS,
    KEYS,
    IActionMapping,
    ITreeOptions,
    TreeComponent
} from 'angular-tree-component';
import {
    FormControl,
    FormGroup,
    FormBuilder,
    FormArray,
    Validators,
    FormGroupDirective,
    NgForm
} from '@angular/forms';
import { MatSelect, ErrorStateMatcher } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { map, startWith, catchError } from 'rxjs/operators';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { take } from 'rxjs/operators/take';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { of } from 'rxjs/observable/of';

import * as _ from 'lodash';

import * as jsonM from './../../../assets/JSON/allJSONstrings';
//#endregion

interface WorkflowType {
    value: string;
    viewValue: string;
}
const createMechRegex: RegExp = /^[OnDemand Automatic]/;

// TODO 2 inicijalizovati promenljive na init
@Component({
    selector: 'viewer-settings',
    templateUrl: './viewer-settings.component.html',
    styleUrls: ['./viewer-settings.component.scss']
})
export class ViewerSettingsComponent implements OnInit {
    apiRootExe: string = '/api/1.0/executionset/';

    nodes: any = [];

    @ViewChild(TreeComponent) private tree: TreeComponent;

    myControl: FormControl = new FormControl();
    filteredOptions: Observable<string[]>;
    selectedValue;

    private workflowType = ['DemoPlayer'];
    private creationMech = ['OnDemand', 'Automatic'];

    viewerSettingsForm: FormGroup;
    private wft: string;

    viewerWorkflowTypeForm: FormGroup;

    paramsArr;

    constructor(private fb: FormBuilder, private http: HttpClient) {
        this.createForm();
    }

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(val => this.filter(val))
        );
    }

    createForm() {
        this.viewerSettingsForm = this.fb.group({
            name: ['', Validators.required],
            minNumRunn: [null, [Validators.min(1)]],
            maxNumRunn: [null, [Validators.min(1)]],
            ttl: [null, [Validators.min(1)]],
            creationMech: [
                this.creationMech,
                [Validators.required, Validators.pattern(createMechRegex)]
            ]
        });
    }

    createFormWorkFlow() {
        this.viewerWorkflowTypeForm = this.fb.group({
            params: this.fb.array([])
        });
    }

    createItem(): FormGroup {
        return this.fb.group({
            argument: '',
            modifier: '',
            name: ''
        });
    }

    filter(val: string): string[] {
        return this.workflowType.filter(option =>
            option.toLowerCase().includes(val.toLowerCase())
        );
    }

    onSelectionChanged(event) {
        this.createFormWorkFlow();

        console.log(`this.viewerWorkflowTypeForm`);
        console.log(this.viewerWorkflowTypeForm);

        const getWorkflowFromDataBase: any[] = [];
        getWorkflowFromDataBase.push(jsonM.jsonString11); // PROMENI OVO NA PRAVE PODATKE

        let temp;
        const temp1: any = [];
        const temp2: any = [];

        for (const i of getWorkflowFromDataBase) {
            if (event.option.value === i.Name) {
                temp = getArgument(i.States);
            }
        }
        for (const i of temp) {
            if (i.Arguments.Parameter !== '') {
                temp1.push({
                    Name: i.Name,
                    Arguments: i.Arguments
                });
            }
        }
        this.paramsArr = temp1;
        // console.log(`this.paramsArr`);
        // console.log(this.paramsArr);
        for (const i of temp1) {
            (<FormArray>this.viewerWorkflowTypeForm.get('params')).push(
                this.createItem()
            );
        }
    }

    addToExeSet() {
        // TODO ako nije validna forma disable dugme
        const actorsOperationsArr: IActor[] = getArgument(
            jsonM.jsonString11.States
        ); // PROMENI OVO NA PRAVE PODATKE

        console.log(`actorsOperationsArr`);
        console.log(actorsOperationsArr);
        console.log(`this.viewerWorkflowTypeForm`);
        console.log(this.viewerWorkflowTypeForm);

        const sendToServer: IExecutionSet = {
            Name: this.viewerSettingsForm.value.name,
            WorkflowType: this.myControl.value,
            Arguments: [
                {
                    Parameter: '',
                    Argument: '',
                    Modifier: []
                }
            ],
            CreationRule: {
                MinNrOfInstances: this.viewerSettingsForm.value.minNumRunn,
                MaxNrOfInstances: this.viewerSettingsForm.value.maxNumRunn,
                CreationMechanism: this.viewerSettingsForm.value.creationMech,
                TimeToLive: this.viewerSettingsForm.value.ttl
            }
        };
        console.log(`sendToServer`);
        console.log(sendToServer);

        const basicStatus: string = this.viewerSettingsForm.status;
        const wftParamsStatus: string = this.viewerWorkflowTypeForm.status;
        console.log(`basicStatus -> ${basicStatus}`);
        console.log(`wftParamsStatus -> ${wftParamsStatus}`);

        if (basicStatus === 'VALID' && wftParamsStatus === 'VALID') {
            const temp: any = [];
            const temp1: any = [];
            for (const i of this.viewerWorkflowTypeForm.value.params) {
                temp.push({
                    argument: i.argument
                });
                temp1.push({
                    modifier: i.modifier
                });
            }
            const node = {
                id: this.nodes.length,
                name: this.viewerSettingsForm.value.name,
                children: [
                    {
                        id: Math.random(),
                        name: `Workflow type: ${this.myControl.value}`
                    },
                    {
                        id: Math.random(),
                        name: `Min runners: ${
                            this.viewerSettingsForm.value.minNumRunn
                        }`
                    },
                    {
                        id: Math.random(),
                        name: `Maxrunners: ${
                            this.viewerSettingsForm.value.maxNumRunn
                        }`
                    },
                    {
                        id: Math.random(),
                        name: `Time to live: ${
                            this.viewerSettingsForm.value.ttl
                        }`
                    },
                    {
                        id: Math.random(),
                        name: `Creation mechanism: ${
                            this.viewerSettingsForm.value.creationMech
                        }`
                    },
                    {
                        id: Math.random(),
                        name: `Parameter: ${temp}`
                    },
                    {
                        id: Math.random(),
                        name: `Modifier: ${temp1}`
                    }
                ]
            };
            this.nodes.push(node);
            this.tree.treeModel.update();
            // const httpOptions = {
            //     headers: new HttpHeaders({
            //         'X-Correlation-ID': '0a9b5008-388c-4b06-982f-1954dfb718fc',
            //         'Content-Type': 'application/json',
            //         responseType: 'text'
            //     })
            // };
            // return this.http
            //     .post(this.apiRootExe, sendToServer, httpOptions)
            //     .pipe(
            //         map(data => {
            //             console.log(`data`);
            //             console.log(data);

            //             this.nodes.push(node);
            //             this.tree.treeModel.update();
            //         }),
            //         catchError(error => of(console.log(error)))
            //     )
            //     .subscribe(
            //         res => console.log(res),
            //         error => console.log(error)
            //     );
        }
    }

    private onTreeLoad(event) {
        event.treeModel.expandAll();
    }
}

const getWorkflow = () => {
    console.log(`getWorkflow`);
    const request = new XMLHttpRequest();
    request.open('GET', '/assets/JSON/getWorkflowAlter.json', false);
    request.send(null);
    const my_JSON_object = JSON.parse(request.responseText);

    return my_JSON_object;

    // const httpOptions = {
    //     headers: new HttpHeaders({
    //         'X-Correlation-ID': '0a9b5008-388c-4b06-982f-1954dfb718fc',
    //         'Content-Type': 'application/json',
    //         responseType: 'text'
    //     })
    // };
    // return this.http
    //     .get(this.apiRootActor, httpOptions)
    //     .pipe(
    //         map(data => {
    //             console.log(`data`);
    //             console.log(data);
    //         }),
    //         catchError(error => of(console.log(error)))
    //     )
    //     .subscribe(res => console.log(res), error => console.log(error));
};

const getTransitionsFromState = (input: IStateModel[]): ITransition[] => {
    // console.log(`getTransitionsFromState`);
    const result: any[] = [];
    for (const i of input) {
        result.push(i.Transitions);
    }
    return result;
};

const getOperationsFromTransition = (input: ITransition[]): IOperation[] => {
    // console.log(`getOperationsFromTransition`);
    const result: any = [];
    for (const i of _.flattenDeep(input)) {
        if (i.Operations.length > 0) {
            for (const j of i.Operations) {
                result.push(j);
            }
        }
    }
    return result;
};

const createActorsFromOperation = (input: IOperation[]): IActor[] => {
    // console.log(`createActorsFromOperation`);
    const result: IActor[] = [];
    let actorOperation: IActor;
    for (const i of input) {
        const argumentsTemp: IArguments = i.Arguments.pop();
        if (!_.isNil(argumentsTemp)) {
            actorOperation = {
                Name: i.Name,
                Arguments: argumentsTemp
            };
        } else {
            actorOperation = {
                Name: i.Name,
                Arguments: {
                    Parameter: '',
                    Argument: '',
                    Modifier: []
                }
            };
        }
        result.push(actorOperation);
    }
    return result;
};

interface IExecutionSet {
    Name: string;
    WorkflowType: string;
    Arguments: IArguments[];
    CreationRule: {
        MinNrOfInstances: number;
        MaxNrOfInstances: number;
        CreationMechanism: string;
        TimeToLive: number;
    };
}

interface IActor {
    Name: string;
    Arguments: {
        Argument: string;
        Modifier: string[];
        Parameter: string;
    };
}

interface ITransition {
    Name: string;
    NextStateOnSuccess: string;
    NextStateOnFailure: string;
    Condition: string;
    Trigger: {
        Message: string;
        Timeout: number;
    };
    Operations: [
        {
            Name: string;
            Arguments: [
                {
                    Parameter: string;
                    Argument: string;
                    Modifier: string[];
                }
            ];
        }
    ];
    TransitionScenario: string;
}

interface IOperation {
    Name: string;
    Arguments: [
        {
            Parameter: string;
            Argument: string;
            Modifier: string[];
        }
    ];
}

interface IArguments {
    Parameter: string;
    Argument: string;
    Modifier: string[];
}

interface IStateModel {
    Name: string;
    Transitions: [
        {
            Name: string;
            NextStateOnSuccess: string;
            NextStateOnFailure: string;
            Condition: string;
            Trigger: {
                Message: string;
                Timeout: number;
            };
            Operations: [
                {
                    Name: string;
                    Arguments: [
                        {
                            Parameter: string;
                            Srgument: string;
                            Modifier: string[];
                        }
                    ];
                }
            ];
            TransitionScenario: string;
        }
    ];
}

const getArgument = (input: IStateModel[]): IActor[] => {
    // console.log(`getArgument`);
    const transitions: ITransition[] = getTransitionsFromState(input);
    const operations: IOperation[] = getOperationsFromTransition(transitions);
    const actorOperation: IActor[] = createActorsFromOperation(operations);

    return actorOperation;
};
