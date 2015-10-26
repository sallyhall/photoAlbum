var templates = {
  imgTmpl: ["<div class='photoContainer'>",
            "<div class='photo'>",
            "<img src='albums/<%= imgURL %>' alt='<%= photoTitle %>'>",
            "</div>",
            "<div class='caption'>",
            "<p><%= photoTitle %></p>",
            "</div>",
            "</div>"].join(""),
  bigImgTmpl:["<div class='photo'>",
              "<img src='albums/<%= imgURL %>' alt='<%= photoTitle %>'>",
              "</div>"].join(""),
  albumBtnTmpl:"<button class='albumButton' rel = '<%= albumName %>'><%= albumTitle %></button>"
};
