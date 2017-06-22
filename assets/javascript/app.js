$(document).ready(function (event) {

		var q0 = { 
			question: "How old is Tom Cruise ?",
			answerChoices: ["A. 35", "B. 45", "C. 65", "D. 54"],
			answer: "D.",

		}

		var q1 = { 
			question: "When was the first 007 movie released ?",
			answerChoices: ["A. 1962", "B. 1985", "C. 1995", "D. 2000"],
			answer: "A.",

		}

		var q2 = { 
			question: "Who is Ang Lee ?",
			answerChoices: ["A. Director", "B. Actor", "C. Musician", "D. Celebrity Chef"],
			answer: "A.",

		}


		var q3 = { 
			question: "How many sequels of 'Back in the Future' are there ?",
			answerChoices: ["A. One", "B. Two", "C. Three", "D. Four"],
			answer: "C.",

		}

		var q4 = { 
			question: "Who did Leonardo Dicaprio play in 'Wolf of Wall Street' ?",
			answerChoices: ["A. Captain Philips", "B. Captain Sully", "C. Jordan Belfort", "D. Michael Jordan"],
			answer: "C.",

		}


		var timeLeft = 10; 

		var losses = 0; 

		var wins = 0; 

		var timesUp = 0; 

		var number = 0; 

		var questions = [q0.question, q1.question, q2.question, q3.question, q4.question]; 
			console.log(questions); 

		var answerOptions = [q0.answerChoices, q1.answerChoices, q2.answerChoices, q3.answerChoices, q4.answerChoices]; 

		var answers = [q0.answer, q1.answer, q2.answer, q3.answer, q4.answer]


		
		function winPage () {
			$(".gif-screen").html("<img src=assets/images/win.gif class='winGif'>") 
		}

		function losePage () {
			$(".gif-screen").html("<img src=assets/images/lose.gif class='loseGif'>")
		}

		function endPage () {
			$(".gif-screen").html("<img src=assets/images/end.gif class='endGif'>")
		}

		var replaceOptions = "<div class='row'>" + 
								"<p>Answer Choices</p>" + 
							"</div>" +
							"<div class='row choice1'></div>" +
							"<div class='row choice2'></div>" + 
							"<div class='row choice3'></div>" +
							"<div class='row choice4'></div>"

		function countdown () { 
			if (timeLeft === 0) {
				clearInterval(intervalId); 
				$(".timer").text("Time Remaining: " + 0 + " Seconds"); 
				$(".results").text("Times Up! The correct answer is: " + answers[number]); 
				losePage(); 
				timesUp ++; 
				number ++ ;
				setTimeout(game, 3000); 
			}
			else {
				timeLeft -- ;
				$(".timer").text("Time Remaining: " + timeLeft + " Seconds");  
				//we decrement the time first before we display because at the game function we are already displaying 10s on screen
				//lag time then kicks in 
				//game function grabs countdown function, by this time 1s has already passed
				//so when game function calls on countdown, the display should be 9s instead of 10s, so we decrement before we display
			} 
		}


		function game () {
			if (number < questions.length ) {
				timeLeft = 10; 
				$(".results").text(""); 
				$(".gif-screen").html(replaceOptions); 
				$(".timer").text("Time Remaining: " + timeLeft + " Seconds");
				intervalId = setInterval (countdown, 1000);
				//calling countdown function takes time to run, so there will be a time lag. This is why we display the time on screen first
				$(".question").text(questions[number]); 
				$(".choice1").html("<button class='buttons button1' value=" + answerOptions[number][0] + ">" + answerOptions[number][0] + "</button>");
				$(".choice2").html("<button class='buttons button2' value=" + answerOptions[number][1] + ">" + answerOptions[number][1] + "</button>"); 
				$(".choice3").html("<button class='buttons button3' value=" + answerOptions[number][2] + ">" + answerOptions[number][2] + "</button>");
				$(".choice4").html("<button class='buttons button4' value=" + answerOptions[number][3] + ">" + answerOptions[number][3] + "</button>");
				
				$(".buttons").on("click", function () {
						var userClick = $(this).attr("value"); 
						console.log(userClick); 

					if (userClick === answers[number]) {
						$(".results").text("You're Right! The correct answer is: " + answers[number]); 
						wins ++; 
						clearInterval(intervalId); 
						winPage(); 
						number ++ ;
						setTimeout(game, 3000);

					}
					else{
						$(".results").text("You're Wrong! The correct answer is: " + answers[number]);
						losses ++; 
						clearInterval(intervalId); 
						losePage(); 
						number ++ ;
						setTimeout(game, 3000); 

					}   
				}); 

			
			}
			else {
				clearInterval(intervalId); 
				endPage(); 
				$(".results").text("Game Over! Press Restart to Play Again!"); 
				$(".question").text("");
				$(".unanswered").text("Unanswered: " + timesUp);
				$(".correct").text("Correct: " + wins); 
				$(".incorrect").text("Incorrect: " + losses); 
				
				$(".restart").show(); 

		}
	}

	function reset () {
		$(".restart").hide(); 
		losses = 0; 
		$(".incorrect").text(""); 
		wins = 0; 
		$(".correct").text(""); 
		timesUp = 0; 
		$(".unanswered").text("");
		number = 0; 
		game(); 
	}

	$(".restart").hide(); 

	$(".start").on("click", function () {


		//intervalId = setInterval (countdown, 1000); 

		$(this).hide(); 

		game(); 
		
	}); 

	$(".restart").on("click", function () {
		reset(); 
	}); 

}); 


