//good ol data'vase'
var datavase = new Firebase('https://linkit-827fd.firebaseio.com/');
//preset of game values
var gameMode = "normal";
var keyEnabled = false;
var globalEnd = "end";
var pt;

var highscoreBankt = "";
var scoreBank = [];

//element manager
var startport = document.getElementById("startport");
var playport = document.getElementById("playport");
var numberLarge = document.getElementById("numberLarge");
var playtimer = document.getElementById("playTimer");
var playpoints = document.getElementById("playPoints");
var confirmPoint = document.getElementById("confirmPoint");
var timeBonus = document.getElementById("timeBonus");
var majorPoints = document.getElementById("majorPoints");
var totalPoints = document.getElementById("totalPoints");
var completePoints = document.getElementById("completePoints");
var nicknameP = document.getElementById("nicknameP");
var scoreBoard = document.getElementById("scoreBoard");

function startGame() {
    playtimer.innerHTML = "10";
    playpoints.innerHTML = "0";
    startport.style.display = "none";
    playport.style.display = "block";
    globalEnd = "not";
    startMobile();
}
function startMobile() {
    var ifDint = Math.floor(Math.random() * 4) + 1;
    var targetInt = 1;
    for(i=0;i<10;i++) {
        if(ifDint == 1) {
            targetInt *= 2;
        } else if (ifDint == 2) {
            targetInt *= 3;
        } else if (ifDint == 3) {
            targetInt *= 5;
        } else if (ifDint == 4) {
            targetInt *= 7;
        }
    }
    numberLarge.innerHTML = targetInt;
    startTimer();
    keyEnabled = true;
}
function isPrime(num) {
    for(var i = 2; i < num; i++)
        if(num % i === 0) return false;
    return num !== 1;
}
function startTimer() {
    var timeCount = 0;
    var s = setInterval(function(){
        timeCount += 1;
        playTimer.innerHTML = parseInt(playTimer.innerHTML)-1;
        if(timeCount >= 10 || globalEnd == "end") {
            clearInterval(s);
            if( globalEnd != "end" ) {
                endPlay();
            }
        }
    }, 1000);
}
function pressKey(int) {
    if(parseInt(numberLarge.innerHTML)%int == 0) {
        numberLarge.innerHTML = parseInt(numberLarge.innerHTML)/int;
        var primeChecker = isPrime(parseInt(numberLarge.innerHTML));
        playpoints.innerHTML = parseInt(playpoints.innerHTML) + (parseInt(playtimer.innerHTML)/10)*5;
        if(primeChecker==true){
            endPlay();
        }
    } else {
        playpoints.innerHTML = parseInt(playpoints.innerHTML) - (parseInt(playtimer.innerHTML)/10)*5;
    }
}
function endPlay() {
    globalEnd = "end";
    playport.style.display = "none";
    confirmPoint.style.display = "block";
    var timePt = parseInt(playtimer.innerHTML)
    var majorPt = parseInt(playpoints.innerHTML)
    if(timePt!=0){
        completePoints.innerHTML = "20";
    } else {
        completePoints.innerHTML = "なし";
    }
    timeBonus.innerHTML = timePt;
    majorPoints.innerHTML = majorPt;
    var allPt = timePt + majorPt + parseInt(completePoints.innerHTML);
    pt = allPt;
    totalPoints.innerHTML = allPt;
}
function mm() {
    startport.style.display = "block";
    confirmPoint.style.display = "none";
    if(nicknameP.value.length == 0) {
        var nick = "名無しの数学好き";
    } else {
        var nick = nicknameP.value;
    }
    datavase.push({username:nick,score:pt});
}
var startListening = function() {
    datavase.on('child_added', function(snapshot) {
        var scoreVase = snapshot.val();
        scoreBank.push(scoreVase.score+"^"+scoreVase.username);
        updateHighscoreBoard();
    });
}
startListening();

var hsContent = document.getElementById("hsContent");
var sport = document.getElementById("sport");
function updateHighscoreBoard() {
    for( i=0;i<scoreBank.length;i++ ) {
        if( i == 0 ) {
                highscoreBankt = scoreBank[i];
        } else {
            if( parseInt(highscoreBankt) < parseInt(scoreBank[i]) ) {
                highscoreBankt = scoreBank[i];
            }
        }
    }
    var sbContent = [];
    for( i=0;i<scoreBank.length;i++) {
        sbContent.push("<div class='listScore'><strong>"+scoreBank[i].split("^")[1]+" : </strong><span>"+scoreBank[i].split("^")[0]+"</span></div>");
    }
    sport.innerHTML = sbContent.join("");
    hsContent.innerHTML = "<div><strong>"+highscoreBankt.split("^")[1]+" : </strong><span>"+highscoreBankt.split("^")[0]+"</span></div>";
}
