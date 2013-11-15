(function($) {
	$.fn.simpleSlide = function(settings){
		var options = {
			"duration":3500,
			"autoplay":false,
			"pauseonhover":true,
			"prev":".prev",
			"next":".next",
			"pause":".pause",
			"effect":"fade",
			"speed":"slow",
			"index":0,
			"spy":false,
			"spycontainer":"#spycontainer",
			"spyactiveclass":"spyactive",
			"spycontaineroverwrite":true,
			"activeclass":"active",
			"debugmode":true,
			"touchminx":20,
			"touchminy":20,
			"touchswipe":true
		}

		if (settings){
	 		$.extend(options, settings);
	 	}

			this.each(function(){
				var slideshow;
				var index = options.index;
				var element = $(this);
				var child = element.children();
				var totalChild = child.size();

				//All starts from here
				debugMessage("Welcome to SimpleSlide v1 by Raghunath J");

				//Hide all except default one
				child.hide().eq(index).show();

				//Enable spy if required
				spy();

				//Enable autoplay if on
				if(options.autoplay){
					debugMessage("Autoslide show is enabed. And Duration for next change is: "+options.duration);
					startSlideShow();
				}

				$(options.next).click(function(e){
					e.preventDefault();
					debugMessage("User clicked Next");
					slide("next");
				});

				$(options.prev).click(function(e){
					e.preventDefault();
					debugMessage("User clicked Prev");
					slide("prev");
				});

				$(options.pause).click(function(e){
					e.preventDefault();
					stopSlideShow();
				});

				//Code for handeling touchdevice
				var sx,sy;
				var sliding = false;

				if(options.touchswipe){
					this.addEventListener('touchstart',onTouch, false);	
				}
    	 		
    		 	function removeTouch(){
    		 		this.removeEventListener('touchmove', onTouchMove);
		    		sx = null;
		    		sliding = false;
    		 	}

    	 		function onTouch(e){
    	 			debugMessage("User is using mobile device and doing touch event");
    	 			if (e.touches.length == 1) {
    	 				sx = e.touches[0].pageX;
    	 				sy = e.touches[0].pageY;
    	 				sliding = true;
    	 				this.addEventListener('touchmove',onTouchMove, false);
    	 			}
    	 		}

    	 		function onTouchMove(e){
    	 			e.preventDefault();
    	 			if(sliding){
    	 				 var x = e.touches[0].pageX;
			    		 var y = e.touches[0].pageY;
			    		 var dx = sx - x;
			    		 var dy = sy - y;
			    		 if(Math.abs(dx) >= options.touchminx) {
			    		 	removeTouch();
			    		 	if(dx > 0){
			    		 		touchaction("left");
			    		 	}else{
			    		 		touchaction("right");
			    		 	}
			    		 }else if(Math.abs(dy) >= options.touchminy){
			    		 	removeTouch();
			    		 	if(dy > 0) {
		    					touchaction("down");
			    			}
			    			else {
			    				touchaction("up");
			    			}
			    		 }
    	 			}
    	 		}

    	 		function touchaction(action){
    	 			switch(action){
    	 				case "left":
    	 					debugMessage("Touch Left");
    	 					slide("next");
    	 				break;
    	 				case "right":
    	 					debugMessage("Touch Right");
    	 					slide("prev");
    	 				break;
    	 				case "up":
    	 					debugMessage("Touch Up");
    	 				break;
    	 				case "down":
    	 					debugMessage("Touch Down");
    	 				break;
    	 			}
    	 		}

				//On hover
				child.hover(function(){
					if(options.pauseonhover){
						stopSlideShow();
					}
				},function(){
					if(options.autoplay && options.pauseonhover){
						startSlideShow();
					}
				});


				function slide(navigate){
					debugMessage("Current Active Index: "+index);
					switch(navigate){
						case "next":
							if(index < totalChild - 1){
								//Keep moving next
								child.eq(index).fadeOut(options.speed).next().fadeIn(options.speed);
								index++;
							}else{
								//Reset to 1
								child.eq(index).fadeOut(options.speed);
								child.eq(0).fadeIn(options.speed);
								index = 0;
							}
						break;
						case "prev":
							if(index > 0){
								child.eq(index).fadeOut(options.speed).prev().fadeIn(options.speed);
								index--;
							}else{
								child.eq(index).fadeOut(options.speed).end().fadeIn(options.speed);
								index = totalChild - 1;
							}
						break;
					}
					spy();
				}

				function spy(){
					if(options.spy){
						//Spy is enabled	
						if (child.eq(index).attr('data-spy') !== undefined) {
							var spyAttr = child.eq(index).attr("data-spy");
							var spychild = $(options.spycontainer).children();
							spychild.removeClass(options.spyactiveclass);
							$(spyAttr).addClass(options.spyactiveclass);
						}
					}
				}

				function startSlideShow(){
					clearTimeout(slideshow);
					slideshow = setTimeout( function() {
						slide('next');
						startSlideShow();
					}, options.duration);
				}

				function stopSlideShow(){
					clearTimeout(slideshow);
				}

				function debugMessage(message){
					console.log(message);
				}



			});

		return this;
	};
})(jQuery);