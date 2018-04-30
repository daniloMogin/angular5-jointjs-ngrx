import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as config from './../../config';
import * as _ from 'lodash';
// import * as __ from 'lodash-uuid';
import * as Backbone from 'backbone';

import * as jsonM from './../../../assets/JSON/allJSONstrings';

import '../../models/joint.shapes.app';
import * as joint from '../../../assets/build/rappid.min';


@Component({
    selector: 'designer-paper',
    templateUrl: './designer-paper.component.html',
    styleUrls: ['./designer-paper.component.scss']
})
export class DesignerPaperComponent implements OnInit {
    title = 'Geutebrueck Rappid';
    name: string = '';
    test; // name of the diagram prompt

    graph: joint.dia.Graph;
    commandManager: joint.dia.CommandManager;
    paper: joint.dia.Paper;
    snaplines: joint.ui.Snaplines;
    paperScroller: joint.ui.PaperScroller;
    keyboard: joint.ui.Keyboard;

    ngOnInit() {
        console.log(`AAAAAAAAAAAAAAAAAAAAAAA`);
        // this.name = prompt('Unesi naziv diagrama');
        this.initializePaper();
    }

    // Create a graph, paper and wrap the paper in a PaperScroller.
    initializePaper() {
        console.log(`initializePaper`);
        joint.setTheme('modern');
        const graph = (this.graph = new joint.dia.Graph());

        this.commandManager = new joint.dia.CommandManager({ graph: graph });

        const paper = (this.paper = new joint.dia.Paper({
            width: 1000,
            height: 1000,
            gridSize: 10,
            drawGrid: true,
            model: graph,
            defaultLink: new joint.shapes.app.Link()
        }));

        paper.on('blank:mousewheel', _.partial(this.onMousewheel, null), this);
        paper.on('cell:mousewheel', this.onMousewheel.bind(this));

        this.snaplines = new joint.ui.Snaplines({ paper: paper });

        const paperScroller = (this.paperScroller = new joint.ui.PaperScroller({
            paper,
            autoResizePaper: true,
            cursor: 'grab'
        }));

        $('.paper-container').append(paperScroller.el);

        paperScroller.render().center();
    }

    onMousewheel(
        cellView: joint.dia.CellView,
        evt: JQuery.Event,
        ox: number,
        oy: number,
        delta: number
    ) {
        if (this.keyboard.isActive('alt', evt)) {
            evt.preventDefault();
            this.paperScroller.zoom(delta * 0.2, {
                min: 0.2,
                max: 5,
                grid: 0.2,
                ox,
                oy
            });
        }
    }
}
