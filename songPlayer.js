console.log("let's write some javascript");
let currentSong = new Audio();

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");

    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}   

async function getSongDuration(songUrl) {
    return new Promise((resolve) => {
        const audio = new Audio(songUrl);
        audio.addEventListener("loadedmetadata", () => {
            resolve(audio.duration);
        });
    });
}
const playMusic = (track)=>{
    // let audio = new Audio("/songs/"+track+".mp3")
    currentSong.src = "/songs/"+ track +".mp3"
    currentSong.play()
    play.src = "svg/pause-icon.svg"
    document.querySelector(".song").innerHTML = track
    document.querySelector(".song-time-start").innerHTML = "0:00"
    document.querySelector(".song-time-end").innerHTML = "0:00"
}

async function main() {

    let songs = await getSongs();
    let track = ["580,142,248","207,680,044","359,554,425","421,269,932","169,761,269"];

    let songUl = document.querySelector(".songs-media ul");

    for (let i = 0; i < songs.length; i++) {
        const song = songs[i]
        const songUrl = `https://Seemant-10.github.io/project/songs/${song}`;
        const duration = await getSongDuration(songUrl);
        const formattedDuration = new Date(duration * 1000).toISOString().substr(14, 5); 
        const imageUrl = `https://Seemant-10.github.io/project/images/${song.split(".mp3")[0]}.jpeg`;
        const songName = song.replace(".mp3", "");
        const songItem = `
            <li>
                <div class="song-info flex">
                    <div class="song-info-inner flex">
                        <p>${i+1}</p>
                        <img src="${imageUrl}" alt="Song Image" width="50">
                        <div>${songName.replaceAll("%20", " ")}</div>
                    </div>
                    <div class="song-track">${track[i]}</div>
                    <div class="song-duration">${formattedDuration}</div>
                </div>
            </li>`;

        songUl.innerHTML += songItem;
    }
    
    Array.from(document.querySelector(".songs-media").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element=>{
            console.log(e.querySelector("div>.song-info-inner>div").innerHTML)
            playMusic(e.querySelector("div>.song-info-inner>div").innerHTML)
        })
    });
    play.addEventListener("click", ()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "svg/pause-icon.svg"
        }
        else{
            currentSong.pause()
            play.src = "svg/play-icon.svg"
        }
    })
}

main();
