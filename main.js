
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

function shuffleButtons() {
    if (config.randomizeAnswers && (Math.floor(Math.random() * 2) == 0)) {
        $('#questions .answer:first').attr('id', 'a2');
        $('#questions .answer:last').attr('id', 'a1');
    } else {
        $('#questions .answer:first').attr('id', 'a1');
        $('#questions .answer:last').attr('id', 'a2');
    }
}

function writeAll() {
    
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

    let resultStr = "";
    let curDimName, curDimCount, curDimPercent;

    for (let i = 1; i <= Object.keys(dimensions).length; i++) {

        let curCodeA = `${dimensions['dimension' + i]['codeA']}`;
        let curCodeB = `${dimensions['dimension' + i]['codeB']}`;
        let curNameA = `${dimensions['dimension' + i]['nameA']}`;
        let curNameB = `${dimensions['dimension' + i]['nameB']}`;

        map[curCodeA] > map[curCodeB] || map[curCodeB] == undefined ? curDimName = curNameA : curDimName = curNameB;
        map[curCodeA] > map[curCodeB] || map[curCodeB] == undefined ? curDimCount = map[curCodeA] : curDimCount = map[curCodeB];
        map[curCodeA] == undefined || map[curCodeB] == undefined ? curDimPercent = 100 : curDimPercent = (curDimCount/(map[curCodeA] + map[curCodeB])*100).toFixed(1);
        curDimName == curNameA ? resultStr += curCodeA : resultStr += curCodeB;
        $('#dim'+i).html(curDimName + " : " + curDimCount + " (" + curDimPercent + "%)");
    }

    $('#result h2').html('Your\'re an ' + resultStr.toUpperCase());
}

$(document).ready( function() {

    for (let i = 1; i <= Object.keys(questions).length; i++) {
        questionOrder.push(i);
        if (i == Object.keys(questions).length && config.randomizeQuestions) {
            shuffleArray(questionOrder);
        }
    }

    $('#back').toggle();
    $('#result').toggle();
    shuffleButtons();
    writeAll();

    $('#a1').click( function() {

        if (pointer == 1) {
            $('#back').toggle();
            
            results.push(questions["question" + pointer].answer1Code);
            console.log(results);
            shuffleButtons();
            pointer++;
            
            writeAll();
        } else if (pointer <= Object.keys(questions).length) {
            
            results.push(questions["question" + pointer].answer1Code);
            console.log(results);
            shuffleButtons();
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

    $('#a2').click( function() {
        
        if (pointer == 1) {
            $('#back').toggle();
            
            results.push(questions["question" + pointer].answer2Code);
            console.log(results);
            shuffleButtons();
            pointer++;
            
            writeAll();
        } else if (pointer <= Object.keys(questions).length) {
            
            results.push(questions["question" + pointer].answer2Code);
            console.log(results);
            shuffleButtons();
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

    /* .answer OOP

    - results.push
    - shuffleButtons
    - pointer++
    - (showResult)
    - writeAll
    
    
    */

    /* $('.answer').click( function() {
        console.log(results);
        if (pointer == 1) {
            $('#back').toggle();
            pointer++;
            shuffleButtons();
            // push needs to go here
            writeAll();
        } else if (pointer <= Object.keys(questions).length) {
            pointer++;
            if (pointer > Object.keys(questions).length) {
                $('#questions').toggle();
                $('#result').toggle();
                showResult();
            } else {
                shuffleButtons();
                // and here ... I think
                writeAll(); 
            }
        }
    }); */

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
        if (config.randomizeQuestions) {
            shuffleArray(questionOrder);
        }
        writeAll();
    });
});