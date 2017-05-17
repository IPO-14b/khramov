/**
*@var timerID таймер для последующих сдвигов противника к игроку
*@var patno изменение метки
*@var blankno смещение противника
*@var totalblank общее смещение противников
*@var lr сторона, в которую будет произведено смещение, если -1 смещение в лево, если 1 смещение в право
*@var lowerlf нижнее боковое пространство
*@var downlf верхнее боковое пространство
*@var downno смещение противника вниз
*@var inplay флаг что игра не закончена
*@var missilex позиция ракеты х
*@var missiley позиция ракеты y
*@var mychrx позиция игрока
*@var myblank смещение игрока
*@var mymove ограничение игрового поля
*@var spcf1 линия ракеты на поле
*@var spcf2 линия ракеты на поле
*@var spcf3 линия ракеты на поле
*@var hitflag местонахождение противников на поле
*@var score счёт игрока
*@var selec количество противников в одной линии
*@var rsmiss промах ракеты
*/
var timerID = null;                 
var patno = 1;
var cr = "\r\n";
var blankno = 0;
var totalblank = "";
var lr = 1;
var lowerlf = "";
var downlf = "";
var downno = 0;
var inplay = 0;
var missilex = 99;
var missiley = 99;
var mychrx = 1;
var myblank = "";
var mymove = 0;
var spcf1 = "";
var spcf2 = "";
var spcf3 = "";
var hitflag = 0;
var score = 0;
var selec = 0;
var rsmiss = "";

/**
* Функция для работы с массивом
*
* Работа с игровым полем
*@param arn размер поля
*@param return возвращает новое поле
*/
function array1(arn) {
    this.length = arn;
    
    for (var Ar1 = 0; Ar1 <= arn; Ar1++) {
        this[Ar1] = 1;
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
        tmpsys = ver.charAt(0).toUpperCase();
        
        if (tmpsys == 4) {
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
    blankx = new array1(63);
    
    for (var makeblank = 0; makeblank < 63; makeblank++) {
        blankx[makeblank] = "";
        
        for (var addBlank = 0; addBlank < makeblank; addBlank++) {
            blankx[makeblank] = blankx[makeblank] + " ";
        }
    }
    
    faker = new array1(24);     //faker(1) to (24) = facemark active flag
    face = new array1(2);       //Dim face(2)
    face[1] = " (^O^) ";
    face[2] = " (^-^) ";
    mestotal = new array1(4);   //Dim mestotal(4)
    
    interval1();
}

/**
* Функция для перезапуска игры
*
* Перезапись переменных для запуска игры
*
*/
function restarter() {
    inplay = 0;
    blankno = 0;
    totalblank = "";
    lr = 1;
    lowerlf = "";
    downlf = "";
    downno = 0;
    missilex = 99;
    missiley = 99;
    mychrx = 1;
    myblank = "";
    mymove = 0;
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
    mymove = 0;
    mychrx = mychrx - 1;
    
    if (mychrx <= 0) {
        mychrx = 1;
    }
}

/**
* Функция для перемещения вправо
*
* Посимвольное перемешение вправо
*
*/
function goRight() {
    mymove = 0;
    mychrx = mychrx + 1;
    
    if (mychrx >= 56) {
        mychrx = 55;
    }
}

/**
* Функция для ограничения влево
*
* Ограничение игрового поля
*
*/
function goLMax() {
    if (inplay == 1) {
        mymove = -1;
    }
}

/**
* Функция для ограничения вправо
*
* Ограничение игрового поля
*
*/
function goRMax() {
    if (inplay == 1) {
        mymove = 1;
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
    if (inplay == 0) {
        if (selec == 1) {
            selec = 9;
            inplay = 1;
            init();
        }
    } else {
        if (missiley == 99) {
            missiley = 18;
            missilex = mychrx + 3;
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
    
    for (var EnerMe = 1; EnerMe < 25; EnerMe++) {
        if (faker[EnerMe] == 1) {
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
    
    inplay = 0;
}

function interval1() {
    if (missiley != 99) {
        missiley = missiley - 1;
    }
    
    if (missiley < 0) {
        missiley = 99;
    }
    
    mychrx = mychrx + mymove;
    
    if (mychrx <= 0) {
        mychrx = 1;
    }
    
    if (mychrx >= 56) {
        mychrx = 55;
    }
    
    blankno = blankno + lr;         //offset count up
    totalblank = blankx[blankno];   //offset syori
    
    if (blankno >= 20) {
        lr = -1;
        downno = downno + 1;
        blankno = 20;
    }
    
    if (blankno <= 0) {
        lr = 1;
        downno = downno + 1;
        blankno = 0;
    }
    
    if (downno >= 12) {
        gameover();
    }

   downlf = "";
    
   for (var UpperSpc = 0; UpperSpc < downno; UpperSpc++) {
        if (missiley == UpperSpc) {
            downlf = downlf + blankx[missilex] + "|" + cr;
        } else {
            downlf = downlf + cr;
        }
   }
   
    //facemark change
    if (inplay == 1) {
        patno = patno + 1;
    }
    
    if (patno >= 3) {
        patno = 1;
    }
   
    //face aria
    for (var AddLine = 1; AddLine < 5; AddLine++) {
        mestotal[AddLine] = totalblank;
        rsmiss = "";
        
        if (missiley == (downno + addline * 2 - 2)) {
            if (blankno <= missilex) {
                hitflag = parseInt((missilex-blankno) / 7, 10);
                
                if (hitflag < 6) {
                    if ((missilex - blankno - (hitflag * 7)) >= 1) {
                        if ((missilex - blankno - (hitflag * 7)) <= 5) {
                            if (faker[(addline * 6) + hitflag - 5] == 1) {
                                faker[(addline * 6) + hitflag - 5] = 0;
                                missiley = 99;
                            }
                        }
                    }
                } else {
                    if (missilex > (blankno + 42)) {
                        rsmiss = blankx[missilex - blankno - 42] + "|";
                    }
                }
            } else {
                mestotal[addline] = blankx[missilex] + "|";
                
                if (missilex < (blankno - 1)) {
                    mestotal[addline] = mestotal[addline] + blankx[blankno - 1 - missilex];
                }
            }
        }
	   
        for (var AddFaker = 1; AddFaker < 7; AddFaker++) {
            if (faker[(addline * 6) + AddFaker - 6] == 1) {
                mestotal[addline] = mestotal[addline] + face[patno];
            } else {
		        mestotal[addline] = mestotal[addline] + "       ";
	        }
        }
        
        mestotal[addline] = mestotal[addline] + rsmiss;
    }

    //space line in face aria
    spcf1 = cr;
    spcf2 = cr;
    spcf3 = cr;
    
    if (missiley == (downno + 1)) {
       spcf1 = blankx[missilex] + "|" + cr;
	}
    
    if (missiley == (downno + 3)) {
	    spcf2 = blankx[missilex] + "|" + cr;
    }
    
    if (missiley == (downno + 5)) {
	    spcf3 = blankx[missilex] + "|" + cr;
    }

    //lower side aria
    lowerlf = "";
    
    for (var LowerSpc = 0; LowerSpc < (11 - downno); LowerSpc++) {
        if (missiley == (downno + 7 + LowerSpc)) {
            lowerlf = lowerlf + blankx[missilex] + "|" + cr;
        } else {
	        lowerlf = lowerlf + cr;
		}
    }
    
    myblank = blankx[mychrx];
    document.fmark.win.value = downlf + mestotal[1] + cr + spcf1 
        + mestotal[2] + cr + spcf2 + mestotal[3] + cr + spcf3 
        + mestotal[4] + cr + lowerlf + myblank + "  _A_  " + cr + myblank + " [___] ";
    timerID = setTimeout("interval1()", 250);
    }
}
