import $ from 'jquery';
export default function stickyHeader() {
	// Sticky Header
	$(window).on('scroll load', function () {
		if ($(window).scrollTop() >= 50) {
			$('header').addClass('scrolled')
		} else {
			$('header').removeClass('scrolled')
		}
	})
}
