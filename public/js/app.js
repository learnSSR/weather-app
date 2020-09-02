
console.log('Client side javascript file is loaded!')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')

weatherform.addEventListener('submit' , (e) => {
	e.preventDefault()
	console.log(search.value)
	disp.textContent = 'loading...'
	fetch('/weather?search='+search.value).then( (response) => {
	 
		response.json().then( (data) => {
		console.log(data)

		const disp = document.querySelector('#disp')
        disp.textContent  = 'Today weather forecast for '+  data.location+' is "'+data.description +'" and temp is ' + data.temp + '℃ and chances of rain is '+data.precip+'%.'

	} )
    
	search.value = ''
})

})