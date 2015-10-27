var albumPage = {
  init: function () {
    albumPage.styling();
    albumPage.events();
  },
  events: function () {
    //when you click an album cover, hide the albums and show the pictures in that album
    $(".albums").on("click","img",function (event) {
      event.preventDefault();
      //get album name from album cover url
      var displayedAlbumName = $(this).attr('src').split("/")[1];
      albumPage.displayAlbum(displayedAlbumName);
    });
    //when you click an album button, display that album
    $("aside").on("click","button",function (event) {
      event.preventDefault();
      if ($(this).hasClass("returnHome")){
        event.preventDefault();
        //display album covers
        albumPage.displayAlbumCovers();
        albumPage.formatHeader("covers");
      }else{
        //get album name from button rel
        var displayedAlbumName = $(this).attr("rel");
        albumPage.displayAlbum(displayedAlbumName);
      }
    });
    //when you click on the return to album button, display the album
    $(".photoDetails").on("click","button",function (event) {
      event.preventDefault();
      //get album name from button rel
      var displayedAlbumName = $(this).attr("rel");
      albumPage.displayAlbum(displayedAlbumName);
    });
    //when you click a photo in an album, display that photo large
    $(".photos").on("click","img",function(event) {
      event.preventDefault();

      //retrieve the album that contains the photo
      var displayedAlbum = _.find(albums,function (album) {
        return (album.albumTitle === $(".pageTitle").text());
      });
      var photoIndex;
      var clickedPhoto = $(this);
      //find which photo index this photo is in that album
      _.each(displayedAlbum.photos,function (element, index,array) {
        console.log(clickedPhoto.attr("src"));
        if ("albums/"+element.imgURL===clickedPhoto.attr("src")){
           photoIndex = index;
        }
      });

      //display the photo detail
      albumPage.displayPhoto(displayedAlbum,photoIndex);
      albumPage.createNavArrows(displayedAlbum,photoIndex);
      //set header text to photo title
      $(".pageTitle").text($(this).attr("alt"));
      albumPage.formatHeader("photoDetail");
    });
    $(".photoDetails").on("click",".nav",function(){
      var clickedImage = $(this)[0];
      photoIndex = Number(clickedImage.id);
      var displayedAlbum = _.find(albums,function (album) {
        return (album.albumName === clickedImage.attributes.rel.value);
      });
      if($(clickedImage).hasClass("rightnav")){
        if (photoIndex===displayedAlbum.photos.length-1){
          photoIndex=0;
        }else{
          photoIndex++;
        }
      } else{
        if (photoIndex===0){
          photoIndex=displayedAlbum.photos.length-1;
        }else{
          photoIndex--;
        }
      }
      albumPage.displayPhoto(displayedAlbum,photoIndex);
      albumPage.createNavArrows(displayedAlbum,photoIndex);
    });
  },
  styling: function () {
    albumPage.displayAlbumCovers();
  },
  displayAlbumCovers : function(){
    //displays albums page, hides sidebar, resets sidebar text
    albumPage.showView("albums");
    //for each album, format cover image and add to page.
    _.each(albums,function (album) {
      $(".albums").append(albumPage.loadTemplate("imgTmpl",album.photos[0]));
      //format button text and add to sidebar
      $("aside").append(albumPage.loadTemplate("albumBtnTmpl",(album)));
      //change image caption to album title
      $("p:last")[0].textContent=album.albumTitle;
    });
    //add return home button to sidebar
    $("aside").append("<button class = 'returnHome'>Home</button>");
  },
  displayAlbum : function(albumName){
   //hide albums page and photodetails page, show photos page and sidebar. reset
   //photos page html
   albumPage.showView("photos");
   //retrieve album object for the given album name
   var displayedAlbum = _.find(albums,function (album) {
     return (album.albumName === albumName);
   });
   //for each photo in the album, create image template and append to photo page
   _.each(displayedAlbum.photos, function (photo) {
     $(".photos").append(albumPage.loadTemplate("imgTmpl",(photo)));
   });
   //set page header to album title
   $(".pageTitle").text(displayedAlbum.albumTitle);
   albumPage.formatHeader("album");
  },
  displayPhoto : function (displayedAlbum,photoIndex) {
   //hide photos page and sidebar, display photo detail page
   albumPage.showView("photoDetails");

   //create back to album button, and bind event to it
   $(".photoDetails").html(albumPage.loadTemplate("albumBtnTmpl",(displayedAlbum)));
   $(".photoDetails button").prepend(" < Back to ");

   //create image html and add to page
   $(".photoDetails").append(albumPage.loadTemplate("bigImgTmpl",displayedAlbum.photos[photoIndex]));
  },
  createNavArrows : function(displayedAlbum,photoIndex){
   $(".photoDetails").prepend("<div class='nav rightnav' rel=" + displayedAlbum.albumName + " id="+photoIndex+">></div>");
   $(".photoDetails").prepend("<div class='nav leftnav'rel="+ displayedAlbum.albumName + " id="+photoIndex+"><</div>");
   //add events to left and right nav buttons
  },
  formatHeader : function(display){
    if (display==="covers"){
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
    }else if (display==="photoDetail"){
      //format header
      $("header").css({
        "background-color": "darkgray",
        "width":"100%"
      });
      $("body").css("background-color","darkgray");
    }else if (display==="album"){
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
    }
  },
  showView : function (view) {
    $(".albums").addClass("hidden");
    $(".photos").addClass("hidden");
    $(".photoDetails").addClass("hidden");
    $("aside").addClass("hidden");


    $("."+view).removeClass("hidden");
    $("."+view).html("");


    if(view==="photos"){
      $("aside").removeClass("hidden");
    }
    if(view==="albums"){
      $("aside").html("");
    }

    },
  getTemplate: function (name) {
    return _.template(templates[name]);
  },
  loadTemplate: function (name, val) {
    var tmpl = albumPage.getTemplate(name);
    return tmpl(val);
  }
};

$(document).ready(function(){
  albumPage.init();
});
