$("#long").click(function() {
  done = true;
  bank = bankBig;
  emoji = bank.split(" ");
  restart();
});

$("#fast").click(function() {
  done = true;
  bank = bankSmall;
  emoji = bank.split(" ");
  restart();
});

$("#very_fast").click(function() {
  done = true;
  bank = bankSmaller;
  emoji = bank.split(" ");
  restart();

});

function restart(){
  currentRows = [];
  allVersions = [];
  generation = 0;
  done = false;
  allScores = [];
  setup();
}
