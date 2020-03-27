
let pointer = 1;

let results = [];

function writeAll() {
    $('#questions h2').html('Frage ' + pointer);
    $('#questions p').html(questions["question" + pointer].questionText);
    $('#a1').html(questions["question" + pointer].answer1);
    $('#a2').html(questions["question" + pointer].answer2);
    $('#bar span').html((results.length / Object.keys(questions).length * 100).toFixed(0) + ' %');
    $('#progress').css("width", (results.length / Object.keys(questions).length * 100).toFixed(0)+"%");
};

function showResult() {
    // map results
    let map = results.reduce(function(prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});

    let resultStr = "";

    for (let i = 1; i <= Object.keys(dimensions).length; i++) {
        
        // set dominant trait
        eval('map[dimensions.dimension'+i+'.codeA] > map[dimensions.dimension'+i+'.codeB] || map[dimensions.dimension'+i+'.codeB] == undefined ? dim'+i+'Name = dimensions.dimension'+i+'.nameA : dim'+i+'Name = dimensions.dimension'+i+'.nameB;');
        
        // concat to result string
        eval('dim'+i+'Name == dimensions.dimension'+i+'.nameA ? resultStr += dimensions.dimension'+i+'.codeA : resultStr += dimensions.dimension'+i+'.codeB;');
        
        // count dominant trait answers 
        eval('map[dimensions.dimension'+i+'.codeA] > map[dimensions.dimension'+i+'.codeB] || map[dimensions.dimension'+i+'.codeB] == undefined ? dim'+i+'Count = map[dimensions.dimension'+i+'.codeA] : dim'+i+'Count = map[dimensions.dimension'+i+'.codeB];');
        
        // calculate percent 
        eval('map[dimensions.dimension'+i+'.codeA] == undefined || map[dimensions.dimension'+i+'.codeB] == undefined ? dim'+i+'Percent = 100 : dim'+i+'Percent = (dim'+i+'Count/(map[dimensions.dimension'+i+'.codeA] + map[dimensions.dimension'+i+'.codeB])*100).toFixed(1);');
        
        // write html
        eval('$("#dim'+i+'").html(dim'+i+'Name + " : " + dim'+i+'Count + " (" + dim'+i+'Percent + "%)");');

    };

    $('#result h2').html('Du bist ein ' + resultStr.toUpperCase());
};

$(document).ready( function() {

    // start up
    $('#back').toggle();
    $('#result').toggle();
    writeAll();

    // event listeners
    $('#a1').click( function() {
        results.push(questions["question" + pointer].answer1Code);
    });

    $('#a2').click( function() {
        results.push(questions["question" + pointer].answer2Code);
    });

    $('.answer').click( function() {
        if (pointer == 1) {
            $('#back').toggle();
            pointer++;
            writeAll();
        } else if (pointer <= Object.keys(questions).length) {
            pointer++;
            if (pointer > Object.keys(questions).length) {
                $('#questions').toggle();
                $('#result').toggle();
                showResult();
            } else {
                writeAll(); 
            };
        };
    });

    $('#back').click( function() {
        pointer--;
        results.pop();
        if (pointer == 1) {
            $('#back').toggle();
        };
        writeAll();    
    });

    $('#reset').click( function() {
        pointer = 1;
        results = [];
        $('#questions').toggle();
        $('#result').toggle();
        $('#back').toggle();
        writeAll();
    });
});