

var gameTable = ['X', null,'X','X','O','X','X',null,'X'];

var draw = function(state){
    //to do (Завернуть в цикл)
    var gameBlocks = document.getElementsByClassName('gameBlock');

    for ( var i = 0; i < gameBlocks.length; i++){
        gameBlocks[i].innerText = state[i];
    }
};


var onPageLoaded = function(){

    var myElement = document.getElementById('myspan');
    myElement.innerText = 'newText';

//    updateCards();

    var gameBlocks = document.getElementsByClassName('gameBlock');

    for (var i = 0; i < gameBlocks.length; i++){
        gameBlocks[i].onclick = function(e){
            e.target.innerText = 'X';
            console.log(e);
            //Поменять gameTable в соответствии куда я попал (понять что за ID от 0 до 9) и туда вставить значение (X O)

            //draw(gameTable);
        };
    }

    draw(gameTable);

};


/*
var updateCards = function (){
    var elements = document.querySelectorAll('.gameBlockLetter');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        element.innerText = 'O';

    }
    console.log(element);
};
*/


document.addEventListener('DOMContentLoaded', onPageLoaded);


/*
var a = function(number1, number2){
    var summary = number1 * number2;
    return summary
};

a(2,3);


function a(number1){
    var currentSum = number1;

    function f(number2){
        currentSum *= number2;
        return f;
    }

    f.toString = function(){
        return currentSum;
    };

    return f;
}

a(2)(3);


function multi(a) {
  return function(b) {
  	return a * b;
  }
}
*/