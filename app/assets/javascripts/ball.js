

$(document).ready(function(){
	// var ball = $('#ball');
	document.getElementById('ball').style.left = '290px';
	document.getElementById('ball').style.top = '240px';
	var mainBall = $('#ball');

	setInterval(function(){
		dropDot();
	}, 100);
	

	// ------------------ Buttons
	$('#btn-random').on('click', function(){
		randomVelocity()
	});
	$('#btn-clear').on('click', function(){
		$('.dot').remove();
	})
})




var stats = {
	xVelocity: 0,
	yVelocity: 0,
	print: function(){
		$('#xVelocity span').html(this.xVelocity);
		$('#yVelocity span').html(this.yVelocity);
	}
}
// ------------------------------------------------------------------ X
var xIntervals = [];
function velocityX(pxPerSecond, direction){
	// auto set negative/positive
	var mainBall = $('#ball');
	if (pxPerSecond > 0){
		direction = 'positive';
	}
	else {
		pxPerSecond = pxPerSecond * -1;
	}
	clearInterval(xIntervals[xIntervals.length-1]);
	var x = setInterval(function(){moveX(direction)}, 1000/pxPerSecond);
	xIntervals.push(x);
	// ----- send data to stats object
	if (direction === 'positive'){
		stats.xVelocity = pxPerSecond;
	}
	else {
		stats.xVelocity = pxPerSecond * -1;
	}
	stats.print();
}

function moveX(direction){
	var leftPx = parseInt(document.getElementById('ball').style.left);
	var topPx = parseInt(document.getElementById('ball').style.top);
	if (leftPx == 0){
		clearInterval(xIntervals[xIntervals.length-1])
	  reverseX();
		return document.getElementById('ball').style.left = '1px';
	}
	if (leftPx == 580){
		clearInterval(xIntervals[xIntervals.length-1])
	  reverseX();
		return document.getElementById('ball').style.left = '579px';
	}

	if (direction === 'positive'){
		leftPx = leftPx + 1 + 'px';
	}
	else {
		leftPx = leftPx - 1 + 'px';
	}
	document.getElementById('ball').style.left=leftPx;
}

// ------------------------------------------------------------------ Y
var yIntervals = [];
function velocityY(pxPerSecond, direction){
	// auto set negative/positive
	if (pxPerSecond > 0){
		direction = 'positive';
	}
	else {
		pxPerSecond = pxPerSecond * -1;
	}
	clearInterval(yIntervals[yIntervals.length-1]);
	var y = setInterval(function(){moveY(direction)}, 1000/pxPerSecond);
	yIntervals.push(y);
	if (direction === 'positive'){
		stats.yVelocity = pxPerSecond;
	}
	else {
		stats.yVelocity = pxPerSecond * -1;
	}
	stats.print();
}

function moveY(direction){
	var topPx = parseInt(document.getElementById('ball').style.top);
	if (topPx == 0){
		clearInterval(yIntervals[yIntervals.length-1])
	  reverseY();
		return document.getElementById('ball').style.top = '1px';
	}
	if (topPx == 480){
		clearInterval(yIntervals[yIntervals.length-1])
	  reverseY();
		return document.getElementById('ball').style.top = '479px';
	}

	if (direction === 'positive'){
		topPx = topPx - 1 + 'px';
	}
	else {
		topPx = topPx + 1 + 'px';
	}
	document.getElementById('ball').style.top=topPx;
}

// --------------------------------------------------------- Reverse Direction
function reverseX(){
	velocityX(stats.xVelocity * -1);
}
function reverseY(){
	velocityY(stats.yVelocity * -1);
}

// --------------------------------------------------------- Dot Tracker
// add 8px to left, -4 px from top
function dropDot(){
	ball = document.getElementById('ball');
	leftPx = parseInt(ball.style.left) + 8;
	leftPx = String(leftPx + 'px');
	topPx  = parseInt(ball.style.top) - 4;
	topPx  = String(topPx + 'px')
	var html = "<div class='dot' style='left:" + leftPx + ";top:" + topPx + ";'>.</div>";
	$('#ball-area').append(html);
}



// --------------------------------------------------------- Clicking
function randomVelocity(){
	var x = Math.floor((Math.random()-.5)*400);
	var y = Math.floor((Math.random()-.5)*400);
	setVelecotiy(x,y);
}
function setVelecotiy(x, y){
	velocityX(x);
	velocityY(y);
}

