var timerID = null
var patno=1
var cr="\r\n"
var blankno=0
var totalblank=""
var lr=1                       //if lr=-1 then left , lr=1 then right
var lowerlf=""                 //lower side space
var downlf=""                  //upper side space
var downno=0
var inplay=0
var missilex=99                //missile position
var missiley=99
var mychrx=1                   //my chractor position
var myblank=""
var mymove=0
var spcf1=""
var spcf2=""
var spcf3=""
var hitflag=0
var score=0
var selec=0                    //machine select
var mname=" Windows is"
var rsmiss=""                  //missile no hit R side

/**
* Функция для работы с массивом
*
* Работа с игровым полем
*
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
function onloadmes(){
    document.fmark.win.value=" "
    cr = unescape("%0A")
    ver=navigator.appVersion
    len=ver.length
    for(iln=0;iln<len;iln++) 
	    if(ver.charAt(iln)=="(") 
		    break
    systm = ver.charAt(iln+1).toUpperCase()
    if(systm=="M"){
	    cr = unescape("%0D")
    }
    if(systm=="W"){
	    cr = unescape("%0D")+cr
    }
    if(systm=="C"){
        cr = unescape("%0D")+cr
        tmpsys = ver.charAt(0).toUpperCase()
        if (tmpsys == 4){
		    cr = unescape("%0D")
        }
    }
    starter()
}

/**
* Функция для инициализации игры
*
* Инициализация игрового цикла
*
*/
function init(){
    blankx = new array1(63)
    for (var makeblank = 0;makeblank < 63;makeblank++){
        blankx[makeblank]=""
        for (var addBlank = 0; addBlank < makeblank; addBlank++) {
            blankx[makeblank] = blankx[makeblank] + " "
        }
    }
    faker = new array1(24);        //faker(1) to (24) = facemark active flag
    face = new array1(2);          //Dim face(2)
    face[1]=" (^O^) "
    face[2]=" (^-^) "
    mestotal =new array1(4)        //Dim mestotal(4)

    interval1()
}

/**
* Функция для перезапуска игры
*
* Перезапись переменных для запуска игры
*
*/
function restarter(){
    inplay=0
    blankno=0
    totalblank=""
    lr=1
    lowerlf=""
    downlf=""
    downno=0
    missilex=99
    missiley=99
    mychrx=1
    myblank=""
    mymove=0
    selec=1
    starter()
}

function starter(){
    document.fmark.win.value=cr+cr+cr+cr+cr+cr+cr+"                          Are you ready?"+cr+cr+cr+"                           Click FIRE!"
    selec=1
}

/**
* Функция для перемещения влево
*
* Посимвольное перемещение влево
*
*/
function goleft(){
    mymove=0
    mychrx=mychrx-1
    if (mychrx <= 0){
	    mychrx=1
    }
}

/**
* Функция для перемещения вправо
*
* Посимвольное перемешение вправо
*
*/
function goright(){
    mymove=0
    mychrx=mychrx+1
    if (mychrx >= 56){
	   mychrx=55
    }
}

/**
* Функция для ограничения влево
*
* Ограничение игрового поля
*
*/
function golmax(){
    if (inplay == 1){
        mymove=-1
    }
}

/**
* Функция для ограничения вправо
*
* Ограничение игрового поля
*
*/
function gormax(){
    if (inplay == 1){
	    mymove=1
    }
}

/**
* Функция для стрельбы
*
* Инициализация стрельбы
* при нажатии кнопки Fire
*
*/
function fire(){
    if (inplay == 0){
        if (selec == 1){
            selec=9
            inplay=1
            init()
        }
    }else{
        if (missiley == 99){
            missiley=18
            missilex=mychrx+3
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
function gameover(){           //GAME OVER
    score=0
    for (var enerme=1;enerme<25;enerme++){
        if (faker[enerme] == 1){
            score=score+1
        }
    }
    if (score == 0){
        document.fmark.win.value=cr+cr+cr+cr+cr+cr+cr+cr+"                        Congratulation!"+cr+cr+"                          ALL CREAR!!"
    }else{
        document.fmark.win.value=cr+cr+cr+cr+cr+cr+cr+cr+"                           GAME OVER"+cr+cr+"                        "+score+" ENEMY REMAINED"
    }
inplay=0
}

function interval1(){
    if (missiley != 99) {
        missiley=missiley-1
    }
    if (missiley < 0){
        missiley=99
    }

    mychrx=mychrx+mymove
    if (mychrx <= 0){
        mychrx=1
    }
    if (mychrx >= 56){
        mychrx=55
    }
    blankno=blankno+lr             //offset count up
    totalblank = blankx[blankno]   //offset syori
    if (blankno >= 20) {
        lr=-1
        downno=downno+1
        blankno=20
    }
    if (blankno <= 0) {
        lr=1
        downno=downno+1
        blankno=0
    }
    if (downno >= 12) {
        gameover()
    }

   downlf=""
   for (var upperspc=0;upperspc<downno;upperspc++){
        if (missiley == upperspc){
            downlf=downlf+blankx[missilex]+"|"+cr
        }else{
            downlf=downlf+cr
        }
   }
   
    //facemark change
    if (inplay == 1){
        patno=patno+1
    if (patno >= 3) {
        patno = 1
    }
   
    //face aria
    for (var addline = 1; addline < 5; addline++){
        mestotal[addline]=totalblank
        rsmiss=""
        if (missiley == (downno+addline*2-2)){
            if (blankno <= missilex){
                hitflag=parseInt((missilex-blankno)/7,10)
                if (hitflag < 6){
                    if ((missilex-blankno-(hitflag*7)) >= 1){
                        if ((missilex-blankno-(hitflag*7)) <= 5){
                            if (faker[(addline*6)+hitflag-5] == 1){
                                faker[(addline*6)+hitflag-5] = 0
                                missiley=99
                            }
                        }
                    }
                }else{
				    if (missilex > (blankno+42)){
                        rsmiss=blankx[missilex-blankno-42]+"|"
                    }
                }
            }else{
                mestotal[addline]=blankx[missilex]+"|"
                if (missilex < (blankno-1)){
                    mestotal[addline]=mestotal[addline]+blankx[blankno-1-missilex]
                }
            }
        }
	   
	    for (var addfaker = 1; addfaker < 7; addfaker++){
            if (faker[(addline*6)+addfaker-6] == 1){
                mestotal[addline]=mestotal[addline]+face[patno]
            }else{
		        mestotal[addline]=mestotal[addline]+"       "
	        }
        }
        mestotal[addline]=mestotal[addline]+rsmiss
    }

    //space line in face aria
    spcf1=cr
    spcf2=cr
    spcf3=cr
    if (missiley == (downno+1)){
       spcf1=blankx[missilex]+"|"+cr
	}
    if (missiley == (downno+3)){
	    spcf2=blankx[missilex]+"|"+cr
    }
    if (missiley == (downno+5)){
	    spcf3=blankx[missilex]+"|"+cr
    }

    //lower side aria
    lowerlf=""
    for (var lowerspc=0;lowerspc<(11-downno);lowerspc++){
        if (missiley == (downno+7+lowerspc)){
            lowerlf=lowerlf+blankx[missilex]+"|"+cr
        }else{
	        lowerlf=lowerlf+cr
		}
    }
    myblank=blankx[mychrx]

    document.fmark.win.value = downlf+mestotal[1]+cr+spcf1+mestotal[2]+cr+spcf2+mestotal[3]+cr+spcf3+mestotal[4]+cr+lowerlf+myblank+"  _A_  "+cr+myblank+" [___] "

    timerID = setTimeout("interval1()",250)
    }
}

//-->