(function () {
    // console.log($);

    var storeButton = $(".store");
    // console.log(storeButton);

    var displayButton = $(".display");
    // console.log(displayButton);

    var textbox = $(".textbox");
    // console.log(textbox);

    storeButton.on("click", function () {
        localStorage.setItem("textboxValue", textbox.val());
    });

    displayButton.on("click", function () {
        textbox.val(localStorage.getItem("textboxValue"));
    });

    $(window).on("load", function () {
        textbox.val(localStorage.getItem("textboxValue"));
    });
})();
