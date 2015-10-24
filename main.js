
//default: show first picture from each album, with album labels
var imgTemplate = _.template($("#imgTmpl").html());
var buttonTemplate = _.template($("#albumBtnTmpl").html());
var bigImgTemplate = _.template($("#bigImgTmpl").html());
var mainText = "";
var buttonText = "";

$(document).ready(function(){
  displayAlbumCovers();
});

//when you click an album cover, hide the albums and show the pictures in that album
var bindAlbumClickEvent = function () {
  $(".albums img").on("click",function (event) {
    event.preventDefault();
    var displayedAlbumName = $(this).attr('src').split("/")[1];
    displayAlbum(displayedAlbumName);
  });
};

var bindButtonClickEvent = function() {
  $(".albumButton").on("click",function (event) {
    event.preventDefault();
    var displayedAlbumName = $(this).attr("rel");
    displayAlbum(displayedAlbumName);
  });
};

var bindPhotoClickEvent = function(){
  $(".photos img").on("click",function(event) {
    event.preventDefault();
    var displayedAlbum = _.find(albums,function (album) {
      return (album.albumTitle === $(".pageTitle").text());
    });
    var photoIndex = $(".photos").children().index($(this).parent().parent());
    // displayPhoto($(this).parent());
    displayPhoto(displayedAlbum,photoIndex);
    $(".pageTitle").text($(this).attr("alt"));
    $("header").css({
      "background-color": "darkgray",
      "width":"100%"
    });
    $("body").css("background-color","darkgray");
  });
};

var displayAlbumCovers = function(){
    $("aside").html("");
    _.each(albums,function (album) {
      mainText = imgTemplate(album.photos[0]);
      buttonText = buttonTemplate(album);
      $(".albums").append(mainText);
      //change image caption to album title
      $( "p:last" )[0].textContent=album.albumTitle;
      $("aside").append(buttonText);
    });
    $("aside").append("<button class = 'returnHome'>Home</button>");
    $(".returnHome").on("click",function (event) {
      event.preventDefault();
      displayAlbumCovers();
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
    $("aside").addClass("hidden");
    $(".albums").removeClass("hidden");
    bindButtonClickEvent();
    bindAlbumClickEvent();
};

var displayAlbum = function(albumName){
  $(".photos").html("");
  var displayedAlbum = _.find(albums,function (album) {
    return (album.albumName === albumName);
  });
  _.each(displayedAlbum.photos, function (photo) {
    mainText = imgTemplate(photo);
    $(".photos").append(mainText);
  });
  bindPhotoClickEvent();
  // buttonText = buttonTemplate(displayedAlbum);
  $(".albums").addClass("hidden");
  $(".photoDetails").addClass("hidden");
  $(".photos").removeClass("hidden");
  $("aside").removeClass("hidden");
  // $(".photoDetails").html(buttonText);
  // $(".photoDetails button").prepend(" < Back to ");
  // bindButtonClickEvent();
  $(".pageTitle").text(displayedAlbum.albumTitle);
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
  $(".photoDetails").html("");
  buttonText = buttonTemplate(displayedAlbum);
  $(".photoDetails").html(buttonText);
  $(".photoDetails button").prepend(" < Back to ");
  bindButtonClickEvent();
  $(".photos").addClass("hidden");
  $(".photoDetails").removeClass("hidden");
  $(".photoDetails").append(bigImgTemplate(displayedAlbum.photos[photoIndex]));
  $("aside").addClass("hidden");
  $(".photoDetails").prepend("<div class='rightnav'>></div>");
  $(".photoDetails").prepend("<div class='leftnav'><</div>");
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
