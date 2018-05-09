import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
    selector: 'designer-settings',
    templateUrl: './designer-settings.component.html',
    styleUrls: ['./designer-settings.component.scss']
})
export class DesignerSettingsComponent implements OnInit {
    title = 'Geutebrueck Rappid';

    name: string = '';
    fail: string = '';
    test: any = {};

    constructor(public dialog: MatDialog) {
        this.openDialog();
    }

    ngOnInit() {
        console.log('Designer settings OnInit');
    }
    openDialog() {
        const dialogRef = this.dialog.open(DialogContent, {
            height: '400px',
            data: {
                name: this.name,
                fail: this.fail,
                test: this.test
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: `, result);
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
    variables = [];
    parameters = [];

    constructor(
        public dialogRef: MatDialogRef<DialogContent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.failScenarion = [
            { value: 'source', viewValue: 'Source' },
            { value: 'target', viewValue: 'Target' },
            { value: 'init', viewValue: 'Init' },
            { value: 'custom', viewValue: 'Custom' }
        ];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    addVar() {
        console.log(`addVar!!!`);
        this.variables.push('');
    }

    addParam() {
        console.log(`addParam!!!`);
        this.parameters.push('');
    }

    designerSettings(name, fail, test) {
        const res = {
            name,
            fail,
            test
        };
        return res;
    }
}
