import { Component, OnInit, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'designer-settings',
    templateUrl: './designer-settings.component.html',
    styleUrls: ['./designer-settings.component.scss']
})
export class DesignerSettingsComponent implements OnInit {
    title = 'Geutebrueck Rappid';
    name: string = '';
    test; // name of the diagram prompt

    constructor(public dialog: MatDialog) {
        this.openDialog();
    }

    ngOnInit() {
        console.log('Designer settings OnInit');
    }
    openDialog() {
        const dialogRef = this.dialog.open(DialogContent, {
            height: '350px',
            data: {
                animal: 'panda'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
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
    constructor(
        public dialogRef: MatDialogRef<DialogContent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.failScenarion = [
            { value: 'last', viewValue: 'Source' },
            { value: 'next', viewValue: 'Target' },
            { value: 'init', viewValue: 'Init' },
            { value: 'init', viewValue: 'Custom' }
        ];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    addParam() {
        console.log(`addParam!!!`);
    }
}
