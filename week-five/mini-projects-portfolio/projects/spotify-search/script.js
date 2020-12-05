(function () {
    // console.log($);
    var artistOrAlbum = $("select").val();
    var resultsDiv = $("#results-container");
    var resultsMsg = $(".results-message");
    var userInput = $("input[name=user-input]");
    var searchButton = $("#submit-button");
    var moreButton = $("#more");
    var nextUrl;

    // hide the more buttom prior to clicking search
    moreButton.hide();

    // click handler for search button
    searchButton.on("click", function () {
        var userInput = $("input[name=user-input]").val();
        var baseUrl = "https://spicedify.herokuapp.com/spotify";

        $.ajax({
            url: baseUrl,
            method: "GET",
            data: {
                query: userInput,
                type: artistOrAlbum,
            },
            success: function (response) {
                console.log(response);

                response = response.artists || response.albums;
                resultsDiv.html(getResultsHtml(response.items));
                resultsMsg.html(resultsMessage(response.items));
                handleNextUrl(response.next);
                checkScrollPos();
            }, // closes ajax success property
        });
    });

    $(document).on("click", "#more", function () {
        nextResponse();
    });

    //function to make sewuential requests to the API for more results
    function nextResponse() {
        $.ajax({
            url: nextUrl,
            method: "GET",
            success: function (response) {
                console.log("response log:", response);
                response = response.artists || response.albums;
                resultsDiv.append(getResultsHtml(response.items));
                handleNextUrl(response.next);
                checkScrollPos();
            },
        });
    }

    // function to generate the html for the search results
    function getResultsHtml(items) {
        var myHtml = "";
        for (var i = 0; i < items.length; i++) {
            var imgUrl = "./default-image.jpg";
            if (items[i].images.length > 0) {
                // greater than 0 because our default image takes case of images.length = 0 case
                imgUrl = items[i].images[0].url;
            }
            myHtml +=
                "<div class='item-separator'><a href='" +
                items[i].external_urls.spotify +
                "'><div class='item-image'><img src='" +
                imgUrl +
                "'></a><p class='item-name'><a href='" +
                items[i].external_urls.spotify +
                "'>" +
                items[i].name +
                "</a></p></div></div>";
        }
        return myHtml;
    }

    // function to handle "next" url property of object and show/remove more button based on this property
    function handleNextUrl(url) {
        var newUrl =
            url &&
            url.replace(
                "api.spotify.com/v1/search",
                "spicedify.herokuapp.com/spotify"
            );

        nextUrl = newUrl;

        console.log("next URL", nextUrl);
        if (newUrl) {
            moreButton.show();
            // console.log("NEXT NEXT");
        } else {
            moreButton.hide();
            // console.log("NO NEXT");
        }
    }

    //function to generate "Results Message" html
    function resultsMessage(items) {
        var resultsMsgHtml = "";
        artistOrAlbum = $("select").val();
        if (items.length === 0 && userInput.length !== 0) {
            resultsMsgHtml +=
                "<p id='no-results'>" +
                "no matching " +
                artistOrAlbum +
                "s</p>";
        } else if (items.length !== 0) {
            resultsMsgHtml +=
                "<div id='results-text'>" +
                "we found the following " +
                artistOrAlbum +
                "(s) for your search:" +
                "</div>";
        }
        return resultsMsgHtml;
    }

    // function to: check the scroll position on document and call next response function for more results from API
    function checkScrollPos() {
        var hasScrolledToBottom;
        if (location.search.indexOf("scroll=infinite") >> -1) {
            // if the url has infinite search configured, remove moreButton
            moreButton.hide();
        }
        if (
            //determines we have scrolled near the bottom of the page (with a 250px buffer);
            $(document).scrollTop() + $(window).height() >=
            $(document).height() - 250
        ) {
            hasScrolledToBottom = true;
        }
        if (hasScrolledToBottom) {
            nextResponse();
        } else {
            setTimeout(checkScrollPos, 500);
        }
    }
})();
