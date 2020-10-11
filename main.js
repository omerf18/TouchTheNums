'use strict';

var gNums = [];
var gCopiedNums;
var gBoard;
var gIsFirstCell = true;
var isGameOn;
var gInterval;
var gTime;
var gNextNum;
var gMaxNum;
var gLvl = 16;

function init() {
    getNumbers(gLvl);
    gCopiedNums = gNums.splice(0);
    renderBoard(Math.sqrt(gLvl));
    gMaxNum = gLvl;
    gIsFirstCell = true;
    isGameOn = false;
    gTime = 0;
    gNextNum = 1;
    document.querySelector('.time').innerHTML = "TIME: " + gTime;
    document.querySelector(".next").innerHTML = "NEXT NUM: " + gNextNum;
}

function renderGame() {
    document.querySelector('.time').innerHTML = "TIME: " + gTime;
    document.querySelector(".next").innerHTML = "NEXT NUM: " + gNextNum;
}

function renderBoard(num) {
    var strHtml = '';
    var elBoard = document.querySelector(".board");
    for (var i = 0; i < num; i++) {
        strHtml += "<tr>";
        for (var j = 0; j < num; j++) {
            strHtml += "<td onclick='cellClicked(this)'>" + getRndNum() + "</td>"
        }
        strHtml += "</tr>";
    }
    elBoard.innerHTML = strHtml;
}

function cellClicked(clickedNum) {
    if (gIsFirstCell) {
        isGameOn = true;
        gIsFirstCell = false;
        gInterval = setInterval(function () {
            gTime++;
            renderGame();
        }, 1000);
    }
    if (!isGameOn) { return };
    if (+clickedNum.innerHTML === gNextNum) {
        gNextNum++;
        clickedNum.style.backgroundColor = 'green';
    }
    if (gNextNum > gMaxNum) {
        isGameOn = false;
        gNextNum = gMaxNum;
        clearInterval(gInterval);
        console.log("GAME OVER");
    }
    renderGame();
}

function getGameLevel(lvl) {
    gLvl = lvl;
    clearInterval(gInterval);
    init();
}

function getRndNum() {
    var rndIdx = Math.floor(Math.random() * gCopiedNums.length);
    var num = gCopiedNums.splice(rndIdx, 1);
    num = num[0];
    return num;
}

function getNumbers(num) {
    for (var i = 1; i <= num; i++) {
        gNums.push(i);
    }
    return gNums;
}

