import https from 'https';
const jokeUrl = "https://v2.jokeapi.dev/joke/Any?type=single"
;
let joke = '';

https.get(jokeUrl, (response) => {

	response.on('data', (data) => {
		const temp = JSON.parse(data);
		joke = temp.joke;
	});
});

document.getElementById('joke').innerHTML = joke;
