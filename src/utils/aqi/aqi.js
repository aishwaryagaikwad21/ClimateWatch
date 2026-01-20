const request = require('postman-request');

function aqi(country, city, callback){

    const apiKey = 'b98fce104980f877d09ca58739e0253854bd5f8a';
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