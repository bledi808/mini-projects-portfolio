(function () {
    var kitties = document.querySelectorAll(".container img"); //console.log("kitties: ", kitties);
    var dots = document.querySelectorAll(".dot"); //console.log("dots:", dots);
    var isCurrentlyAnimating;
    var i = 0;
    var timer;
    // var j = 0;

    //call function inside setTimeout
    timer = setTimeout(swapKitties, 3000);

    // main carousel function function
    function swapKitties(nextIndex) {
        isCurrentlyAnimating = true; // console.log("animating:", isCurrentlyAnimating);
        kitties[i].classList.remove("onscreen");
        kitties[i].classList.add("offscreen-left");
        dots[i].classList.remove("on");

        if (typeof nextIndex != "undefined") {
            i = nextIndex;
        } else {
            i++; //console.log[i];
            if (i === kitties.length) {
                i = 0;
            }
        }
        kitties[i].classList.add("onscreen");
        dots[i].classList.add("on");
    }

    // event listener on "transition end" event - places offscreen-left cat back in queue
    document.addEventListener("transitionend", function (e) {
        isCurrentlyAnimating = false; //console.log("animating:", isCurrentlyAnimating);
        if (e.target.classList.contains("offscreen-left")) {
            e.target.classList.remove("offscreen-left");
            timer = setTimeout(swapKitties, 3000);
        }
    });

    // event listener on dot clicks; making the dots clickable
    for (var j = 0; j < dots.length; j++) {
        dots[j].addEventListener("click", function (e) {
            if (isCurrentlyAnimating) {
                return; // console.log("in transition"); problem 1: dot clicks during transition
            }
            for (j = 0; j < dots.length; j++) {
                if (dots[j] == e.target) {
                    if (j == i) {
                        return; // console.log("same j and i");problem 2: clicks on current dot
                    }
                    clearTimeout(timer);
                    swapKitties(j);
                    break;
                }
            }
        });
    }
})();
