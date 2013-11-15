(function($) {
	$.fn.simpleSlide = function(settings){
		var options = {
			"duration":3500,
			"autoplay":false,
			"pauseonhover":true,
			"prev":".prev",
			"next":".next",
			"pause":".pause",
			"mode":"fade",
			"speed":"slow",
			"index":0,
			"spy":false,
			"spycontainer":"#spycontainer",
			"spyactiveclass":"spyactive",
			"spycontaineroverwrite":true,
			"activeclass":"active",
			"debugmode":true
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