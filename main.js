
//default: show first picture from each album, with album labels
var imgTemplate = _.template($("#imgTmpl").html());
var buttonTemplate = _.template($("#albumBtnTmpl").html());
var mainText = "";
var buttonText = "";

$(document).ready(function(){
  displayAlbumCovers();
});

//when you click an album cover, hide the albums and show the pictures in that album
var bindAlbumClickEvent = function () {
  $(".albums img").on("click",function (event) {
    event.preventDefault();
    $(".albums").addClass("hidden");
    $("aside").removeClass("hidden");
    $(".photos").removeClass("hidden");
    $(".photos").html("");
    var displayedAlbumName = $(this).attr('src').split("/")[1];
    displayAlbum(displayedAlbumName);
  });
};

var bindButtonClickEvent = function() {
  $("button").on("click",function (event) {
    event.preventDefault();
    $(".photos").html("");
    var displayedAlbumName = $(this).attr("rel");
    displayAlbum(displayedAlbumName);
  });
};

var bindPhotoClickEvent = function(){
  $(".photos img").on("click",function(event) {
    event.preventDefault();
    displayPhoto($(this).parent());
  });
};

var displayAlbumCovers = function(){
    _.each(albums,function (album) {
      mainText = imgTemplate(album.photos[0]);
      buttonText = buttonTemplate(album);
      $(".albums").append(mainText);
      //change image caption to album title
      $( "p:last" )[0].textContent=album.albumTitle;
      $("aside").append(buttonText);
    });
    $("aside").addClass("hidden");
    bindButtonClickEvent();
    bindAlbumClickEvent();
};

var displayAlbum = function(albumName){
  var displayedAlbum = _.filter(albums,function (album) {
    return (album.albumName === albumName);
  })[0];
  _.each(displayedAlbum.photos, function (photo) {
    mainText = imgTemplate(photo);
    $(".photos").append(mainText);
  });
  bindPhotoClickEvent();
  buttonText = buttonTemplate(displayedAlbum);
  $(".photos").removeClass("hidden");
  $("aside").removeClass("hidden");
  $(".photoDetails").addClass("hidden");
  $(".photoDetails").html(buttonText);
  $(".photoDetails button").prepend("Back to ");
  bindButtonClickEvent();
};

var displayPhoto = function (photoText) {
  $(".photos").addClass("hidden");
  $(".photoDetails").removeClass("hidden");
  $(".photoDetails").append(photoText);
  $("aside").addClass("hidden");
};
