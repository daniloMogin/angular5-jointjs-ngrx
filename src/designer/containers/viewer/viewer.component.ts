import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import * as fromStore from './../../store';

@Component({
    selector: 'viewer',
    styleUrls: ['viewer.component.scss'],
    template: `
        <div class="viewer">
            <viewer-settings></viewer-settings>
        </div>
    `
})
export class ViewerComponent implements OnInit {
    selectedValue: string;

    ngOnInit() {
        console.log(`Viewer Component`);
    }
}
