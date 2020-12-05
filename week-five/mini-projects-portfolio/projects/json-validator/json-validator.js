(function () {
    // After clicking a button a message should appear, telling users if the JSON is valid or not.

    var validateButton = $(".validate");
    // console.log(validateButton);
    var clearButton = $(".clear");
    // console.log(clearButton);
    var textbox = $(".textbox");
    // console.log(textbox);

    validateButton.on("click", function () {
        try {
            JSON.parse(textbox.val());
            textbox.css({
                textAlign: "center",
                fontSize: "66px",
                color: "green",
            });
            return textbox.val("vali-json!!!");
        } catch (err) {
            textbox.val("don't go JSON waterfalls!!!");
            textbox.css({
                textAlign: "center",
                fontSize: "40px",
                color: "red",
            });
        }
    });

    clearButton.on("click", function () {
        textbox.val("");
        textbox.removeAttr("style");
    });

    textbox.on("focus", function (e) {
        $(e.target).val("");
        $(e.target).removeAttr("style");
    });
})();

//When you pass an object to JSON.stringify containing properties that JSON does not allow,
//////////those properties will be omitted from the resulting string and no exception will be thrown.
