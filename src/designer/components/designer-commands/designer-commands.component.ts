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
export class DesignerCommandsComponent implements OnInit {
    title = 'Geutebrueck Rappid';
    name: string = '';
    test; // name of the diagram prompt
    graph: joint.dia.Graph;
    navigator: joint.ui.Navigator;
    paperScroller: joint.ui.PaperScroller;

    ngOnInit() {
        console.log(`ngOnInit`);
        this.name = prompt('Unesi naziv diagrama');
    }

    saveToJSON() {
        console.log(`saveToJSON`);
        // const actions = getActions();
        // const workflow = getWorkflow();
        // const graphJson = this.graph;
        // const usedOperationsInWorkflow: any = getUsedOperations(
        //     graphJson,
        //     actions
        // );
        // const usedWorkflowInWorkflow: any = getUsedWorkflow(
        //     graphJson,
        //     workflow
        // );
        // const name: string = this.name;
        // const graphJson_str: any = JSON.stringify(graphJson);
        // const graphJson_obj: any = JSON.parse(graphJson_str);

        // graphJson_obj['Name'] = name;
        // graphJson_obj['Operations'] = usedOperationsInWorkflow;
        // graphJson_obj['Workflow'] = usedWorkflowInWorkflow;
        // graphJson_obj['States'] = [];
        // console.log(`graphJson_obj`);
        // console.log(graphJson_obj);
        // // console.log(JSON.stringify(graphJson_obj));

        // const result: any = [];

        // _.each(graphJson.getElements(), (element: joint.dia.Element): void => {
        //     const opt = {
        //         outbound: true
        //     };
        //     const currentElementTextPart = _.find(
        //         element.attributes.attrs,
        //         'text'
        //     ).text;

        //     if (
        //         element.attributes.type === 'fsa.StartState' ||
        //         element.attributes.type === 'erd.IdentifyingRelationship' ||
        //         element.attributes.type === 'basic.Rect'
        //     ) {
        //         // if (
        //         //     // currentElementTextPart === 'Init'
        //         //     currentElementTextPart === '1'
        //         //     // currentElementTextPart === 'WaitOnAlarm'
        //         //     // currentElementTextPart === '3'
        //         // ) {
        //         const allStates = [];
        //         const finalState = [];
        //         const connectedElements_temp = getNeighborsRec(
        //             graphJson,
        //             element,
        //             opt,
        //             allStates,
        //             finalState
        //         );
        //         const states = findAllStates(
        //             graphJson,
        //             element,
        //             connectedElements_temp.finalState
        //         );

        //         let createdState: any;
        //         const state: any[] = [];
        //         for (const i of states) {
        //             createdState = createStateFunc(
        //                 currentElementTextPart,
        //                 i,
        //                 'StepByStep',
        //                 null
        //             );
        //             state.push(createdState);
        //         }
        //         result.push({
        //             Name: currentElementTextPart,
        //             Transitions: [...state]
        //         });
        //         // }
        //     }
        // });
        // if (result.length > 0) {
        //     console.log(`result`);
        //     console.log(result);
        // }
    }

    loadFromJSON() {
        console.log(`loadFromJSON`);
        // TODO - logic for getting diagram from database
        // this.graph.fromJSON(jsonM.jsonString9);
    }

    validateDiagram() {
        console.log(`validateDiagram`);
        // TODO - logic for validating diagram
    }

    startDiagram() {
        console.log(`startDiagram`);
    }

    pauseDiagram() {
        console.log(`pauseDiagram`);
    }

    stopDiagram() {
        console.log(`stopDiagram`);
    }
}

const findAllStates = (
    graphJson: joint.dia.Graph,
    element: joint.dia.Element,
    connectedElementsFinal
) => {
    const allLinks: joint.dia.Link[] = graphJson.getLinks();
    const resultArr: any[] = [];
    for (const i of connectedElementsFinal) {
        const operationArr: any = [];
        const messageArr: any = [];
        const linksArr: any = [];
        const result: any = [];
        resultArr.push(
            findLink(
                graphJson,
                allLinks,
                element,
                i,
                operationArr,
                messageArr,
                linksArr,
                result
            )
        );
    }
    for (const i of resultArr) {
        i.result.firstElement = element;
    }

    return resultArr;
};

const findLink = (
    graphJson: joint.dia.Graph,
    allLinks: joint.dia.Link[],
    firstElement: joint.dia.Element,
    lastElement: joint.dia.Element,
    operationArr,
    messageArr,
    linksArr,
    result
) => {
    let tempFirstElement: any = [];

    for (let i: number = 0; i < allLinks.length; i++) {
        if (allLinks[i].attributes.source.id === firstElement.id) {
            tempFirstElement = graphJson.getCell(
                allLinks[i].attributes.target.id
            );
            linksArr.push(allLinks[i]);
            const index = allLinks.indexOf(allLinks[i]);
            allLinks.splice(index, 1);
            if (tempFirstElement.attributes.type === 'erd.Entity') {
                operationArr.push(tempFirstElement);
                findLink(
                    graphJson,
                    allLinks,
                    tempFirstElement,
                    lastElement,
                    operationArr,
                    messageArr,
                    linksArr,
                    result
                );
            }
            if (tempFirstElement.attributes.type === 'erd.ISA') {
                messageArr.push(tempFirstElement);
                findLink(
                    graphJson,
                    allLinks,
                    tempFirstElement,
                    lastElement,
                    operationArr,
                    messageArr,
                    linksArr,
                    result
                );
            }
            break;
        }
    }
    result = {
        firstElement: '',
        lastElement,
        operation: operationArr,
        message: messageArr,
        links: linksArr
    };
    return { result };
};

const createStateFunc = (
    currentElementTextPart,
    stateSlice,
    transitionScenario,
    condition
) => {
    const tempState: any = [];
    const endElementTextPart: string[] = [];
    let messageTextPart: string[] = [];
    const operationTextPart: string[] = [];
    const linksTextPart: string[] = [];
    let message: string;

    endElementTextPart.push(
        _.find(stateSlice.result.lastElement.attributes.attrs, 'text').text
    );
    for (const j of stateSlice.result.message) {
        messageTextPart.push(_.find(j.attributes.attrs, 'text').text);
    }
    for (const k of stateSlice.result.operation) {
        operationTextPart.push(_.find(k.attributes.attrs, 'text').text);
    }
    for (const k of stateSlice.result.links) {
        if (!_.isNil(k.attributes.labels)) {
            for (const m of k.attributes.labels) {
                linksTextPart.push(m.attrs.text.text);
            }
        }
    }
    message = messageTextPart[messageTextPart.length - 1] || null;
    if (linksTextPart.length > 0) {
        messageTextPart = linksTextPart;
    }
    tempState.push({
        Name:
            currentElementTextPart +
            '_' +
            endElementTextPart[endElementTextPart.length - 1] +
            '_' +
            messageTextPart[messageTextPart.length - 1],
        NextStateOnSuccess: endElementTextPart[endElementTextPart.length - 1],
        NextStateOnFailure: endElementTextPart[endElementTextPart.length - 1],
        Condition: condition,
        Trigger: {
            Message: message,
            Timeout: 0
        },
        Operations: operationTextPart,
        TransitionScenario: transitionScenario
    });
    return tempState;
};

const getNeighborsRec = (graph, element, opt, allStates, finalState) => {
    const connectedElements_temp = graph.getNeighbors(element, opt);

    for (const i of connectedElements_temp) {
        if (
            i.attributes.type === 'fsa.StartState' ||
            i.attributes.type === 'erd.IdentifyingRelationship' ||
            i.attributes.type === 'basic.Rect' ||
            i.attributes.type === 'fsa.EndState'
        ) {
            finalState.push(i);
        } else {
            allStates.push(i);
            getNeighborsRec(graph, i, opt, allStates, finalState);
        }
    }

    return { allStates, finalState };
};

const colorElement = (node: any, name: string) => {
    console.log(`colorElement`);
    // console.log(node.attributes.attrs.text.text);
    // console.log(node);
    // console.log(name);

    if (name === 'state') {
        name = 'circle';
        node.attr(`${name}/fill`, {
            type: 'linearGradient',
            stops: [{ offset: '0%', color: '#E67E22' }]
        });
    } else {
        node.attr(`${name}/fill`, {
            type: 'linearGradient',
            stops: [{ offset: '0%', color: '#ffff52' }]
        });
    }

    if (node.attributes.attrs.text.text === 'Alarm') {
        node.attr(`${name}/fill`, {
            type: 'linearGradient',
            stops: [{ offset: '0%', color: '#ED3032' }]
        });
    }
};

const removeColorElement = (node: any, name: string) => {
    console.log(`removeColorElement`);
    if (name === 'state') {
        name = 'circle';
        node.attr(`${name}/fill`, {
            type: 'linearGradient',
            stops: [{ offset: '0%', color: '#61549C' }]
        });
    } else {
        node.attr(`${name}/fill`, {
            type: 'linearGradient',
            stops: [{ offset: '0%', color: 'transparent' }]
        });
    }
};

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
