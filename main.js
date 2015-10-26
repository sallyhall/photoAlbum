var imgTemplate = _.template($("#imgTmpl").html());
var buttonTemplate = _.template($("#albumBtnTmpl").html());
var bigImgTemplate = _.template($("#bigImgTmpl").html());
var mainText = "";
var buttonText = "";

//when the page loads, display album covers
$(document).ready(function(){
  displayAlbumCovers();
});

//when you click an album cover, hide the albums and show the pictures in that album
var bindAlbumClickEvent = function () {
  $(".albums img").on("click",function (event) {
    event.preventDefault();
    //get album name from album cover url
    var displayedAlbumName = $(this).attr('src').split("/")[1];
    displayAlbum(displayedAlbumName);
  });
};

//when you click an album button, display that album
var bindButtonClickEvent = function() {
  $(".albumButton").on("click",function (event) {
    event.preventDefault();
    //get album name from button rel
    var displayedAlbumName = $(this).attr("rel");
    displayAlbum(displayedAlbumName);
  });
};


//when you click a photo in an album, display that photo large
var bindPhotoClickEvent = function(){
  $(".photos img").on("click",function(event) {
    event.preventDefault();

    //retrieve the album that contains the photo
    var displayedAlbum = _.find(albums,function (album) {
      return (album.albumTitle === $(".pageTitle").text());
    });
    //find which photo index tis photo is in that album
    var photoIndex = $(".photos").children().index($(this).parent().parent());
    //display the photo detail
    displayPhoto(displayedAlbum,photoIndex);
    //set header text to photo title
    $(".pageTitle").text($(this).attr("alt"));
    //format header
    $("header").css({
      "background-color": "darkgray",
      "width":"100%"
    });
    $("body").css("background-color","darkgray");
  });
};

var displayAlbumCovers = function(){
  //displays albums page, hides sidebar, resets sidebar text
  $("aside").addClass("hidden");
  $(".albums").removeClass("hidden");
  $("aside").html("");

  //for each album, format cover image and add to page.
  _.each(albums,function (album) {

    mainText = imgTemplate(album.photos[0]);
    $(".albums").append(mainText);

    //format buttontext and add to sidebar
    buttonText = buttonTemplate(album);
    $("aside").append(buttonText);

    //change image caption to album title
    $( "p:last" )[0].textContent=album.albumTitle;
  });

  //add return home button to sidebar
  $("aside").append("<button class = 'returnHome'>Home</button>");

  //set return home on click event
  $(".returnHome").on("click",function (event) {
    event.preventDefault();
    //display album covers
    displayAlbumCovers();

    //reset styling for header
    $("body").css("background-color","white");
    $("header").css({
      "color": "white",
      "width": "100%",
      "background-color": "black",
      "float": "none",
      "margin-top": "0",
      "padding-bottom": "30px"
    });
    $(".pageTitle").text("My Albums");
  });
  //bind click events for buttons and album cover
  bindButtonClickEvent();
  bindAlbumClickEvent();
};

var displayAlbum = function(albumName){
  //hide albums page and photodetails page, show photos page and sidebar. reset
  //photos page html
  $(".albums").addClass("hidden");
  $(".photoDetails").addClass("hidden");
  $(".photos").removeClass("hidden");
  $("aside").removeClass("hidden");
  $(".photos").html("");

  //retrieve album object for the given album name
  var displayedAlbum = _.find(albums,function (album) {
    return (album.albumName === albumName);
  });

  //for each photo in the album, create image template and append to photo page
  _.each(displayedAlbum.photos, function (photo) {
    mainText = imgTemplate(photo);
    $(".photos").append(mainText);
  });
  //bind photo click event to all pictures
  bindPhotoClickEvent();
  //set page header to album title
  $(".pageTitle").text(displayedAlbum.albumTitle);
  //format header/body css
  $("body").css("background-color","black");
  $("header").css({
    "color": "black",
    "width": "85%",
    "background-color": "white",
    "float": "right",
    "margin-top": "0",
    "padding-top": "30px"
  });
};

var displayPhoto = function (displayedAlbum,photoIndex) {
  //hide photos page and sidebar, display photo detail page
  $(".photos").addClass("hidden");
  $(".photoDetails").removeClass("hidden");
  $("aside").addClass("hidden");
  //clear html from photo detail page
  $(".photoDetails").html("");

  //create back to album button, and bind event to it
  buttonText = buttonTemplate(displayedAlbum);
  $(".photoDetails").html(buttonText);
  $(".photoDetails button").prepend(" < Back to ");
  bindButtonClickEvent();

  //create image html and add to page
  $(".photoDetails").append(bigImgTemplate(displayedAlbum.photos[photoIndex]));
  //create left and right nave buttons and add to page
  $(".photoDetails").prepend("<div class='rightnav'>></div>");
  $(".photoDetails").prepend("<div class='leftnav'><</div>");
  //add events to left and right nav buttons
  $(".rightnav").on("click",function(){
    if (photoIndex===displayedAlbum.photos.length-1){
      displayPhoto(displayedAlbum,0);
    }else{
      displayPhoto(displayedAlbum,photoIndex+1);
    }
  });
  $(".leftnav").on("click",function(){
    if (photoIndex===0){
      displayPhoto(displayedAlbum,displayedAlbum.photos.length-1);
    }else{
      displayPhoto(displayedAlbum,photoIndex-1);
    }
  });
};
