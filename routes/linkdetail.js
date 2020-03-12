const express = require('express');
const router = express.Router();
const db = require('../db/linkdb.js');
const postgresArray = require('postgres-array');

/* GET home page. */
router.get('/:uuid', function(req, res, next){
	db.query({
		text: db.getProductDetailByUuid,
		values: [req.params.uuid]
	}).then(result => {
		var images = result.rows[0].images;
		images = postgresArray.parse(images, (value) => value)
		res.render('linkdetails', {title: 'Link Details',
							 	   content: result.rows[0],
							 	   images: images});
	})
	  .catch(err =>  {res.send(err.stack)})	  
})

module.exports = router;
