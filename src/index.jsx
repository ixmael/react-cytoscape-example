import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import './graph.json';
import 'jquery';
import 'bootstrap-loader';
import 'bootstrap/dist/css/bootstrap.css';

import Filter from 'filter';
import Graph from 'graph';
import GraphModel from 'graph/model';

//
const mount_node = document.getElementById('cy-node');
const data_source_node = document.getElementById('data-source-link');

axios.get(data_source_node.getAttribute('href'))
.then(function(response) {

    const store = new GraphModel(response.data);

    const filter_node = document.getElementById('graph-nodes');
    ReactDOM.render(
        <Filter store={store}></Filter>,
        filter_node
    );

    ReactDOM.render(
        <Graph store={store}></Graph>,
        mount_node
    );
})
.catch(error => {
    console.log(error);
    ReactDOM.render(
        <div className="alert alert-danger">
            <strong>:(</strong>
            <br />
            <span>No hay gráfica.</span>
        </div>,
        mount_node
    );
});
