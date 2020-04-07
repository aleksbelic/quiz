
let pointer = 1;

let questionOrder = [];

let results = [];

// Durstenfeld shuffle
function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateDom() {
    
    // toggle visibility of elements
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
    // update question related elements
    $('#questions h2').html('Question ' + questionOrder[pointer-1]);
    $('#questions p').html(questions["question" + questionOrder[pointer-1]].questionText);
    $('#a1').html(questions["question" + questionOrder[pointer-1]].answer1);
    $('#a2').html(questions["question" + questionOrder[pointer-1]].answer2);
    $('#bar span').html((results.length / Object.keys(questions).length * 100).toFixed(0) + ' %');
    $('#progress').css("width", (results.length / Object.keys(questions).length * 100).toFixed(0)+"%");
}

function showResult() {

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

        // dominant trait name
        map[curCodeA] > map[curCodeB] || map[curCodeB] == undefined ? curDimName = curNameA : curDimName = curNameB;
        // count
        map[curCodeA] > map[curCodeB] || map[curCodeB] == undefined ? curDimCount = map[curCodeA] : curDimCount = map[curCodeB];
        // calculate percent
        map[curCodeA] == undefined || map[curCodeB] == undefined ? curDimPercent = 100 : curDimPercent = (curDimCount/(map[curCodeA] + map[curCodeB])*100).toFixed(1);
        // concat to resultStr
        curDimName == curNameA ? resultStr += curCodeA : resultStr += curCodeB;
        // result details
        $('#dim'+i).html(curDimName + " : " + curDimCount + " (" + curDimPercent + "%)");
    }

    $('#result h2').html('Your\'re an ' + resultStr.toUpperCase());
    $('#questions').css('display', 'none');
    $('#result').css('display', 'block');
}

$(document).ready( function() {

    // question order and start up
    for (let i = 1; i <= Object.keys(questions).length; i++) {
        questionOrder.push(i);
        if (i == Object.keys(questions).length) {
            if (config.randomizeQuestions) {
            shuffleArray(questionOrder)
            }
        updateDom()
        }
    }

    // button event listeners
    $('.answer').click( function(e) {
        
        e.target.id == 'a1' ? results.push(questions["question" + pointer].answer1Code) : results.push(questions["question" + pointer].answer2Code);
        pointer++;
        pointer > Object.keys(questions).length ? showResult() : updateDom(); 
    });

    $('#back').click( function() {
        pointer--;
        results.pop();
        updateDom();    
    });

    $('#reset').click( function() {
        pointer = 1;
        results = [];
        if (config.randomizeQuestions) {
            shuffleArray(questionOrder);
        }
        updateDom();
    });
})