const db = require('./linkdb.js');
const scraper = require('./scraper.js');

function updateLatestPrice(url, uuid){
	  scraper(url, function(response, error){
	  	if (error != null){
	  		console.log("update error, error: " + error)
	  	} else {
	  		var data = response;
		  	db.query({
				  text: db.updateProductPrice,
				  values: [data.price,
				  		   uuid]
				})
				  .then(result => {
				  		console.log("update success: " + url + " last price: " + data.price + " time: " + new Date())
					})
				  .catch(err => {
				  	console.log("update error, error: " + err.stack);
				  })
	  	}
		
	})
}

function timeDifference(timenow, timedb, callback){//calculate whether a time difference is an hour more or not. Run callback if yes
	var daysDiff = timenow.getDay() - timedb.getDay();
	var hoursDiff = timenow.getHours() - timedb.getHours();
	var minutesDiff = timenow.getMinutes() - timedb.getMinutes();
	if(daysDiff >= 1 || (hoursDiff === 1 && minutesDiff >= 0) || hoursDiff > 1){
		callback()
	}
}

function latestPriceCron(){
	db.query({
		text: db.getProductLinks
	}).then(result => {
		for (i=0;i<result.rows.length;i++){
			timeDifference(new Date(), new Date(result.rows[i].price_updated_time), function(){
				updateLatestPrice(result.rows[i].link, result.rows[i].uuid);
			})
		}
		
	})
	  .catch(err =>  {console.log(err.stack)})	 
}

module.exports = latestPriceCron;