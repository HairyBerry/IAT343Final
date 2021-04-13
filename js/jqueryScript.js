;(function($, win) {
  $.fn.inViewport = function(cb) {
     return this.each(function(i,el){
       function visPx(){
         var H = $(this).height(),
             r = el.getBoundingClientRect(), t=r.top, b=r.bottom;
         return cb.call(el, Math.max(0, t>0? H-t : (b<H?b:H)));
       } visPx();
       $(win).on("resize scroll", visPx);
     });
  };
}(jQuery, window));

$(document).ready(function() {

  		//Elements to loop through
  		var elem = $('.ani');
  		//Start at 0
  		i = 0;

function getMessage() {

	  		//Loop through elements
	  		$(elem).each( function(index) {

	  			if ( i == index ) {
	  				//Show active element
            $(this).inViewport(function(px){
                if(px) {
                  $(this).addClass("triggered")
                } ;
            });

	  			} else if ( i == $(elem).length ) {
	  				//Show message
            $(this).inViewport(function(px){
                if(px) {
                  $(this).addClass("triggered")
                } ;
            });

	  				//Reset i lst number is reached
	  				i = 0;
	  			}
	  		});

	  		i++;

  		}

  		//Run once the first time
  		getMessage();

  		//Repeat
  		window.setInterval(getMessage, 500);

  	});
