// Sets difficulty to some extent
var numMin = 1;
var numMax = 30;
var score  = 0;

function randomOperation(num1, num2, n){
	var max = 3;
	var min = -3;
	var truth;
	var lie;
	var operator;
	var answer;
	switch (n)
	{
		case 1:
			operator = '+' 
			truth = num1 + num2;
			lie   = truth + Math.round(Math.random() * (max - min + 1)) + min;
			break;
		case 2:
			operator = '-' 
			truth = num1 - num2;
			lie   = truth + Math.round(Math.random() * (max - min + 1)) + min;
			break;
		case 3:
			operator = 'x' 
			truth = num1 * num2;
			lie   = truth + Math.round(Math.random() * (max - min + 1)) + min;
			break;
		case 4:
			operator = '/' 
			truth = Math.round(num1 * 10 / num2)/10;
			lie   = Math.round(10*(truth + Math.random() * (max - min + 1) + min)/10);
			break;
	}
	var choice = Math.floor(Math.random()*2);
	answer = [truth, lie][choice];
	correct = [true, false][choice];
	return [num1, num2, operator, answer, correct];
}

//build problem object
//problem.info returns [11, 21, "x", 231, true]
function Problem() {
	this.num1 = Math.floor(Math.random() * (numMax - numMin + 1)) + numMin;
	this.num2 = Math.floor(Math.random() * (numMax - numMin + 1)) + numMin;
	this.info = randomOperation(this.num1, this.num2, Math.floor(Math.random() * 4 + 1));
	this.print = function(){
		$('#one').html(this.info[0]);
		$('#two').html(this.info[1]);
		$('#operator').html(this.info[2]);
		$('#answer').html(this.info[3]);
	};
	this.equation = this.info[0] + this.info[2] + this.info[1] + '=' + this.info[3]
	this.check = function(choice){
		if (choice == this.info[4]){
			score++;
			$('#current_score').html(score);
			var html = '<a href="#" data-toggle="tooltip" data-placement="left" data-original-title="' + this.equation + '" class="green">&#10003;</a>'
			$('#tracker').append(html)
			$('#tracker a').tooltip();
			newProblem();
		} 
		else {
			score -= 1;
			$('#current_score').html(score);
			var html = '<a href="#" data-toggle="tooltip" data-placement="left" data-original-title="' + this.equation + '" class="red">X</a>'
			$('#tracker').append(html)
			$('#tracker a').tooltip();
			newProblem();
		}
	};
}

function newProblem(){
	var current_problem = new Problem();
	current_problem.print();
	$('#true').unbind('click');
	$('#true').on('click', function(){
		current_problem.check(true);
	})
	$('#false').unbind('click');
	$('#false').on('click', function(){
		current_problem.check(false);
	})
}

function endGame(){
	$('#true_false_highScoreModal').modal();
	$('#true_false_highScoreModal #score-big').html(score);
	$('#true_false_highScoreModal #hidden_score').val(score);
}

window.setInterval(function () {
    var original = parseInt($('#time').html(), 10);
    $('#time').html(original - 1);
    if (original == 1){
    	endGame();
    }
}, 1000);

$(document).ready(function(){
	newProblem();
});

$(document).keydown(function(e){
    if (e.keyCode == 37) {
    	var true_button = $('#true');
       true_button.click();
       true_button.css('background-color','rgb(232, 243, 248)');
       setTimeout(function(){
       	 true_button.css('background-color','#fff');
       }, 100)
       return false;
    }
    if (e.keyCode == 39) { 
    	var false_button = $('#false');
       false_button.click();
       false_button.css('background-color','rgb(232, 243, 248)');
       setTimeout(function(){
       	 false_button.css('background-color','#fff');
       }, 100)
       return false;
    }
});
