/**
 * Copyright 2013 David DESVAUX
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function($) {

	var microPicker = {

		isLmbDown: false,

		formatHsl: function(hue, format) {
			return format
				.replace('{H}', Math.round(hue * 100) / 100)
				.replace('{S}', 100)
				.replace('{L}', 50);
		}
	};

	$.fn.microPicker = function(options) {

		var $picker = $(this).first();

		var settings = $.extend({
			initial: 0,
			format: 'hsl({H},{S}%,{L}%)',
		}, options);

		var $input = null;

		if(settings.input && ! settings.input.jquery) {
			$input = $(settings.input)
				.attr('value', microPicker.formatHsl(settings.initial, settings.format));
		}

		$(window).on({
			mouseup: function() { microPicker.isLmbDown = false; },
			mousedown: function() { microPicker.isLmbDown = true; }
		});

		var handler = function(e) {

			var formatted, hue;

			if($picker.hasClass('Horizontal')) {
				hue = ((e.pageX - $picker.offset().left) / $picker.width()) * 360;
			}else if($picker.hasClass('Vertical')) {
				hue = ((e.pageY - $picker.offset().top) / $picker.height()) * 360;
			} else {
				throw 'One of the following CSS classes is required : "Horizontal", "Vertical"';
			}

			if($input || settings.callback) {
				formatted = microPicker.formatHsl(hue, settings.format);
				if($input) {
					input.attr('value', formatted);
				}
				if(settings.callback) {
					settings.callback(e, { h: hue, s: 100, l: 50, hsl: formatted });
				}
			}
		};

		return this.on({
			mousemove: function(e) {
				if(microPicker.isLmbDown) {
					handler(e);
				}
			},
			mouseup: handler
		});
	};

})(jQuery);