const request = require('request')


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
            const temperature = currentConditions.temperature
            const precipProbability = currentConditions.precipProbability
            callback(undefined, body.daily.data[0].summary + " It is currently " + temperature + " degrees out and there is a " 
            + precipProbability + " percent chance of rain.")
        }
    })
}

module.exports = forecast