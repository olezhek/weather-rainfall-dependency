import React from 'react';

export default class Block extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (<div className='block'>
            <h3 className='label'>{this.props.label}</h3>
            <div className='data'>
                {this.props.children || null}
            </div>
        </div>);
    }
}
