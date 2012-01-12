/*
	Written by Misha Moroshko (michael.moroshko@gmail.com)
	January 12th, 2012
*/

(function($) {
	$.fn.mmSelect = function(options) {
		var defaults = { optionsWrapper: null,
		                 onOptionSelected: null,
		                 onOpen: null,
		                 onClose: null,
		                 preserveFocus: false,
		                 preserveFocusException: null,
		                 wrapperClass: "mm_select_wrapper",
		                 onOpenHideOthers: false
		               };
		var settings = $.extend({}, defaults, options);
		var body = $("body");		

		if ((settings.optionsWrapper == null) || (settings.optionsWrapper.length != 1) || (typeof settings.wrapperClass != "string")) {
			return this;
		}

		settings.optionsWrapper.hide().addClass(settings.wrapperClass).css({'z-index': '9999'});
		
		if (this.is("label")) {
			this.removeAttr("for");
		}
		
		$("> div", settings.optionsWrapper).css({cursor: "pointer"}).click(function() {
			if (settings.onOptionSelected) {
				settings.onOptionSelected.call(this);
			}
			
			settings.optionsWrapper.hide();
			
			if (settings.preserveFocus) {
				var lastFocus = body.data("lastFocus");
				
				if (!settings.preserveFocusException || (settings.preserveFocusException.index(lastFocus) == -1)) {
					lastFocus.focus();
				}
			}
		});
		
		if (settings.preserveFocus) {			
			$("input, textarea").focusout(function() {
				body.data("lastFocus", $(this));
			});
		}
		
		return this.each(function() {
			$(this).css({cursor: "pointer"}).click(function() {
				settings.optionsWrapper.toggle();
				
				if (settings.optionsWrapper.is(":visible")) {
					if (settings.onOpenHideOthers) {
						var wrappers = $("." + settings.wrapperClass);
						var ind = wrappers.index(settings.optionsWrapper);
						
						wrappers.each(function(index) {
							if (index != ind) {
								$(this).hide();
							}
						});
					}
				
					if (settings.onOpen) {
						settings.onOpen.call(this);
					}
				} else {
					if (settings.onClose) {
						settings.onClose.call(this);
					}
				}
			});
		});
	};
})(jQuery);
