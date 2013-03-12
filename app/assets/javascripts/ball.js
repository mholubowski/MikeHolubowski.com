
// $(document).ready(function(){
	
// 	initialize();
// })
// var bag = [];
// var Ball = function(){
// 	this.selector = $('#ball');
// 	this.leftPx   = parseInt(this.selector.css('left'));
// }

// var initialize = function(){
// 	console.log('init');
// 	bag.push(new Ball());
// 	var b = bag[0];
// }

// var ball = {
// 	selector: $('#ball'),
// 	leftPx: parseInt(this.selector.css('left'))
// }

$(document).ready(function(){
	// var ball = $('#ball');
	document.getElementById('ball').style.left = '290px';
	document.getElementById('ball').style.top = '240px';
	var mainBall = $('#ball');

	setInterval(function(){
		dropDot();
	}, 100);
	
})

// var leftPx = ball.css('left');
// var rightPx = ball.css('right');

	// var ball = $('#ball');
	// var left = parseInt(ball.css('left'));
	// left += 1;
	// var velocity = 5;
	// window.setInterval(
	// 	ball.css('left', left),
	// 	1000/velocity
	// )

// var moveTo = parseInt($('#ball').css('left'), 10) + 1;

// var xMove = function(px){
// 	$('#ball').css({ left: px});
// }
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

