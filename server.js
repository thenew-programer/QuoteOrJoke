const parser = require('body-parser');
const express = require('express');
const https = require('https');
const http = require('http');


const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;

// Quote part
const quoteUrl = "http://api.kanye.rest"

// Joke part
const jokeUrl = "https://v2.jokeapi.dev/joke/Any?type=single"

// quote request
app.post("/quote", (req, res) => {

	http.get(quoteUrl, (response) => {
		console.log(response.statusCode);

		response.on('data', (data) => {
			const temp = JSON.parse(data);
			const quote = temp.quote;
			res.render('quote', {realQuote: quote})
		});
	});

});

// Joke request
app.post('/joke', (req, res) => {

	https.get(jokeUrl, (response) => {
		console.log(response.statusCode);

		response.on('data', (data) => {
			const temp = JSON.parse(data);
			const joke = temp.joke;
			res.render('joke', {realJoke: joke});
		});
	});

});



app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}...`);
});
