import { observable, action } from 'mobx';

export default class GraphModel {
    id = Math.random();
    graph = null;
    @observable filter = null;
    @observable hiddenElements = null;

    constructor(graph) {
        this.graph = graph;
    }

    @action
    setFilter(filter) {
        this.filter = filter;
    }

    @action
    setHiddenElements(elements) {
        this.hiddenElements = elements;
    }

    @action
    clearHiddenElements() {
        this.hiddenElements = null;
    }
}
