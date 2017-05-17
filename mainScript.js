/**
*@var timerID таймер для последующих сдвигов противника к игроку
*@var patNo изменение метки
*@var blankNo смещение противника
*@var totalBlank общее смещение противников
*@var lr сторона, в которую будет произведено смещение, если -1 смещение в лево, если 1 смещение в право
*@var lowerLf нижнее боковое пространство
*@var downLf верхнее боковое пространство
*@var downNo смещение противника вниз
*@var inPlay флаг что игра не закончена
*@var missileX позиция ракеты х
*@var missileY позиция ракеты y
*@var myChrx позиция игрока
*@var myBlank смещение игрока
*@var myMove ограничение игрового поля
*@var spcf1 линия ракеты на поле
*@var spcf2 линия ракеты на поле
*@var spcf3 линия ракеты на поле
*@var hitFlag местонахождение противников на поле
*@var score счёт игрока
*@var selec количество противников в одной линии
*@var rsmiss промах ракеты
*/
var timerID = null;                 
var patNo = 1;
var cr = "\r\n";
var blankNo = 0;
var totalBlank = "";
var lr = 1;
var lowerLf = "";
var downLf = "";
var downNo = 0;
var inPlay = 0;
var missileX = 99;
var missileY = 99;
var myChrx = 1;
var myBlank = "";
var myMove = 0;
var spcf1 = "";
var spcf2 = "";
var spcf3 = "";
var hitFlag = 0;
var score = 0;
var selec = 0;
var rsMiss = "";

/**
* Функция для работы с массивом
*
* Работа с игровым полем
*@param arn размер поля
*@param return возвращает новое поле
*/
function array1(arn) {
    this.length = arn;
    
    for (var ar1 = 0; ar1 <= arn; ar1++) {
        this[ar1] = 1;
    }
    
    return this;
}

/**
* Функция для загрузки игры
*
* Заполнение поля
*
*/
function onLoadMes() {
    document.fmark.win.value = " ";
    cr = unescape("%0A");
    ver = navigator.appVersion;
    len = ver.length;
    
    for (iln = 0; iln < len; iln++) {
        if (ver.charAt(iln) == "(") {
            break;
        }
    }
    
    systm = ver.charAt(iln + 1).toUpperCase();
    
    if (systm == "M") {
    	cr = unescape("%0D");
    }
    
    if (systm == "W") {
    	cr = unescape("%0D") + cr;
    }
    
    if (systm == "C") {
        cr = unescape("%0D") + cr;
        tmpSys = ver.charAt(0).toUpperCase();
        
        if (tmpSys == 4) {
            cr = unescape("%0D");
        }
    }
    
    starter();
}

/**
* Функция для инициализации игры
*
* Инициализация игрового цикла
*
*/
function init() {
    blankX = new array1(63);
    
    for (var makeBlank = 0; makeBlank < 63; makeBlank++) {
        blankX[makeBlank] = "";
        
        for (var addBlank = 0; addBlank < makeBlank; addBlank++) {
            blankX[makeBlank] = blankX[makeBlank] + " ";
        }
    }
    
    faker = new array1(24);     //faker(1) to (24) = facemark active flag
    face = new array1(2);       //Dim face(2)
    face[1] = " (^O^) ";
    face[2] = " (^-^) ";
    mesTotal = new array1(4);   //Dim mestotal(4)
    
    interval1();
}

/**
* Функция для перезапуска игры
*
* Перезапись переменных для запуска игры
*
*/
function restarter() {
    inPlay = 0;
    blankNo = 0;
    totalBlank = "";
    lr = 1;
    lowerLf = "";
    downLf = "";
    downNo = 0;
    missileX = 99;
    missileY = 99;
    myChrx = 1;
    myBlank = "";
    myMove = 0;
    selec = 1;
    starter();
}

function starter() {
    document.fmark.win.value = cr + cr + cr + cr + cr 
        + cr + cr + "Are you ready?" + cr + cr + cr + "Click FIRE!";
    selec = 1;
}

/**
* Функция для перемещения влево
*
* Посимвольное перемещение влево
*
*/
function goLeft() {
    myMove = 0;
    myChrx = myChrx - 1;
    
    if (myChrx <= 0) {
        myChrx = 1;
    }
}

/**
* Функция для перемещения вправо
*
* Посимвольное перемешение вправо
*
*/
function goRight() {
    myMove = 0;
    myChrx = myChrx + 1;
    
    if (myChrx >= 56) {
        myChrx = 55;
    }
}

/**
* Функция для ограничения влево
*
* Ограничение игрового поля
*
*/
function goLMax() {
    if (inPlay == 1) {
        myMove = -1;
    }
}

/**
* Функция для ограничения вправо
*
* Ограничение игрового поля
*
*/
function goRMax() {
    if (inPlay == 1) {
        myMove = 1;
    }
}

/**
* Функция для стрельбы
*
* Инициализация стрельбы
* при нажатии кнопки Fire
*
*/
function fire() {
    if (inPlay == 0) {
        if (selec == 1) {
            selec = 9;
            inPlay = 1;
            init();
        }
    } else {
        if (missileY == 99) {
            missileY = 18;
            missileX = myChrx + 3;
        }
    }
}

/**
* Функция для завершения игры
*
* Инициализация завершения игры
* при проигрыше
*
*/
function gameOver() {
    score = 0;
    
    for (var enerMe = 1; enerMe < 25; enerMe++) {
        if (faker[enerMe] == 1) {
            score = score + 1;
        }
    }
    
    if (score == 0) {
        document.fmark.win.value = cr + cr + cr + cr + cr 
            + cr + cr + cr + "Congratulation!" + cr + cr + "ALL CREAR!!";
    } else {
        document.fmark.win.value = cr + cr + cr + cr + cr 
            + cr + cr + cr + "GAME OVER" + cr + cr + " " + score + "ENEMY REMAINED";
    }
    
    inPlay = 0;
}

function interval1() {
    if (missileY != 99) {
        missileY = missileY - 1;
    }
    
    if (missileY < 0) {
        missileY = 99;
    }
    
    myChrx = myChrx + myMove;
    
    if (myChrx <= 0) {
        myChrx = 1;
    }
    
    if (myChrx >= 56) {
        myChrx = 55;
    }
    
    blankNo = blankNo + lr;         //offset count up
    totalBlank = blankX[blankNo];   //offset syori
    
    if (blankNo >= 20) {
        lr = -1;
        downNo = downNo + 1;
        blankNo = 20;
    }
    
    if (blankNo <= 0) {
        lr = 1;
        downNo = downNo + 1;
        blankNo = 0;
    }
    
    if (downNo >= 12) {
        gameOver();
    }

   downlf = "";
    
   for (var upperSpc = 0; upperSpc < downNo; upperSpc++) {
        if (missileY == upperSpc) {
            downlf = downlf + blankX[missileX] + "|" + cr;
        } else {
            downlf = downlf + cr;
        }
   }
   
    //facemark change
    if (inPlay == 1) {
        patNo = patNo + 1;
    }
    
    if (patNo >= 3) {
        patNo = 1;
    }
   
    //face aria
    for (var addLine = 1; addLine < 5; addLine++) {
        mesTotal[addLine] = totalBlank;
        rsMiss = "";
        
        if (missileY == (downNo + addLine * 2 - 2)) {
            if (blankNo <= missileX) {
                hitFlag = parseInt((missileX-blankNo) / 7, 10);
                
                if (hitFlag < 6) {
                    if ((missileX - blankNo - (hitFlag * 7)) >= 1) {
                        if ((missileX - blankNo - (hitFlag * 7)) <= 5) {
                            if (faker[(addLine * 6) + hitFlag - 5] == 1) {
                                faker[(addLine * 6) + hitFlag - 5] = 0;
                                missileY = 99;
                            }
                        }
                    }
                } else {
                    if (missileX > (blankNo + 42)) {
                        rsMiss = blankX[missileX - blankNo - 42] + "|";
                    }
                }
            } else {
                mesTotal[addLine] = blankX[missileX] + "|";
                
                if (missileX < (blankNo - 1)) {
                    mesTotal[addLine] = mesTotal[addLine] + blankX[blankNo - 1 - missileX];
                }
            }
        }
	   
        for (var addFaker = 1; addFaker < 7; addFaker++) {
            if (faker[(addLine * 6) + addFaker - 6] == 1) {
                mesTotal[addLine] = mesTotal[addLine] + face[patNo];
            } else {
                mesTotal[addLine] = mesTotal[addLine] + "       ";
            }
        }
        
        mesTotal[addLine] = mesTotal[addLine] + rsMiss;
    }

    //space line in face aria
    spcf1 = cr;
    spcf2 = cr;
    spcf3 = cr;
    
    if (missileY == (downNo + 1)) {
       spcf1 = blankX[missileX] + "|" + cr;
    }
    
    if (missileY == (downNo + 3)) {
        spcf2 = blankX[missileX] + "|" + cr;
    }
    
    if (missileY == (downNo + 5)) {
        spcf3 = blankX[missileX] + "|" + cr;
    }

    //lower side aria
    lowerLf = "";
    
    for (var lowerSpc = 0; lowerSpc < (11 - downNo); lowerSpc++) {
        if (missileY == (downNo + 7 + lowerSpc)) {
            lowerLf = lowerLf + blankX[missileX] + "|" + cr;
        } else {
	        lowerLf = lowerLf + cr;
		}
    }
    
    myBlank = blankX[myChrx];
    document.fmark.win.value = downLf + mesTotal[1] + cr + spcf1 
        + mesTotal[2] + cr + spcf2 + mesTotal[3] + cr + spcf3 
        + mesTotal[4] + cr + lowerLf + myBlank + "  _A_  " + cr + myBlank + " [___] ";
    timerID = setTimeout("interval1()", 250);
    }
}
