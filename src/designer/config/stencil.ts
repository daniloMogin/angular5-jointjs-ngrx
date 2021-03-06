/*! Rappid v2.2.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2015 client IO

 2018-03-05


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/

import { ui } from '../../assets/build/rappid.min';

const $font_color: string = '#222138';
const $font_size: number = 17;
const $font_family_p: string = 'Roboto Condensed';
const $font_family_s: string = 'Averia Libre';
const $font_family_o: string = 'Alegreya Sans';
const $font_weight: string = 'Normal';
const $stroke_color: string = '#ffd600';
const $stroke_color1: string = '#FF0000';
const $stroke_width_body: number = 2;
const $stroke_width_label: number = 1;

export const stencil = {
    groups: <{ [key: string]: ui.Stencil.Group }>{
        basic: { index: 1, label: 'Shapes' },
        comp: { index: 2, label: 'Comlpex' }
    },
    shapes: {
        basic: [
            {
                type: 'fsa.StartState',
                preserveAspectRatio: true,
                attrs: {
                    '.': {
                        'data-tooltip': 'Start State',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    circle: {
                        width: 50,
                        height: 30,
                        fill: '#ffd600',
                        'stroke-width': 0
                    },
                    text: {
                        text: 'Init',
                        fill: $font_color,
                        'font-family': $font_family_p,
                        'font-weight': $font_weight,
                        'font-size': $font_size,
                        'stroke-width': 0
                    }
                }
            },
            {
                type: 'fsa.EndState',
                preserveAspectRatio: true,
                attrs: {
                    '.': {
                        'data-tooltip': 'End State',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.inner': {
                        fill: '#ffff52',
                        stroke: 'transparent'
                    },
                    '.outer': {
                        fill: 'transparent',
                        stroke: $stroke_color,
                        'stroke-width': $stroke_width_body,
                        'stroke-dasharray': '0'
                    },
                    text: {
                        text: 'End',
                        fill: $font_color,
                        'font-family': $font_family_p,
                        'font-weight': $font_weight,
                        'font-size': $font_size,
                        'stroke-width': 0
                    }
                }
            },

            {
                type: 'erd.Entity',
                size: { width: 30, height: 20 },
                attrs: {
                    '.': {
                        'data-tooltip': 'Actor: Operation',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.outer': {
                        rx: 3,
                        ry: 3,
                        fill: 'transparent',
                        'stroke-width': $stroke_width_body,
                        stroke: $stroke_color,
                        'stroke-dasharray': '0'
                    },
                    text: {
                        text: '',
                        fill: $font_color,
                        'font-family': $font_family_p,
                        'font-weight': $font_weight,
                        'font-size': $font_size,
                        'stroke-width': $stroke_width_label,
                        'ref-y': 0.5,
                        'y-alignment': 'middle'
                    }
                }
            },
            // {
            //     type: 'app.RectangularModel',
            //     size: { width: 30, height: 20 },
            //     allowOrthogonalResize: false,
            //     attrs: {
            //         '.': {
            //             'data-tooltip': 'Actor: Operation',
            //             'data-tooltip-position': 'left',
            //             'data-tooltip-position-selector': '.joint-stencil'
            //         },
            //         '.body': {
            //             fill: 'transparent',
            //             stroke: $stroke_color,
            //             'stroke-width': $stroke_width_body,
            //             'stroke-dasharray': '0'
            //         },
            //         '.label': {
            //             text: '',
            //             fill: $font_color,
            //             'font-family': $font_family_p,
            //             'font-weight': $font_weight,
            //             'font-size': $font_size,
            //             'stroke-width': $stroke_width_label,
            //             'ref-y': 0.5,
            //             'y-alignment': 'middle'
            //         }
            //     }
            // },
            {
                type: 'basic.Rect',
                size: { width: 30, height: 20 },
                allowOrthogonalResize: false,
                attrs: {
                    '.': {
                        'data-tooltip': 'State',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    rect: {
                        rx: 15,
                        ry: 15,
                        fill: 'transparent',
                        stroke: $stroke_color,
                        'stroke-width': $stroke_width_body,
                        'stroke-dasharray': '0'
                    },
                    text: {
                        text: '',
                        fill: $font_color,
                        'font-family': $font_family_p,
                        'font-weight': $font_weight,
                        'font-size': $font_size,
                        'stroke-width': $stroke_width_label
                    }
                }
            },
            {
                type: 'erd.IdentifyingRelationship',
                attrs: {
                    '.': {
                        'data-tooltip': 'Condition',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    '.outer': {
                        fill: 'transparent',
                        stroke: $stroke_color,
                        'stroke-dasharray': '0'
                    },
                    '.inner': {
                        fill: 'transparent',
                        stroke: 'transparent',
                        'stroke-dasharray': '0'
                    },
                    text: {
                        text: '',
                        'font-size': $font_size,
                        'font-family': $font_family_p,
                        'font-weight': $font_weight,
                        fill: $font_color,
                        'stroke-width': 0
                    }
                }
            },
            {
                type: 'basic.Rect',
                size: { width: 2, height: 8 },
                attrs: {
                    '.': {
                        'data-tooltip': 'Parallel transition',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    rect: {
                        rx: 2,
                        ry: 2,
                        width: 50,
                        height: 30,
                        fill: 'transparent',
                        stroke: $stroke_color,
                        'stroke-width': $stroke_width_body,
                        'stroke-dasharray': '0'
                    },
                    text: {
                        // text: 'rect',
                        fill: $font_color,
                        'font-family': $font_family_p,
                        'font-weight': $font_weight,
                        'font-size': $font_size,
                        'stroke-width': 0
                    }
                }
            },
            {
                type: 'erd.ISA',
                size: { width: 30, height: 20 },
                allowOrthogonalResize: false,
                attrs: {
                    '.': {
                        'data-tooltip': 'Message',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    text: {
                        text: '',
                        fill: $font_color,
                        'letter-spacing': 0,
                        'font-family': $font_family_p,
                        'font-weight': $font_weight,
                        'font-size': $font_size,
                        'ref-y': 28,
                        'y-alignment': 'middle'
                    },
                    polygon: {
                        fill: 'transparent',
                        // rx: 15,
                        // ry: 15,
                        stroke: $stroke_color,
                        'stroke-dasharray': '0',
                        points: '0 0, 100 0, 100 100, 0 100, 13 50'
                    }
                }
            }
        ],
        comp: [
            {
                type: 'erd.WeakEntity',
                size: { width: 30, height: 20 },
                ports: {
                    groups: {
                        in: { position: { name: 'left' } },
                        out: { position: { name: 'bottom' } }
                    },
                    items: []
                },
                allowOrthogonalResize: false,
                attrs: {
                    '.': {
                        'data-tooltip': 'Workflow',
                        'data-tooltip-position': 'left',
                        'data-tooltip-position-selector': '.joint-stencil'
                    },
                    text: {
                        text: '',
                        fill: $font_color,
                        'font-family': $font_family_p,
                        'font-weight': $font_weight,
                        'font-size': $font_size,
                        'stroke-width': $stroke_width_label,
                        'ref-y': 0.5,
                        'y-alignment': 'middle'
                    },
                    '.inner': {
                        fill: 'transparent',
                        stroke: $stroke_color,
                        points: '140,0 140,60 20,60 20,0'
                    },
                    '.outer': {
                        fill: 'transparent',
                        stroke: $stroke_color,
                        points: '160,0 160,60 0,60 0,0'
                    }
                }
            }
        ]
    }
};
