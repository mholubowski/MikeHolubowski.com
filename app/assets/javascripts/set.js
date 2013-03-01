// Set.js by MikeHolubowski.com
// *** ---- TODO ---- ***
//
// 
// ----------------
// Features
// 	-cards selected flash red or green to indicate in/correct choice
// 	-load all correct combo's into array and check again them to optimize checkSet()
// 	-End game
// 	-High Scores
//  - Get off jquery.UI!
// ----------------
// Styling
// 

// builds 81 unique cards by iterating over the properties
var current_cards = [];
var cards = [],
count = [1, 2, 3],
				// purple green red
				color = ['p', 'g', 'r'],
				// empty full striped
				fill  = ['e', 'f', 's'],
				// squiggle oval diamond
				shape = ['s', 'o', 'd'];

				function createDeck(){
	// todo check if cards do not exits before running
	var cnt, clr, fl, s;
	for (cnt = 0; cnt < count.length; cnt += 1) {
		for (clr = 0; clr < color.length; clr += 1) {
			for (fl = 0; fl < fill.length; fl += 1) {
				for (s = 0; s < shape.length; s += 1) {
					cards.push({ 'count': count[cnt], 
						'color': color[clr], 
						'fill':  fill[fl], 
						'shape': shape[s] });
				}
			}
		}
	}
}

// randomize order of cards in deck
function shuffleDeck(cards) {
	for (var i = cards.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = cards[i];
		cards[i] = cards[j];
		cards[j] = temp;
	}
	return cards;
}

// append cards to DOM
function buildCards(amount){
	if (parseInt($('#cards-left span').html()) == 0){
		return;
	}
	subtractCardsLeft(amount);
	var container = $('#cards-container');
	for (var c = 0; c < amount; c++){
		
		var output  = " ";
		var card    = cards[0];
		var combo   = card.color.charAt(0) + card.shape.charAt(0) + card.fill.charAt(0);
		var comboID = card.count + card.color.charAt(0) + card.shape.charAt(0) + card.fill.charAt(0);
		var outer   = "<div class='unclicked card' id=" + comboID + "> ";
		output += outer;
		var inner = "<span class='shape shapes-" + combo + "'></span>";

		for (var i = card.count; i > 0; i--){
			output += inner;
		}

		output += "</div>";
		container.append(output);
		cards.shift();

		current_cards.push(comboID);
	}
	primeForClicking();
	checkCurrentCards();
}

// create 3 cards on click

// create, shuffle, and build 12 cards to start
function doOnLoad() { 
	createDeck();
	shuffleDeck(cards);
	buildCards(12);
	$('#add').on('click', function(){
		console.log('click');
		if ($('div#spacer span').html() != 0){
			// TODO lose points proportional to how many available sets there are
			subtractPoints(10);
		}
		buildCards(3);
	});
	if ($('div#spacer span').html == 0){
		buildCards(3);
	}
}

// $(window).bind('page:change', function(){
// 	doOnLoad();
// })
$(document).ready(function(){
	doOnLoad();
})

//reset all clicked cards
function primeForClicking(){
	$('.unclicked').unbind('click');
	$('.unclicked').on('click', function(){
	// check if this card has already been added to ondeck
		if ($.inArray($(this).attr('id'), ondeck) === -1){
			//add css class and add the cards id to onDeck
			$(this).removeClass('unclicked').addClass('clicked');
			console.log('class added');
			onDeck($(this).attr('id'));
		}
	})
}

// cards that have been clicked
var ondeck = [];
function onDeck(id){
	ondeck.push(id);
	if (ondeck.length === 3){
		checkSet(ondeck, true);
	}
}

// *** Check how many sets exist
//     and print to DOM

function checkCurrentCards(){
	var available_posibilities = 0;
	for (var i = 0; i < current_cards.length - 2; i++){
		for (var j = i+1; j < current_cards.length - 1; j++){
			for (var k = j+1; k < current_cards.length;    k++){
				var set = [current_cards[i], current_cards[j], current_cards[k]]
				if (checkSet(set,false)){
					available_posibilities += 1;
				}
			}
		}
	}
	$('div#spacer span').html(available_posibilities);
	if (available_posibilities = 0){
		buildCards(3);
	}
}

//check if selected set is in fact a proper set
//  is_active parameter set to false for summing 
//  available posibilities but not affecting play

function checkSet(set, is_active){
	// set is array ['2pdf', '2pse', '2pos']

	var one    = set[0].split('');
	var two    = set[1].split('');
	var three  = set[2].split('');

	// create matrix m
	var m = [];
	m[0] = [one[0],two[0],three[0]];
	m[1] = [one[1],two[1],three[1]];
	m[2] = [one[2],two[2],three[2]];
	m[3] = [one[3],two[3],three[3]];

	//		      2 2 2 
	//	    	  p p p 
	//	        s d s
	// 				  f e s

	// t holds true's or false's for each condition
	var t = [];
	for (var n = 0; n <= 3; n++){
		if (m[n][0] === m[n][1] && m[n][1] === m[n][2]){
			t.push(true);
		}
		else if (m[n][0] !== m[n][1] && m[n][0] !== m[n][2] && m[n][1] !== m[n][2]) {
			t.push(true);
		}	
		else{
			t.push(false);
		}
	}

	// check is there is a match
	if (t[0] && t[1] && t[2] && t[3]){
		if (is_active){
			isMatch();
		}
		else {
			// used for summing available
			return true;
			available_posibilities += 1;
		}
	}
	else {
		if (is_active){
			isNotMatch();
		}
		else{
			// used for summing available
			return false;
		}
	} 

	function isMatch(){
		// alert user the set is correct
		// add points
		// remove the cards

		for (var i = 0; i < set.length; i++){
			var id = '#'+ set[i];
			$(id).remove();
			current_cards.splice(current_cards.indexOf(set[i]), 1);
		}
		ondeck = [];
		unclickAll();
		// check if there are more than 12 cards
		console.log($('.card').length);
		if ($('.card').length < 12){
			buildCards(3);
		}
		addPoints(30);
		checkIfEndGame();
	}

	function isNotMatch(){
		subtractPoints(5);
		unclickAll();
	}

	function unclickAll(){
		ondeck = [];
		$('.clicked').addClass('unclicked').removeClass('clicked');
		console.log('classes removed');
	}
}

function subtractPoints(points){
	$('div#score').stop().css('background-color', 'red').animate({backgroundColor: "#bbb"}, 2000);

	// change total point value
	var original = parseInt($('span#count').html());
	$('span#count').html(original - points);
}

function addPoints(points){
	$('div#score').stop().css('background-color', '#05E42A').animate({backgroundColor: "#bbb"}, 1000);

	// change total point value
	var original = parseInt($('span#count').html());
	$('span#count').html(original + points);
}

// *** Card Counter
function subtractCardsLeft(amount){
	var original = parseInt($('#cards-left span').html());
	if (original == 0){
		checkCurrentCards();
		return;
	}
	$('#cards-left span').html(original - amount);
}

// *** Timer
window.setInterval(function(){
	var original = parseInt($('#timer span').html());
	$('#timer span').html(original + 1);

	if ( (original + 1) % 30 === 0){
		subtractPoints(5);
	}
}, 1000);


//  *** End Game ---------

function checkIfEndGame(){
	var cardsLeft    =  $('#cards-left span').html();
	var possibleSets =  $('div#spacer span').html();
	console.log('cards left: ' + cardsLeft);
	console.log('possible sets: ' + possibleSets);
	if (cardsLeft == 0 && possibleSets == 0){
		endGame();
	}
	else {
		console.log('game not over');
	}
	function endGame(){
		var score = $('span#count').html();
		$('input#set_player_high_score').val(score)
		$('div#score-big').html(score);
		$('#highScoreModal').modal();
	}
}

