
var buttonColor=["red","blue","green","yellow"];

var userClickedPattern=[];
var gamePattern=[];
var level=0;
var start=true;

$(document).keypress(function(){

if(start==true)
{
  $("#level-title").text("Level "+level);
  nextSequence();
  start=false;
}


});



$(".btn").click(function(){

var userChosenColour= $(this).attr("id");
userClickedPattern.push(userChosenColour);

playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
    console.log("success");

    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }

  }

  else
  {
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");

    },2000);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }


}


function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);

  var randomnum = Math.random()*4;
  randomnum=Math.floor(randomnum);

  var randomChosenColour=buttonColor[randomnum];

  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function playSound(name)
{
  var audio= new Audio("sounds/"+ name + ".mp3");
  audio.play();
}

function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
            $("#"+currentColour).removeClass("pressed");
            //....and whatever else you need to do
    }, 100);

}

function startOver()
{
  level=0;
  gamePattern=[];
  start=true;
  
}
