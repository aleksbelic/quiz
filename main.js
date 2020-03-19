
let results = [];

let pointer = results.length + 1;

function writeAll() {
    $('#questions h2').html('Frage ' + pointer);
    $('#questions p').html(quizdata["item" + pointer].q);
    $('#a1').html(quizdata["item" + pointer].a1);
    $('#a2').html(quizdata["item" + pointer].a2);
    $('#bar span').html((results.length / Object.keys(quizdata).length * 100).toFixed(0) + ' %');
    $('#progress').css("width", (results.length / Object.keys(quizdata).length * 100).toFixed(0)+"%");
};

function showResult() {
    // map results
    let map = results.reduce(function(prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});

    for (let i = 1; i <= config.numberOfDimensions; i++) {
        // set dominant trait => map.e > map.i || map.i == undefined ? dim1Name = 'Extraversion' : dim1Name = 'Introversion';
        eval('map[config.dim'+i+'a_code] > map[config.dim'+i+'b_code] || map[config.dim'+i+'b_code] == undefined ? dim'+i+'Name = config.dim'+i+'a : dim'+i+'Name = config.dim'+i+'b;');
        // count dominant trait answers => map.e > map.i || map.i == undefined ? dim1Count = map.e : dim1Count = map.i;
        eval('map[config.dim'+i+'a_code] > map[config.dim'+i+'b_code] || map[config.dim'+i+'b_code] == undefined ? dim'+i+'Count = map[config.dim'+i+'a_code] : dim'+i+'Count = map[config.dim'+i+'b_code];');
        // calculate percent => map.e == undefined || map.i == undefined ? dim1Percent = 100 : dim1Percent = (dim1Count/(map.e + map.i)*100).toFixed(1);
        eval('map[config.dim'+i+'a_code] == undefined || map[config.dim'+i+'b_code] == undefined ? dim'+i+'Percent = 100 : dim'+i+'Percent = (dim'+i+'Count/(map[config.dim'+i+'a_code] + map[config.dim'+i+'b_code])*100).toFixed(1);');
        // write html => $('#dim1').html(dim1Name + ' : ' + dim1Count + ' (' + dim1Percent + '%)');
        eval('$("#dim'+i+'").html(dim'+i+'Name + " : " + dim'+i+'Count + " (" + dim'+i+'Percent + "%)");');
    };
};

$(document).ready( function() {
    writeAll();
    $('#back').toggle();
    $('#result').toggle();

    $('#a1').click( function() {
        if (pointer <= Object.keys(quizdata).length) {
            results.push(quizdata["item" + pointer].a1_dim)
        }
    });

    $('#a2').click( function() {
        if (pointer <= Object.keys(quizdata).length) {   
            results.push(quizdata["item" + pointer].a2_dim);
        }
    });

    $('.answer').click( function() {
        if (pointer <= Object.keys(quizdata).length) {
            pointer++;
            writeAll();
        };
        if (pointer > Object.keys(quizdata).length) {
            $('#questions').toggle();
            $('#result').toggle();
            showResult();
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
            results.pop();
            writeAll();
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