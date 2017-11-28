'use strict';

import React, { Component } from 'react';
import {
    View,
    ListView,
    ListViewDataSource
} from 'react-native';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class ImmutableListView extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
        });

        this.state = { dataSource: ds.cloneWithRows(this.props.data.toObject()) };
    }

    static propTypes = {
        onRenderCell: PropTypes.func.isRequired,
        data: ImmutablePropTypes.iterable.isRequired
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.data.toObject())
        })
    }

    _renderSeparator(section, row, adjacentRowHighlighted) {
        return (
            <View
                key={`${section}-${row}`}
                style={{ height: 2 }}
            />
        );
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.props.onRenderCell}
                renderSeparator={this._renderSeparator}
                enableEmptySections={true}
            />
        );
    }
}