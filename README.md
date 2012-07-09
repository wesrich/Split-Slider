Split Slider
==================================================

This jQuery plugin was written to allow a Slide effect for elements from both the left and right at the same time (half of the elements slide out/in from the left, the other half from the right).


An in-depth explanation of all plugin options and their defaults is included in the index.html.

The index.html file also includes a working demo of the plugin.


Requirements
--------------------------------------
This plugin was developed on jQuery 1.7.1. Other versions may work, but have not been tested!


Basic Usage
--------------------------------------
To initialize the slider with the default options, simply run the following function on the div containing your slider elements.
```js
$("#split-slider-demo").splitSlider();
```

The default options are:
```js
var defaults = {
	numVisible: 5,						// Includes middle slide, if used.
	width: 168,							// Element width, do not include borders.
	height: 220,
	borderWidth: 2,						// Border width, if any. (Total for left + right border.)
	leftArrow: 'arrow_left.png',
	rightArrow: 'arrow_right.png',
	showMiddle: true,
	middleDiv: '.middle-slide',
	slideList: '.slides',
	slideOutOverflow: 40,				// Pixels to slide past the outside of our slider.
	slideEasing: 'linear',
	autoSlide: false,
	autoSlideTimeout: 4000,				// Time between automagic slide transitions.
	duration: 1200
}
```
