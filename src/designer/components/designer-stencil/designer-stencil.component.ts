import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as $ from 'jquery';
import * as config from './../../config/index';
import * as _ from 'lodash';
import * as __ from 'lodash-uuid';
import * as Backbone from 'backbone';

import * as jsonM from '../../../assets/JSON/allJSONstrings';

import '../models/joint.shapes.app';
import * as joint from '../../../assets/build/rappid.min';
@Component({
    selector: 'designer-display',
    templateUrl: 'designer-display.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignerDisplayComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
 