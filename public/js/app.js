
console.log('Client side javascript file is loaded!')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')

weatherform.addEventListener('submit' , (e) => {
	e.preventDefault()
	console.log(search.value)
	disp.textContent = 'loading...'
	fetch('http://localhost:3000/weather?search='+search.value).then( (response) => {
	response.json().then( (data) => {
		console.log(data)

		const disp = document.querySelector('#disp')
        disp.textContent  = 'Today temp at '+ data.location + ' is ' + data.temp + '℃ add chance of rain is '+data.precip+'%.'

	} )
    
	search.value = ''
})

})