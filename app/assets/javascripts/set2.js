function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

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
	this.clickAdd = function(){
		$(selector).addClass('clicked').removeClass('unclicked');
	}
	this.clickRemove = function(){
		$(selector).addClass('unclicked').removeClass('clicked');
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
var protoCards = [];
var buildProtoCards = function(){
	var cnt, 
	clr, 
	fl, 
	s;
	id = 0;
	for (cnt = 0; cnt < count.length; cnt += 1) {
		for (clr = 0; clr < color.length; clr += 1) {
			for (fl = 0; fl < fill.length; fl += 1) {
				for (s = 0; s < shape.length; s += 1) {
					protoCards.push(
						new Card(
							id,
							count[cnt],
							color[clr],
							shape[s],
							fill[fl]
							)
						)
					id++;
				}
			}
		}
	}
}
buildProtoCards();

var deck = {
	cards: [],
	build: function(){
		var cnt, 
		clr, 
		fl, 
		s;
		id = 0;
		for (cnt = 0; cnt < count.length; cnt += 1) {
			for (clr = 0; clr < color.length; clr += 1) {
				for (fl = 0; fl < fill.length; fl += 1) {
					for (s = 0; s < shape.length; s += 1) {
						this.cards.push(
							new Card(
								id,
								count[cnt],
								color[clr],
								shape[s],
								fill[fl]
								)
							)
						id++;
					}
				}
			}
		}
	shuffle(this.cards)
  },
	amountLeft: 81,
	removeFromDeck: function(amount){
		this.amountLeft -= amount;
		$('#cards-left span').html(this.amountLeft);
	},
	deal: function(amount){
		for (var i = 0; i < amount; i++){
			$('#cards-container').append(this.cards[0].html);
			this.cards.shift();
		}
		this.removeFromDeck(amount);
		// make all clickable
		$('.unclicked').unbind('click');
		$('.unclicked').click(function(){
			selection.add(this);
		})
	}
}

// --------------------------------------------------------- Selection Object
var selection = {
	cards: [],
	add: function(card){
		// only if this card hasn't been clicked already
		var id = card.id.substr(1);
		if ($.inArray(protoCards[id], this.cards) === -1){
			protoCards[id].clickAdd();
			this.cards.push(protoCards[id]);
			if (this.cards.length == 3){
				this.check();
			}
		}
	},
	check: function(){
		var one   = this.cards[0].combo.split('');
		var two   = this.cards[1].combo.split('');
		var three = this.cards[2].combo.split('');
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
			this.match();
		}
		else {
			this.noMatch();
		}
	},
	noMatch: function(){
		points.subtract(5);
		for (var i = 0; i < this.cards.length; i++){
			this.cards[i].flash('red', 300);
		}
		this.clear();
	},
	match: function(){
		points.add(30);
		for (var i = 0; i < this.cards.length; i++){
			this.cards[i].flash('green', 300);
		}
		setTimeout(function(){
			for (var i = 0; i < selection.cards.length; i++){
				selection.cards[i].remove();
			}
			selection.clear();
			return deck.deal(3);
		}, 300)
	},
	clear: function(){
		for (var i = 0; i < this.cards.length; i++){
			this.cards[i].clickRemove();
		}
		this.cards = []
	}
}

// --------------------------------------------------------- Points
var points = {
	total: 100,
	add: function(amount){
		this.total += amount;
		this.print();
	},
	subtract: function(amount){
		this.total -= amount;
		this.print();
	},
	print: function(){
		$('span#count').html(this.total);
	}
}

// --------------------------------------------------------- Doc Ready
$(document).ready(function(){
	// deck.build();
	deck.build();
	deck.deal(12);

	$('#add').click(function(){
		deck.deal(3);
	})
})