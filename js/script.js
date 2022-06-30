/*
File: script.js
GUI Assignment 5: Implementing a Bit of Scrabble with Drag-and-Drop
Tim Truong, UMass Lowell Computer Science, tim_truong1@student.uml.edu
Copyright (c) 2022 by Tim Truong. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
Updated on 6/29/22 at 10:30pm.
Instructor: Professor Wenjin Zhou
Sources of Help: W3Schools and Stackoverflow
Brief Overview: The site is all about implementing a lite version of the
family game called Scrabble where instead of having multiple line tiles for people to fill out after
they implement their first legal word, they only have to create a only one word based on the tiles they were
randomly given instead of continually trying to form words after their original.
*/

let ScrabbleTiles = [
    {"letter":"A", "value":1, "original":9, "amount":9},
    {"letter":"B", "value":3, "original":2, "amount":2},
    {"letter":"C", "value":3, "original":2, "amount":2},
    {"letter":"D", "value":2, "original":4, "amount":4},
    {"letter":"E", "value":1, "original":12, "amount":12},
    {"letter":"F", "value":4, "original":2, "amount":2},
    {"letter":"G", "value":2, "original":3, "amount":3},
    {"letter":"H", "value":4, "original":2, "amount":2},
    {"letter":"I", "value":1, "original":9, "amount":9},
    {"letter":"J", "value":8, "original":1, "amount":1},
    {"letter":"K", "value":5, "original":1, "amount":1},
    {"letter":"L", "value":1, "original":4, "amount":4},
    {"letter":"M", "value":3, "original":2, "amount":2},
    {"letter":"N", "value":1, "original":6, "amount":6},
    {"letter":"O", "value":1, "original":8, "amount":8},
    {"letter":"P", "value":3, "original":2, "amount":2},
    {"letter":"Q", "value":10, "original":1, "amount":1},
    {"letter":"R", "value":1, "original":6, "amount":6},
    {"letter":"S", "value":1, "original":4, "amount":4},
    {"letter":"T", "value":1, "original":6, "amount":6},
    {"letter":"U", "value":1, "original":4, "amount":4},
    {"letter":"V", "value":4, "original":2, "amount":2},
    {"letter":"W", "value":4, "original":2, "amount":2},
    {"letter":"X", "value":8, "original":1, "amount":1},
    {"letter":"Y", "value":4, "original":2, "amount":2},
    {"letter":"Z", "value":10, "original":1, "amount":1},
    {"letter":"_", "value":0, "original":2, "amount":2}
];
// Credit to this creator -> "creator":"Ramon Meza"
// For this JSON structure for the whole class to use, made some modifications
// to help with some of my issues/problems

// Made a bunch global variables because it was easier to code it faster, and I know
// its bad practice, but my js section is a bit of a mess as it is soooo.....
let board_template = [];

const MAX_AMOUNT_OF_TILES_PER_ROUND = 7;
const BOARD_TILE_LIMIT = 15;

let display_tiles = "";

let sum = 0;
let used = 0;
let tile_amount = 0;
let roundSum = 0;

let score = [];
let tile_letters = [];
let indexList = [];
let tmp = [];
let board_tmp = board_template;

// The dictionary lookup object
// Could not get this to work so I did a basic one where it has 7 words to test against :(
let dict = ['hi', 'can', 'burn', 'test', 'bacon', 'day', 'fin'];

// Do a jQuery Ajax request for the text dictionary
// Credit to this website -> https://johnresig.com/blog/dictionary-lookups-in-javascript/ for
// helping me out with files in js. Most of the code was borrowed from this site.

// Tried this method but it wasnt able to get in $.get() after I tried to fix it multiple times

// $.get("dict/dictionary.txt", function(txt) {
//     // Get an array of all the words
//     var words = txt.split("\n");

//     // And add them as properties to the dictionary lookup
//     // This will allow for fast lookups later
//     for (var i = 0; i < words.length; i++ ) {
//         dict[words[i]] = true;
//     }
// });

$(document).ready(function () {
    for (let i = 0; i < BOARD_TILE_LIMIT; i++) {
        board_template.push('?');
    }

    totalAmount();
    generateTiles();
    dragTiles();
    dropTiles();
})

function dragTiles() {
    for (let i = 0; i < MAX_AMOUNT_OF_TILES_PER_ROUND; i++) {
        // Credit to jQuery UI link to helping me with draggable features like revert
        // -> https://jqueryui.com/draggable/#revert
        $("#tile_" + i).draggable ({
            revert: 'invalid' // Makes drag target revert back to og position if not in valid drop target
        });
    }
}

function dropTiles() {
    $(".drop_letter").droppable({
        drop: function (e, ui) {
            // $(this).droppable('option', 'accept', ui.draggable);
            // Makes drop target take only one drag target
            if ($(this).hasClass('drop_letter')) {
                // Credit to this stackoverflow link on helping get id for draggable
                // -> https://stackoverflow.com/questions/32436338/get-draggable-target-id
                // Credit to the jQuery UI site for droppable as well
                // -> https://jqueryui.com/droppable/#default
                let id = ui.draggable.attr("id"); // Gets ID of current drag target
                console.log("ID-> " + id);
                let index = id.substr(id.length - 1);
                let dropID = $(this).attr("id"); // Gets ID of current drop target

                let tile_type = "";

                ui.draggable.addClass('used');

                board_template[dropID] = tile_letters[index];

                // Conditions where a tile is on a double letter or double word tile
                // If its on a double letter, we double the letter value
                // If its a double word, we double the entire score until we submit our word
                let num = score[index];
                if ($(this).hasClass('double_letter')) {
                    num += score[index];
                    tile_type = "double_letter";
                } else if ($(this).hasClass('double_word')) {
                    roundSum = roundSum * 2;
                    num = num * 2;
                    for (let i = 0; i < MAX_AMOUNT_OF_TILES_PER_ROUND; i++) {
                        score[i] = score[i] * 2;
                    }
                    tile_type = "double_word";
                } else {
                    tile_type = "normal";
                }

                roundSum += num;

                $("#curr-score-num").html(roundSum);

                $("#letters-played").html("You played " + tile_letters[index] + " on " + "board_tile_" +
                $(this).attr("id") + ", a " + tile_type + " tile.");

                indexList.push(index);
                used++; // variables to keep track on how many tiles I used in this round
                tile_amount--; // and how many I have left in stock

                $("#tile-num").html(tile_amount);
            }
            $(this).draggable('disable'); // Makes drag target not movable once in drop target
        }
    });
}

function generateTiles() { // Generate tiles for ppl to use
    for (let i = 0; i < MAX_AMOUNT_OF_TILES_PER_ROUND; i++) {
        let index = random_generator();
        // Condition if we happen to hit an index where
        // theres no more tiles we randomly pick a index until theres one with smth
        while (ScrabbleTiles[index].amount === 0) {
            index = random_generator();
        }

        let letter = ScrabbleTiles[index].letter;
        let value = ScrabbleTiles[index].value;

        // console.log("Letter: " + letter) // Debugging Purposes
        // console.log("Value: " + value)

        tile_letters.push(letter);
        score.push(value);
        tmp.push(value);

        display_tiles += "<img id=tile_" + i + " class=board_tiles" + " src=images/letters/Scrabble_Tile_"
        + letter + ".jpg></img>";

        ScrabbleTiles[index].amount--;
    }

    $("#score-num").html(0); // Initialize score board to be zero
    $("#curr-score-num").html(0);
    $("#tile-num").html(tile_amount); // Initialize tile remaining
    $("#tiles-slots").html(display_tiles); // display the scrabble tiles to tile holder

    generate_scrabble_row();
}

// Generates drop tile lines for the single board line
function generate_scrabble_row() {
    let scrabble_board = "<table>";
    scrabble_board += "<tr>";
    for (let i = 0; i < BOARD_TILE_LIMIT; i++) {
        if (i === 2 || i === 12) {
            scrabble_board += "<td class='double_word drop_letter' id=" + i + "></td>";
        } else if (i === 6 || i === 8) {
            scrabble_board += "<td class='double_letter drop_letter' id=" + i + "></td>";
        } else {
            scrabble_board += "<td class='drop_letter' id=" + i + "></td>";
        }
    }
    scrabble_board += "</tr>";
    scrabble_board += "</table>";

    $(".drop-tiles").html(scrabble_board);
}

function random_generator() {
    let rand = Math.floor(Math.random() * ScrabbleTiles.length);
    return rand;
}

function validate() {
    // Get rids of all the '?' so I can get a string/word from it
    const str = board_template.filter(x => x !== '?');
    let s = str.join("");
    s = s.toLowerCase();

    console.log(s);
    console.log(dict);

    // Credit to this w3schools link on includes method()
    // -> https://www.w3schools.com/Jsref/jsref_includes.asp
    if (dict.includes(s)) {
        $("#msg").html("<p> Good Job! " + s + " is a word that exists.</p>");
    } else {
        console.log("Not an existing word");
    }
}

// Gives me the total amount of tiles left remaining
function totalAmount() {
    for (let i = 0; i < ScrabbleTiles.length; i++) {
        tile_amount += ScrabbleTiles[i].amount;
    }

    return tile_amount;
}

function ContinueOn() {
    console.log(tile_amount)
    validate();

    sum += roundSum;
    console.log("Sum: " + sum);
    console.log("RoundSum: " + roundSum);

    $("#score-num").html(sum); // Updates the total score
    $("#curr-score-num").html(0); // Updates the current score

    roundSum = 0;

    console.log(tile_letters);
    console.log(score);

    // Reset the score_values to their original vals after double word and letter calcs
    for (let i = 0; i < MAX_AMOUNT_OF_TILES_PER_ROUND; i++) {
        score[i] = tmp[i];
    }

    if (tile_amount <= 0) { // If theres no tiles remaining we return from here and console.log("smth")
        console.log("No more tiles left")
        return false;
    }

    // Replaces the old tiles used with new ones
    for (let i = 0; i < used; i++) {
        let element = indexList[i];

        let index = random_generator();

        while (ScrabbleTiles[index].amount === 0) {
            index = random_generator();
        }

        let letter = ScrabbleTiles[index].letter;
        let value = ScrabbleTiles[index].value;

        // Credit to this w3schools link on teaching me how splice works 
        // -> https://www.w3schools.com/jsref/jsref_splice.asp
        tile_letters.splice(element, 1, letter);
        score.splice(element, 1, value);

        ScrabbleTiles[index].amount--;
    }

    console.log(tile_letters);
    console.log(score);

    display_tiles = "";
    indexList = [];
    used = 0;

    // Clears the board and set the new and unused tiles back to the tile holder
    for (let i = 0; i < MAX_AMOUNT_OF_TILES_PER_ROUND; i++) {
        display_tiles += "<img id=tile_" + i +
        " class=board_tiles" + " src=images/letters/Scrabble_Tile_" + tile_letters[i] + ".jpg></img>";
        tmp[i] = score[i];
    }

    console.log(tile_letters);
    console.log(score);

    $("#tiles-slots").html(display_tiles);

    dragTiles();
    dropTiles();
}

function restart() {
    $(".board_tiles").remove(); // Remove / destroy all the current tiles on the screen

    score = [];
    tile_letters = [];
    indexList = [];
    tmp = [];
    display_tiles = "";
    sum = 0;
    roundSum = 0;

    // Reset all tiles back to their original amounts
    for (let i = 0; i < ScrabbleTiles.length; i++) {
        ScrabbleTiles[i].amount = ScrabbleTiles[i].original;
    }
    tile_amount = 100;

    generateTiles(); // Generate new tiles and make them draggable and reset score to 0
    dragTiles();
    dropTiles();
    $("#score-num").html(0);
    $("#curr-score-num").html(0);
}
