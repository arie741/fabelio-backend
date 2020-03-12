const express = require('express');
const router = express.Router();
const db = require('../db/linkdb.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	db.query({
		text: db.getProductLinks
	}).then(result => {
		res.render('linklist', {title: 'Link List',
							 	contents: result.rows});
	})
	  .catch(err =>  {res.send(err.stack)})	  
});

router.post('/deletelink/:uuid', function(req, res, next){
	db.query({
		text: db.deleteProductByUuid,
		values: [req.params.uuid]
	}).then(result => {
		res.redirect('/linklist');
	})
	  .catch(err =>  {res.send(err.stack)})	  
})

module.exports = router;
