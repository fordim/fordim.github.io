
//массив игрового поля
var gameTable = ['X', null,'X','X','O','X','X',null,'X'];

//рисование в блоках
var draw = function(state){
    var gameBlocks = document.getElementsByClassName('gameBlock');

    for ( var i = 0; i < gameBlocks.length; i++){
        gameBlocks[i].innerText = state[i];
    }
};

//Функция которая загружается вместе с страницей
var onPageLoaded = function(){


    //1. разобраться с ним
    var gameBlocks = document.getElementById('gameBlocks');
    gameBlocks.onclick = function (e) {
        var index = Array.from(e.target.parentElement.children).indexOf(e.target);
        gameTable[index] = '?';
        draw(gameTable);
    };

    draw(gameTable);


    // New game - очистка поля
    var clearBoard = document.getElementsByClassName('resetGame');
    console.log(clearBoard);

    clearBoard[0].onclick = function(event){
      event.preventDefault(); //убирает с кнопки стандартное поведение
      for (var j = 0; j < gameTable.length; j++){
          gameTable[j] = '';
          draw(gameTable);
      }
    };


    //Объявляем игроков
    var playerOne = {
        name: 'John',
        points: 0
    };
    var playerTwo = {
        name: 'Donald',
        points: 0
    };

    //Имитация игры
    var runGame = function(){
      for (var i = 0; i < gameTable.length; i++){
          if((i % 2) == 0 || i === 0){
              gameBlocks.onclick(i);
              gameTable[i] = 'X';
              draw(gameTable);
          } else {
              gameBlocks.onclick(i);
              gameTable[i] = 'O';
              draw(gameTable);
          }
      }

    };



    /*var myElement = document.getElementById('myspan');
    myElement.innerText = 'My First Game';*/

};

document.addEventListener('DOMContentLoaded', onPageLoaded);

//2. разобраться с замыканием и прошлым кодом
//3. По нажатию на кнопку "Новая игра" - поле обнуляется.
//4. имитация игры 2-мя людьми
//5.
