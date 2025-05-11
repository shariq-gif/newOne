let heart = document.querySelector('.heart')
let card = document.querySelector('.card')
let box = document.querySelector('#box')
heart.addEventListener('click',function(){
    card.setAttribute("style","opacity:0");
    let x = document.createElement("audio");
     x.setAttribute("src", "qlx.mp3");
     x.setAttribute("autoplay","autoplay");

// 打字效果
let i =0
let str = 'Hii Anushka'
let strp = ''

function print()
{
 if(str[i]=='<')
 {
     document.getElementById("box").innerHTML=strp+"<br><br>+'|'";
     strp+="<br><br>";
 }
 else
 {
     strp+=str[i];
     box.innerHTML=strp + '|';
 }
 i++;
}
setTimeout(() => {
    let printid=setInterval(() => {
        print();
        if(i==str.length)
        clearInterval(printid);
        },190);  
}, 5500);  

function appearBackground(){
setTimeout(()=>{
box.style.opacity=1
},1500)
}
appearBackground()

})
