import React from 'react';
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import Select from 'react-select';
import 'react-select/dist/react-select.css';

@observer
class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(value) {
        this.props.store.setFilter(value);
    }

    render() {
        const { filter, graph } = this.props.store;

        const ordered_graph = graph.nodes.map(e => (e.data.id));
        ordered_graph.sort();

        return (
            <div className="row navbar-form">
                <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                    <Select
                        name="select_node"
                        value="one"
                        simpleValue
                        options={ordered_graph.map(v => ({ value: v, label: v}) )}
                        onChange={this.handleChange}
                        value={filter}
                        placeholder="Filtrar nodo"
                        noResultsText="No hay nodos"
                    />
                </div>
            </div>
        );
    }
}

export default Filter;
