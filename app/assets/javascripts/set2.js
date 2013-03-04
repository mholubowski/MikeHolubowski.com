// ****** Open bugs / issues / to do's
// - cards not removing from deck.current_cards properly
// - jquery.ui dependency
// - add 'flash message' when dealing extra cards on 0-possibilities case

function shuffle(o) { //v1.0
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

var container = $('#cards-container');

var count = [1, 2, 3],
    // purple green red
    color = ['p', 'g', 'r'],
    // squiggle oval diamond
    shape = ['s', 'o', 'd'],
    // empty full striped
    fill = ['e', 'f', 's'];

// ---------------------------------------------------------------- Card Object
function Card(id, count, color, shape, fill) {
    this.id = 'c' + id;
    this.count = count;
    this.color = color;
    this.shape = shape;
    this.fill = fill;
    this.combo = count + color + shape + fill;
    this.state = 'unclicked';
    this.html = "<div id='" + this.id + "' class='unclicked card' >";
    for (var i = 0; i < this.count; i++) {
        this.html += "<span class='shape shapes-" + this.combo.substr(1, 4) + "'></span>";
    }
    this.html += "</div>";
    var selector = "#c" + id;
    this.remove = function () {
        $(selector).remove();
        deck.current_cards.splice(deck.current_cards.indexOf(this), 1);
        deck.possible(true);
    };
    this.clickAdd = function () {
        $(selector).addClass('clicked').removeClass('unclicked');
    };
    this.clickRemove = function () {
        $(selector).addClass('unclicked').removeClass('clicked');
    };
    this.flash = function (color, duration) {
        $(selector).stop().css('background-color', color).animate({
            backgroundColor: "#fff"
        }, duration);
    };
    this.select = function () {
        selection.selectionCards.push(this);
    };
}

// ----------------------------------------------------------------- protoCards
var protoCards = [];
var buildProtoCards = function () {
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
                    fill[fl]));
                    id++;
                }
            }
        }
    }
};
buildProtoCards();

// ----------------------------------------------------------------------- Deck
var deck = {
    cards: [],
    build: function () {
        $.each(protoCards, function (index, value) {
            deck.cards.push(value);
        });
        shuffle(this.cards);
    },
    amountLeft: 81,
    removeFromDeck: function (amount) {
        this.amountLeft -= amount;
        $('#cards-left span').html(this.amountLeft);
    },
    deal: function (amount) {
        for (var i = 0; i < amount; i++) {
            if (this.cards.length === 0) {
                game.check();
                return 'no cards to deal...checking if end game';
            }
            $('#cards-container').append(this.cards[0].html);
            this.current_cards.push(this.cards[0]);
            this.cards.shift();
        }
        this.removeFromDeck(amount);
        // make all clickable
        $('.unclicked').unbind('click');
        $('.unclicked').click(function () {
            selection.add(this);
        });
        this.possible(true);
        if (this.possible() === 0) {
            deck.deal(3);
        }
    },
    available_posibilities: 0,
    current_cards: [],
    possible: function (print) {
        var possibilities = 0;
        for (var i = 0; i < this.current_cards.length - 2; i++) {
            for (var j = i + 1; j < this.current_cards.length - 1; j++) {
                for (var k = j + 1; k < this.current_cards.length; k++) {

                    var one = this.current_cards[i].combo.split('');
                    var two = this.current_cards[j].combo.split('');
                    var three = this.current_cards[k].combo.split('');
                    // create matrix m
                    var m = [];
                    m[0] = [one[0], two[0], three[0]];
                    m[1] = [one[1], two[1], three[1]];
                    m[2] = [one[2], two[2], three[2]];
                    m[3] = [one[3], two[3], three[3]];
                    // t holds true's or false's for each condition
                    var t = [];
                    for (var n = 0; n <= 3; n++) {
                        if (m[n][0] === m[n][1] && m[n][1] === m[n][2]) {
                            t.push(true);
                        } else if (m[n][0] !== m[n][1] && m[n][0] !== m[n][2] && m[n][1] !== m[n][2]) {
                            t.push(true);
                        } else {
                            t.push(false);
                        }
                    }
                    if (t[0] && t[1] && t[2] && t[3]) {
                        possibilities++;
                    } else {}
                }
            }
        }
        this.available_possibilities = possibilities;
        if (print === true) {
            $('div#possibilities span').html(this.available_possibilities);
        }
        return (possibilities);
    }

};

// ----------------------------------------------------------- Selection Object
var selection = {
    cards: [],
    add: function (card) {
        // only if this card hasn't been clicked already
        var id = card.id.substr(1);
        if ($.inArray(protoCards[id], this.cards) === -1) {
            protoCards[id].clickAdd();
            this.cards.push(protoCards[id]);
            if (this.cards.length == 3) {
                this.check();
            }
        }
    },
    check: function () {
        var one = this.cards[0].combo.split('');
        var two = this.cards[1].combo.split('');
        var three = this.cards[2].combo.split('');
        // create matrix m
        var m = [];
        m[0] = [one[0], two[0], three[0]];
        m[1] = [one[1], two[1], three[1]];
        m[2] = [one[2], two[2], three[2]];
        m[3] = [one[3], two[3], three[3]];
        // t holds true's or false's for each condition
        var t = [];
        for (var n = 0; n <= 3; n++) {
            if (m[n][0] === m[n][1] && m[n][1] === m[n][2]) {
                t.push(true);
            } else if (m[n][0] !== m[n][1] && m[n][0] !== m[n][2] && m[n][1] !== m[n][2]) {
                t.push(true);
            } else {
                t.push(false);
            }
        }
        if (t[0] && t[1] && t[2] && t[3]) {
            this.match();
        } else {
            this.noMatch();
        }
    },
    noMatch: function () {
        points.subtract(5);
        for (var i = 0; i < this.cards.length; i++) {
            this.cards[i].flash('red', 300);
        }
        this.clear();
    },
    match: function () {
        points.add(30);
        for (var i = 0; i < this.cards.length; i++) {
            this.cards[i].flash('#15E637', 300);
        }
        setTimeout(function () {
            for (var i = 0; i < selection.cards.length; i++) {
                selection.cards[i].remove();
            }
            selection.clear();
            if (deck.current_cards.length < 12) {
                return deck.deal(3);
            } else {
                if (this.possible() === 0) {
                    deck.deal(3);
                    alert('Zero possibilities, I dealt more cards for you');
                }
            }
        }, 300);
    },
    clear: function () {
        for (var i = 0; i < this.cards.length; i++) {
            this.cards[i].clickRemove();
        }
        this.cards = [];
    }
};

// --------------------------------------------------------------------- Points
var points = {
    total: 100,
    add: function (amount) {
        this.total += amount;
        this.print();
        $('div#score').stop().css('background-color', '#15E637').animate({
            backgroundColor: "#bbb"
        }, 300);
    },
    subtract: function (amount) {
        this.total -= amount;
        this.print();
        $('div#score').stop().css('background-color', 'red').animate({
            backgroundColor: "#bbb"
        }, 300);
    },
    print: function () {
        $('span#count').html(this.total);
    }
};
// -------------------------------------------------------------------- endGame

var game = {
    check: function () {
        if (deck.cards.length == 0 && deck.possible() === 0) {
            // END GAME
            $('input#set_player_high_score').val(points.total);
            $('div#score-big').html(points.total);
            $('#highScoreModal').modal();
        } else {
            console.log('game not over');
        }
    }
};

// ---------------------------------------------------------------------- Timer
window.setInterval(function () {
    var original = parseInt($('#timer span').html(), 10);
    $('#timer span').html(original + 1);

    if ((original + 1) % 30 === 0) {
        points.subtract(5);
    }
}, 1000);

// ---------------------------------------------------------------------- Debug

var debug = {
    select: window.selection,
    solveOne: function (time) {
        if (time === undefined) {
            time = 750;
        }
        points.subtract(60);
        var possibilities = 0;
        for (var i = 0; i < deck.current_cards.length - 2; i++) {
            for (var j = i + 1; j < deck.current_cards.length - 1; j++) {
                for (var k = j + 1; k < deck.current_cards.length; k++) {

                    var one = deck.current_cards[i].combo.split('');
                    var two = deck.current_cards[j].combo.split('');
                    var three = deck.current_cards[k].combo.split('');
                    // create matrix m
                    var m = [];
                    m[0] = [one[0], two[0], three[0]];
                    m[1] = [one[1], two[1], three[1]];
                    m[2] = [one[2], two[2], three[2]];
                    m[3] = [one[3], two[3], three[3]];
                    // t holds true's or false's for each condition
                    var t = [];
                    for (var n = 0; n <= 3; n++) {
                        if (m[n][0] === m[n][1] && m[n][1] === m[n][2]) {
                            t.push(true);
                        } else if (m[n][0] !== m[n][1] && m[n][0] !== m[n][2] && m[n][1] !== m[n][2]) {
                            t.push(true);
                        } else {
                            t.push(false);
                        }
                    }
                    if (t[0] && t[1] && t[2] && t[3]) {
                        var seli = '#' + deck.current_cards[i].id;
                        $(seli).click();
                        setTimeout(function () {
                            var selj = '#' + deck.current_cards[j].id;
                            $(selj).click();
                            setTimeout(function () {
                                var selk = '#' + deck.current_cards[k].id;
                                $(selk).click();
                            }, time);
                        }, time);
                        return;
                    }
                }
            }
        }
    }
};

// ------------------------------------------------------------------ Doc Ready
$(document).ready(function () {
    // deck.build();
    deck.build();
    deck.deal(12);

    $('#add').click(function () {
        deck.deal(3);
        points.subtract(10);
    });
});