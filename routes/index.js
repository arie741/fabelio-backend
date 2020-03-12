const express = require('express');
const router = express.Router();
const db = require('../db/linkdb.js');
const scraper = require('../db/scraper.js');
const bodyParser = require('body-parser');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//helper functions
function messageParser(mes){ //this function parse messages from url query
	switch(mes) {
	  case "success":
	    return "Link successfuly stored!";
	    break;
	  case "err1":
	    return "Query failed";
	    break;
	  case "err2":
	    return "Fail to load the link";
	    break;
	  case "err3":
	    return "Link must not more than 150 characters and the domain must be on fabelio.com";
	    break;
	  default:
	    return "";
	}
}

//this function validates the link string
//the link string's length must not more than 150, and the domain must https://fabelio.com or https://www.fabelio.com
function stringValidate(str){
	if (str.length < 150 && 
		(str.slice(0, 19) === "https://fabelio.com" || 
		 str.slice(0, 23) === "https://www.fabelio.com")){
		return true;
	} else {
		return false;
	}
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' , ermes: messageParser(req.query.ermes)});
});

router.post('/input', function(req, res, next){
	if(stringValidate(req.body.link)){
		scraper(req.body.link, function(response, error){
			if (error != null){
				res.send(error);
		  	}
			var data = response;
		  	var images = [];

		  	db.query({
				  text: db.putProductLinks,
				  values: [data.uuid, 
				  		   data.link,
				  		   data.name,
				  		   data.desc,
				  		   data.images,
				  		   data.price]
				})
				  .then(result => {
				  	res.redirect('/linkdetails/' + data.uuid);
				  })
				  .catch(err => {
				  	res.redirect('/?ermes=err1');
				  })
		})
	} else {
		res.redirect('/?ermes=err3');
	}
	
});

module.exports = router;
