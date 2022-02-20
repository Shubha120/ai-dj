song = " ";
rightwristX = 0;
leftwristX = 0;
rightwristY = 0;
leftwristY = 0;
scorerightwrist =0;
scoreleftwrist = 0;



function setup(){
    canvas = createCanvas(600,500);
    canvas.position(430,250);

    video= createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Posenet is intialized");
}
function gotPoses(results){
if(results.length > 0){
    scoreleftwrist= results[0].pose.keypoints[9].score;
    scorerighttwrist= results[0].pose.keypoints[10].score;

    console.log(results);
    leftwristX = results[0].pose.leftWrist.x;
    leftwristY = results[0].pose.leftWrist.y;

     
    rightwristX = results[0].pose.rightWrist.x;
    rightwristY = results[0].pose.rightWrist.y;
    console.log("rightwristX = "+ rightwristX+ "rightwristY = "+ rightwristY+ "leftwristX = "+ leftwristX+ "leftwristY = "+ leftwristY +"scoreleftwrist ="+ scoreleftwrist+"scorerigthwrist ="+ scorerighttwrist);
    
}
    
    
}

function preload(){
    song = loadSound("music.mp3");
}

function draw(){
    image(video, 0,0,600,500);

    fill("red");
    stroke("red");
if(scoreleftwrist > 0.2){
    
    circle(leftwristX,leftwristY,20);
    leftwristY1 = Number(leftwristY);
    remove_decimal=floor(leftwristY1);
    volume= remove_decimal/500;
    document.getElementById("Volume").innerHTML = "Volume = "+ volume;
    song.setVolume(volume);}
 if(scorerightwrist > 0.2){
     circle(rightwristX,rightwristY,20);

     if(rightwristY >0 && rightwristY <=100){
         document.getElementById("Speed").innerHTML= "Speed = 0.5x";
         song.rate(0.5);
     }
     else if(rightwristY >100 && rightwristY <=200){
        document.getElementById("Speed").innerHTML= "Speed = 1x";
        song.rate(1);

    }
    else if(rightwristY >200 && rightwristY <=300){
        document.getElementById("Speed").innerHTML= "Speed = 1.5x";
        song.rate(1.5);

    }
    else if(rightwristY >300 && rightwristY <=400){
        document.getElementById("Speed").innerHTML= "Speed = 2x";
        song.rate(2);

    }
    else if(rightwristY >400 ){
        document.getElementById("Speed").innerHTML= "Speed = 2.5x";
        song.rate(2.5);

    }
 }
}

function play(){
    song.play(); 
    song.setVolume(1);
    song.rate(1);

}