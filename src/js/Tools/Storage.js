import { getData } from './Networking';

export default class Storage {

    static handlers = {};

    static getWeatherForecast (url) {
		return getData(url)
        .then(content => {
            let data = (JSON.parse(content))[0];
            this.fireHandlers('weather_forecast', data);
        })
        .catch(err => {
            console.error('Failed to get Weather forecast', err);
        });
    }

    static subWeatherForecast(handler) {
        if (!this.handlers.weather_forecast) {
            this.handlers.weather_forecast = [];
        } 
        this.handlers.weather_forecast.push(handler);
    }

    static unsubWeatherForecast(handler) {
        if (this.handlers.weather_forecast && this.handlers.weather_forecast.length) {
            let pos = this.handlers.weather_forecast.indexOf(handler);
            return pos !== 1 ? !!(this.handlers.weather_forecast.splice(pos, 1, handler).length) : false;
        }
    }

    static fireHandlers(on, data) {
        try {
            this.handlers[on].forEach(handler => handler(data));
        } catch (e) {
            console.warn(`Failed to trigger handlers for ${on}`, e);
        }
    }
}
