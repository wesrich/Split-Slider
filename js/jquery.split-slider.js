/* 
 * Copyright (C) 2012, Wes Rich, Pyxl, Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the "Software"), to deal 
 * in the Software without restriction, including without limitation the rights 
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
 * of the Software, and to permit persons to whom the Software is furnished to do 
 * so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all 
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function($) {
	$(function() {
	
		$.fn.splitSlider = function(options) {
			var $me = this;
			var defaults = {
				numVisible: 5,			// Includes middle slide, if used.
				width: 168,				// Element width, do not include borders.
				height: 220,
				borderWidth: 2,			// Border width, if any. (Total for left + right border.)
				leftArrow: 'arrow_left.png',
				rightArrow: 'arrow_right.png',
				showMiddle: true,
				middleDiv: '.middle-slide',
				slideList: '.slides',
				slideOutOverflow: 40,	// Pixels to slide past the outside of our slider.
				slideEasing: 'linear',
				autoSlide: false,
				autoSlideTimeout: 4000,	// Time between automagic slide transitions.
				duration: 1200
			}
			var options = $.extend(defaults, options);
			var numLeft, slideDiv, origSlideContent, leftSlideOut, rightSlideOut, currentSlidePosition;
			currentSlidePosition = 0;	// Start at Slide "0" position.
			
			// Hide the pre-existing elements.
			this.find(options.middleDiv).hide();
			this.find(options.slideList).hide();
			origSlideContent = this.find(options.slideList);
			
			// Define our slide functions!
			var slideAction = function() {
				// Slide out... Then set content...
//				console.log(currentSlidePosition);
				slideDiv.find(".slide.left")
					.animate({
						left: "-="+leftSlideOut+"px"
					}, options.duration, options.slideEasing);
				slideDiv.find(".slide.right")
					.animate({
						right: "-="+rightSlideOut+"px"
					}, options.duration, options.slideEasing, function() {
						setSlideContent(currentSlidePosition)
					});
				// And then slide back in.
				slideDiv.find(".slide.left")
					.animate({
						left: "+="+leftSlideOut+"px"
					}, options.duration, options.slideEasing);
				slideDiv.find(".slide.right")
					.animate({
						right: "+="+rightSlideOut+"px"
					}, options.duration, options.slideEasing);
				return true;
			}
			
			// Slide left or right (arrow click functions). There's probably a better way to account for "Middle"....
			this.slideLeft = function() {
				currentSlidePosition -= options.numVisible;
				if (options.showMiddle === true) {
					currentSlidePosition += 1;		// Go back one, because we're talking slide positions - we don't want to include Middle.
				}
				if (currentSlidePosition < 0) {		// If we've reached the beginning, go to the end.
					currentSlidePosition += origSlideContent.children().length;
					if (options.showMiddle === true) {
						currentSlidePosition += 1;	// Go back one, because we're talking slide positions - we don't want to include Middle.
					}
				}
				slideAction();
				return true;
			}
			
			this.slideRight = function(autoMagic) {
				currentSlidePosition += options.numVisible;
				if (options.showMiddle === true) {
					currentSlidePosition -= 1;		// Go back one, because we're talking slide positions - we don't want to include Middle.
				}
				if (currentSlidePosition > origSlideContent.children().length) {	// If we've reached the end, go to the beginning.
					currentSlidePosition -= origSlideContent.children().length;
					if (options.showMiddle === true) {
						currentSlidePosition -= 1;		// Go back one, because we're talking slide positions - we don't want to include Middle.
					}
				}
				slideAction();
				if ((autoMagic === true) && (options.autoSlide === true)) {
					this.slideTimer = setTimeout(function() { $me.slideRight(true) }, (options.autoSlideTimeout + options.duration));
				}
				return true;
			}
			
			this.autoSlide = function(doAutoSlide) {		// .autoSlide(); or .autoSlide(false); // true or false values
				if (!((doAutoSlide === true) || (doAutoSlide === false))) {
					doAutoSlide = true;
				}
				options.autoSlide = doAutoSlide;
				if ((doAutoSlide === true) && (!this.slideTimer)) {
					this.slideRight(true);
				}
				if (doAutoSlide === false) {
					clearTimeout(this.slideTimer);
					this.slideTimer = null;
				}
				return doAutoSlide;
			}
			
			// Function to set content.
			var setSlideContent = function(slideContentPos) {
				slideDiv.find(".slide").each(function(intIndex) {
					if (slideContentPos > origSlideContent.children().length - 1) {
						slideContentPos = 0;
					}
					if ($(this).hasClass('middle') === false) {
						$(this).html(origSlideContent.children().eq(slideContentPos).html());
						slideContentPos++;
					}
				});
				return true;
			}
			
			// Set up the Navigation Arrows.
			this.append('<div id="nav-left"><a href="#"><img src="'+options.leftArrow+'" alt="&lt;" /></a></div>')
				.append('<div id="nav-right"><a href="#"><img src="'+options.rightArrow+'" alt="&gt;" /></a></div>')
				.append('<div id="splitSlider"></div>');
			slideDiv = this.find("#splitSlider");
			this.find("#nav-left a").click(function(e) {
				e.preventDefault();
				$me.slideLeft();
			});
			this.find("#nav-right a").click(function(e) {
				e.preventDefault();
				$me.slideRight();
			});
			
			this.find("#nav-left").css({
				'height': options.height+'px',
				'float': "left",
				'display': "table"
			}).find("a").css({
				'display': "table-cell",
				'vertical-align': "middle"
			});
			this.find("#nav-right").css({
				'height': options.height+'px',
				'float': "right",
				'display': "table"
			}).find("a").css({
				'display': "table-cell",
				'vertical-align': "middle"
			});
			
			// Create divs for slides.
			if (options.showMiddle === true) {
				numLeft = Math.floor(options.numVisible / 2);
			} else {
				numLeft = Math.ceil(options.numVisible / 2);
			}
			for (var nSlides=1; nSlides<=options.numVisible; nSlides++) {
				if (nSlides <= numLeft) {
					slideDiv.append('<div class="slide left" id="'+nSlides+'"></div>');
				} else if ((options.showMiddle === true) && (nSlides == numLeft+1)) {
					slideDiv.append('<div class="slide middle" id="'+nSlides+'"></div>');
				} else {
					slideDiv.append('<div class="slide right" id="'+nSlides+'"></div>');
				}
			}
			
			// Determine initial placement styles.
			var initializeContentPos = 0;
			slideDiv.css({
				position: "relative",
				overflow: "hidden",
				height: options.height+'px'
			}).find(".slide").css({
				position: "absolute",
				height: options.height+'px',
				width: options.width+'px'
			}).each(function(intIndex) {
				if (($(this).hasClass('left') === true) || ($(this).hasClass('middle') === true)) {
					var currPosition = intIndex * (options.width + options.borderWidth);
					$(this).css({
						left: currPosition+'px'
					});
				} else if ($(this).hasClass('right') === true) {
					var currPosition = (options.numVisible - intIndex - 1) * (options.width + options.borderWidth);
					$(this).css({
						right: currPosition+'px'
					});
				}
			});
			// Set initial content.
			setSlideContent(0);
			
			// Fill in the "Middle" slide, if applicable.
			if (options.showMiddle === true) {
				slideDiv.find(".slide.middle").html(this.find(options.middleDiv).html());
			}
			
			// Determine width of animation.
			leftSlideOut = (slideDiv.find(".slide.left").length * (options.width + options.borderWidth)) + options.slideOutOverflow;
			rightSlideOut = (slideDiv.find(".slide.left").length * (options.width + options.borderWidth)) + options.slideOutOverflow;
			
			if (options.autoSlide === true) {
				this.slideTimer = setTimeout(function() { $me.slideRight(true) }, options.autoSlideTimeout);
			}
			this.hover(function() {
				clearTimeout($me.slideTimer);
			}, function() {
				if ((options.autoSlide === true)) {
					$me.slideTimer = setTimeout(function() { $me.slideRight(true) }, options.autoSlideTimeout);
				}
			});
			
			// Wrap it up!
			return this;
		}
	
	});
})(jQuery);