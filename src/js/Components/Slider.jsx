import React from 'react';

export default class Slider extends React.Component {

    static propTypes = {
        min: React.PropTypes.number.isRequired,
        max: React.PropTypes.number.isRequired,
        step: React.PropTypes.number,
        value: React.PropTypes.number,
        sliderChangeHandler: React.PropTypes.func.isRequired,
        id: React.PropTypes.string.isRequired
    };

    static defaultProps = {
        step: 1,
        value: 0
    };

    render () {
        return (
            <div style={{ textAlign: 'center' }}>
                <input id={this.props.id} onChange={this.props.sliderChangeHandler} type="range" style={{ width: '100%' }} min={this.props.min} max={this.props.max} step={this.props.step} value={this.props.value} />
                <label htmlFor={this.props.id}>{this.props.value}</label>
            </div>
        ); 
    }
}
