var url = "http://www.nhaccuatui.com/mh/background/fe8VbgGL6z9v"; 
var music = document.getElementById("music");
var onoff = document.getElementById("ofmusic");
var button = document.getElementById("active");
var vien = document.getElementById("musicbuton");
music.setAttribute("src",url);
var k =1;
onoff.addEventListener("click",function(){
    if (k==1){
        music.setAttribute("src","");
        k=2;
        button.style.marginTop = "19px";
        vien.style.backgroundColor = "gray";
    } else if (k==2){
        music.setAttribute("src",url);
        k = 1;
        button.style.marginTop = "0px";
        vien.style.backgroundColor = "rgba(91,218,77,0.7)";
    }
    
});
 var backsec = document.getElementById("secback");
function move(){
    backsec.style.marginTop = "-50px";
    backsec.style.marginLeft = "50px";
    setTimeout(move1,2000);
};
move();
function move1(){
    backsec.style.marginTop = "0";
    backsec.style.marginLeft = "0";
    setTimeout(move,2000);
};



