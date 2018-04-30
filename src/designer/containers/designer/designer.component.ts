import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import * as fromStore from './../../store';

@Component({
    selector: 'designer',
    styleUrls: ['designer.component.scss'],
    template: `
    <div
      class="designer">
      <designer-commands>
      </designer-commands>
    </div>
  `
})
export class DesignerComponent implements OnInit {

    ngOnInit() {
        console.log(`Designer Component`);
    }
}
