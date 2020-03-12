function linkClick(){
	$('form#linkform').attr('style','display:none');
	$('div#messages').html('<h5>Loading...<h5>');
}
$(document).ready(function($) {

	//carousel in link details
	$('ol.carousel-indicators > li:nth-child(1)').addClass('active');
	$('div.carousel-item:nth-child(1)').addClass('active');

	//clickable table
	$(".linklist tbody tr").click(function() {
	    window.location = $(this).data("href");
	});    
});