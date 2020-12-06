// Store a reference to the element containing the links in a variable
var jqHeadlines = $("#headlines"); // grabbing headlines using jQuery; console.log(jqHeadlines);

// Store the current left position in a variable
var jqLeft = jqHeadlines.offset().left; //jQuery; console.log(jqLeft);

//Store the list of links in a variable
var links = document.getElementsByTagName("a"); // console.log("links: ", links);

tickerTape();

function tickerTape() {
    jqLeft--; // insert jqLeft version of var
    jqHeadlines.css({
        left: jqLeft + "px", // set the left position using of headlines using jQuery
    });
    if (jqLeft <= -$("a").eq(0).outerWidth()) {
        jqLeft += $("a").eq(0).outerWidth();
        $("a").eq(0).appendTo(jqHeadlines); // can also use $("a").eq(0).appendTo(jqHeadlines);
    }
    animId = requestAnimationFrame(tickerTape);
}

//stoping animation:
$("a").on("mouseenter", function (e) {
    cancelAnimationFrame(animId);
    $(e.target).addClass("hover");
});

$("a").on("mouseleave", function () {
    requestAnimationFrame(tickerTape);
    $(".hover").removeClass("hover");
});
