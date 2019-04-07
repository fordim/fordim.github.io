var BLANK_GAME_TABLE = ['','','','','','','','',''];
var LOG_GAME_TABLE = [];
var HISTORY_OF_GAME = [];

var gameTable = BLANK_GAME_TABLE.slice(0);
var logBlock = LOG_GAME_TABLE.slice(0);
var stepHistory = HISTORY_OF_GAME.slice(0);
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
    stepHistory = []; //Очистка массива
};

//ОТМЕНЯЕТ ПОСЛЕДНИЙ ХОД
stepBackAndDraw = function(){
    logBlock.pop();
    stepHistory.pop();

    if (logBlock.length === 0){
        clearLog(logBlock);
    } else {
        writeLog(logBlock);
    }

    if (stepHistory.length === 0){
        gameTable = BLANK_GAME_TABLE.slice(0);
    } else {
        gameTable = stepHistory[stepHistory.length - 1];
    }

    draw(gameTable);

    actionPlayer = !actionPlayer;
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

var nameOfPlayer = function (){
  if (actionPlayer){
      return 'X'
  }  else {
      return '0'
  }
};

var modalBoxEvent = function (textEvent){
    document.getElementById('modalBox').classList.add("visible");
    document.getElementById('leftBlock').classList.add("banBlocks");
    document.getElementById('rightBlock').classList.add("banBlocks");
    document.getElementById('mainPage').classList.add("banBody");
    document.getElementById("stepBack").disabled = true;
    document.getElementById("resetGame").disabled = true;
    var modalEvent = document.getElementsByClassName('modalBody');
    modalEvent[0].innerText = textEvent;
};

var onPageLoaded = function(){
    //TODO: разобраться с ним
    var gameBlocks = document.getElementById('gameBlocks');
    gameBlocks.onclick = function (e) {
        var index = Array.from(e.target.parentElement.children).indexOf(e.target);

        if (gameTable[index] !== ''){
            return alert('Поле уже занято!')
        }

        var playerSymbol = '';
        if (actionPlayer){
            playerSymbol ='X'
        } else {
            playerSymbol ='O'
        }
        gameTable[index] = playerSymbol;
        logBlock.push('<p>Походил игрок игравщий за: ' + playerSymbol + '. В ячейку массива №' + index + '</p>');
        stepHistory.push(gameTable.slice(0));
        //stepHistory.push([].concat(gameTable)); ES5 another
        //stepHistory.push([...gameTable]); //ES6

        draw(gameTable);
        writeLog(logBlock);

        if(isPlayerWin(gameTable, playerSymbol)){
            return modalBoxEvent('Победил игрок игравший за: ' + nameOfPlayer() + '. Хотите начать новую игру?')
        }

        // ПРОВЕРКА НА НИЧЬЮ
        if (isGameEnded()){ //на true проверять не обязательно
            modalBoxEvent('Ничья, все поля заполнены. Можете начать <<Новую игру>>')

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
    };

    document.getElementById('modalResetGame').onclick = function(event){
        event.preventDefault();
        resetAndDrawBoard();
        document.getElementById('modalBox').classList.remove("visible");
        document.getElementById('leftBlock').classList.remove("banBlocks");
        document.getElementById('rightBlock').classList.remove("banBlocks");
        document.getElementById('mainPage').classList.remove("banBody");
        document.getElementById("stepBack").disabled = false;
        document.getElementById("resetGame").disabled = false;
    };

};

document.addEventListener('DOMContentLoaded', onPageLoaded);

