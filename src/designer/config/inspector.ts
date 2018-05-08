/*! Rappid v2.2.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2015 client IO

 2018-03-05


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/

interface IAction {
    value: string;
    content: string;
}
interface ICondition {
    value: string;
    content: string;
}
interface IWorkflow {
    value: string;
    content: string;
}

const $secondary = '#ffd600';
const $s_light = '#ffff52';

function getActions() {
    const request = new XMLHttpRequest();
    request.open('GET', '/assets/JSON/getAction.json', false);
    request.send(null);
    const my_JSON_object = JSON.parse(request.responseText);

    return my_JSON_object;
}

function getConditions() {
    const request = new XMLHttpRequest();
    request.open('GET', '/assets/JSON/getConditions.json', false);
    request.send(null);
    const my_JSON_object = JSON.parse(request.responseText);

    return my_JSON_object;
}

function getWorkflow() {
    const request = new XMLHttpRequest();
    request.open('GET', '/assets/JSON/getWorkflowAlter.json', false);
    request.send(null);
    const my_JSON_object = JSON.parse(request.responseText);

    return my_JSON_object;
}

const action_JSON = getActions();
const actions_len: number = action_JSON.Operations.length;
const action_obj: IAction[] = [
    {
        value: '',
        content: ''
    }
];

const conditions_JSON = getConditions();
const condition_len: number = conditions_JSON.Conditions.length;
const condition_obj: ICondition[] = [
    {
        value: '',
        content: ''
    }
];

const workflow_JSON = getWorkflow();
const workflow_len: number = workflow_JSON.length;
const workflow_obj: IWorkflow[] = [
    {
        value: '',
        content: ''
    }
];

for (let i: number = 0; i < actions_len; i++) {
    action_obj.push({
        value: action_JSON.Operations[i].OperationId,
        content: action_JSON.Operations[i].OperationName
    });
}
for (let i: number = 0; i < condition_len; i++) {
    condition_obj.push({
        value: conditions_JSON.Conditions[i].ConditionId,
        content: conditions_JSON.Conditions[i].ConditionName
    });
}
for (let i: number = 0; i < workflow_len; i++) {
    workflow_obj.push({
        value: workflow_JSON[i].uuid,
        content: workflow_JSON[i].Name
    });
}

const options = {
    colorPalette: [
        { content: 'transparent', icon: './assets/transparent-icon.png' },
        { content: '#f6f6f6' },
        { content: '#dcd7d7' },
        { content: '#8f8f8f' },
        { content: '#c6c7e2' },
        { content: $s_light }, // nova boja
        { content: $secondary }, //
        { content: '#b75d32' },
        { content: '#31d0c6' },
        { content: '#7c68fc' },
        { content: '#61549C' },
        { content: '#6a6c8a' },
        { content: '#4b4a67' },
        { content: '#3c4260' },
        { content: '#33334e' },
        { content: '#222138' }
    ],

    fontWeight: [
        {
            value: '300',
            content: '<span style="font-weight: 300">Light</span>'
        },
        {
            value: 'Normal',
            content: '<span style="font-weight: Normal">Normal</span>'
        },
        {
            value: 'Bold',
            content: '<span style="font-weight: Bolder">Bold</span>'
        }
    ],

    fontFamily: [
        {
            value: 'Alegreya Sans',
            content:
                '<span style="font-family: Alegreya Sans">Alegreya Sans</span>'
        },
        {
            value: 'Averia Libre',
            content:
                '<span style="font-family: Averia Libre">Averia Libre</span>'
        },
        {
            value: 'Roboto Condensed',
            content:
                '<span style="font-family: Roboto Condensed">Roboto Condensed</span>'
        }
    ],

    strokeStyle: [
        { value: '0', content: 'Solid' },
        { value: '2,5', content: 'Dotted' },
        { value: '10,5', content: 'Dashed' }
    ],

    select: action_obj,

    select1: condition_obj,

    selectW: workflow_obj,

    side: [
        { value: 'top', content: 'Top Side' },
        { value: 'right', content: 'Right Side' },
        { value: 'bottom', content: 'Bottom Side' },
        { value: 'left', content: 'Left Side' }
    ],

    portLabelPositionRectangle: [
        { value: { name: 'top', args: { y: -12 } }, content: 'Above' },
        { value: { name: 'right', args: { y: 0 } }, content: 'On Right' },
        { value: { name: 'bottom', args: { y: 12 } }, content: 'Below' },
        { value: { name: 'left', args: { y: 0 } }, content: 'On Left' }
    ],

    portLabelPositionEllipse: [
        { value: 'radial', content: 'Horizontal' },
        { value: 'radialOriented', content: 'Angled' }
    ],

    imageIcons: [
        {
            value: './assets/image-icon1.svg',
            content: '<img height="42px" src="./assets/image-icon1.svg"/>'
        },
        {
            value: './assets/image-icon2.svg',
            content: '<img height="80px" src="./assets/image-icon2.svg"/>'
        },
        {
            value: './assets/image-icon3.svg',
            content: '<img height="80px" src="./assets/image-icon3.svg"/>'
        },
        {
            value: './assets/image-icon4.svg',
            content: '<img height="80px" src="./assets/image-icon4.svg"/>'
        }
    ],

    imageGender: [
        {
            value: './assets/member-male.png',
            content:
                '<img height="50px" src="./assets/member-male.png" style="margin: 5px 0 0 2px;"/>'
        },
        {
            value: './assets/member-female.png',
            content:
                '<img height="50px" src="./assets/member-female.png" style="margin: 5px 0 0 2px;"/>'
        }
    ],

    arrowheadSize: [
        { value: 'scale(0.001)', content: 'None' },
        { value: 'scale(1)', content: 'Small' },
        { value: 'scale(2)', content: 'Medium' },
        { value: 'scale(4)', content: 'Large' }
    ],

    strokeWidth: [
        {
            value: 1,
            content:
                '<div style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>'
        },
        {
            value: 2,
            content:
                '<div style="background:#fff;width:4px;height:30px;margin:0 13px;border-radius: 2px;"/>'
        },
        {
            value: 4,
            content:
                '<div style="background:#fff;width:8px;height:30px;margin:0 11px;border-radius: 2px;"/>'
        },
        {
            value: 8,
            content:
                '<div style="background:#fff;width:16px;height:30px;margin:0 8px;border-radius: 2px;"/>'
        }
    ],

    router: [
        {
            value: 'normal',
            content:
                '<p style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>'
        },
        {
            value: 'orthogonal',
            content:
                '<p style="width:20px;height:30px;margin:0 5px;border-bottom: 2px solid #fff;border-left: 2px solid #fff;"/>'
        },
        {
            value: 'oneSide',
            content:
                '<p style="width:20px;height:30px;margin:0 5px;border: 2px solid #fff;border-top: none;"/>'
        }
    ],

    connector: [
        {
            value: 'normal',
            content:
                '<p style="width:20px;height:20px;margin:5px;border-top:2px solid #fff;border-left:2px solid #fff;"/>'
        },
        {
            value: 'rounded',
            content:
                // tslint:disable-next-line:max-line-length
                '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:30%;border-top:2px solid #fff;border-left:2px solid #fff;"/>'
        },
        {
            value: 'smooth',
            content:
                // tslint:disable-next-line:max-line-length
                '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:100%;border-top:2px solid #fff;border-left:2px solid #fff;"/>'
        }
    ],

    labelPosition: [
        { value: 30, content: 'Close to source' },
        { value: 0.5, content: 'In the middle' },
        { value: -30, content: 'Close to target' }
    ],

    portMarkup: [
        {
            value:
                '<rect class="port-body" width="20" height="20" x="-10" y="-10"/>',
            content: 'Rectangle'
        },
        { value: '<circle class="port-body" r="10"/>', content: 'Circle' },
        {
            value: '<path class="port-body" d="M -10 -10 10 -10 0 10 z"/>',
            content: 'Triangle'
        }
    ]
};

export const inspector = <{ [index: string]: any }>{
    'app.Link': {
        inputs: {
            attrs: {
                '.connection': {
                    strokeWidth: {
                        type: 'select-button-group',
                        options: options.strokeWidth,
                        group: 'connection',
                        label: 'Link thickness',
                        when: {
                            ne: { 'attrs/.connection/stroke': 'transparent' }
                        },
                        index: 4
                    },
                    strokeDasharray: {
                        type: 'select-box',
                        options: options.strokeStyle,
                        group: 'connection',
                        label: 'Link style',
                        when: {
                            ne: { 'attrs/.connection/stroke': 'transparent' }
                        },
                        index: 5
                    },
                    stroke: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        group: 'connection',
                        label: 'Color',
                        index: 6
                    }
                },
                '.marker-source': {
                    transform: {
                        type: 'select-box',
                        options: options.arrowheadSize,
                        group: 'marker-source',
                        label: 'Source arrowhead',
                        index: 1
                    },
                    fill: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        group: 'marker-source',
                        label: 'Color',
                        when: {
                            ne: {
                                'attrs/.marker-source/transform': 'scale(0.001)'
                            }
                        },
                        index: 2
                    }
                },
                '.marker-target': {
                    transform: {
                        type: 'select-box',
                        options: options.arrowheadSize,
                        group: 'marker-target',
                        label: 'Target arrowhead',
                        index: 1
                    },
                    fill: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        group: 'marker-target',
                        label: 'Color',
                        when: {
                            ne: {
                                'attrs/.marker-target/transform': 'scale(0.001)'
                            }
                        },
                        index: 2
                    }
                }
            },
            router: {
                name: {
                    type: 'select-button-group',
                    options: options.router,
                    group: 'connection',
                    label: 'Connection type',
                    index: 1
                },
                args: {
                    side: {
                        type: 'select-box',
                        options: options.side,
                        placeholder: 'Pick a side',
                        group: 'connection',
                        label: 'Anchors side',
                        when: {
                            eq: { 'router/name': 'oneSide' },
                            otherwise: { unset: true }
                        },
                        index: 2
                    }
                }
            },
            connector: {
                name: {
                    type: 'select-button-group',
                    options: options.connector,
                    group: 'connection',
                    label: 'Connection style',
                    index: 3
                }
            },
            labels: {
                type: 'list',
                group: 'labels',
                label: 'Labels',
                attrs: {
                    label: {
                        'data-tooltip':
                            'Set (possibly multiple) labels for the link',
                        'data-tooltip-position': 'right',
                        'data-tooltip-position-selector': '.joint-inspector'
                    }
                },
                item: {
                    type: 'object',
                    properties: {
                        attrs: {
                            text: {
                                text: {
                                    type: 'text',
                                    label: 'text',
                                    defaultValue: 'label',
                                    index: 1,
                                    attrs: {
                                        label: {
                                            'data-tooltip':
                                                'Set text of the label',
                                            'data-tooltip-position': 'right',
                                            'data-tooltip-position-selector':
                                                '.joint-inspector'
                                        }
                                    }
                                }
                            }
                        },
                        position: {
                            type: 'select-box',
                            options: options.labelPosition || [],
                            defaultValue: 0.5,
                            label: 'Position',
                            index: 2,
                            attrs: {
                                label: {
                                    'data-tooltip':
                                        'Position the label relative to the source of the link',
                                    'data-tooltip-position': 'right',
                                    'data-tooltip-position-selector':
                                        '.joint-inspector'
                                }
                            }
                        }
                    }
                }
            }
        },
        groups: {
            connection: {
                label: 'Connection',
                index: 1
            },
            'marker-source': {
                label: 'Source marker',
                index: 2
            },
            'marker-target': {
                label: 'Target marker',
                index: 3
            },
            labels: {
                label: 'Labels',
                index: 4
            }
        }
    },
    'basic.Rect': {
        inputs: {
            attrs: {
                text: {
                    text: {
                        type: 'content-editable',
                        label: 'Text',
                        group: 'text',
                        index: 1
                    },
                    'font-size': {
                        type: 'range',
                        min: 5,
                        max: 80,
                        unit: 'px',
                        label: 'Font size',
                        group: 'text',
                        when: { ne: { 'attrs/text/text': '' } },
                        index: 2
                    },
                    'font-family': {
                        type: 'select-box',
                        options: options.fontFamily,
                        label: 'Font family',
                        group: 'text',
                        when: { ne: { 'attrs/text/text': '' } },
                        index: 3
                    },
                    'font-weight': {
                        type: 'select-box',
                        options: options.fontWeight,
                        label: 'Font thickness',
                        group: 'text',
                        when: { ne: { 'attrs/text/text': '' } },
                        index: 4
                    },
                    fill: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Fill',
                        group: 'text',
                        when: { ne: { 'attrs/text/text': '' } },
                        index: 5
                    }
                },
                rect: {
                    fill: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Fill',
                        group: 'presentation',
                        index: 1
                    },
                    stroke: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Outline',
                        group: 'presentation',
                        index: 2
                    },
                    'stroke-width': {
                        type: 'range',
                        min: 0,
                        max: 30,
                        step: 1,
                        defaultValue: 1,
                        unit: 'px',
                        label: 'Outline thickness',
                        group: 'presentation',
                        when: { ne: { 'attrs/rect/stroke': 'transparent' } },
                        index: 3
                    },
                    'stroke-dasharray': {
                        type: 'select-box',
                        options: options.strokeStyle,
                        label: 'Outline style',
                        group: 'presentation',
                        when: {
                            and: [
                                { ne: { 'attrs/rect/stroke': 'transparent' } },
                                { ne: { 'attrs/rect/stroke-width': 0 } }
                            ]
                        },
                        index: 4
                    }
                }
            }
        },
        groups: {
            presentation: {
                label: 'Presentation',
                index: 1
            },
            text: {
                label: 'Text',
                index: 2
            }
        }
    },
    'app.RectangularModel': {
        inputs: {
            attrs: {
                '.label': {
                    text: {
                        type: 'select-box',
                        label: 'Text',
                        options: options.select,
                        group: 'text',
                        index: 1
                    },
                    'font-size': {
                        type: 'range',
                        min: 5,
                        max: 80,
                        unit: 'px',
                        label: 'Font size',
                        group: 'text',
                        when: { ne: { 'attrs/.label/text': '' } },
                        index: 2
                    },
                    'font-family': {
                        type: 'select-box',
                        options: options.fontFamily,
                        label: 'Font family',
                        group: 'text',
                        when: { ne: { 'attrs/.label/text': '' } },
                        index: 3
                    },
                    'font-weight': {
                        type: 'select-box',
                        options: options.fontWeight,
                        label: 'Font thickness',
                        group: 'text',
                        when: { ne: { 'attrs/.label/text': '' } },
                        index: 4
                    },
                    fill: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Fill',
                        group: 'text',
                        when: { ne: { 'attrs/.label/text': '' } },
                        index: 5
                    }
                },
                '.body': {
                    fill: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Fill',
                        group: 'presentation',
                        index: 1
                    },
                    stroke: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Outline',
                        group: 'presentation',
                        index: 2
                    },
                    'stroke-width': {
                        type: 'range',
                        min: 0,
                        max: 30,
                        step: 1,
                        defaultValue: 1,
                        unit: 'px',
                        label: 'Outline thickness',
                        group: 'presentation',
                        when: { ne: { 'attrs/.body/stroke': 'transparent' } },
                        index: 3
                    },
                    'stroke-dasharray': {
                        type: 'select-box',
                        options: options.strokeStyle,
                        label: 'Outline style',
                        group: 'presentation',
                        when: {
                            and: [
                                { ne: { 'attrs/.body/stroke': 'transparent' } },
                                { ne: { 'attrs/.body/stroke-width': 0 } }
                            ]
                        },
                        index: 4
                    }
                }
            }
            // ports: {
            //     groups: {
            //         'in': {
            //             attrs: {
            //                 '.port-body': {
            //                     fill: {
            //                         type: 'color-palette',
            //                         options: options.colorPalette,
            //                         label: 'Fill',
            //                         when: { not: { equal: { inPorts: [] } } },
            //                         group: 'inPorts',
            //                         index: 1
            //                     }
            //                 }
            //             },
            //             position: {
            //                 name: {
            //                     type: 'select-box',
            //                     options: options.side,
            //                     label: 'Position',
            //                     when: { not: { equal: { inPorts: [] } } },
            //                     group: 'inPorts',
            //                     index: 3
            //                 }
            //             },
            //             label: {
            //                 position: {
            //                     type: 'select-box',
            //                     options: options.portLabelPositionRectangle,
            //                     label: 'Text Position',
            //                     when: { not: { equal: { inPorts: [] } } },
            //                     group: 'inPorts',
            //                     index: 4
            //                 }
            //             },
            //             markup: {
            //                 type: 'select-box',
            //                 options: options.portMarkup,
            //                 label: 'Port Shape',
            //                 group: 'inPorts',
            //                 index: 5
            //             }
            //         },
            //         'out': {
            //             attrs: {
            //                 '.port-body': {
            //                     fill: {
            //                         type: 'color-palette',
            //                         options: options.colorPalette,
            //                         label: 'Fill',
            //                         when: { not: { equal: { outPorts: [] } } },
            //                         group: 'outPorts',
            //                         index: 2
            //                     }
            //                 }
            //             },
            //             position: {
            //                 name: {
            //                     type: 'select-box',
            //                     options: options.side,
            //                     label: 'Position',
            //                     when: { not: { equal: { outPorts: [] } } },
            //                     group: 'outPorts',
            //                     index: 4
            //                 }
            //             },
            //             label: {
            //                 position: {
            //                     type: 'select-box',
            //                     options: options.portLabelPositionRectangle,
            //                     label: 'Text Position',
            //                     when: { not: { equal: { outPorts: [] } } },
            //                     group: 'outPorts',
            //                     index: 5
            //                 }
            //             },
            //             markup: {
            //                 type: 'select-box',
            //                 options: options.portMarkup,
            //                 label: 'Port Shape',
            //                 group: 'outPorts',
            //                 index: 6
            //             }
            //         }
            //     }
            // },
            // inPorts: {
            //     type: 'list',
            //     label: 'Ports',
            //     item: {
            //         type: 'text'
            //     },
            //     group: 'inPorts',
            //     index: 0
            // },
            // outPorts: {
            //     type: 'list',
            //     label: 'Ports',
            //     item: {
            //         type: 'text'
            //     },
            //     group: 'outPorts',
            //     index: 0
            // }
        },
        groups: {
            // inPorts: {
            //     label: 'Input Ports',
            //     index: 1
            // },
            // outPorts: {
            //     label: 'Output Ports',
            //     index: 2
            // },
            presentation: {
                label: 'Presentation',
                index: 3
            },
            text: {
                label: 'Text',
                index: 4
            }
        }
    },
    'fsa.StartState': {
        inputs: {
            attrs: {
                circle: {
                    fill: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Fill',
                        group: 'presentation',
                        index: 1
                    }
                }
            }
        },
        groups: {
            presentation: {
                label: 'Presentation',
                index: 1
            }
        }
    },
    'fsa.EndState': {
        inputs: {
            attrs: {
                '.outer': {
                    fill: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Fill',
                        group: 'presentation',
                        index: 1
                    },
                    stroke: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Outline',
                        group: 'presentation',
                        index: 3
                    },
                    'stroke-dasharray': {
                        type: 'select-box',
                        options: options.strokeStyle,
                        label: 'Outline style',
                        group: 'presentation',
                        when: {
                            and: [
                                {
                                    ne: { 'attrs/.outer/stroke': 'transparent' }
                                },
                                { ne: { 'attrs/.outer/stroke-width': 0 } }
                            ]
                        },
                        index: 4
                    }
                },
                '.inner': {
                    fill: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Inner fill',
                        group: 'presentation',
                        index: 2
                    }
                }
            }
        },
        groups: {
            presentation: {
                label: 'Presentation',
                index: 1
            },
            text: {
                label: 'Text',
                index: 2
            }
        }
    },
    'erd.Entity': {
        inputs: {
            attrs: {
                text: {
                    text: {
                        type: 'select-box',
                        label: 'Text',
                        options: options.select,
                        group: 'text',
                        index: 1
                    },
                    'font-size': {
                        type: 'range',
                        min: 5,
                        max: 80,
                        unit: 'px',
                        label: 'Font size',
                        group: 'text',
                        when: { ne: { 'attrs/text/text': '' } },
                        index: 2
                    },
                    'font-family': {
                        type: 'select-box',
                        options: options.fontFamily,
                        label: 'Font family',
                        group: 'text',
                        when: { ne: { 'attrs/text/text': '' } },
                        index: 3
                    },
                    'font-weight': {
                        type: 'select-box',
                        options: options.fontWeight,
                        label: 'Font thickness',
                        group: 'text',
                        when: { ne: { 'attrs/text/text': '' } },
                        index: 4
                    },
                    fill: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Fill',
                        group: 'text',
                        when: { ne: { 'attrs/text/text': '' } },
                        index: 5
                    }
                },
                '.outer': {
                    fill: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Fill',
                        group: 'presentation',
                        index: 1
                    },
                    stroke: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Outline',
                        group: 'presentation',
                        index: 2
                    },
                    'stroke-width': {
                        type: 'range',
                        min: 0,
                        max: 30,
                        step: 1,
                        defaultValue: 1,
                        unit: 'px',
                        label: 'Outline thickness',
                        group: 'presentation',
                        when: { ne: { 'attrs/.outer/stroke': 'transparent' } },
                        index: 3
                    },
                    'stroke-dasharray': {
                        type: 'select-box',
                        options: options.strokeStyle,
                        label: 'Outline style',
                        group: 'presentation',
                        when: {
                            and: [
                                {
                                    ne: { 'attrs/.outer/stroke': 'transparent' }
                                },
                                { ne: { 'attrs/.outer/stroke-width': 0 } }
                            ]
                        },
                        index: 4
                    }
                }
            },
            params: {
                type: 'list',
                label: 'Parameters',
                group: 'parameters',
                attrs: {
                    label: {
                        'data-tooltip':
                            'Set (possibly multiple) labels for the link',
                        'data-tooltip-position': 'right',
                        'data-tooltip-position-selector': '.joint-inspector'
                    }
                },
                item: {
                    type: 'object',
                    properties: {
                        attrs: {
                            text: {
                                text: {
                                    type: 'text',
                                    label: 'Param',
                                    defaultValue: '',
                                    index: 1,
                                    attrs: {
                                        label: {
                                            'data-tooltip':
                                                'Set text of the label',
                                            'data-tooltip-position': 'right',
                                            'data-tooltip-position-selector':
                                                '.joint-inspector'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        groups: {
            presentation: {
                label: 'Presentation',
                index: 1
            },
            text: {
                label: 'Text',
                index: 2
            },
            params: {
                label: 'Parameters',
                index: 3
            }
        }
    },
    'erd.IdentifyingRelationship': {
        inputs: {
            attrs: {
                text: {
                    text: {
                        type: 'select',
                        label: 'Text',
                        options: options.select1,
                        group: 'text',
                        index: 1
                    },
                    nextStateFail: {
                        type: 'content-editable',
                        label: 'Next state on fail',
                        group: 'text',
                        index: 1
                    },
                    condition: {
                        type: 'content-editable',
                        label: 'Condition',
                        group: 'text',
                        index: 1
                    },
                    'font-size': {
                        type: 'range',
                        min: 5,
                        max: 80,
                        unit: 'px',
                        label: 'Font size',
                        group: 'text',
                        when: { ne: { 'attrs/text/text': '' } },
                        index: 2
                    },
                    'font-family': {
                        type: 'select-box',
                        options: options.fontFamily,
                        label: 'Font family',
                        group: 'text',
                        when: { ne: { 'attrs/text/text': '' } },
                        index: 3
                    },
                    'font-weight': {
                        type: 'select-box',
                        options: options.fontWeight,
                        label: 'Font thickness',
                        group: 'text',
                        when: { ne: { 'attrs/text/text': '' } },
                        index: 4
                    },
                    fill: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Fill',
                        group: 'text',
                        when: { ne: { 'attrs/text/text': '' } },
                        index: 5
                    }
                },
                '.outer': {
                    fill: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Fill',
                        group: 'outer',
                        index: 1
                    },
                    stroke: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Outline',
                        group: 'outer',
                        index: 2
                    },
                    'stroke-width': {
                        type: 'range',
                        min: 0,
                        max: 30,
                        step: 1,
                        defaultValue: 1,
                        unit: 'px',
                        label: 'Outline thickness',
                        group: 'outer',
                        when: { ne: { 'attrs/.outer/stroke': 'transparent' } },
                        index: 3
                    },
                    'stroke-dasharray': {
                        type: 'select-box',
                        options: options.strokeStyle,
                        label: 'Outline style',
                        group: 'outer',
                        when: {
                            and: [
                                {
                                    ne: { 'attrs/.outer/stroke': 'transparent' }
                                },
                                { ne: { 'attrs/.outer/stroke-width': 0 } }
                            ]
                        },
                        index: 4
                    }
                },
                '.inner': {
                    fill: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Fill',
                        group: 'inner',
                        index: 1
                    },
                    stroke: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Outline',
                        group: 'inner',
                        index: 2
                    },
                    'stroke-width': {
                        type: 'range',
                        min: 0,
                        max: 30,
                        step: 1,
                        defaultValue: 1,
                        unit: 'px',
                        label: 'Outline thickness',
                        group: 'inner',
                        when: { ne: { 'attrs/.inner/stroke': 'transparent' } },
                        index: 3
                    },
                    'stroke-dasharray': {
                        type: 'select-box',
                        options: options.strokeStyle,
                        label: 'Outline style',
                        group: 'inner',
                        when: {
                            and: [
                                {
                                    ne: { 'attrs/.inner/stroke': 'transparent' }
                                },
                                { ne: { 'attrs/.inner/stroke-width': 0 } }
                            ]
                        },
                        index: 4
                    }
                }
            }
        },
        groups: {
            text: {
                label: 'Text',
                index: 1
            },
            outer: {
                label: 'Outer polygon',
                index: 2
            },
            inner: {
                label: 'Inner polygon',
                index: 3
            }
        }
    },
    'erd.ISA': {
        inputs: {
            attrs: {
                text: {
                    text: {
                        type: 'content-editable',
                        label: 'Text',
                        group: 'text',
                        index: 1
                    },
                    nextStateFail: {
                        type: 'content-editable',
                        label: 'Next state on fail',
                        group: 'text',
                        index: 1
                    },
                    condition: {
                        type: 'content-editable',
                        label: 'Condition',
                        group: 'text',
                        index: 1
                    },
                    timeout: {
                        type: 'number',
                        label: 'Timeout',
                        group: 'text',
                        index: 1
                    },
                    'font-size': {
                        type: 'range',
                        min: 5,
                        max: 80,
                        unit: 'px',
                        label: 'Font size',
                        group: 'text',
                        when: { ne: { 'attrs/text/text': '' } },
                        index: 2
                    },
                    'font-family': {
                        type: 'select-box',
                        options: options.fontFamily,
                        label: 'Font family',
                        group: 'text',
                        when: { ne: { 'attrs/text/text': '' } },
                        index: 3
                    },
                    'font-weight': {
                        type: 'select-box',
                        options: options.fontWeight,
                        label: 'Font thickness',
                        group: 'text',
                        when: { ne: { 'attrs/text/text': '' } },
                        index: 4
                    },
                    fill: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Fill',
                        group: 'text',
                        when: { ne: { 'attrs/text/text': '' } },
                        index: 5
                    }
                },
                polygon: {
                    fill: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Fill',
                        group: 'presentation',
                        index: 1
                    },
                    stroke: {
                        type: 'color-palette',
                        options: options.colorPalette,
                        label: 'Outline',
                        group: 'presentation',
                        index: 2
                    },
                    'stroke-width': {
                        type: 'range',
                        min: 0,
                        max: 30,
                        step: 1,
                        defaultValue: 1,
                        unit: 'px',
                        label: 'Outline thickness',
                        group: 'presentation',
                        when: { ne: { 'attrs/polygon/stroke': 'transparent' } },
                        index: 3
                    },
                    'stroke-dasharray': {
                        type: 'select-box',
                        options: options.strokeStyle,
                        label: 'Outline style',
                        group: 'presentation',
                        when: {
                            and: [
                                {
                                    ne: {
                                        'attrs/polygon/stroke': 'transparent'
                                    }
                                },
                                { ne: { 'attrs/polygon/stroke-width': 0 } }
                            ]
                        },
                        index: 4
                    }
                }
            }
        },
        groups: {
            presentation: {
                label: 'Presentation',
                index: 1
            },
            text: {
                label: 'Text',
                index: 2
            }
        }
    }
};
