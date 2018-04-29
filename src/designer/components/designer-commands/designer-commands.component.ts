import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as config from './../../config';
import * as _ from 'lodash';
import * as __ from 'lodash-uuid';
import * as Backbone from 'backbone';

import * as jsonM from '../../../assets/JSON/allJSONstrings';

import '../../models/joint.shapes.app';
import * as joint from '../../../assets/build/rappid.min';

@Component({
    selector: 'designer-commands',
    templateUrl: './designer-commands.component.html',
    styleUrls: ['./designer-commands.component.scss']
})
export class DesignerCommands implements OnInit {
    title = 'Geutebrueck Rappid';
    name: string = '';
    test; // name of the diagram prompt
    navigator: joint.ui.Navigator;
    paperScroller: joint.ui.PaperScroller;

    ngOnInit() {
        console.log(`ngOnInit`);
        this.name = prompt('Unesi naziv diagrama');
        this.initializeNavigator();
    }

    // Minimap for designer
    initializeNavigator() {
        console.log(`initializeNavigator`);
        const navigator = (this.navigator = new joint.ui.Navigator({
            width: 240,
            height: 115,
            paperScroller: this.paperScroller,
            zoom: false
        }));

        $('.navigator-container').append(navigator.el);
        navigator.render();
    }
}
