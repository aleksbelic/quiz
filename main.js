
let pointer = 1;

let results = [];

function writeAll() {
    $('#questions h2').html('Question ' + pointer);
    $('#questions p').html(questions["question" + pointer].questionText);
    $('#a1').html(questions["question" + pointer].answer1);
    $('#a2').html(questions["question" + pointer].answer2);
    $('#bar span').html((results.length / Object.keys(questions).length * 100).toFixed(0) + ' %');
    $('#progress').css("width", (results.length / Object.keys(questions).length * 100).toFixed(0)+"%");
}

function showResult() {
    let map = results.reduce(function(prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});

    let resultStr = "";

    for (let i = 1; i <= Object.keys(dimensions).length; i++) {

        let curCodeA = `${dimensions['dimension' + i]['codeA']}`;
        let curCodeB = `${dimensions['dimension' + i]['codeB']}`;
        let curNameA = `${dimensions['dimension' + i]['nameA']}`;
        let curNameB = `${dimensions['dimension' + i]['nameB']}`;

        map[curCodeA] > map[curCodeB] || map[curCodeB] == undefined ? curDimName = curNameA : curDimName = curNameB;
        map[curCodeA] >map[curCodeB] || map[curCodeB] == undefined ? curDimCount = map[curCodeA] : curDimCount = map[curCodeB];
        map[curCodeA] == undefined || map[curCodeB] == undefined ? curDimPercent = 100 : curDimPercent = (curDimCount/(map[curCodeA] + map[curCodeB])*100).toFixed(1);
        curDimName == curNameA ? resultStr += curCodeA : resultStr += curCodeB;
        $('#dim'+i).html(curDimName + " : " + curDimCount + " (" + curDimPercent + "%)");
    }

    $('#result h2').html('Your\'re an ' + resultStr.toUpperCase());
}

$(document).ready( function() {

    $('#back').toggle();
    $('#result').toggle();
    writeAll();

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
            }
        }
    });

    $('#back').click( function() {
        pointer--;
        results.pop();
        if (pointer == 1) {
            $('#back').toggle();
        }
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