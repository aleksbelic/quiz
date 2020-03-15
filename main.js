
let results = [];

let pointer = results.length + 1;

function writeAll() {
    $('#questions h2').html('Frage ' + pointer);
    $('#questions p').html(quizdata["item" + pointer].q);
    $('#a1').html(quizdata["item" + pointer].a1);
    $('#a2').html(quizdata["item" + pointer].a2);
};

function showResult() {
    // map results
    let map = results.reduce(function(prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});

    // set dominant trait
    map.e > map.i || map.i == undefined ? dim1Name = 'Extraversion' : dim1Name = 'Introversion';
    map.n > map.s || map.s == undefined ? dim2Name = 'Intuition' : dim2Name = 'Sensing';
    map.t > map.f || map.f == undefined ? dim3Name = 'Thinking' : dim3Name = 'Feeling';
    map.p > map.j || map.j == undefined ? dim4Name = 'Probing' : dim4Name = 'Judging';

    // count dominant trait answers
    map.e > map.i || map.i == undefined ? dim1Count = map.e : dim1Count = map.i;
    map.n > map.s || map.s == undefined ? dim2Count = map.n : dim2Count = map.s;
    map.t > map.f || map.f == undefined ? dim3Count = map.t : dim3Count = map.f;
    map.p > map.j || map.j == undefined ? dim4Count = map.p : dim4Count = map.j;

    // calculate percent 
    map.e == undefined || map.i == undefined ? dim1Percent = 100 : dim1Percent = (dim1Count/(map.e + map.i)*100).toFixed(1);
    map.n == undefined || map.s == undefined ? dim2Percent = 100 : dim2Percent = (dim2Count/(map.n + map.s)*100).toFixed(1);
    map.t == undefined || map.f == undefined ? dim3Percent = 100 : dim3Percent = (dim3Count/(map.t + map.f)*100).toFixed(1);
    map.p == undefined || map.j == undefined ? dim4Percent = 100 : dim4Percent = (dim4Count/(map.p + map.j)*100).toFixed(1);

    $('#dim1').html(dim1Name + ' : ' + dim1Count + ' (' + dim1Percent + '%)');
    $('#dim2').html(dim2Name + ' : ' + dim2Count + ' (' + dim2Percent + '%)');
    $('#dim3').html(dim3Name + ' : ' + dim3Count + ' (' + dim3Percent + '%)');
    $('#dim4').html(dim4Name + ' : ' + dim4Count + ' (' + dim4Percent + '%)');
};

$(document).ready( function() {
    writeAll();
    $('#back').toggle();
    $('#result').toggle();

    $('#a1').click( function() {
        if (pointer < Object.keys(quizdata).length || results.length + 1 == Object.keys(quizdata).length) {
            results.push(quizdata["item" + pointer].a1_dim)
        }
    });

    $('#a2').click( function() {
        if (pointer < Object.keys(quizdata).length || results.length + 1 == Object.keys(quizdata).length) {   
            results.push(quizdata["item" + pointer].a2_dim);
        }
    });

    $('.answer').click( function() {
        if (pointer < Object.keys(quizdata).length + 1) {
            pointer++;
        };
        if (pointer == Object.keys(quizdata).length + 1) {
            $('#questions').toggle();
            $('#result').toggle();
            showResult();
        };
        if (pointer <= Object.keys(quizdata).length) {
            writeAll();
        };
        if (pointer == 2) {
            $('#back').toggle();
        };
    });

    $('#back').click( function() {
        if (pointer == 2) {
            $('#back').toggle();
        };
        if (pointer > 1) {
            pointer--;
            writeAll();
            results.pop();
        };
    });

    $('#reset').click( function() {
        results = [];
        pointer = results.length + 1;
        writeAll();
        $('#questions').toggle();
        $('#result').toggle();
        $('#back').toggle();
    });
});