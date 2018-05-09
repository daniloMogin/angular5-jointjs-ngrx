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

    // initialName: string = '';

    graph: joint.dia.Graph;
    commandManager: joint.dia.CommandManager;
    paper: joint.dia.Paper;
    snaplines: joint.ui.Snaplines;
    paperScroller: joint.ui.PaperScroller;
    stencil: joint.ui.Stencil;
    keyboard: joint.ui.Keyboard;
    clipboard: joint.ui.Clipboard;
    selection: joint.ui.Selection;
    toolbar: joint.ui.Toolbar;
    navigator: joint.ui.Navigator;

    ngOnInit() {
        console.log(`OnInit designer paper`);

        this.initialName = 'Designer paper init je prosao';

        // this.name = prompt('Unesi naziv diagrama');
        this.initializePaper();
        this.initializeStencil();
        this.initializeSelection();
        this.initializeHaloAndInspector();
        this.initializeNavigator();
        this.initializeToolbar();
        this.initializeKeyboardShortcuts();
        this.initializeTooltips();
    }

    // Create a graph, paper and wrap the paper in a PaperScroller.
    initializePaper() {
        // console.log(`initializePaper`);
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

    // Create and populate stencil.
    initializeStencil() {
        // console.log(`initializeStencil`);
        const stencil = (this.stencil = new joint.ui.Stencil({
            paper: this.paperScroller,
            snaplines: this.snaplines,
            scaleClones: true,
            width: 240,
            groups: config.stencil.groups,
            dropAnimation: true,
            groupsToggleButtons: true,
            search: {
                '*': ['type', 'attrs/text/text', 'attrs/.label/text'],
                'org.Member': ['attrs/.rank/text', 'attrs/.name/text']
            },
            // Use default Grid Layout
            layout: true,
            // Remove tooltip definition from clone
            dragStartClone: (cell: joint.dia.Cell) =>
                cell.clone().removeAttr('./data-tooltip')
        }));

        $('.stencil-container').append(stencil.el);
        stencil.render().load(config.stencil.shapes);
    }

    // Create keyboard schortcuts
    initializeKeyboardShortcuts() {
        // console.log(`initializeKeyboardShortcuts`);
        this.keyboard = new joint.ui.Keyboard();
        this.keyboard.on({
            'ctrl+c': () => {
                // Copy all selected elements and their associated links.
                this.clipboard.copyElements(
                    this.selection.collection,
                    this.graph
                );
            },

            'ctrl+v': () => {
                const pastedCells = this.clipboard.pasteCells(this.graph, {
                    translate: { dx: 20, dy: 20 },
                    useLocalStorage: true
                });

                const elements = _.filter(pastedCells, cell =>
                    cell.isElement()
                );

                // Make sure pasted elements get selected immediately. This makes the UX better as
                // the user can immediately manipulate the pasted elements.
                this.selection.collection.reset(elements);
            },

            'ctrl+x shift+delete': () => {
                this.clipboard.cutElements(
                    this.selection.collection,
                    this.graph
                );
            },

            'delete backspace': (evt: JQuery.Event) => {
                evt.preventDefault();
                this.graph.removeCells(this.selection.collection.toArray());
            },

            'ctrl+z': () => {
                this.commandManager.undo();
                this.selection.cancelSelection();
            },

            'ctrl+y': () => {
                this.commandManager.redo();
                this.selection.cancelSelection();
            },

            'ctrl+a': () => {
                this.selection.collection.reset(this.graph.getElements());
            },

            'ctrl+plus': (evt: JQuery.Event) => {
                evt.preventDefault();
                this.paperScroller.zoom(0.2, { max: 5, grid: 0.2 });
            },

            'ctrl+minus': (evt: JQuery.Event) => {
                evt.preventDefault();
                this.paperScroller.zoom(-0.2, { min: 0.2, grid: 0.2 });
            },

            'keydown:shift': (evt: JQuery.Event) => {
                this.paperScroller.setCursor('crosshair');
            },

            'keyup:shift': () => {
                this.paperScroller.setCursor('grab');
            }
        });
    }

    // Selection single element and selecting multi elements with holding shift
    initializeSelection() {
        // console.log(`initializeSelection`);
        this.clipboard = new joint.ui.Clipboard();
        this.selection = new joint.ui.Selection({
            paper: this.paper,
            handles: config.selection.handles
        });

        // Initiate selecting when the user grabs the blank area of the paper while the Shift key is pressed.
        // Otherwise, initiate paper pan.
        this.paper.on(
            'blank:pointerdown',
            (evt: JQuery.Event, x: number, y: number) => {
                if (this.keyboard.isActive('shift', evt)) {
                    this.selection.startSelecting(evt);
                } else {
                    this.selection.cancelSelection();
                    this.paperScroller.startPanning(evt);
                }
            }
        );

        this.paper.on(
            'element:pointerdown',
            (elementView: joint.dia.ElementView, evt: JQuery.Event) => {
                // Select an element if CTRL/Meta key is pressed while the element is clicked.
                if (this.keyboard.isActive('ctrl meta', evt)) {
                    this.selection.collection.add(elementView.model);
                }
            }
        );

        this.selection.on(
            'selection-box:pointerdown',
            (elementView: joint.dia.ElementView, evt: JQuery.Event) => {
                // Unselect an element if the CTRL/Meta key is pressed while a selected element is clicked.
                if (this.keyboard.isActive('ctrl meta', evt)) {
                    this.selection.collection.remove(elementView.model);
                }
            }
        );
    }

    createInspector(cell: joint.dia.Cell) {
        console.log(`createInspector`);
        cell.on('change:attrs', input => {
            const actions = getActions();
            const test = [];
            const selectedOperationId: string = _.find(
                input.attributes.attrs,
                'text'
            ).text;
            console.log(`==============================`);
            console.log(config.inspector[cell.get('type')]);
            console.log(config.inspector[cell.get('type')].inputs.params.item);
            config.inspector[
                cell.get('type')
            ].inputs.params.item.flatAttributes =
                'AAAAAAAAAA';
            console.log(
                config.inspector[cell.get('type')].inputs.params.item
                    .flatAttributes
            );
            console.log(`==============================`);
            for (const i of actions.Operations) {
                // TODO NAPRAVITI DA SE LABELE PARAMETARA DOBIJAJU, A NE DA BUDU DEFAULT
                if (i.OperationId === selectedOperationId) {
                    console.log(`i`);
                    console.log(i);
                    console.log(`selectedOperationId`);
                    console.log(selectedOperationId);
                    for (const j of i.Arguments) {
                        // console.log(j.Parameter);
                        test.push(j.Parameter);
                    }
                    // console.log(`test`);
                    // console.log(test);
                    // console.log(`input`);
                    // console.log(input);

                    // input.set('params/item/properties/attrs/text/text/label', test);
                    input.set('params', test);
                }
            }
            console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
            console.log(_.extend({ cell }, config.inspector[cell.get('type')]));
            console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
            config.inspector[
                cell.get('type')
            ].inputs.params.item.flatAttributes =
                'AAAAAAAAAA';
            console.log(
                config.inspector[cell.get('type')].inputs.params.item
                    .flatAttributes
            );
        });

        return joint.ui.Inspector.create(
            '.inspector-container',
            _.extend({ cell }, config.inspector[cell.get('type')])
        );
    }

    // Click on element create frame with functions for manipulating size, link...
    initializeHaloAndInspector() {
        // console.log(`initializeHaloAndInspector`);
        this.paper.on(
            'element:pointerup link:options',
            (cellView: joint.dia.CellView) => {
                const cell = cellView.model;
                if (!this.selection.collection.contains(cell)) {
                    if (cell.isElement()) {
                        new joint.ui.FreeTransform({
                            cellView,
                            allowRotation: false,
                            preserveAspectRatio: !!cell.get(
                                'preserveAspectRatio'
                            ),
                            allowOrthogonalResize:
                                cell.get('allowOrthogonalResize') !== false
                        }).render();

                        new joint.ui.Halo({
                            cellView,
                            handles: config.halo.handles
                        }).render();

                        this.selection.collection.reset([]);
                        this.selection.collection.add(cell, { silent: true });
                    }

                    this.createInspector(cell);
                }
            }
        );
    }

    // Minimap for designer
    initializeNavigator() {
        // console.log(`initializeNavigator`);
        const navigator = (this.navigator = new joint.ui.Navigator({
            width: 240,
            height: 115,
            paperScroller: this.paperScroller,
            zoom: false
        }));

        $('.navigator-container').append(navigator.el);
        navigator.render();
    }

    // Create toolbar with all desired options
    initializeToolbar() {
        // console.log(`initializeToolbar`);
        const toolbar = (this.toolbar = new joint.ui.Toolbar({
            groups: config.toolbar.groups,
            tools: config.toolbar.tools,
            references: {
                paperScroller: this.paperScroller,
                commandManager: this.commandManager
            }
        }));

        toolbar.on({
            'svg:pointerclick': () => this.openAsSVG(),
            'png:pointerclick': () => this.openAsPNG(),
            'to-front:pointerclick': () =>
                this.selection.collection.invoke('toFront'),
            'to-back:pointerclick': () =>
                this.selection.collection.invoke('toBack'),
            'layout:pointerclick': () => this.layoutDirectedGraph(),
            'snapline:change': (checked: boolean) =>
                this.changeSnapLines(checked),
            'clear:pointerclick': () => this.graph.clear(),
            'print:pointerclick': () => this.paper.print(),
            'grid-size:change': (size: number) => this.paper.setGridSize(size)
        });

        $('.toolbar-container').append(toolbar.el);
        toolbar.render();
    }

    // Turn on/off snaping to other elements on drag
    changeSnapLines(checked: boolean) {
        // console.log(`changeSnapLines`);
        if (checked) {
            this.snaplines.startListening();
            this.stencil.options.snaplines = this.snaplines;
        } else {
            this.snaplines.stopListening();
            this.stencil.options.snaplines = null;
        }
    }

    // Adding tooltips on all designer UI
    initializeTooltips() {
        // console.log(`initializeTooltips`);
        new joint.ui.Tooltip({
            rootTarget: document.body,
            target: '[data-tooltip]',
            direction: joint.ui.Tooltip.TooltipArrowPosition.Auto,
            padding: 10
        });
    }

    openAsSVG() {
        // console.log(`openAsSVG`);
        this.paper.toSVG(
            (svg: string) => {
                new joint.ui.Lightbox({
                    title:
                        '(Right-click, and use "Save As" to save the diagram in SVG format)',
                    image: 'data:image/svg+xml,' + encodeURIComponent(svg)
                }).open();
            },
            { preserveDimensions: true, convertImagesToDataUris: true }
        );
    }

    openAsPNG() {
        // console.log(`openAsPNG`);
        this.paper.toPNG(
            (dataURL: string) => {
                new joint.ui.Lightbox({
                    title:
                        '(Right-click, and use "Save As" to save the diagram in PNG format)',
                    image: dataURL
                }).open();
            },
            { padding: 10 }
        );
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

    // Creating auto layout
    layoutDirectedGraph() {
        // console.log(`layoutDirectedGraph`);
        joint.layout.DirectedGraph.layout(this.graph, {
            setVertices: true,
            rankDir: 'LR',
            marginX: 100,
            marginY: 100
        });
        this.paperScroller.centerContent();
    }
}

/** TREBA SKLONITI KADA SE NAPRAVE SERVISI */

const getActions = () => {
    // console.log(`getActions`);
    const request = new XMLHttpRequest();
    request.open('GET', '/assets/JSON/getAction.json', false);
    request.send(null);
    const my_JSON_object = JSON.parse(request.responseText);

    return my_JSON_object;
};

const getWorkflow = () => {
    // console.log(`getWorkflow`);
    const request = new XMLHttpRequest();
    request.open('GET', '/assets/JSON/getWorkflowAlter.json', false);
    request.send(null);
    const my_JSON_object = JSON.parse(request.responseText);

    return my_JSON_object;
};

const getUsedOperations = (jsonObj, actions) => {
    // console.log(`getUsedOperations`);
    const result = [];
    const actions_len: number = actions.Operations.length;
    const jsonObj_length: number = jsonObj.attributes.cells.models.length;

    for (let i: number = 0; i < jsonObj_length; i++) {
        for (let j: number = 0; j < actions_len; j++) {
            if (
                jsonObj.attributes.cells.models[i].attributes.type ===
                'erd.Entity'
            ) {
                if (
                    jsonObj.attributes.cells.models[i].attributes.attrs.text
                        .text === actions.Operations[j].OperationId
                ) {
                    result.push(actions.Operations[j]);
                }
            } else if (
                jsonObj.attributes.cells.models[i].attributes.type ===
                'erd.WeakEntity'
            ) {
                if (
                    jsonObj.attributes.cells.models[i].attributes.attrs.text
                        .text === actions.Operations[j].OperationId
                ) {
                    result.push(actions.Operations[j]);
                }
            }
        }
    }
    return _.uniq(result);
};

const getUsedWorkflow = (jsonObj, workflow) => {
    // console.log(`getUsedWorkflow`);
    const result = [];
    const workflow_len: number = workflow.length;
    const jsonObj_length: number = jsonObj.attributes.cells.models.length;

    for (let i: number = 0; i < jsonObj_length; i++) {
        for (let j: number = 0; j < workflow_len; j++) {
            if (
                jsonObj.attributes.cells.models[i].attributes.type ===
                'erd.WeakEntity'
            ) {
                if (
                    jsonObj.attributes.cells.models[i].attributes.attrs.text
                        .text === workflow[j].uuid
                ) {
                    result.push(workflow[j]);
                }
            }
        }
    }
    return _.uniq(result);
};
