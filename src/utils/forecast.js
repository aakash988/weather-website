const request = require('request')

//Goal: Add new data to forecast
//1. Update the forecast string to include new data
//2. Commit your changes
//3. Push your changes to Github and deploy to Heroku
//4. Test your work in the live application

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e818f4069989a2ef1c51697d691ac23c/' + latitude + ',' + longitude
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        }
        else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            const currentConditions = body.currently
            console.log(body.daily.data[0])
            const temperature = currentConditions.temperature
            const highTemperature = body.daily.data[0].temperatureHigh
            const lowTemperature = body.daily.data[0].temperatureLow
            const precipProbability = currentConditions.precipProbability
            callback(undefined, body.daily.data[0].summary + " It is currently " + temperature + " degrees out and there is a " 
            + precipProbability + " percent chance of rain." + "The high for today is " + highTemperature + "and the low for today is " + lowTemperature
            + ".")
        }
    })
}

module.exports = forecast