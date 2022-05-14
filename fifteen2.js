$(document).ready(function () {
    init();
    // document.getElementById("shufflebutton").onclick = shuffle;
    $("#shufflebutton").on("click", shuffle);

    // divs.forEach(element => {
    //     element.onmouseover = function(){
    //         element.addClass("movablepiece");
    //     }
    // });
 });

var positionArray = [];

var init = function () {

    var puzzleArea = document.getElementById('puzzlearea');
    var divs = puzzleArea.getElementsByTagName("div");

    // initialize each piece
    for (var i = 0; i < divs.length; i++) {
        var div = divs[i];

        // calculate x and y for this piece
        var x = ((i % 4) * 100);
        var y = (Math.floor(i / 4) * 100);

        // set basic style and background
        div.className = "puzzlepiece";
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        div.style.backgroundImage = 'url("background.jpg")';
        div.style.backgroundPosition = -x + 'px ' + (-y) + 'px';

        // store x and y for later
        div.x = x;
        div.y = y;
        // div.onclick = move;
        var point = {
            x: x,
            y: y,
            bgP: div.style.backgroundPosition
        };
        positionArray.push(point);

    }
};
var whitePiece = {
    row: 300,
    col: 300
};

function move() {
    if (checkMovable(this)) {
        this.style.left = (parseInt(this.style.left) + -1 * (this.x - whitePiece.row)) + "px";
        this.style.top = (parseInt(this.style.top) + -1 * (this.y - whitePiece.col)) + "px";
        whitePiece.row = this.x;
        whitePiece.col = this.y;
        this.x = parseInt(this.style.left);
        this.y = parseInt(this.style.top);
    }
}

function checkMovable(piece) {
    if (Math.abs(piece.x - whitePiece.row) == 100 && Math.abs(piece.y - whitePiece.col) == 0 ||
        Math.abs(piece.y - whitePiece.col) == 100 && Math.abs(piece.x - whitePiece.row) == 0)
        return true;
    return false;
}


var shuffle = function () {

    // var puzzleArea = document.getElementById('puzzlearea');
    // var divs = puzzleArea.getElementsByTagName("div");
    // var divs = puzzleArea.children('div');

    var divs =  $("#puzzlearea").children('div');

    $("#puzzlearea").children('div').each(function (key, element) {
        $(element).detach();
    });

    var shuffledArray = shuffleArray(positionArray);
    for (var i = 0; i < divs.length; i++) {
        var item = divs[i];
        item.x = shuffledArray[i].x;
        item.y = shuffledArray[i].y;
        item.style.left = item.x + 'px';
        item.style.top = item.y + 'px';
        item.style.backgroundPosition = item.bgP;
        $("#puzzlearea").append(item);
    }

    // var randomTile = Math.floor(Math.random()*16);
    // whitePiece.col;
}

var shuffleArray = function (arr) {
    var index = arr.length;
    var temp;
    var randIndex;

    while (0 !== index) {
        // to find a remaining item
        randIndex = Math.floor(Math.random() * index); //just a random index
        index -= 1;

        // swap items
        temp = arr[index];
        arr[index] = arr[randIndex];
        arr[randIndex] = temp;
    }
    return arr;
};
