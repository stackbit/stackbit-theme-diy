// Navigation on small screens
document.body.classList.remove('js-nav-open');
var navToggle = document.querySelectorAll('.js-nav-toggle');
if (navToggle) {
	for (var i = 0; i < navToggle.length; i++) {
		navToggle[i].addEventListener('click', function (e) {
			document.body.classList.toggle('js-nav-open');
			e.preventDefault();
		});
	}
}

// YouTube and Vimeo embeds
var embedLinks = document.querySelectorAll('.js-embed-link');
if (embedLinks) {
	for (var i = 0; i < embedLinks.length; i++) {
		var embedUrl = embedLinks[i].getAttribute('href'),
			embedWidth = embedLinks[i].dataset.embedWidth,
			embedHeight = embedLinks[i].dataset.embedHeight;
		var iframeHtml = convertEmbed(embedUrl, embedWidth, embedHeight);
		embedLinks[i].outerHTML = iframeHtml;
	}
}
function convertEmbed(input, width, height) {
	const patternVimeo = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(\S+)/g;
	const patternYouTube = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(\S+)/g;
	if (patternVimeo.test(input)) {
		var replacement = '<iframe src="https://player.vimeo.com/video/$1" width="' + width + '" height="' + height + '" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
		input = input.replace(patternVimeo, replacement);
	} else if (patternYouTube.test(input)) {
		var replacement = '<iframe src="https://www.youtube.com/embed/$1" width="' + width + '" height="' + height + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
		input = input.replace(patternYouTube, replacement);
	}
	return input;
}

/*
  * reframe.js - Reframe.js: responsive iframes for embedded content
  * @version v2.2.7
  * @link https://github.com/dollarshaveclub/reframe.js#readme
  * @author Jeff Wainwright <jjwainwright2@gmail.com> (http://jeffry.in)
  * @license MIT
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).reframe=t()}(this,function(){"use strict";return function(e,t){var i="string"==typeof e?document.querySelectorAll(e):e,n=t||"js-reframe";"length"in i||(i=[i]);for(var o=0;o<i.length;o+=1){var r=i[o];if(!(-1!==r.className.split(" ").indexOf(n)||-1<r.style.width.indexOf("%"))){var d=(r.getAttribute("height")||r.offsetHeight)/(r.getAttribute("width")||r.offsetWidth)*100,f=document.createElement("div");f.className=n;var s=f.style;s.position="relative",s.width="100%",s.paddingTop=d+"%";var a=r.style;a.position="absolute",a.width="100%",a.height="100%",a.left="0",a.top="0",r.parentNode.insertBefore(f,r),r.parentNode.removeChild(r),f.appendChild(r)}}}});

// Responsive video embeds
var videoEmbeds = [
	'iframe[src*="youtube.com"]',
	'iframe[src*="vimeo.com"]'
];
reframe(videoEmbeds.join(','));

// Announcement
var anncmnt = document.querySelector('.js-announcement');
if (anncmnt) {
	var anncmntClose = document.querySelector('.js-announcment-close'),
		anncmntKey = 'hide-announcement-bar',
		currentAnncmnt = anncmnt.dataset.anncmntId;
	if (localStorage.getItem(anncmntKey) != currentAnncmnt ) {
		anncmnt.classList.remove('is-hidden');
	}
	anncmntClose.addEventListener('click', function () {
		anncmnt.classList.add('is-hidden');
		localStorage.setItem(anncmntKey, currentAnncmnt);
	});
}
