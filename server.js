const parser = require('body-parser');
const express = require('express');
const https = require('https');
const http = require('http');
const { appendFileSync } = require('fs');


const app = express();
app.use(express.static('public'));
const PORT = 6500;
// Quote part
const quoteUrl = "http://api.kanye.rest"
let quote = '';

// Joke part
const jokeUrl = "https://v2.jokeapi.dev/joke/Any?type=single"
let joke = '';

// quote request
app.post("/quote", (req, res) => {

	http.get(quoteUrl, (response) => {
		console.log(response.statusCode);

		response.on('data', (data) => {
			const temp = JSON.parse(data);
			quote = temp.quote;
			quote = '<p>"' + quote + '"</p>';
			console.log(quote);
			appendFileSync('./public/quote.html', quote);
			res.sendFile(__dirname + '/public/quote.html');
		})
	});

});

// Joke request
app.post('/joke', (req, res) => {

	https.get(jokeUrl, (response) => {
		console.log(response.statusCode);

		response.on('data', (data) => {
			const temp = JSON.parse(data);
			joke = temp.joke;
			joke = '<p>"' + joke + '"</p>'
			console.log(joke);
			appendFileSync('./public/joke.html', joke);
			res.sendFile(__dirname + '/public/joke.html');
		});
	});

});



app.listen(PORT, () => {
	console.log("Working...");
});
