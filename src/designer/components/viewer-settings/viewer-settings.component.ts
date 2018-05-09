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

import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';

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
    myControl: FormControl = new FormControl();
    filteredOptions: Observable<string[]>;
    selectedValue;

    @Input() workFlowName: string = '';
    @Input() workFlowType: string = '';
    @Input() maxNumberOfRunners: number = 0;
    @Input() minNumberOfRunners: number = 0;
    @Input() timeToLeave: number = 0;
    @Input() creationMechanism: string = '';

    private workflowType = ['WF1', 'WF2', 'WF3', 'TEST'];

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(val => this.filter(val))
        );
    }

    filter(val: string): string[] {
        return this.workflowType.filter(option =>
            option.toLowerCase().includes(val.toLowerCase())
        );
    }

    onSelectionChanged(event) {
        console.log(`event`);
        console.log(event);
        console.log(event.option.value);
    }

    ngAfterViewInit() {}

    private onTreeLoad(event) {
        event.treeModel.expandAll();
    }

    getWorkflow = () => {
        // console.log(`getWorkflow`);
        const request = new XMLHttpRequest();
        request.open('GET', '/assets/JSON/getWorkflowAlter.json', false);
        request.send(null);
        const my_JSON_object = JSON.parse(request.responseText);

        return my_JSON_object;
    };
}
