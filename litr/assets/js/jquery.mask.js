(function($) {

var containerEl,
	options = {
		onClose: null,
		onOpen: null
	};

function init() {
	if (! containerEl) {
		containerEl = $('<div class="jquery-mask"></div>').appendTo('body');
	}
}

$.fn.setupMask = function(opt) {
	options = $.extend(options, opt);
};

$.fn.showMask = function(opt) {
	init();

	opt = $.extend(options, opt);

	containerEl.show();

	setTimeout(function() {
		containerEl.addClass('show');
	}, 1);

	opt.onOpen instanceof Function && opt.onOpen();
};

$.fn.hideMask = function(opt) {
	opt = $.extend(options, opt);

	opt.onHide instanceof Function && opt.onHide();

	containerEl.removeClass('show');
	containerEl.hide();
};

})(window.jQuery);