(function($) {

var container,
	content,
	options = {
		width: 300,
		height: 400,
		onClose: null,
		onOpen: null
	};

function init() {
	if (! container) {
		container = $('\
			<div class="jquery-dialog">\
				<div class="jquery-dialog-title"><div class="jquery-dialog-close">&times;</div></div>\
				<div class="jquery-dialog-inside">\
					<div class="jquery-dialog-content"></div>\
				</div>\
			</div>')
			.appendTo('body');

		content = container.find('.jquery-dialog-content');
	}
}

$.fn.dialogSetup = function(opt) {
	options = $.extend(options, opt);
};

$.fn.dialogOpen = function(opt) {
	init();

	opt = $.extend(options, opt);

	console.log(this);

	content.html($(this));

	container
		.width(opt.width)
		//.height(opt.height)
		.css({
			marginLeft: '-' + (opt.width / 2 + 5) + 'px'//,
			//marginTop: '-' + (opt.height / 2 + 5) + 'px'
		});

	opt.onOpen instanceof Function && opt.onOpen();
};

$.fn.dialogClose = function() {
	options.onHide instanceof Function && options.onHide();

	content.html('');

	container.hide();
};

})(window.jQuery);