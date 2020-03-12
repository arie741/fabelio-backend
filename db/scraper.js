const cheerio = require('cheerio');
const uuid = require('uuid');
//scraping libraries
const puppeteer = require('puppeteer');

//this function scrape the entire website, it waits for everything to loads and then scrape it.
async function scrapeLink(url, callback){
	var error = null;
	var html;
	var response;
	try {
		const browser = await puppeteer.launch({
												  args: [
												    '--no-sandbox',
												    '--disable-setuid-sandbox',
												  ],
												});
		const page = await browser.newPage();
		await page.goto(url, {waitUntil: 'networkidle2'});
		html = await page.content();

		//cheerio scrape the product link into 4 items: name, description, images, and currentprice
		let $ = cheerio.load(html);

		let name = $('div.product-info-main h1.page-title > span.base').text();
		let description = $('section.product-info__section div.product-info__description div#description').html();
		let current_price = $('div.price-final_price span.price:nth-child(1)').html();
		let imagesArr = [];
		$('div.media div.fotorama__stage__shaft div.fotorama__stage__frame', html).each(function() {
		    imagesArr.push($(this).attr('href'));
		});
		response = {uuid: uuid.v1(),
					link: url,
					name: name,
				    desc: description,
				    price: current_price,
				    images: imagesArr};

		callback(response, error);
		await browser.close();
	} catch (err){
		error = err;
		callback(response, error);
	}
	
}



module.exports = scrapeLink;