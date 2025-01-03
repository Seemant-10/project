console.log("let's write some javascript");
let currentSong = new Audio();

async function getSongs() {
    const repoUrl = 'https://api.github.com/repos/Seemant-10/project/contents/songs';

    let response = await fetch(repoUrl);
    let data = await response.json();
    
    let songs = data
        .filter(file => file.name.endsWith('.mp3'))  // Filter for mp3 files
        .map(file => file.name);  // Get the file names

    return songs;
}

function secondsToMinutesSecondes(seconds){
    if (isNaN(seconds) || seconds < 0) {
        return "Invalid Input";
    }
    const minutes = Math.floor(seconds/60)
    const remainingSeconds = Math.floor(seconds%60)

    const formattedMinutes = String(minutes).padStart(2,'0')
    const formattedSecondes = String(remainingSeconds).padStart(2,'0')
    return `${formattedMinutes}:${formattedSecondes}`
}

async function getSongDuration(songUrl) {
    return new Promise((resolve) => {
        const audio = new Audio(songUrl);
        audio.addEventListener("loadedmetadata", () => {
            resolve(audio.duration);
        });
    });
}
const playMusic = (track,pause=false)=>{
    // let audio = new Audio("/songs/"+track+".mp3")
    currentSong.src = `https://Seemant-10.github.io/project/songs/${track}.mp3`
    if(!pause){
        currentSong.play()
        play.src = "svg/pause-icon.svg"
    }
    const songImage = document.querySelector(".song-image")
    songImage.src = `https://Seemant-10.github.io/project/images/${track}.jpeg`
    document.querySelector(".song-name").innerHTML = track
    document.querySelector(".song-time-start").innerHTML = "0:00"
    document.querySelector(".song-time-end").innerHTML = "0:00"
}

async function main() {

    let songs = await getSongs();
    let track = ["580,142,248","207,680,044","359,554,425","421,269,932","169,761,269"];
    let songUl = document.querySelector(".songs-media ul");
    playMusic(songs[0].replace(".mp3",""),true)

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
    
    // to display the song name and play song
    Array.from(document.querySelector(".songs-media").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element=>{
            console.log(e.querySelector("div>.song-info-inner>div").innerHTML)
            playMusic(e.querySelector("div>.song-info-inner>div").innerHTML)
        })
    });

    // play and pause eventlistener
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

        // time update 
    currentSong.addEventListener("timeupdate", ()=>{
        document.querySelector(".song-time-start").innerHTML = `${secondsToMinutesSecondes(currentSong.currentTime)}`
        document.querySelector(".song-time-end").innerHTML = `${secondsToMinutesSecondes(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime/ currentSong.duration)* 100 + "%"
        document.querySelector(".progress").style.width = (currentSong.currentTime/ currentSong.duration)* 100 + "%"
    })

    // seekbar event listener
    document.querySelector(".seekbar").addEventListener("click",e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%"
        currentSong.currentTime = ((currentSong.duration) * percent)/100
    })
}

main();
