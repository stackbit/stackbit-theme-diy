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

// Handle main navigation menu toggling on small screens
function navToggleHandler(e) {
	e.preventDefault();
	document.body.classList.toggle('js-nav-open');
}

window.addMainNavigationHandlers = function() {
	const menuToggle = document.querySelectorAll('.js-nav-toggle');
	if (menuToggle) {
		for (let i = 0; i < menuToggle.length; i++) {
			menuToggle[i].addEventListener('click', navToggleHandler, false);
		}
	}
};

window.removeMainNavigationHandlers = function() {
	document.body.classList.remove('js-nav-open');
	const menuToggle = document.querySelectorAll('.js-nav-toggle');
	if (menuToggle) {
		for (let i = 0; i < menuToggle.length; i++) {
			menuToggle[i].removeEventListener('click', navToggleHandler, false);
		}
	}
};

// Handle announcement close button click
function announcementCloseHandler(e) {
	e.preventDefault();
	const anncmnt = document.querySelector('.js-announcement');
	const anncmntKey = 'hide-announcement-bar';
	const currentAnncmnt = anncmnt.dataset.anncmntId;
	anncmnt.classList.add('is-hidden');
	localStorage.setItem(anncmntKey, currentAnncmnt);
}

window.addAnnouncementHandlers = function() {
	const anncmnt = document.querySelector('.js-announcement');
	if (anncmnt) {
		const anncmntClose = document.querySelector('.js-announcment-close');
		const anncmntKey = 'hide-announcement-bar';
		const currentAnncmnt = anncmnt.dataset.anncmntId;
		if (localStorage.getItem(anncmntKey) != currentAnncmnt ) {
			anncmnt.classList.remove('is-hidden');
		}
		anncmntClose.addEventListener('click', announcementCloseHandler, false);
	}
};

window.removeAnnouncementHandlers = function() {
	const anncmnt = document.querySelector('.js-announcement');
	if (anncmnt) {
		const anncmntClose = document.querySelector('.js-announcment-close');
		const anncmntKey = 'hide-announcement-bar';
		const currentAnncmnt = anncmnt.dataset.anncmntId;
		if (localStorage.getItem(anncmntKey) == currentAnncmnt ) {
			anncmnt.classList.add('is-hidden');
		}
		anncmntClose.removeEventListener('click', announcementCloseHandler, false);
	}
}