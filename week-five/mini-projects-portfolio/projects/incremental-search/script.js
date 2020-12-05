(function () {
    var searchField = $(".input");
    // console.log(searchField);

    var displayResults = $(".results");

    searchField.on("input", function () {
        var userInput = searchField.val();
        $.ajax({
            url: "https://spicedworld.herokuapp.com/",
            data: {
                q: userInput,
            },
            success: function (response) {
                var currentInput = userInput;
                if (currentInput === userInput) {
                    countrySearch(response);
                    console.log("response:", response);
                } else {
                    console.log("discard this result");
                    return;
                }
            },
        });
    });

    // input
    function countrySearch(results) {
        var userInput = searchField.val();
        // var results = [];
        var htmlForCountries = "";
        for (var i = 0; i < results.length; i++) {
            htmlForCountries += "<p class='country'>" + results[i] + "</p>";
            displayResults.html(htmlForCountries);
            displayResults.css({
                width: "23vw",
                fontSize: "16px",
                cursorType: "default",
                color: "black",
                fontStyle: "Arial",
            });
        }
        //handles case for when input is cleared, results are cleared
        if (userInput.length == 0) {
            displayResults.hide();
        } else {
            displayResults.show();
        }
        //handles case of no matching results but there is user input
        var htmlForNoResults = "<p>" + "No countries found!" + "</p>";
        if (results.length === 0 && userInput.length !== 0) {
            displayResults.html(htmlForNoResults);
            displayResults.css({
                color: "slategrey",
            });
        }
    }
    // blur listener
    searchField.on("blur", function () {
        displayResults.hide();
    });

    //focus listener
    searchField.on("focus", function () {
        displayResults.show();
    });

    // mouseover, using event delegation
    displayResults.on("mouseover", ".country", function (e) {
        $(".highlight").removeClass("highlight");
        $(e.target).addClass("highlight");
    });

    // mousedown, using event delegation
    displayResults.on("mousedown", ".country", function () {
        searchField.val($(".highlight").text());
    });

    //keydown
    searchField.on("keydown", function (e) {
        var isHighlighted = $(".highlight");
        var country = $(".country");
        //when down arrow is pressed, navigate through the results downwards
        if (e.which === 40) {
            if (
                isHighlighted.length === 0 ||
                country.last().hasClass("highlight")
            ) {
                country.first().addClass("highlight");
            }
            if (isHighlighted.length != 0) {
                isHighlighted.next().addClass("highlight");
                isHighlighted.removeClass("highlight");
            }
        }
        //when up arrow is pressed, navigate through the results upwards
        if (e.which === 38) {
            if (
                isHighlighted.length === 0 ||
                country.first().hasClass("highlight")
            ) {
                country.last().addClass("highlight");
            }
            if (isHighlighted.length != 0) {
                isHighlighted.prev().addClass("highlight");
                isHighlighted.removeClass("highlight");
            }
        }
        //when enter key is pressed, populate input field with highlighted value unless it is "No countries found"
        if (e.keyCode === 13 && $("p").hasClass("country")) {
            searchField.val($(".highlight").text());
        }
    });
})();
