(function($) {

var containerEl,
	contentEl,
	closeEl,
	titleTextEl,
	options = {
		width: 300,
		height: 400,
		onClose: null,
		onOpen: null
	};

function init() {
	if (! containerEl) {
		containerEl = $('\
			<div class="jquery-dialog">\
				<div class="jquery-dialog-title">\
					<div class="jquery-dialog-title-text"></div>\
					<div class="jquery-dialog-close">&times;</div>\
				</div>\
				<div class="jquery-dialog-inside">\
					<div class="jquery-dialog-content"></div>\
				</div>\
			</div>')
			.appendTo('body');

		titleTextEl = containerEl.find('.jquery-dialog-title-text');
		closeEl = containerEl.find('.jquery-dialog-close');
		contentEl = containerEl.find('.jquery-dialog-content');

		closeEl.on('click', function() {
			$.fn.closeDialog();
		});
	}
}

$.fn.setupDialog = function(opt) {
	options = $.extend(options, opt);
};

$.fn.openDialog = function(opt) {
	init();

	opt = $.extend(options, opt);

	console.log(this);

	contentEl.html($(this));

	if (opt.title) {
		titleTextEl.text(opt.title);
	}

	containerEl
		.width(opt.width)
		//.height(opt.height)
		.css({
			marginLeft: '-' + (opt.width / 2 + 5) + 'px'//,
			//marginTop: '-' + (opt.height / 2 + 5) + 'px'
		});

	containerEl.show();

	$.fn.showMask();

	opt.onOpen instanceof Function && opt.onOpen();
};

$.fn.closeDialog = function() {
	options.onHide instanceof Function && options.onHide();

	$.fn.hideMask();

	contentEl.html('');
	titleTextEl.text('');

	containerEl.hide();
};

})(window.jQuery);