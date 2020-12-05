(function () {
    // console.log($);

    var currentPlayer = "player1"; // sets to player 1

    // click event listener on columns
    $(".column").on("click", function (e) {
        var col = $(e.currentTarget);
        var slotsInCol = col.children();
        console.log("slotsInCol:", slotsInCol);
        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            // console.log("slotsInCol.eq(i).hasClass('player1')", slotsInCol.eq(i).hasClass("player1"));
            if (
                !slotsInCol.eq(i).hasClass("player1") && // if no slot has class player1/2
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                slotsInCol.eq(i).addClass(currentPlayer); // add class player1/2 (red/yellow - determined by currentPlayer)
                break;
            }
        }
        if (i === -1) {
            return;
        }
        var slotsInRow = $(".row" + i);
        console.log("slotsInRow:", slotsInRow);

        if (checkForVictory(slotsInCol)) {
            console.log("COLUMN victory");
        } else if (checkForVictory(slotsInRow)) {
            console.log("ROW victory");
        } else if (checkForDiagonals()) {
            // here you pass relevant arguments - "slots", "columns", "rows" depending on approch chosen
            console.log("Diagonal victory");
        }
        console.log("i", i);
        switchPlayer();
    });

    ////////////////CLEAR:
    //grab $(".slot")
    //location.reload - easy way to clear

    // function checkForDiagonals() {
    //     //sends potential winning combinations (arrays) to checkForVictory () which returns true if succesful
    //     // if checkForVictory () returns true, so does check for diagonals and in main function "Diagonal victory"

    //     // if bla bla bla return true
    //     return true;
    //     // and calls for checkForVictory() function? - unsure about this...
    // }

    function checkForVictory(slots) {
        var count = 0;
        // console.log("slot:", slot);
        for (var i = 0; i < slots.length; i++) {
            var slot = $(slots[i]); // allows us to call jquery methods on all DOM elemnts
            if (slot.hasClass(currentPlayer)) {
                //if slot has the class current player, increment count
                count++;
                console.log("count:", count);
                if (count === 4) {
                    return true; // returning true for the callback above in the click event listener on columns
                }
            } else {
                count = 0; //if not reset to 0
                // console.log("count after reset:", count);
            }
        }
    }

    ////////// DIAGONALS
    //first way: there are only 24 possible combinations (of indexes) of diagonal wins: put these in side an array
    // of arrays and loop over it (diags): for each of these loop inside of the the arrays and pass into chekFor Win function
    function checkForDiagonals() {
        // var slot = $(slots[i]);

        var diagonals = [
            [0, 7, 14, 21],
            [6, 13, 20, 27],
            [12, 19, 26, 33],
            [18, 25, 32, 39],
            [1, 8, 15, 22],
            [7, 14, 21, 28],
            [13, 20, 27, 34],
            [19, 26, 33, 40],
            [2, 9, 16, 23],
            [8, 15, 22, 29],
            [14, 21, 28, 35],
            [20, 27, 34, 41],
            [5, 10, 15, 20],
            [11, 16, 21, 26],
            [17, 22, 27, 32],
            [23, 28, 33, 38],
            [4, 9, 14, 19],
            [10, 15, 20, 25],
            [16, 21, 26, 31],
            [22, 27, 32, 37],
            [3, 8, 13, 18],
            [9, 14, 19, 24],
            [15, 20, 25, 30],
            [21, 26, 31, 36],
        ];
        for (var i = 0; i < diagonals.length; i++) {
            console.log(diagonals[i]);
            for (var j = 0; j < diagonals[j].length; j++) {
                console.log("diagJ:", diagonals[j].length);
            }
        }
    }

    // function checkForDiagonals() {} // required for us to grab the elements we want to pass to teh checkForVictory function

    // 2. X (cross) approach - generate two possible arrays (going diagonally )

    // 3. rows and columns - loop over every slot in the board and check 4 down and 4up; then move on to the next slot
    // so you generate 2 arrays that you pass to teh win function; no sequetial checks

    // 4. patterns of 5 and 7 works but requires additional check that each piece/index is sequential (i.e. in sequential columns)

    // 5. column + row approach: add them together (see screenshot);
    //columns - rows (the other diagonal direction) (see screenshot - red)
    // here we need know which row and column we clicked on (for row we can use i = row clicked on)
    // for column - use jquery method 'index' - col.index() - searches for a given element in the given elms
    // you can git both i and col.index()

    ////////// SWITCH PLAYER TURNS
    function switchPlayer() {
        currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
    }
})();
