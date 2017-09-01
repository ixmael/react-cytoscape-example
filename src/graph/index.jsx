import React from 'react';
//import { observable, action } from "mobx";
import { observer } from "mobx-react";

import cycola from 'cytoscape-cola';
import cytoscape from 'cytoscape';

cytoscape.use(cycola);

@observer
class Graph extends React.Component {
    cy = null;
    cyNode = 'cytoscape';
    cyStyle = {
        height: 'calc(100vh - 100px)',
        border: '1px solid #ddd'
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { graph } = this.props.store;

        let cy_config = {
            container: document.getElementById(this.cyNode),
            layout: {
                name: 'cola',
                //boundingBox: { x: 100, y: 50, width: 700, height: 400 }
            },
            elements: graph,
            style: [
                {
                    selector: 'node',
                    style: {
                        'content': 'data(id)'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'content': 'data(id)',
                        'width': 2
                    }
                },
                {
                    selector: 'node.highlight',
                    style: {
                        'border-color': '#FFF',
                        'border-width': '2px'
                    }
                },
                {
                    selector: 'node.semitransp',
                    style:{ 'opacity': '0.5' }
                },
                {
                    selector: 'edge.highlight',
                    style: { 'mid-target-arrow-color': '#FFF' }
                },
                {
                    selector: 'edge.semitransp',
                    style:{ 'opacity': '0.2' }
                },
            ],
        };

        self = this;
        this.cy = cytoscape(cy_config);
        this.cy.on('tap', 'node', function(event) {
            self.updateFilter(event.target.id());
        });
    }

    updateFilter(filter) {
        this.props.store.setFilter(filter);
    }

    componentDidUpdate() {
        const { filter, hiddenElements } = this.props.store;

        this.cy.elements('node:selected').unselect();
        if(filter) {
            if(hiddenElements) {
                hiddenElements.restore();
                this.props.store.clearHiddenElements();
            }

            let node = this.cy.getElementById(filter);
            let neighbours = node.neighborhood();
            // Hide farest elements
            this.props.store.setHiddenElements(self.cy.elements().difference(neighbours).not(node));
            this.cy.nodes().difference(neighbours).not(node).remove();
            node.select();
        }
        else if(hiddenElements) {
            hiddenElements.restore();
            this.props.store.clearHiddenElements();
        }

        this.cy.fit();
    }

    render() {
        const { filter } = this.props.store;
        return (
            <div id={this.cyNode} style={this.cyStyle}></div>
        );
    }
}

export default Graph;
