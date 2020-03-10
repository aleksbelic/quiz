
let results = [];

let pointer = results.length + 1;

//console.log(pointer);

function writeAll() {
    $('h2').html('Frage ' + pointer);
    $('p').html(quizdata["item" + pointer].q);
    $('#a1').html(quizdata["item" + pointer].a1);
    $('#a2').html(quizdata["item" + pointer].a2);
};

$(document).ready( function() {
    writeAll();
    $('#back').toggle();

    $('#a1').click( function() {
        if (pointer < Object.keys(quizdata).length || results.length + 1 == Object.keys(quizdata).length) {
            results.push("a1")
        }
    });

    $('#a2').click( function() {
        if (pointer < Object.keys(quizdata).length || results.length + 1 == Object.keys(quizdata).length) {   
            results.push("a2");
        }
    });

    $('.answer').click( function() {
        if (pointer < Object.keys(quizdata).length + 1) {
            pointer++;
        };
        if (pointer <= Object.keys(quizdata).length) {
            writeAll();
        };
        if (pointer == 2) {
            $('#back').toggle();
        };
        console.log(pointer);
        console.log(results);
    });

    $('#back').click( function() {
        if (pointer == 2) {
            $('#back').toggle();
        };
        if (pointer == Object.keys(quizdata).length + 1) {
            //results.pop();
        };
        if (pointer > 1) {
            pointer--;
            writeAll();
            results.pop();
        };
        console.log(pointer);
        console.log(results);
    });
});