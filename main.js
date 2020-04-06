
let pointer = 1;

let questionOrder = [];

let results = [];

// Durstenfeld shuffle ES6
function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function writeAll() {
    
    // toggle elements visibility
    if (pointer == 1) {
        $('#back').css('display', 'none');
        $('#questions').css('display', 'block');
        $('#result').css('display', 'none');
    } else if (pointer > 1 && pointer <= Object.keys(questions).length) {
        $('#back').css('display', 'block');
    }
    // switch answer buttons 
    if (config.randomizeAnswers && (Math.floor(Math.random() * 2) == 0)) {
        $('#questions .answer:first').attr('id', 'a2');
        $('#questions .answer:last').attr('id', 'a1');
    } else {
        $('#questions .answer:first').attr('id', 'a1');
        $('#questions .answer:last').attr('id', 'a2');
    }
    // write to DOM
    $('#questions h2').html('Question ' + questionOrder[pointer-1]);
    $('#questions p').html(questions["question" + questionOrder[pointer-1]].questionText);
    $('#a1').html(questions["question" + questionOrder[pointer-1]].answer1);
    $('#a2').html(questions["question" + questionOrder[pointer-1]].answer2);
    $('#bar span').html((results.length / Object.keys(questions).length * 100).toFixed(0) + ' %');
    $('#progress').css("width", (results.length / Object.keys(questions).length * 100).toFixed(0)+"%");
}

function showResult() {

    $('#questions').css('display', 'none');
    $('#result').css('display', 'block');

    let map = results.reduce(function(prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});

    let curDimName, curDimCount, curDimPercent;

    let resultStr = "";

    for (let i = 1; i <= Object.keys(dimensions).length; i++) {

        let curCodeA = `${dimensions['dimension' + i]['codeA']}`;
        let curCodeB = `${dimensions['dimension' + i]['codeB']}`;
        let curNameA = `${dimensions['dimension' + i]['nameA']}`;
        let curNameB = `${dimensions['dimension' + i]['nameB']}`;

        // dominant dimension name
        map[curCodeA] > map[curCodeB] || map[curCodeB] == undefined ? curDimName = curNameA : curDimName = curNameB;
        // count
        map[curCodeA] > map[curCodeB] || map[curCodeB] == undefined ? curDimCount = map[curCodeA] : curDimCount = map[curCodeB];
        // calculate percent
        map[curCodeA] == undefined || map[curCodeB] == undefined ? curDimPercent = 100 : curDimPercent = (curDimCount/(map[curCodeA] + map[curCodeB])*100).toFixed(1);
        // concat to resultStr
        curDimName == curNameA ? resultStr += curCodeA : resultStr += curCodeB;
        $('#dim'+i).html(curDimName + " : " + curDimCount + " (" + curDimPercent + "%)");
    }

    $('#result h2').html('Your\'re an ' + resultStr.toUpperCase());
}

$(document).ready( function() {

    // handles question order
    for (let i = 1; i <= Object.keys(questions).length; i++) {
        questionOrder.push(i);
        if (i == Object.keys(questions).length && config.randomizeQuestions) {
            shuffleArray(questionOrder);
        }
    }

    writeAll();

    $('.answer').click( function(e) {
        
        if (pointer == 1) {
            e.target.id == 'a1' ? results.push(questions["question" + pointer].answer1Code) : results.push(questions["question" + pointer].answer2Code);
            pointer++;
            writeAll();
        } else if (pointer <= Object.keys(questions).length) {
            e.target.id == 'a1' ? results.push(questions["question" + pointer].answer1Code) : results.push(questions["question" + pointer].answer2Code);
            pointer++;
            if (pointer > Object.keys(questions).length) {
                showResult();
            } else {
                writeAll(); 
            }
        }
    });

    $('#back').click( function() {
        pointer--;
        results.pop();
        writeAll();    
    });

    $('#reset').click( function() {
        pointer = 1;
        results = [];
        if (config.randomizeQuestions) {
            shuffleArray(questionOrder);
        }
        writeAll();
    });
});