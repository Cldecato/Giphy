$(document).ready(function() {

    var buttons = ["The Office", "Parks and Rec", "Bob's Burgers", "Archer"];

    function renderButtons() {
        $("#displayButtons").empty();
        for (var i = 0; i < buttons.length; i++) {
            var a = $("<button>");
            a.addClass("bttn");
            a.attr("data-name", buttons[i]);
            a.text(buttons[i]);
            $("#displayButtons").append(a); 
        }
    };

    function displayButtonInfo() {
        var apikey = "api_key=dc6zaTOxFJmzC"
        var tag = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?" + apikey + "&q=" + tag + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            for ( i = 0; i < response.data.length; i++) {
                var results = response.data[i];
                var displayDiv = $("<div class='display'>");
                var rating = results.rating;
                var p = $("<p>").text("Rating: " + rating);
                displayDiv.append(p);
                var stillURL = results.images.fixed_height_still.url;
                var movingURL = results.images.fixed_height.url;
                var image = $("<img>").attr("src", stillURL);
                image.attr("data-still", stillURL);
                image.attr("data-animate", movingURL);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);
                $("#images").prepend(displayDiv);
            }
        });
    }

    function animateGif() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

    $("#add-button").on("click", function(event) {
        var newButton = $("#button-input").val().trim();
        buttons.push(newButton);
        renderButtons();
    });

    $(document).on("click", ".bttn", displayButtonInfo);
    $(document).on("click", ".gif", animateGif);

    renderButtons();

})