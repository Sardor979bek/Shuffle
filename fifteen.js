$(document).ready(function () {
    init();
    $("#shufflebutton").on("click", shuffle);
 });

var positionArray = [];

var init = function () {

    var puzzleArea = document.getElementById('puzzlearea');
    var divs = puzzleArea.getElementsByTagName("div");

    for (var i = 0; i < divs.length; i++) {
        var div = divs[i];

        var x = ((i % 4) * 100);
        var y = (Math.floor(i / 4) * 100);

        div.className = "puzzlepiece";
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        div.style.backgroundImage = 'url("background.jpg")';
        div.style.backgroundPosition = -x + 'px ' + (-y) + 'px';

        div.x = x;
        div.y = y;

        var point = {
            x: x,
            y: y,
            bgP: div.style.backgroundPosition
        };
        positionArray.push(point);


        div.onmouseover = function(){
			if (isMovable(this)){
                this.style.border = "3px solid red";
                this.style.color = "#006600";
                this.style.textDecoration = "underline";
			}
		}

        div.onmouseout = function(){
			this.style.border = "2px solid black"; 
			this.style.color = "#000000"; 
			this.style.textDecoration = "none";
		};

        div.onclick = move
    }
};
var whitePiece = {
    row: 300,
    col: 300
};

function move() {
    if (isMovable(this)) {
        this.style.left = (parseInt(this.style.left) + -1 * (this.x - whitePiece.row)) + "px";
        this.style.top = (parseInt(this.style.top) + -1 * (this.y - whitePiece.col)) + "px";
        whitePiece.row = this.x;
        whitePiece.col = this.y;
        this.x = parseInt(this.style.left);
        this.y = parseInt(this.style.top);
    }
}

function isMovable(piece) {
    if (Math.abs(piece.x - whitePiece.row) == 100 && Math.abs(piece.y - whitePiece.col) == 0 ||
        Math.abs(piece.y - whitePiece.col) == 100 && Math.abs(piece.x - whitePiece.row) == 0)
        return true;
    return false;
}

var shuffle = function () {

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

    whitePiece.row = 300
    whitePiece.col = 300
}

var shuffleArray = function (arr) {
    var index = arr.length;
    var temp;
    var randIndex;

    while (0 !== index) {
        randIndex = Math.floor(Math.random() * index);
        index -= 1;
        temp = arr[index];
        arr[index] = arr[randIndex];
        arr[randIndex] = temp;
    }
    return arr;
};
