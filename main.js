
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

    let resultStr = "";

    for (let i = 1; i <= config.numberOfDimensions; i++) {
        
        // set dominant trait
        eval('map[config.dimension'+i+'.code] > map[config.dimension'+i+'.opCode] || map[config.dimension'+i+'.opCode] == undefined ? dim'+i+'Name = config.dimension'+i+'.name : dim'+i+'Name = config.dimension'+i+'.opposite;');
        
        /* let curCode = 'config.dimension'+i+'.code';
        let curOpCode = 'config.dimension'+i+'.opCode';
        let curName = 'config.dimension'+i+'.name';
        let curOpposite = 'config.dimension'+i+'.opposite';
        let curDimName = 'dim'+i+'Name';

        map[curCode] > map[curOpCode] || map[curOpCode] == undefined ? curDimName = curName : curDimName = curOpposite; */
        
        // concat to result string
        eval('dim'+i+'Name == config.dimension'+i+'.name ? resultStr += config.dimension'+i+'.code : resultStr += config.dimension'+i+'.opCode;');
        
        // count dominant trait answers 
        eval('map[config.dimension'+i+'.code] > map[config.dimension'+i+'.opCode] || map[config.dimension'+i+'.opCode] == undefined ? dim'+i+'Count = map[config.dimension'+i+'.code] : dim'+i+'Count = map[config.dimension'+i+'.opCode];');
        
        // calculate percent 
        eval('map[config.dimension'+i+'.code] == undefined || map[config.dimension'+i+'.opCode] == undefined ? dim'+i+'Percent = 100 : dim'+i+'Percent = (dim'+i+'Count/(map[config.dimension'+i+'.code] + map[config.dimension'+i+'.opCode])*100).toFixed(1);');
        
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
        results = [];
        pointer = results.length + 1;
        writeAll();
        $('#questions').toggle();
        $('#result').toggle();
        $('#back').toggle();
    });
});