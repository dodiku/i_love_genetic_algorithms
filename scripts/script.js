var currentRows = [];
var allVersions = [];
var generation = 0;
var done = false;
var allScores = [];
var population = 1000;
// var numberOfRows = 6;
var numberOfRows = result.length;
var randomMudation = 0.01;


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
      // console.log('row '+ i + ' version ' + n);
      var version = initVersion(i);
      allVersions[i].push(version);
    }
  }

  // generating the first rows
  for (var m=0; m<numberOfRows; m++) {
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
        geneneateRow(i);
      }
    }
    drawEmojis();
    isDone();
    // console.log(allScores);
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

  var left, right;

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

  allVersions[rowNumber] = [];
  for (var y=0; y<population; y++){

    var child = new version();
    child.row = rowNumber;

    // using the array of probabilities to pick up 2 versions (parents): left and right,
    var leftIndex = Math.floor(Math.random()*probability.length);
    left = probability[leftIndex];
    var rightIndex = Math.floor(Math.random()*probability.length);
    right = probability[rightIndex];

    for (var m=0; m<43; m++) {
      if (Math.random() < randomMudation){
        child.emojis.push(randomEmoji());
      } else {
        if (m%2 === 0){
          child.emojis.push(left.emojis[m]);
        } else {
          child.emojis.push(right.emojis[m]);
        }
      }
    }

    child.score = fitnessScore(child.emojis, rowNumber);

    allVersions[rowNumber].push(child);
  }

  highestScoreIndex = 0;
  highestScore = 0;
  for (var x=0; x<allVersions[rowNumber].length; x++){
    if (allVersions[rowNumber][x].score > highestScore) {
      highestScore = allVersions[rowNumber][x].score;
      highestScoreIndex = x;
    }
  }
  currentRows[rowNumber] = allVersions[rowNumber][highestScoreIndex].emojis;
  allScores[rowNumber] = highestScore;

}




function isDone(){
  finished = true;
  for (var i=0; i<allScores.length; i++) {
    if (allScores[i] < 100) {
      finished = false;
      break;
    }
  }
  if (finished === true) { done = true; $('.generation').text('Generation: ' + generation + ' -- DONE!');}
}
