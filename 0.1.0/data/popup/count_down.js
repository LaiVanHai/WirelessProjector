var secondsRemaining;
var intervalHandle;
// grab the h1
var timeDisplay = document.getElementById("time");

function resetPage(){

	document.getElementById("inputArea").style.display = "block";
  document.getElementById("stop").style.display = "none";
  document.getElementById("time").style.display = "none";
}

function tick(){

	// turn the seconds into mm:ss
	var min = Math.floor(secondsRemaining / 60);
	var sec = secondsRemaining - (min * 60);

	//add a leading zero (as a string value) if seconds less than 10
	if (sec < 10) {
		sec = "0" + sec;
	}

	// concatenate with colon
	var message = min.toString() + ":" + sec;

	// now change the display
	timeDisplay.innerHTML = message;

	// stop is down to zero
	if (secondsRemaining === 0){
		alert("MTGを終わる際にwirelessプログラムをきちんと閉じてください！！！");
    timeDisplay.innerHTML = "";
		clearInterval(intervalHandle);
		resetPage();
	}

	//subtract from seconds remaining
	secondsRemaining--;

}

function startCountdown(){

	function resetPage(){
		document.getElementById("inputArea").style.display = "block";
	}

	// get countents of the "minutes" text box
	var minutes = document.getElementById("minutes").value;

	// check if not a number
	if (isNaN(minutes)){
		alert("Please enter a number");
		return; // stops function if true
	} else {
    // timeDisplay.innerHTML = "00:00";
  }

	// how many seconds
	secondsRemaining = minutes * 60;

	//every second, call the "tick" function
	// have to make it into a variable so that you can stop the interval later!!!
	intervalHandle = setInterval(tick, 1000);

	// hide the form
	document.getElementById("inputArea").style.display = "none";
  document.getElementById("stop").style.display = "inline";
  document.getElementById("time").style.display = "block";
}

window.onload = function(){
  var stopCount = document.getElementById("stop");
  stopCount.onclick = function () {
    clearInterval(intervalHandle);
    resetPage();
    document.getElementById("stop").style.display = "none";
    timeDisplay.innerHTML = "";
  }


	// create input text box and give it an id of "min"
	var inputMinutes = document.createElement("input");
	inputMinutes.setAttribute("id", "minutes");
	inputMinutes.setAttribute("type", "text");

	//create a button
	var startButton = document.createElement("input");
	startButton.setAttribute("type","button");
	startButton.setAttribute("value","スタート");
  // startButton.setAttribute("disabled","disabled");
  startButton.setAttribute("id","count-down-button");
	startButton.onclick = function(){
		startCountdown();
	};

  // $("input[type='text']").on("keyup", function(){
  //     if($(this).val() != ""){
  //       document.getElementById("count-down-button").removeAttr("disabled");
  //     }
  // });

	//add to the DOM, to the div called "inputArea"
	document.getElementById("inputArea").appendChild(inputMinutes);
	document.getElementById("inputArea").appendChild(startButton)

}