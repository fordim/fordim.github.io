var BLANK_GAME_TABLE = ['','','','','','','','',''];

var LOG_GAME_TABLE = ['','','','','','','','',''];

// var gameTable = [].concat(BLANK_GAME_TABLE); //массив игрового поля
var gameTable = BLANK_GAME_TABLE.slice(0);
var actionPlayer = true;

//рисование в блоках
var draw = function(state){
    var gameBlocks = document.getElementsByClassName('gameBlock');

    for ( var i = 0; i < gameBlocks.length; i++){
        gameBlocks[i].innerText = state[i];
    }
};

var resetAndDrawBoard = function () {
    gameTable = [].concat(BLANK_GAME_TABLE);
    gameTable = BLANK_GAME_TABLE.slice(0);
    draw(gameTable);

};

var isPlayerWin = function (table, player){
    return ((table[0] === player && table[1] === player && table[2] === player) ||
        (table[3] === player && table[4] === player && table[5] === player) ||
        (table[6] === player && table[7] === player && table[8] === player) ||
        (table[0] === player && table[3] === player && table[6] === player) ||
        (table[1] === player && table[4] === player && table[7] === player) ||
        (table[2] === player && table[5] === player && table[8] === player) ||
        (table[0] === player && table[4] === player && table[8] === player) ||
        (table[2] === player && table[4] === player && table[6] === player))
};

var isGameEnded = function (){
    return gameTable.every(function(element, index, array){
        return element !== '';
    })
};

//TODO Записывать ЛОГИ
var writeLog = function(){
    var logBlock = document.getElementsByClassName('rightMain');

};

var onPageLoaded = function(){
    //TODO: разобраться с ним
    var gameBlocks = document.getElementById('gameBlocks');
    gameBlocks.onclick = function (e) {
        var index = Array.from(e.target.parentElement.children).indexOf(e.target);

        if (gameTable[index] !== ''){
            return alert('Поле уже занято!');
        }
        var playerSymbol = actionPlayer ? 'X' : 'O';
        gameTable[index] = playerSymbol;

        draw(gameTable);

        if(isPlayerWin(gameTable, playerSymbol)){
            if (confirm('Победил игрок игравший за: ' + actionPlayer + '. Хотите начать новую игру?')){
                return resetAndDrawBoard();
            } else {
                return console.log('Игрок отказался начать новую игру');
            }
        }

        // проверка на ничию
        if (isGameEnded()){ //на true проверять не обязательно
            if (confirm('Ничья, все поля заполнены. Хотите начать новую игру?')){
                return resetAndDrawBoard();
            } else {
                return console.log('Игрок отказался начать новую игру');
            }
        }

        actionPlayer = !actionPlayer;
    };

    document.getElementsByClassName('resetGame')[0].onclick = function(event){
        event.preventDefault(); //убирает с кнопки стандартное поведение
        // debugger;
        resetAndDrawBoard();
    };


};

document.addEventListener('DOMContentLoaded', onPageLoaded);

