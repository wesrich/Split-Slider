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
	height: 220,						// Element height, not including borders.
	borderWidth: 2,						// Border width, if any. (Total for left + right border.)
	leftArrow: 'arrow_left.png',		// <img src> for Left side arrow image.
	rightArrow: 'arrow_right.png',		// <img src> for Right side arrow image.
	showMiddle: true,					// Show a static, non-moving middle element.
	middleDiv: '.middle-slide',			// ID/Class name for element containing static, non-moving middle, if used.
	slideList: '.slides',				// ID/Class name for element containing moving slides.
	slideOutOverflow: 40,				// Pixels to slide past the outside of our slider.
	slideEasing: 'linear',				// Easing functionality - untested, but there's no real reason it shouldn't work?
	autoSlide: false,					// Turn Auto-Slide on/off
	autoSlideTimeout: 4000,				// Time between automagic slide transitions.
	duration: 1200						// Length of animation
}
```

Advanced Usage
--------------------------------------
Storing the slider as a variable can allow for calling some additional functions.
```js
mySlider = $("#split-slider-demo").splitSlider({
	leftArrow: 'images/arrow_left.jpg',
	rightArrow: 'images/arrow_right.jpg'
});
```

The plugin provides the ability to programatically simulate clicking on the left / right arrows:
```js
mySlider.slideLeft();		// Simulates clicking the "Left" arrow.
mySlider.slideRight();		// Simulates clicking the "Right" arrow.
```

In addition, the ability to turn on or off Auto-Slide is available:
```js
	// These both start Auto-Slide, if it's not activate already.
mySlider.autoSlide();
mySlider.autoSlide(true);

	// And this turns it off.
mySlider.autoSlide(false);
```
