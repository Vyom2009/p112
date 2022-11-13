var prediction1="";
var prediction2="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:110
});
Webcam.attach('camera');
function take_snapshot(){
    Webcam.snap(function(clickedpic){
        document.getElementById("gesturepic").innerHTML='<img id="pic" src="'+clickedpic+'">';
      });
}
console.log("version is ",ml5.version);
var savemodel=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/NfZc4m2RR/.json",modelLoaded);

function modelLoaded(){
    console.log("Model is loaded here!");
}
function speak(){
    var speechholder=window.speechSynthesis
    var holder1= "The first prediction is "+ prediction1;
    var holder2=" and the second prediction is"+ prediction2;
    var utterthis= new SpeechSynthesisUtterance(holder1+holder2);
    speechholder.speak(utterthis);
   
}
function snapped_pic(){
 img=document.getElementById("pic");
 savemodel.classify(img,getresult);
}
function getresult(error,results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_hand").innerHTML=results[0].label;
        document.getElementById("result_gesture_hand2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(results[0].label="Peace"){
            document.getElementById("update_signs").innerHTML="&#9996;";
        }
        if(results[0].label="Thumbs Up"){
            document.getElementById("update_signs").innerHTML="&#128077;";
        }
        if(results[0].label="Perfect"){
            document.getElementById("update_signs").innerHTML="&#128076;;";
        }
        if(results[1].label="Peace"){
            document.getElementById("update_signs2").innerHTML="&#9996;";
        }
        if(results[1].label="Thumbs Up"){
            document.getElementById("update_signs2").innerHTML="&#128077;";
        }
        if(results[1].label="Perfect"){
            document.getElementById("update_signs2").innerHTML="&#128076;";
        }
    }

}
