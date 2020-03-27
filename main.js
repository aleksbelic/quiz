
let pointer = 1;

let results = [];

function writeAll() {
    $('#questions h2').html('Frage ' + pointer);
    $('#questions p').html(questions["item" + pointer].q);
    $('#a1').html(questions["item" + pointer].a1);
    $('#a2').html(questions["item" + pointer].a2);
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

    // start up
    $('#back').toggle();
    $('#result').toggle();
    writeAll();

    // event listeners
    $('#a1').click( function() {
        results.push(questions["item" + pointer].a1_dim);
    });

    $('#a2').click( function() {
        results.push(questions["item" + pointer].a2_dim);
    });

    $('.answer').click( function() {
        if (pointer == 2) {
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
        if (pointer == 2) {
            $('#back').toggle();
            pointer--;
            results.pop();
            writeAll();
        } else if (pointer > 2) {
            pointer--;
            results.pop();
            writeAll();
        };
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