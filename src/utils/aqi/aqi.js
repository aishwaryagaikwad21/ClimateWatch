const request = require('postman-request');

function aqi(country, city, callback){

    const apiKey = process.env.AQI_API_KEY
    const aqiUrl = `https://api.waqi.info/feed/${city}/?token=${apiKey}`
    
    request({url:aqiUrl, json:true},(error, response) => {
        if(error){
            callback('Data unavailable', undefined)
        }
        else{
            const info = {
                aqi:response.body.data.aqi
            }
          callback(undefined,info)  
        }
    })
}

module.exports = {
    aqi
}