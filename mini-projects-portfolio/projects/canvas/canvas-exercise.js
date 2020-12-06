(function () {
    // context
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    // head
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "forestgreen";
    ctx.arc(300, 150, 50, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "yellow";
    ctx.fill();

    // left eye
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "forestgreen";
    ctx.arc(280, 140, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();

    // right eye
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "forestgreen";
    ctx.arc(320, 140, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "blue";
    ctx.fill();

    // nose
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "forestgreen";
    ctx.moveTo(300, 155);
    ctx.lineTo(300, 160);
    ctx.stroke();

    // mouth
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "forestgreen";
    ctx.arc(300, 160, 20, 0, 1 * Math.PI);
    ctx.stroke();

    // body
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "forestgreen";
    ctx.moveTo(300, 200);
    ctx.lineTo(300, 380);
    ctx.stroke();

    //4. right arm
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "forestgreen";
    ctx.moveTo(300, 270);
    ctx.lineTo(400, 195);
    ctx.stroke();

    //4. left arm
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "forestgreen";
    ctx.moveTo(300, 270);
    ctx.lineTo(200, 195);
    ctx.stroke();

    // right leg
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "forestgreen";
    ctx.moveTo(300, 380);
    ctx.lineTo(400, 485);
    ctx.stroke();
    // left leg
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "forestgreen";
    ctx.moveTo(300, 380);
    ctx.lineTo(200, 485);
    ctx.stroke();
})();

var element = document.getElementById("canvas"); //console.log("element: ", element);

function changeColor() {
    var red = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    element.style.backgroundColor =
        "rgb(" + red + ", " + green + ", " + blue + ")";
}

element.addEventListener("mousedown", changeColor);
element.addEventListener("mouseup", changeColor);

// // draw image canvas method for bonus exercise (idea is you have one canvas with the image and another with the image that achieves the movement)
