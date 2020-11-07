$('.nav-link, #title').on('click', function() {
	window.location.reload(true);
})

$('#eng').on('click', function() {
	window.location.href = ''; window.location.reload(true);
})

$('#de').on('click', function() {
	window.location.href = '#de'; window.location.reload(true);
})


////////// IMAGE LIGHTBOX //////////

// open overlay
$('.image-container').on('click', function() {
	// show overlay, disable background scroll
	$('#overlay').css('visibility', 'visible')
	overlay.setAttribute('aria-hidden', false)
	document.body.classList.toggle('noscroll', true)

	// show selected image
	img = $(this).find('img').attr('src')
	$('#image-overlay').attr('src', img)

	// show caption for selected image
	caption = $(this).find('img').attr('title')
	$('#overlay-text').html(caption)
	
})

// close overlay
$('#overlay').on('click', function() {
	// close overlay & re-enable scroll
	$('#overlay').css('visibility', 'hidden')
	document.body.classList.toggle('noscroll', false)

	// zoom out image
	$('#image-overlay').attr('width', '50%')
})

// image overlay zoom
$('#image-overlay').on('click', function(e) {
	e.stopPropagation() // don't trigger #overlay click event
	// zoom in
	if ($('#image-overlay').attr('width') == '50%') {
		$('#image-overlay').attr('width', '70%')
	} else { // zoom out
		$('#image-overlay').attr('width', '50%')
	}
	
	
})