import {
    Component,
    OnInit,
    Inject,
    Input,
    OnChanges,
    Output,
    EventEmitter
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormBuilder,
    FormArray,
    Validators
} from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
    selector: 'designer-settings',
    templateUrl: './designer-settings.component.html',
    styleUrls: ['./designer-settings.component.scss']
})
export class DesignerSettingsComponent implements OnInit {
    title = 'Geutebrueck Rappid';
    name: string = '';
    fail: any = '';
    varArr: any = [];
    parArr: any = [];

    @Output() change = new EventEmitter();

    constructor(public dialog: MatDialog) {
        this.openDialog();
    }

    ngOnInit() {
        console.log('Designer settings OnInit');
    }
    openDialog() {
        const dialogRef = this.dialog.open(DialogContent, {
            height: '600px',
            width: '700px',
            data: {
                name: this.name,
                fail: this.fail,
                var: this.varArr,
                par: this.parArr
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: `, result);
            this.name = result.name;
            this.fail = result.fail;
            this.varArr = result.variablesArr;
            this.parArr = result.parametersArr;

            this.change.emit(result);
        });
    }
}

@Component({
    selector: 'dialog-content',
    templateUrl: 'dialog-content.component.html',
    styleUrls: ['./designer-settings.component.scss']
})
export class DialogContent {
    failScenarion;
    name: string = '';
    fail: any = '';
    variables: any = [];
    parameters: any = [];
    designerSettingsForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<DialogContent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder
    ) {
        this.failScenarion = [
            { value: 'Source', viewValue: 'Source' },
            { value: 'Target', viewValue: 'Target' },
            { value: 'Init', viewValue: 'Init' },
            { value: 'Custom', viewValue: 'Custom' }
        ];

        this.createForm();
        this.initVariables(data.var);
        this.initParameters(data.par);
    }

    createForm() {
        this.designerSettingsForm = this.fb.group({
            name: [this.data.name, Validators.required], // <--- the FormControl called "name"
            variablesArr: this.fb.array([]),
            parametersArr: this.fb.array([]),
            fail: [this.data.fail, Validators.required]
        });
    }

    initVariables(input: any[]) {
        for (const i of input) {
            this.variables.push('');
        }
        const addressFGs = input.map(vari => this.fb.group(vari));
        const addressFormArray = this.fb.array(addressFGs);
        this.designerSettingsForm.setControl('variablesArr', addressFormArray);
    }

    initParameters(input: any[]) {
        for (const i of input) {
            this.parameters.push('');
        }
        const addressFGs = input.map(vari => this.fb.group(vari));
        const addressFormArray = this.fb.array(addressFGs);
        this.designerSettingsForm.setControl('parametersArr', addressFormArray);
    }

    createItem(): FormGroup {
        return this.fb.group({
            item: ''
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    addVar() {
        this.variables.push(
            (<FormArray>this.designerSettingsForm.get('variablesArr')).push(
                this.createItem()
            )
        );
    }

    removeVar() {
        const control = <FormArray>this.designerSettingsForm.controls[
            'variablesArr'
        ];
        control.controls.pop();
        this.variables.pop();
    }

    addParam() {
        this.parameters.push(
            (<FormArray>this.designerSettingsForm.get('parametersArr')).push(
                this.createItem()
            )
        );
    }

    removeParam() {
        const control = <FormArray>this.designerSettingsForm.controls[
            'parametersArr'
        ];
        control.controls.pop();
        this.parameters.pop();
    }
}
