$(document).ready(function () {row
    init();
    $("#shufflebutton").on("click", shuffleDivs);
 });

var positionArray = [];

var row = 300; 
var	col = 300;

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


function move() {
    if (isMovable(this)) {
        this.style.left = (parseInt(this.style.left) + -1 * (this.x - row)) + "px";
        this.style.top = (parseInt(this.style.top) + -1 * (this.y - col)) + "px";
        row = this.x;
        col = this.y;
        this.x = parseInt(this.style.left);
        this.y = parseInt(this.style.top);
    }
}

function isMovable(piece) {
    if (Math.abs(piece.x - row) == 100 && Math.abs(piece.y - col) == 0 ||
        Math.abs(piece.y - col) == 100 && Math.abs(piece.x - row) == 0)
        return true;
    return false;
}

var shuffleDivs = function () {

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

    row = 300
    col = 300
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
