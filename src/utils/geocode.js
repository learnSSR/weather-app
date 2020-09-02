const request = require('request')

const geocode = ( address , callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoicG90YXRvbGVhcm4iLCJhIjoiY2tlaWV5Y2o5MHhkeTMxcWJ0b2Z6NXM1ZCJ9.1ceXxPVly5nLCuphti4HJQ&limit=1';
	
	request( { url,json:true} ,( error , {body}) => {
			if (error)
			{
				callback(error)
			} else
			{
				callback(undefined , {
					 latitude: body.features[0].center[1],
					 longitude : body.features[0].center[0],
					 location: body.features[0].place_name
				})
			}
	})
}


module.exports = geocode