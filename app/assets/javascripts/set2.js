var container = $('#cards-container');

var count = [1, 2, 3],
		// purple green red
		color = ['p', 'g', 'r'],
		// squiggle oval diamond
		shape = ['s', 'o', 'd'],
		// empty full striped
		fill  = ['e', 'f', 's'];

// --------------------------------------------------------- Card Object
function Card (id, count, color, shape, fill) {
	this.id    = 'c' + id;
	this.count = count;  
	this.color = color;  
	this.shape = shape;
	this.fill  = fill;  
	this.combo = count + color + shape + fill;
	this.state = 'unclicked';
	this.html  = "<div id='" + this.id  + "' class='unclicked card' >";
	for (var i = 0; i < this.count; i++ ){
		this.html +=  "<span class='shape shapes-" + this.combo.substr(1,4) + "'></span>";
	}
	this.html += "</div>";
	var selector = "#c" + id;
	this.remove = function(){
		$(selector).remove();
	}
	this.flash = function(color, duration){
		$(selector).stop().css('background-color', color).animate({
			backgroundColor: "#fff"}, duration
			);
	}
	this.select = function(){
		selection.selectionCards.push(this);
	}
}

// --------------------------------------------------------- Deck Object
var deck = {
	cards: [],
	build: function(){
		var cnt, 
		clr, 
		fl, 
		s;
		for (cnt = 0; cnt < count.length; cnt += 1) {
			for (clr = 0; clr < color.length; clr += 1) {
				for (fl = 0; fl < fill.length; fl += 1) {
					for (s = 0; s < shape.length; s += 1) {
						this.cards.push(
							new Card(
								2,
								count[cnt],
								color[clr],
								shape[s],
								fill[fl]
								)
							)
					}
				}
			}
		}
	},
	shuffled: [],
	shuffle: function(){
		for (var i = 80; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = this.cards[i];
			this.shuffled[i] = this.cards[j];
			this.shuffled[j] = temp;
		}
		console.log('done shuffling');
	},
	amountLeft: 81,
	removeFromDeck: function(amount){
		this.amountLeft -= amount;
	},
	deal: function(amount){
		for (var i = 0; i < amount; i++){
			$('#cards-container').append(this.shuffled[i].html);
			this.shuffled.shift();
		}
	}
}

// --------------------------------------------------------- Selection Object
var selection = {
	selectionCards: [],
	check: function(){
		var one = this.selectionCards[0].combo.split('');
		var two = this.selectionCards[1].combo.split('');
		var three = this.selectionCards[2].combo.split('');
		// create matrix m
		var m = [];
		m[0] = [one[0],two[0],three[0]];
		m[1] = [one[1],two[1],three[1]];
		m[2] = [one[2],two[2],three[2]];
		m[3] = [one[3],two[3],three[3]];
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
		if (t[0] && t[1] && t[2] && t[3]){
			alert('match');
		}
	},
	clear: function(){
		this.selectionCards = []
	}
}




// --------------------------------------------------------- Doc Ready
$(document).ready(function(){
	deck.build();
	deck.shuffle();
	deck.deal(12);
})