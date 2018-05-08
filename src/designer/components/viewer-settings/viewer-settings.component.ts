import {
    Component,
    OnInit,
    Input,
    ViewChild,
    AfterViewInit
} from '@angular/core';
import {
    TreeModule,
    TreeModel,
    TREE_ACTIONS,
    KEYS,
    IActionMapping,
    ITreeOptions
} from 'angular-tree-component';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { take } from 'rxjs/operators/take';
import { takeUntil } from 'rxjs/operators/takeUntil';

interface WorkflowType {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'viewer-settings',
    templateUrl: './viewer-settings.component.html',
    styleUrls: ['./viewer-settings.component.scss']
})
export class ViewerSettingsComponent implements OnInit, AfterViewInit {
    title = 'Geutebrueck Rappid';
    name: string = '';
    test; // name of the diagram prompt
    nodes: any = [
        {
            id: 1,
            name: 'Execution configuration',
            children: [
                { id: 11, name: 'child' },
                { id: 2, name: 'child1' },
                { id: 3, name: 'child2' },
                { id: 4, name: 'child3' },
                { id: 5, name: 'child4' },
                { id: 6, name: 'child5' },
                { id: 7, name: 'child6' },
                { id: 8, name: 'child7' },
                { id: 9, name: 'child8' },
                { id: 10, name: 'child9' }
            ]
        }
    ];

    @Input() workFlowName: string = '';
    @Input() workFlowType: string = '';
    @Input() maxNumberOfRunners: number = 0;
    @Input() minNumberOfRunners: number = 0;
    @Input() timeToLeave: number = 0;
    @Input() creationMechanism: string = '';

    /** control for the selected bank */
    public workflowCtrl: FormControl = new FormControl();

    /** control for the MatSelect filter keyword */
    public workflowFilterCtrl: FormControl = new FormControl();

    private workflowType: WorkflowType[] = [
        { value: 'WF-0', viewValue: 'WF1' },
        { value: 'WF-1', viewValue: 'WF2' },
        { value: 'WF-2', viewValue: 'WF3' },
        { value: 'WF-3', viewValue: 'TEST' }
    ];
    /** list of workflows filtered by search keyword */
    public filteredWorkflow: ReplaySubject<WorkflowType[]> = new ReplaySubject<
        WorkflowType[]
    >(1);
    @ViewChild('singleSelect') singleSelect: MatSelect;

    /** Subject that emits when the component has been destroyed. */
    private _onDestroy = new Subject<void>();

    ngOnInit() {
        this.workflowCtrl.setValue(this.getWorkflow());

        this.filteredWorkflow.next(this.getWorkflow());

        // listen for search field value changes
        this.workflowFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterWorkflows();
            });

        console.log(this.getWorkflow());
    }

    ngAfterViewInit() {}

    private onTreeLoad(event) {
        event.treeModel.expandAll();
    }

    private filterWorkflows() {
        console.log(`filterWorkflows`);

        if (!this.workflowType) {
            return;
        }
        // get the search keyword
        let search = this.workflowFilterCtrl.value;
        if (!search) {
            this.filteredWorkflow.next(this.workflowType.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filteredWorkflow.next(
            this.workflowType.filter(
                workflowType =>
                    workflowType.value.toLowerCase().indexOf(search) > -1
            )
        );
    }

    getWorkflow = () => {
        // console.log(`getWorkflow`);
        const request = new XMLHttpRequest();
        request.open('GET', '/assets/JSON/getWorkflowAlter.json', false);
        request.send(null);
        const my_JSON_object = JSON.parse(request.responseText);

        return my_JSON_object;
    }
}
