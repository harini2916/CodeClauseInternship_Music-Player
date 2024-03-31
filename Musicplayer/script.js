//getting all elements of html in js
let song_image = document.getElementById("cover_photo")
let song_title = document.getElementById("title")
let song_singer = document.getElementById("singer")
let song_play = document.getElementById("play")
let song_prev = document.getElementById("prev")
let song_next = document.getElementById("next")
document.addEventListener("DOMContentLoaded", () => {
    const range = document.querySelector(".volume input[type=range]");
    const barHoverBox = document.querySelector(".volume .bar-hoverbox");
    const fill = document.querySelector(".volume .bar .bar-fill");
 
console.log(song_play)
 
 
//creating song object list
let songs_list = [
    {
        name : 'Still with you',
        Image : 'still with you.jpg',
        Song :'Jungkook-BTS-Still-With-You-.mp3',
        Singer : 'Jungkook'
    },
    {
        name : 'Life goes on',
        Image : 'life goes on.jpg',
        Song : 'life goes on.mpeg',
        Singer : 'BTS'
    },
    {
        name : 'GO GO',
        Image : 'go go.jpg',
        Song : 'gogo.mpeg',
        Singer : 'BTS'
    },
    {
        name : ' Dynamite',
        Image : 'Dynamite.jpg',
        Song : 'dynamite.mpeg',
        Singer : 'BTS'
    }
]
 
//keeping track of which song is playing and if song is playing or not
let i=0;
let flag=false;
 
 
//showing song name and image on screen
var audio = new Audio(songs_list[i].Song);
song_image.src = songs_list[i].Image
song_title.innerHTML = songs_list[i].name
song_singer.innerHTML = songs_list[i].Singer
 
//function to play/pause song
song_play.addEventListener("click", function(){
 
    if(flag ===false){
        audio.play()
        flag=true;
        console.log(flag)
    }
    else{
        audio.pause()
        flag=false;
        console.log(flag)
    }
})
 
//function to play next song
song_next.addEventListener("click", function(){
   
    audio.pause()
    flag = false;
    i = i+1;
    if(i>=songs_list.length){
       
        i=0;
    }
    console.log(i)
    song_image.src = songs_list[i].Image
    song_singer.innerHTML = songs_list[i].Singer
    song_title.innerHTML = songs_list[i].name
    audio = new Audio(songs_list[i].Song)
    if(flag ===false){
        audio.play()
        flag=true;
        console.log(flag)
    }
   
})

   

 
//function to play previous song
song_prev.addEventListener("click", function(){
   
    audio.pause()
    flag = false;
    i = i-1;
    if(i<=0){
        i=songs_list.length-1;
        console.log(i)
    }
    song_image.src = songs_list[i].Image
    song_singer.innerHTML = songs_list[i].Singer
    song_title.innerHTML = songs_list[i].name
    audio = new Audio(songs_list[i].Song)
    if(flag ===false){
        audio.play()
        flag=true;
        console.log(flag)
    }
   
   
})
range.addEventListener("change", (e) => {
    console.log("value", e.target.value);
  });
  
  const setValue = (value) => {
    fill.style.width = value + "%";
    range.setAttribute("value", value)
    range.dispatchEvent(new Event("change"))
  }
  
  // Дефолт
  setValue(range.value);
  
  const calculateFill = (e) => {
    // Отнимаем ширину двух 15-пиксельных паддингов из css
    let offsetX = e.offsetX
    
    if (e.type === "touchmove") {
      offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft
    }
    
    const width = e.target.offsetWidth - 30;

    setValue(
      Math.max(
        Math.min(
          // Отнимаем левый паддинг
          (offsetX - 15) / width * 100.0,
          100.0
        ),
        0
      )
    );
  }
  
  let barStillDown = false;

  barHoverBox.addEventListener("touchstart", (e) => {
    barStillDown = true;

    calculateFill(e);
  }, true);
  
  barHoverBox.addEventListener("touchmove", (e) => {
    if (barStillDown) {
      calculateFill(e);
    }
  }, true);
  
  barHoverBox.addEventListener("mousedown", (e) => {
    barStillDown = true;
    
    calculateFill(e);
  }, true);
  
  barHoverBox.addEventListener("mousemove", (e) => {
    if (barStillDown) {
      calculateFill(e);
    }
  });
  
  barHoverBox.addEventListener("wheel", (e) => {
    const newValue = +range.value + e.deltaY * 0.5;
    
    setValue(Math.max(
      Math.min(
        newValue,
        100.0
      ),
      0
    ))
  });
  
  document.addEventListener("mouseup", (e) => {
    barStillDown = false;
  }, true);
  
  document.addEventListener("touchend", (e) => {
    barStillDown = false;
  }, true);
})
