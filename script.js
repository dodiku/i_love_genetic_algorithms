var currentRows = [];
var allVersions = [];
var generation = 0;
var done = false;
var allScores = [];
var population = 200;
var numberOfRows = 6;
// var numberOfRows = result.length;
var mainChild = [];


function setup() {
  // frameRate(1);

  // initializing allScores[]
  for (var x=0; x<numberOfRows; x++){
    allScores.push(0);
  }

  // generating the first versions
  for (var i=0; i<numberOfRows; i++) {
    allVersions[i] = [];
    for (var n=0; n<population; n++){
      // console.log('row '+ i + ' ' + n);
      var version = initVersion(i);
      allVersions[i].push(version);
    }
  }

  // generating the first rows
  for (var m=0; m<numberOfRows; m++) {
    console.log('generating row ' + m);
    geneneateRow(m);
  }


  // initializing the drawing
  $('.drawing').empty();
  initDrawEmojis();

  // updating scores
  isDone();

}


function draw() {

  if (done === false) {

    // generating 10 new versions per row
    for (var i=0; i<currentRows.length; i++) {
      if (allScores[i] === 100) {
        continue;
      } else {
        allVersions[i] = [];
        for (var n=0; n<population; n++){
          var version = genVersion(i);
          allVersions[i].push(version);
        }
      }

      geneneateRow(i);

    }
    drawEmojis();
    isDone();
    console.log(allScores);
  }
}




var version = function() {
  this.row = 0;
  this.emojis = []; // the emojis
  this.score = 0; // the score, comparing to the same row on result[]
};



function fitnessScore(emojis, row) { // highest fitness score is 43
  var score = 0;

  for (var i=0; i<result[row].length; i++){ // number of emojis on result's row
    if (emojis[i] === result[row][i]) {
      score++;
    }
  }
  return Math.floor(score/43*100);
}


function initVersion(row) {
  var ver = new version();
  ver.row = row;
  for (var i=0; i<result[0].length; i++) {
    ver.emojis.push(randomEmoji());
  }

  ver.score = fitnessScore(ver.emojis, ver.row);
  return ver;
}

function genVersion(row) {
  var ver = new version();
  ver.row = row;
  for (var i=0; i<result[0].length; i++) {
    ver.emojis.push(mainChild[Math.floor(Math.random()*mainChild[row].length)]);
  }

  ver.score = fitnessScore(ver.emojis, ver.row);
  return ver;
}


function initDrawEmojis(){
  for (var i=0; i<currentRows.length; i++) {
    $('.drawing').append('<div id="' + i + '">' + currentRows[i].join("")+'</div>');
  }
  generation++;
  $('.generation').text('Generation: ' + generation);
}

function drawEmojis(){
  for (var i=0; i<currentRows.length; i++) {
    var id = "#" + i;
    $(id).text(currentRows[i].join(""));
  }
  generation++;
  $('.generation').text('Generation: ' + generation);
}


function geneneateRow(rowNumber) {

  // sum all scores
  // divide a single score by the total
  highestScoreIndex = 0;
  highestScore = 0;
  sumOfScores = 0;
  for (var x=0; x<allVersions[rowNumber].length; x++){
    sumOfScores = sumOfScores + allVersions[rowNumber][x].score;
    if (allVersions[rowNumber][x].score > highestScore) {
      highestScore = allVersions[rowNumber][x].score;
      highestScoreIndex = x;
    }
  }

  // var rowScore = allScores[rowNumber];
  var left, right;
  var child = [];

  // generating an array of probabilities based on the current versions
  var probability = [];
  for (var i=0; i<allVersions[rowNumber].length; i++){
    for (var n=0; n<allVersions[rowNumber][i].score; n++) {
      probability.push(allVersions[rowNumber][i]);
    }

    if (probability.length < 2){
      probability.push(initVersion(rowNumber));
      probability.push(initVersion(rowNumber));
    } else if (probability.length < 1) {
      probability.push(initVersion(rowNumber));
    }

  }

  console.log('probability :' + probability.length);
  // using the array of probabilities to pick up 2 versions (parents): left and right,
  var leftIndex = Math.floor(Math.random()*probability.length);
  left = probability[leftIndex];
  var rightIndex = Math.floor(Math.random()*probability.length);
  right = probability[rightIndex];

  // generating a child

  // child = left.emojis.slice (0, left.emojis.length/2 );
  // child = child.concat(right.emojis.slice(right.emojis.length/2 ,right.emojis.length ));

  for (var m=0; m<43; m++) {
    if (Math.random() < 0.1){
      child.push(randomEmoji());
    } else {
      if (m%2 === 0){
        child.push(left.emojis[m]);
      } else {
        child.push(right.emojis[m]);
      }
    }

  }

  currentRows[rowNumber] = allVersions[rowNumber][highestScoreIndex].emojis;
  allScores[rowNumber] = highestScore;
  mainChild = child;

}

function isDone(){
  finished = true;
  for (var i=0; i<allScores.length; i++) {
    if (allScores[i] < 100) {
      finished = false;
      break;
    }
  }
  if (finished === true) { done = true; }
}
