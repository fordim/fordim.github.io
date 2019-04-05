var BLANK_GAME_TABLE = ['','','','','','','','',''];
var LOG_GAME_TABLE = [];

var gameTable = BLANK_GAME_TABLE.slice(0);
var logBlock = LOG_GAME_TABLE.slice(0);
var actionPlayer = true;

//РИСОВАНИЕ В БЛОКАХ
var draw = function(state){
    var gameBlocks = document.getElementsByClassName('gameBlock');

    for ( var i = 0; i < gameBlocks.length; i++){
        gameBlocks[i].innerText = state[i];
    }
};

// ЗАПИСЬ ЛОГОВ
var writeLog = function(){
    var logBlocks = document.getElementsByClassName('rightMain');
    for( var i = 0; i < logBlock.length; i++){
        logBlocks[0].innerHTML = logBlock.join('');
    }
};

//ЧИСТКА ЛОГОВ
var clearLog = function(){
    var logBlocks = document.getElementsByClassName('rightMain');
    logBlocks[0].innerHTML = logBlock;
};

//ЧИСТКА ДОСОК
var resetAndDrawBoard = function () {
    gameTable = BLANK_GAME_TABLE.slice(0);
    logBlock = LOG_GAME_TABLE.slice(0); //Чистим поле с логами
    draw(gameTable);
    clearLog(logBlock);
};

//ОТМЕНЯЕТ ПОСЛЕДНИЙ ХОД
stepBackAndDraw =function(){
    logBlock.splice(-1,1);
    writeLog(logBlock);
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


var onPageLoaded = function(){
    //TODO: разобраться с ним
    var gameBlocks = document.getElementById('gameBlocks');
    gameBlocks.onclick = function (e) {
        var index = Array.from(e.target.parentElement.children).indexOf(e.target);

        if (gameTable[index] !== ''){
            return alert('Поле уже занято!');
        }

        var playerSymbol = '';
        if (actionPlayer){
            playerSymbol ='X'

        } else {
            playerSymbol ='O'
        }
        gameTable[index] = playerSymbol;
        logBlock.push('<p>Походил игрок игравщий за: ' + playerSymbol + '. В ячейку массива №' + index + '</p>');

        draw(gameTable);
        writeLog(logBlock);

        if(isPlayerWin(gameTable, playerSymbol)){
            if (confirm('Победил игрок игравший за: ' + actionPlayer + '. Хотите начать новую игру?')){
                return resetAndDrawBoard();
            } else {
                return console.log('Игрок отказался начать новую игру');
            }
        }

        // ПРОВЕРКА НА НИЧЬЮ
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
        resetAndDrawBoard();
    };

    document.getElementsByClassName('stepBack')[0].onclick = function(event){
        event.preventDefault();
        stepBackAndDraw();
        console.log(logBlock);
    };

};

document.addEventListener('DOMContentLoaded', onPageLoaded);

