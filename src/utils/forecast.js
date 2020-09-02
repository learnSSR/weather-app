const request = require('request')

const forecast = (longitude , latitude , callback) => {

    const url =  'https://api.weatherbit.io/v2.0/forecast/hourly?NC&key=c972e8048e1848afa4a9f9117a125fe5&hours=48&lat=' + latitude + '&lon=' +longitude
    

	request( { url , json: true}, ( error , {body}) => {
			if (error){
				callback(error)
			} else {
				callback( undefined , {
					precip: body.data[0].precip,
					temp: body.data[0].temp
				})
			}
	})
}


module.exports = forecast