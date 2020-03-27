
let pointer = 1;

let results = [];

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

    let resultStr = "";

    for (let i = 1; i <= Object.keys(dimensions).length; i++) {
        
        // set dominant trait
        eval('map[dimensions.dimension'+i+'.code] > map[dimensions.dimension'+i+'.opCode] || map[dimensions.dimension'+i+'.opCode] == undefined ? dim'+i+'Name = dimensions.dimension'+i+'.name : dim'+i+'Name = dimensions.dimension'+i+'.opposite;');
        
        /* tried to replace ternary to improve readability - unsuccessfully
        if (eval('map[dimensions.dimension'+i+'.code]') > eval('map[dimensions.dimension'+i+'.opCode]') || eval('map[dimensions.dimension'+i+'.opCode]') == undefined) {
            eval('dim'+i+'Name = map[dimensions.dimension'+i+'.name];');
        } else {
            eval('dim'+i+'Name = map[dimensions.dimension'+i+'.opposite];');
        }; */

        /* tried to use variables as selectors - unsuccessfully
        let curCode = 'dimensions.dimension'+i+'.code';
        let curOpCode = 'dimensions.dimension'+i+'.opCode';
        let curName = 'dimensions.dimension'+i+'.name';
        let curOpposite = 'dimensions.dimension'+i+'.opposite';
        let curDimName = 'dim'+i+'Name';
        map[curCode] > map[curOpCode] || map[curOpCode] == undefined ? curDimName = curName : curDimName = curOpposite; */
        
        // concat to result string
        eval('dim'+i+'Name == dimensions.dimension'+i+'.name ? resultStr += dimensions.dimension'+i+'.code : resultStr += dimensions.dimension'+i+'.opCode;');
        
        // count dominant trait answers 
        eval('map[dimensions.dimension'+i+'.code] > map[dimensions.dimension'+i+'.opCode] || map[dimensions.dimension'+i+'.opCode] == undefined ? dim'+i+'Count = map[dimensions.dimension'+i+'.code] : dim'+i+'Count = map[dimensions.dimension'+i+'.opCode];');
        
        // calculate percent 
        eval('map[dimensions.dimension'+i+'.code] == undefined || map[dimensions.dimension'+i+'.opCode] == undefined ? dim'+i+'Percent = 100 : dim'+i+'Percent = (dim'+i+'Count/(map[dimensions.dimension'+i+'.code] + map[dimensions.dimension'+i+'.opCode])*100).toFixed(1);');
        
        // write html
        eval('$("#dim'+i+'").html(dim'+i+'Name + " : " + dim'+i+'Count + " (" + dim'+i+'Percent + "%)");');

    };

    $('#result h2').html('Du bist ein ' + resultStr.toUpperCase());
};

$(document).ready( function() {
    writeAll();
    $('#back').toggle();
    $('#result').toggle();

    $('#a1').click( function() {
        results.push(quizdata["item" + pointer].a1_dim);
    });

    $('#a2').click( function() {
        results.push(quizdata["item" + pointer].a2_dim);
    });

    $('.answer').click( function() {
        if (pointer <= Object.keys(quizdata).length) {
            pointer++;
        };
        if (pointer > Object.keys(quizdata).length) {
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
            results.pop();
            writeAll();
        };
    });

    $('#reset').click( function() {
        pointer = 1;
        results = [];
        writeAll();
        $('#questions').toggle();
        $('#result').toggle();
        $('#back').toggle();
    });
});