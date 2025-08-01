
//  Site
(function () {
	var _ = v;

	var scrollerDesc = mctracker();
	scrollerDesc.setup({
		element: _('.box-container').toArray(),
		offsetBottom: '20%',
		once: true,
	}).onStepEnter(function (response) {
		var list = _(response.element).find('li');
		list.forEach(function (item, i) {
			var delay = i * 150 / 1000;
			item = _(item);
			item.attr('style', 'transition-delay: ' + delay + 's;');
		})

		list.addClass('show')
	});


	// var header = function () {
	// 	var lastKnownScrollY = 0;
	// 	var currentScrollY = 0;
	// 	var eleHeader = null;
	// 	const classes = {
	// 		pinned: 'header-pin',
	// 		unpinned: 'header-unpin',
	// 	};

		// function onScroll() {
		// 	currentScrollY = window.pageYOffset;

		// 	if (currentScrollY <= 0) {
		// 		restore();
		// 		return;
		// 	}
		// 	if (currentScrollY < lastKnownScrollY) {
		// 		pin();
		// 	} else if (currentScrollY > lastKnownScrollY) {
		// 		unpin();
		// 	}
		// 	lastKnownScrollY = currentScrollY;
		// }

		// function pin() {
		// 	eleHeader.removeClass(classes.unpinned);
		// 	eleHeader.addClass(classes.pinned);
		// }
		// function unpin() {
		// 	eleHeader.removeClass(classes.pinned);
		// 	eleHeader.addClass(classes.unpinned);
		// }
		// function restore() {
		// 	eleHeader.removeClass(classes.pinned);
		// 	eleHeader.removeClass(classes.unpinned);
		// }
		// eleHeader = _('.main-header');
		// headerHeaight = eleHeader.height();
		// onScroll();
		// window.onload = function () {
		// 	document.addEventListener('scroll', onScroll, false);
		// }
	// }
	// header();

	// var specifics = function (params) {
	// 	var scrollerDesc = mctracker();
	// 	scrollerDesc.setup({
	// 		element: _('.especifications ul').toArray(),
	// 		bottom: '300',
	// 		once: true,
	// 	}).onStepEnter(function (response) {
	// 		var list = _(response.element).find('li');
	// 		list.forEach(function (item, i) {
	// 			var delay = i * 100 / 1000;
	// 			item = _(item);
	// 			item.attr('style', 'transition-delay: ' + delay + 's;');
	// 		})
	// 		list.addClass('show')
	// 	});
	// }
	// specifics();


// 	const letters = _('svg').children('g');
// 	function animateLetter(index = 0) {
// 		if (index > letters.length - 1) {
// 			return false;
// 		}

// 		let nextIndex = index + 1;
// 		let paths = _(letters[index]).find('path');
// 		let duration = (index > 0 ? 390 : 1000);

// 		anime({
// 			targets: paths.toArray(),
// 			strokeDashoffset: [anime.setDashoffset, 0],
// 			easing: 'easeInOutSine',
// 			duration: duration,
// 			begin: () => {
// 				paths.addClass('hw');
// 			},
// 			complete: () => {
// 				animateLetter(nextIndex);
// 			}
// 		});
// 	}
// 	animateLetter(0);
}());


// GLightbox
var lightbox = GLightbox();
lightbox.on('open', (target) => {
	console.log('lightbox opened');
});
var lightboxDescription = GLightbox({
	selector: '.glightbox2'
});
var lightboxVideo = GLightbox({
	selector: '.glightbox3'
});
lightboxVideo.on('slide_changed', ({ prev, current }) => {
	console.log('Prev slide', prev);
	console.log('Current slide', current);

	const { slideIndex, slideNode, slideConfig, player } = current;

	if (player) {
		if (!player.ready) {
			// If player is not ready
			player.on('ready', (event) => {
				// Do something when video is ready
			});
		}

		player.on('play', (event) => {
			console.log('Started play');
		});

		player.on('volumechange', (event) => {
			console.log('Volume change');
		});

		player.on('ended', (event) => {
			console.log('Video ended');
		});
	}
});

var lightboxInlineIframe = GLightbox({
	selector: '.glightbox4'
});