(function($) {

var container,
	options = {
		onClose: null,
		onOpen: null
	};

function init() {
	if (! container) {
		container = $('<div class="jquery-mask"></div>').appendTo('body');
	}
}

$.fn.maskSetup = function(opt) {
	options = $.extend(options, opt);
};

$.fn.maskOpen = function(newContent, opt) {
	init();

	opt = $.extend(options, opt);

	content.append(newContent);

	opt.onOpen instanceof Function && opt.onOpen();
};

$.fn.maskClose = function(opt) {
	opt = $.extend(options, opt);

	opt.onHide instanceof Function && opt.onHide();

	content.html('');

	container.hide();
};

})(window.jQuery);