var current_image

//////////////////// IMAGE LAZY LOADING ////////////////////

// load artwork images over placeholder
function loadImages() {
	// for each image container
	$('.image-container').each(function() {
		// get medium-sized image filename
		var img_filename = $('img', $(this)).attr('data-imglarge')
		var img_med_filename = img_filename.substring(0, img_filename.indexOf('.png')) + '_medium.jpg'

		// // load medium-sized image
		// var imgLarge = new Image()
		// $(imgLarge).addClass('artwork')
		// 	.attr('src', img_med_filename)
		// 	.attr('data-imglarge', img_filename)
		// 	.attr('alt', $('.placeholder', $(this)).attr('alt'))
		// 	.on('load', () => {
		// 		$(imgLarge).addClass('loaded')
		// 	})
		// $(this).append($(imgLarge))

		// update placeholder image src
		$('.placeholder', $(this)).attr('src', img_med_filename)
			.attr('data-imglarge', img_filename)
			.css('filter', 'none')
	})
	console.log('window loaded!')
}

////////// IMAGE LIGHTBOX //////////

function updateOverlayImage(img) {
	// show selected image
	src = $(img).attr('data-imglarge')
	$('#image-overlay').attr('src', src)

	// show caption for selected image
	caption = $(img).attr('data-caption')
	$('#overlay-text').html(caption)
}

// open image overlay
function showOverlay() {
	current_image = $(this).find('img')
	// show overlay, disable background scroll
	$('#overlay').css('visibility', 'visible')
	overlay.setAttribute('aria-hidden', false)
	document.body.classList.toggle('noscroll', true)

	img = $(this).find('img')
	updateOverlayImage(img)

	$('#overlay-tip').css('visibility', 'visible')
		.css('opacity', 1)

	$('#image-overlay').attr('width', '60%')
	if (window.screen.width < 767) {
		$('#image-overlay').attr('width', '90%')
	}
}

// close image overlay
function hideOverlay() {
	// close overlay & re-enable scroll
	$('#overlay').css('visibility', 'hidden')
	$('#overlay-tip').css('visibility', 'hidden')
		.css('opacity', 0)
	document.body.classList.toggle('noscroll', false)

	// zoom out image
	$('#image-overlay').attr('width', '60%')
	if (window.screen.width < 767) {
		$('#image-overlay').attr('width', '90%')
	}
}

// navigate prev/next image
// respond to keyup events, switch overlay image left and right
function keyUpHandler(e) {
	if ($('#overlay').css('visibility') == 'hidden') return
	// prevent default keyup behavior
	e.preventDefault()

	// current image being show in overlay
	var images = $('.image')
	var cur = images.index(current_image)
	// previous image - left arrow
	if (e.which == 37) {
		if (cur <= 0) return
		img = images[cur-1]
		current_image = img
		updateOverlayImage(img)
	}
	// next image - right arrow
	else if (e.which == 39) {
		if (cur >= images.length-1) return
		img = images[cur+1]
		current_image = img
		updateOverlayImage(img)
	}
	else {
		return
	}
	$('#overlay-tip').css('visibility', 'hidden')
		.css('opacity', 0)
}

// image overlay zoom
function zoomOverlay(e) {
	e.stopPropagation() // don't trigger #overlay click event
	// zoom in
	if (window.screen.width < 767) { // mobile
		if ($('#image-overlay').attr('width') == '90%') {
			$('#image-overlay').attr('width', '100%')
		} else { // zoom out
			$('#image-overlay').attr('width', '90%')
		}
		return
	} // desktop
	if ($('#image-overlay').attr('width') == '60%') {
		$('#image-overlay').attr('width', '80%')
	} else { // zoom out
		$('#image-overlay').attr('width', '60%')
	}
}


//////////////////// EXECUTE ////////////////////

$(document).ready(function() {
	// fade in content
	$('.main-content *').css('opacity', 1)

	// load homepage
	$('.nav-link, #title').on('click', function() {
		window.location.reload(true);
	})
	
	// reload page for a certain language
	$('#eng').on('click', function() {
		window.location.href = ''; window.location.reload(true);
	})
	$('#de').on('click', function() {
		window.location.href = '#de'; window.location.reload(true);
	})

	// ability to switch languages
	if (window.location.hash) {
		if (window.location.hash == '#de') {
			for (var item in translations.de) {
				$('#'+item).text(translations.de[item])
			}
			$('a.nav-link, a.navbar-dropdown-item, #navIndexUrl').each(function() {
				var _href = $(this).attr('href')
				$(this).attr('href', _href + '#de')
			})
		}
	}

	// lazy loading images
	loadImages()
	
	// activate image overlay
	$('.image-container').on('click', showOverlay)
	$('#overlay').on('click', hideOverlay)
	$('#image-overlay').on('click', zoomOverlay)
	$(document).on('keyup', keyUpHandler)
})
