import React from 'react';
import { render } from 'react-dom';
import Storage from './Tools/Storage';
import { chanceOfRain } from './Tools/misc';
import Slider from './Components/Slider';
import Block from './Components/Block';
import { Chart } from 'react-google-charts';

import '../css/app.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            barChartData: [],
            lineChartData: [],
            currentTemperature: 15,
            currentPressure: 1010
        }
        Storage.subWeatherForecast(this.setData.bind(this));
        Storage.getWeatherForecast();
    }

    setData(data) {
        let barChartData = this.parseBarChartData(data);
        
        let lineChartData = this.calculateLineChartData(data, this.state.currentPressure, this.state.currentTemperature);
        console.log(lineChartData);
        this.setState({
            data,
            barChartData,
            lineChartData 
        });
    }

    calculateLineChartData (data, newPressure, newTemperature) {
        let res = [ [ 'Days', 'Lower', 'Mean', 'Upper' ] ];
        let d = data.days.map(dayStats => {
            let res = [dayStats.day];
            return res.concat(chanceOfRain(newPressure, newTemperature, dayStats.amount));
        });
        return res.concat(d);

    }

    parseBarChartData (data) {
        if (!data.days) { return null; }
        let header = [ 'Days', 'Rainfall, l/m^2' ];
        let result = [ header ];
        return result.concat(data.days.map(dayStats => [dayStats.day, dayStats.amount]));
    }

    temperatureChangeHandler (e) {
        let newTemp = parseInt(e.target.value);
        this.setState({
            currentTemperature: newTemp,
            lineChartData: this.calculateLineChartData(this.state.data, this.state.currentPressure, newTemp)
        });
    }

    pressureChangeHandler (e) {
        let newPressure = parseInt(e.target.value);
        this.setState({
            currentPressure: newPressure,
            lineChartData: this.calculateLineChartData(this.state.data, newPressure, this.state.currentTemperature)
        });
    }

    render() {
        const barChartOpts = {
            hAxis: {
                title: 'Days',
                viewWindow: {
                    min: 0,
                    max: 8
                },
                gridlines: {
                    count: 9
                }
            },
            vAxis: {
                title: 'Rainfall, l/m^2',
                legend: { position: 'none' }
            }
        };

        const lineChartOpts = {
            hAxis: {
                title: 'Days',
                viewWindow: {
                    min: 1,
                    max: 7
                },
                gridlines: {
                    count: 7
                }
            },
            vAxis: {
                title: '%',
                viewWindow: {
                    min: 0,
                    max: 100
                },
                gridlines: {
                    count: 9
                }
            },
            curveType: 'function',
            legend: { position: 'bottom' }
        };

        return (
            <div>
                <div className='container left'>
                    <Block label='Pressure [hPa]'>
                        <Slider id='temp' min={970} max={1030} value={this.state.currentPressure} sliderChangeHandler={this.pressureChangeHandler.bind(this)} />
                    </Block>
                    <Block label='Temperature [&#176;C]'>
                        <Slider id='pressure' min={10} max={35} value={this.state.currentTemperature} sliderChangeHandler={this.temperatureChangeHandler.bind(this)} />
                    </Block> 
                </div>
                <div className='container right'>
                    <Block label='Chance of rain'>
                        <Chart chartType='LineChart' options={lineChartOpts} data={this.state.lineChartData} width='100%' height='300px' graph_id='line-chart-rain-probability' />
                    </Block>
                    <Block label='Amount of rainfall'>
                        <Chart chartType='ColumnChart' options={barChartOpts} data={this.state.barChartData} width='100%' height='300px' graph_id='bar-chart-rainfall' />
                    </Block>
                </div>
            </div>
        );
    }
}

render(<App />, document.getElementById('app'));
