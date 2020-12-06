(function () {
    // console.log($);

    ////////// VARIABLES
    var allSlots = $(".slot");
    var currentPlayer = "player1"; // assigns player 1 to currentPlayer
    var p1score = 0;
    var p2score = 0;

    ////////// SWITCH PLAYERS
    function switchPlayer() {
        currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
    }

    //////////  MAIN GAMEPLAY CLICK HANDLER // WINNER ANIMATION // SCORE-SHEET
    $(".column").on("click", function (e) {
        var col = $(e.currentTarget); // console.log("slotsInCol:", slotsInCol);
        var slotsInCol = col.children();
        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") && // if no slot has class player1/2
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                slotsInCol.eq(i).addClass(currentPlayer); // add class player1 or 2 (determined by currentPlayer)
                break;
            }
        }
        if (i === -1) {
            return;
        }
        var slotsInRow = $(".row" + i); //// console.log("slotsInRow:", slotsInRow);
        if (checkForVictory(slotsInCol)) {
            playAgainButton.addClass("play-again-on");
            gameOverlay.addClass("modal-on");
            var verticalHtml =
                "<p id='winner'>" +
                currentPlayer +
                " wins!" +
                "<br/>vertical victory!" +
                "</p>";
            $("#modal").html(verticalHtml);
            if (currentPlayer === "player1") {
                p1score++;
                // console.log("p1score:", p1score);
                $("#p1-score").html(
                    "<span id='p1-html'>" + p1score + "</span> "
                );
            } else if (currentPlayer === "player2") {
                p2score++;
                // console.log("p2score:", p2score);
                $("#p2-score").html(
                    "<span id='p2-html'>" + p2score + "</span> "
                );
            }
        } else if (checkForVictory(slotsInRow)) {
            playAgainButton.addClass("play-again-on");
            gameOverlay.addClass("modal-on");
            var horizontalHtml =
                "<p id='winner'>" +
                currentPlayer +
                " wins!" +
                "<br/>horizontal humiliation!" +
                "</p>";
            $("#modal").html(horizontalHtml);
            if (currentPlayer === "player1") {
                p1score++;
                // console.log("p1score:", p1score);
                $("#p1-score").html(
                    "<span id='p1-html'>" + p1score + "</span> "
                );
            } else if (currentPlayer === "player2") {
                p2score++;
                // console.log("p2score:", p2score);
                $("#p2-score").html(
                    "<span id='p2-html'>" + p2score + "</span> "
                );
            }
        } else if (checkForDiagonals()) {
            playAgainButton.addClass("play-again-on");
            gameOverlay.addClass("modal-on");
            var diagonalHtml =
                "<p id='winner'>" +
                currentPlayer +
                " wins!" +
                "<br/>diagonal destruction!" +
                "</p>";
            $("#modal").html(diagonalHtml);
            if (currentPlayer === "player1") {
                p1score++;
                // console.log("p1score:", p1score);
                $("#p1-score").html(
                    "<span id='p1-html'>" + p1score + "</span> "
                );
            } else if (currentPlayer === "player2") {
                p2score++;
                // console.log("p2score:", p2score);
                $("#p2-score").html(
                    "<span id='p2-html'>" + p2score + "</span> "
                );
            }
        }
        switchPlayer();
        // console.log("i", i);
        return;
    });

    ////////// VICTORY FUNCTION
    function checkForVictory(slots) {
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            var slot = $(slots[i]); // allows us to call jquery methods on all DOM elements
            if (slot.hasClass(currentPlayer)) {
                count++; //if slot has the class current player, increment count
                console.log("victory count:", count);
                if (count === 4) {
                    return true; // returning true for the callback above in the click event listener on columns
                }
            } else {
                count = 0; //if not reset to 0
            }
        }
    }

    ////////// DIAGONAL FUNCTION
    function checkForDiagonals() {
        var winningDiagonals = [
            [0, 7, 14, 21],
            [1, 8, 15, 22],
            [2, 9, 16, 23],
            [3, 8, 13, 18],
            [4, 9, 14, 19],
            [5, 10, 15, 20],
            [6, 13, 20, 27],
            [7, 14, 21, 28],
            [8, 15, 22, 29],
            [9, 14, 19, 24],
            [10, 15, 20, 25],
            [11, 16, 21, 26],
            [12, 19, 26, 33],
            [13, 20, 27, 34],
            [14, 21, 28, 35],
            [15, 20, 25, 30],
            [16, 21, 26, 31],
            [17, 22, 27, 32],
            [18, 25, 32, 39],
            [19, 26, 33, 40],
            [20, 27, 34, 41],
            [21, 26, 31, 36],
            [22, 27, 32, 37],
            [23, 28, 33, 38],
        ];
        allSlots = $(".slot");
        for (var i = 0; i < winningDiagonals.length; i++) {
            var diagonal = winningDiagonals[i];
            // console.log(diagonal);
            var checkDiag = [];
            for (var j = 0; j < diagonal.length; j++) {
                checkDiag.push(allSlots.eq(diagonal[j]));
                // console.log("check after loop:", checkDiag);
            }
            if (checkForVictory(checkDiag)) {
                // console.log("found win");
                return true;
            }
        }
    }

    ////////// DISPLAY PLAYER TURN
    $(".column").on("click", function (e) {
        var col = $(e.currentTarget);
        var slotsInCol = col.children();
        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            if (slotsInCol.eq(i).hasClass("player1")) {
                showTurn.removeClass("player1-turn");
                showTurn.addClass("player2-turn");
                $(".one-turn").removeClass("on");
                $(".two-turn").addClass("on");
            }
            if (slotsInCol.eq(i).hasClass("player2")) {
                showTurn.removeClass("player2-turn");
                showTurn.addClass("player1-turn");
                $(".two-turn").removeClass("on");
                $(".one-turn").addClass("on");
            }
        }
        if (i === -1) {
            return;
        }
    });

    ////////// CLEAR BUTTON
    var board = $(".slot"); // console.log(board);
    var clearButton = $(".clear"); // console.log(clearButton);
    var showTurn = $(".turn-indicator"); //console.log(showTurn)

    clearButton.on("click", function () {
        board.removeClass("player1");
        board.removeClass("player2"); //
        currentPlayer = "player1";
        showTurn.removeClass("player2-turn");
        showTurn.addClass("player1-turn");
        $(".two-turn").removeClass("on");
        $(".one-turn").addClass("on");
    });

    ////////// PLAY AGAIN BUTTON
    var playAgainButton = $(".play-again");
    var gameOverlay = $(".overlay");

    playAgainButton.on("click", function (e) {
        $(e.target).removeClass("play-again-on");
        gameOverlay.removeClass("modal-on");
        board.removeClass("player1");
        board.removeClass("player2");
        currentPlayer = "player1";
        showTurn.removeClass("player2-turn");
        showTurn.addClass("player1-turn");
        $(".two-turn").removeClass("on");
        $(".one-turn").addClass("on");
    });

    ////////// COLUMN INDICATOR
    var column = $(".column");
    column.on("mouseover", function (e) {
        $(".select-column").removeClass("select-column");
        $(e.currentTarget).addClass("select-column");
    });
})();
