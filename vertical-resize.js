$(function(){
  var videos = Array.prototype.slice.call(document.getElementsByTagName('video')); 

  /*
   * HELPER FUNCTIONS
   */
  var makeContainer = function(dimensions){
    return '<div style="width:' + dimensions[0] + 'px; height:' + dimensions[1] + 'px; background: black;"></div>';
  };
  var getDimensions = function($video){
    return [$video.innerWidth(), $video.innerHeight()];
  };

  /*
   * EVENT FUNCTION
   * Takes the video element and resize it to swap the dimensions.
   */
  var resize = function(event){
    
    // gets the video and its width
    var $vid = $(this);
    var dimensions = getDimensions($vid);
    
    // creates a letterbox container
    var container = makeContainer(dimensions); 
    
    // calculates the vertical dimensions
    var verticalRatio = (dimensions[1] / dimensions[0]) / 1.3;

    // resizes the video
    $vid.css({
      'transform': 'scaleX(' + verticalRatio + ')',
      '-webkit-transform': 'scaleX('+ verticalRatio + ')',
      '-moz-transform': 'scaleX(' + verticalRatio + ')',
    });
   
    // add video to container
   $vid.wrap(container); 

  };

  /*
   * DEFAULT CODE
   * Loops through all the video elements and resizes them.
   */
    for(var i = 0; i < videos.length; i++){
      videos[i].addEventListener('loadedmetadata', resize);
    }

});
