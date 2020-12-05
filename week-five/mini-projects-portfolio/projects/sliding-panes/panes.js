var container = $("#container");
// console.log("conatiner:", container);

var slider = $("#slider");
// console.log("slider:", slider);

var resizableImage = $("#resizable-image");
// console.log("resizeable:", resizableImage);

var mouseClicked;

//main slider function

// slider.on("mousedown", function () {
container.on("mousemove", function moveSlider(e) {
    // $(document).on("mouseup", function () {
    //     container.off("mousover", moveSlider);
    // });
    if (mouseClicked === true) {
        var x = e.clientX - container.offset().left;
        console.log("left:", x);
        if (x > 8 && x < 769) {
            resizableImage.css({
                width: x, //slider.outerWidth(),
            });
            slider.css({
                left: x,
                transform: "translateX(-50%)",
            });
        } else {
            return;
        }
    } else {
        return;
    }
});

//mouse down event listnere
slider.mousedown(function () {
    mouseClicked = true;
    slider.css({
        cursor: "ew-resize",
    });
});

slider.mouseup(function () {
    mouseClicked = false;
    slider.css({
        cursor: "default",
    });
});
