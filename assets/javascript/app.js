var topics = ["Rocko's Modern Life", "Rugrats", "Gargoyles", "Spongebob Squarepants", "Rocket Power", 
            "Doug", "Hey Arnold", "Pinky and the Brain", "Recess", "Dexter's Laboratory", "Johnny Bravo", 
            "Animaniacs", "Aaahh! Real Monsters"];

function displayTopics() {
    for(var i = 0; i < topics.length; i++) {
        $("#button-display").append("<button class='topicButton' data-show='" + topics[i] + "'>" + topics[i]);
    }
}

window.onload = function() {
    displayTopics();

$(".topicButton").click(function() {
    var show = $(this).attr("data-show");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=I4bpXlBczoqG3JxTJEtTAqNKGM8cpixf&limit=10";
    $.ajax({
        url: queryURL,
        method: 'get'
    }).then(function(response) {
        var gifArray = response.data; 
        console.log(gifArray);
      for(var i = 0; i < gifArray.length; i++) {
          var gifDiv = $("<div>");
         // $("#gif-display").append("<img src='" + gifArray[i].images.fixed_height_still.url + "' id='gif" + i + "'>");
          //$("#gif" + i).attr("gif-state", "still");
          //$("#gif" + i).attr("gif-still", gifArray[i].images.fixed_height_still.url);
          //$("#gif" + i).attr("gif-active", gifArray[i].images.fixed_height.url);
          //$("#gif" + i).attr("class", "gif");
          var gifImg = $("<img>");
          gifImg.attr("src", gifArray[i].images.fixed_height_still.url);
          gifDiv.append(gifImg);
          $("#gif-display").append(gifDiv);
          $(gifImg).attr("id", "gif" + i);
          $(gifImg).attr("class", "gif");
          $(gifImg).attr("gif-state", "still");
          $(gifImg).attr("gif-active", gifArray[i].images.fixed_height.url);
          $(gifImg).attr("gif-still", gifArray[i].images.fixed_height_still.url);
        }
    })
})
$("body").on("click", ".gif", function() {
    var state = $(this).attr("gif-state");
    console.log("click");
    console.log(state);
    if (state === "still") {
        $(this).attr("src", $(this).attr("gif-active"));
        $(this).attr("gif-state", "active");
    } else {
        $(this).attr("src", $(this).attr("gif-still"));
        $(this).attr("gif-state", "still");
    }
})
}