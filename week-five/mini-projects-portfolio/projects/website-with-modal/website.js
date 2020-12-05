(function () {
    var openNav = document.getElementById("menuicon");
    // console.log("menu:", openNav);

    var closeNav = document.getElementById("close");
    // console.log("closeButton:", closeNav);

    var overlay = document.querySelector(".overlay");
    // console.log("overlay:", overlay);

    var sideNav = document.querySelector(".side-nav");
    // console.log("menu:", sideNav);

    var modalOverlay = $("#modal-overlay");
    // console.log("closeModal:", closeModal);

    var closeModal = $("#close-modal-x");
    // console.log("closeModal:", closeModal);

    var modal = $("#modal");
    // console.log("closeModal:", closeModal);

    //////////////////MODAL EVENT HANDLERS - using jQUERY//////////////////
    setTimeout(popup, 1000);

    //function to invoke modal
    function popup() {
        modalOverlay.css({
            visibility: "visible",
        });
    }

    //event handler for closing modal via x button
    closeModal.on("click", function () {
        modalOverlay.css({
            visibility: "hidden",
        });
    });

    modalOverlay.on("click", function () {
        modalOverlay.css({
            visibility: "hidden",
        });
    });

    modal.on("click", function (e) {
        e.stopPropagation();
    });

    //////////////////SIDENAV EVENT HANDLERS - using JS//////////////////

    openNav.addEventListener("click", function () {
        sideNav.classList.add("on");
        overlay.classList.add("on");
    });

    closeNav.addEventListener("click", function () {
        sideNav.classList.remove("on");
        overlay.classList.remove("on");
    });

    overlay.addEventListener("click", function () {
        sideNav.classList.remove("on");
        overlay.classList.remove("on");
    });

    sideNav.addEventListener("click", function (e) {
        e.stopPropagation();
    });
})();
