
//массив игрового поля
var gameTable = ['','','','','','','','',''];
var PLAYER_ONE = 'playerOne'; //объеявление константы
var PLAYER_TWO = 'playerTwo';

var actionPlayer = PLAYER_ONE;


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
        if (gameTable[index] === ''){
            if (actionPlayer === PLAYER_ONE){
                gameTable[index] = 'X';
                actionPlayer = PLAYER_TWO;
            } else {
                gameTable[index] = 'O';
                actionPlayer = PLAYER_ONE;
            }
        } else {
            alert('Поле уже занято!');
        }


        // gameTable[index] = '?';
        draw(gameTable);


        // проверка на победителя
        var b = victory();
        if (b === 'winnerX'){
            if (confirm('Победил игрок игравщий за Крестики. Хотите начать новую игру?')){
                ResetBoard(event);
            } else {
                console.log('Игрок отказался начать новую игру');
            }
        } if (b === 'winnerO'){
            if (confirm('Победил игрок игравщий за Нолики. Хотите начать новую игру?')){
                ResetBoard(event);
            } else {
                console.log('Игрок отказался начать новую игру');
            }
        }


        // проверка на ничью
        var a = isGameEnded();
        if (a === true){ //на true проверять не обязательно
            if (confirm('Ничья, все поля заполнены. Хотите начать новую игру?')){
                ResetBoard(event);
            } else {
                console.log('Игрок отказался начать новую игру');
            }
        }


    };


    //draw(gameTable);


    var isGameEnded = function (){
        return gameTable.every(function(element, index, array){
            return element !== '';
        })
    };


    // ES6 вариант arrow-function
    //const isGameEnded = () => gameTable.every(item => item !== '');



    // Определяем, что кто-то победил
    var victory = function (){
        if ((gameTable[0] === 'X' && gameTable[1] === 'X' && gameTable[2] === 'X') ||
            (gameTable[3] === 'X' && gameTable[4] === 'X' && gameTable[5] === 'X') ||
            (gameTable[6] === 'X' && gameTable[7] === 'X' && gameTable[8] === 'X') ||
            (gameTable[0] === 'X' && gameTable[3] === 'X' && gameTable[6] === 'X') ||
            (gameTable[1] === 'X' && gameTable[4] === 'X' && gameTable[7] === 'X') ||
            (gameTable[2] === 'X' && gameTable[5] === 'X' && gameTable[8] === 'X') ||
            (gameTable[0] === 'X' && gameTable[4] === 'X' && gameTable[8] === 'X') ||
            (gameTable[2] === 'X' && gameTable[4] === 'X' && gameTable[6] === 'X')){
            return 'winnerX';
        } if ((gameTable[0] === 'O' && gameTable[1] === 'O' && gameTable[2] === 'O') ||
        (gameTable[3] === 'O' && gameTable[4] === 'O' && gameTable[5] === 'O') ||
        (gameTable[6] === 'O' && gameTable[7] === 'O' && gameTable[8] === 'O') ||
        (gameTable[0] === 'O' && gameTable[3] === 'O' && gameTable[6] === 'O') ||
        (gameTable[1] === 'O' && gameTable[4] === 'O' && gameTable[7] === 'O') ||
        (gameTable[2] === 'O' && gameTable[5] === 'O' && gameTable[8] === 'O') ||
        (gameTable[0] === 'O' && gameTable[4] === 'O' && gameTable[8] === 'O') ||
        (gameTable[2] === 'O' && gameTable[4] === 'O' && gameTable[6] === 'O')){
            return 'winnerO';
        }
    };



    // New game - очистка поля
    var clearBoard = document.getElementsByClassName('resetGame');
    //console.log(clearBoard);

    var ResetBoard = clearBoard[0].onclick = function(event){
        event.preventDefault(); //убирает с кнопки стандартное поведение

        //Сокращенный вариант заполнения всего массива
        gameTable = gameTable.fill('', 0, gameTable.length);
        draw(gameTable);

        //Заполнение массива через цикл
        /* for (var j = 0; j < gameTable.length; j++){
           gameTable[j] = '';
           draw(gameTable);
        } */
    };


};


document.addEventListener('DOMContentLoaded', onPageLoaded);



//2. Как сократить код if
//2.1 Как сделать одну проверку для Х и О
//2.2 Как разбить и отличать потом победителей (если что-то изменится) или как сократить
//3. Как сделать, что-бы сначало рисовало, а потом выводило победителя
//4.
