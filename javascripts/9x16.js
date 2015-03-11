/* ************************************************************************************
 * Modify the z-index of the video controls to make them apear over the letterboxing. *
 * ************************************************************************************/

document.write('<style>\n\tvideo::-webkit-media-controls-panel{\n\t\tz-index:2147483647;\n\t}\n</style>');

/* **************
 * BEGIN JQUERY *
 * **************/

$(function(){


  /* ******************
   * HELPER FUNCTIONS *
   * ******************/
  var makeVideoContainer = function(dimensions){
    return '<div class="vjs-container" style="position:relative;height:' + dimensions[1] + 'px"></div>'; 
  };
  var makeOverlayContainer = function(dimensions){
    return '<div class="vjs-overlay" style="position:absolute;"></div>';
  };
  var makeLeftBar = function(dimensions){
    return '<div style="position:absolute;left:0;width:' + dimensions[0]/3 + 'px;height:' + dimensions[1] + 'px;background-color:#000;z-index:300000;"></div>';
  };
  var makeRightBar = function(dimensions){
    return '<div style="position:absolute;right:0;width:' + dimensions[0]/3 + 'px;height:' + dimensions[1] + 'px;background-color:#000;z-index:300000;"></div>';
  };
  var getDimensions = function($video){
    return [$video.innerWidth(), $video.innerHeight()];
  };

  /* ***************************************************************
   * EVENT FUNCTION                                                *
   * Takes the video element and overlays letter boxing.           *
   * ***************************************************************/

  var overlay = function(event){
    
    // gets the video and its dimensions 
    var $vid = $(this);
    var dimensions = getDimensions($vid);
    
    // creates video container
    var container = makeVideoContainer(dimensions); 

    // creates a letterbox overlay container
    var overlay = makeOverlayContainer(dimensions); 
    
    // calculates the vertical dimensions
    var verticalRatio = (dimensions[1] / dimensions[0]);

    // add video to container
    $vid.wrap(overlay); 
    $('.vjs-overlay').wrap(container); 

    $('.vjs-overlay').prepend(makeLeftBar(dimensions));
    $('.vjs-overlay').prepend(makeRightBar(dimensions));
  };

  /* ********************************************************
   * DEFAULT CODE                                           *
   * Loops through all the video elements and resizes them. *
   * ********************************************************/
  
  // Get the HTML5 video elements
  var videos = Array.prototype.slice.call(document.getElementsByTagName('video')); 

  for(var i = 0; i < videos.length; i++){
    var $vid = $(videos[i]);
    if(!$vid.hasClass('no-please-no') && 
       !($vid).hasClass('not-me-please') &&
       !($vid).hasClass('oh-spare-me')){
      videos[i].addEventListener('loadedmetadata', overlay);
    }
  }

});
