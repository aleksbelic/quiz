
let results = [];

let pointer = results.length + 1;

console.log(pointer);

function writeAll() {
    $('h2').html('Frage ' + pointer);
    $('p').html(quizdata["item" + pointer].q);
    $('#a1').html(quizdata["item" + pointer].a1);
    $('#a2').html(quizdata["item" + pointer].a2);
};

$(document).ready( function() {
    writeAll();
    $('#back').toggle();

    $('.answer').click( function() {
        if (pointer < Object.keys(quizdata).length) {
            pointer++;
            writeAll();
            results.push("qwe");
        } else if (results.length + 1 == Object.keys(quizdata).length) {
            results.push("qwe");
        };
        if (pointer == 2) {
            $('#back').toggle();
        };
        console.log(results);
    });

    $('#back').click( function() {
        if (pointer == 2) {
            $('#back').toggle();
        };
        if (pointer == Object.keys(quizdata).length) {
            results.pop();
        };
        if (pointer > 1) {
            pointer--;
            writeAll();
            results.pop();
        };
        console.log(results);
    });
});