var PLAYER_ONE = 'Крестик'; //объеявление константы
var PLAYER_TWO = 'Нолик';

var gameTable = ['','','','','','','','','']; //массив игрового поля
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
    //TODO: разобраться с ним
    var gameBlocks = document.getElementById('gameBlocks');
    gameBlocks.onclick = function (e) {
        var index = Array.from(e.target.parentElement.children).indexOf(e.target);

        //FIXME: 1-й способ который был придуман
        // if (gameTable[index] === ''){
        //     if (actionPlayer === PLAYER_ONE){
        //         gameTable[index] = 'X';
        //         actionPlayer = PLAYER_TWO;
        //     } else {
        //         gameTable[index] = 'O';
        //         actionPlayer = PLAYER_ONE;
        //     }
        // } else {
        //     alert('Поле уже занято!');
        // }

        if (gameTable[index] !== ''){
            return alert('Поле уже занято!');
        }
        var playerSymbol = actionPlayer === PLAYER_ONE ? 'X' : 'O';
        gameTable[index] = playerSymbol;

        draw(gameTable);

        // проверка на победителя
        // var b = victory(playerSymbol);
        // if (b === PLAYER_ONE){
        //     if (confirm('Победил игрок игравщий за Крестики. Хотите начать новую игру?')){
        //         return resetBoard();
        //     } else {
        //         return console.log('Игрок отказался начать новую игру');
        //     }
        // } if (b === PLAYER_TWO){
        //     if (confirm('Победил игрок игравщий за Нолики. Хотите начать новую игру?')){
        //         return resetBoard();
        //     } else {
        //         return console.log('Игрок отказался начать новую игру');
        //     }
        // }

        if(victory(playerSymbol)){
            if (confirm('Победил игрок игравший за: ' + actionPlayer + '. Хотите начать новую игру?')){
                return resetBoard();
            } else {
                return console.log('Игрок отказался начать новую игру');
            }
        }

        // проверка на ничия
        if (isGameEnded()){ //на true проверять не обязательно
            if (confirm('Ничья, все поля заполнены. Хотите начать новую игру?')){
                return resetBoard();
            } else {
                return console.log('Игрок отказался начать новую игру');
            }
        }

        actionPlayer = actionPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
    };

    var isGameEnded = function (){
        return gameTable.every(function(element, index, array){
            return element !== '';
        })
    };
    //TODO: ES6 вариант arrow-function
    //const isGameEnded = () => gameTable.every(item => item !== '');

    //Определяем, что кто-то победил
    var victory = function (key){
        return ((gameTable[0] === key && gameTable[1] === key && gameTable[2] === key) ||
            (gameTable[3] === key && gameTable[4] === key && gameTable[5] === key) ||
            (gameTable[6] === key && gameTable[7] === key && gameTable[8] === key) ||
            (gameTable[0] === key && gameTable[3] === key && gameTable[6] === key) ||
            (gameTable[1] === key && gameTable[4] === key && gameTable[7] === key) ||
            (gameTable[2] === key && gameTable[5] === key && gameTable[8] === key) ||
            (gameTable[0] === key && gameTable[4] === key && gameTable[8] === key) ||
            (gameTable[2] === key && gameTable[4] === key && gameTable[6] === key))
    };

    // TODO: 2-й способ, определяем при помощи перебора нового массива.
    // var victory = function(playerSymbol){
    //
    //     var indices = [];
    //     var idx = gameTable.indexOf(playerSymbol);
    //     while (idx != -1) {
    //         indices.push(idx);
    //         idx = gameTable.indexOf(playerSymbol, idx + 1);
    //     }
    //
    //     var victoryOptions = [
    //         [0, 1, 2],
    //         [3, 4, 5],
    //         [6, 7, 8],
    //         [0, 3, 6],
    //         [1, 4, 7],
    //         [2, 5, 8],
    //         [0, 4, 8],
    //         [2, 4, 6]
    //     ];
    //
    //     return victoryOptions.some(item => {
    //         return item.every(innerItem => {
    //             return indices.includes(innerItem)
    //         })
    //     })
    // };

    // New game - очистка поля
    document.getElementsByClassName('resetGame')[0].onclick = function(event){
        event.preventDefault(); //убирает с кнопки стандартное поведение
        resetBoard();
    };

    var resetBoard = function () {
        //Сокращенный вариант заполнения всего массива
        gameTable = gameTable.fill('', 0, gameTable.length);
        draw(gameTable);

        //Заполнение массива через цикл
        /* for (var j = 0; j < gameTable.length; j++){
           gameTable[j] = '';
           draw(gameTable);
        } */
    }
};

document.addEventListener('DOMContentLoaded', onPageLoaded);

//1. Как сделать, что-бы сначало рисовало, а потом выводило победителя
