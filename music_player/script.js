const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const playlistContainer = document.getElementById('playlist');

// Song Data
const songs = [
    {
        title: "Electronic Journey",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&q=80",
        duration: "6:12"
    },
    {
        title: "Night Runner",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80",
        duration: "7:05"
    },
    {
        title: "City Lights",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80",
        duration: "5:44"
    }
];

let songIndex = 0;

// Initialize app
function init() {
    loadSong(songs[songIndex]);
    renderPlaylist();
    updatePlaylistStyles();
}

// Load song details
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
    cover.src = song.cover;
}

// Play song
function playSong() {
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
}

// Pause song
function pauseSong() {
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
    updatePlaylistStyles();
}

// Next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
    updatePlaylistStyles();
}

// Render Playlist
function renderPlaylist() {
    playlistContainer.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.classList.add('playlist-item');
        li.setAttribute('data-index', index);

        li.innerHTML = `
            <div class="pl-info">
                <span class="pl-title">${song.title}</span>
                <span class="pl-artist">${song.artist}</span>
            </div>
            <span class="pl-duration">${song.duration}</span>
        `;

        li.addEventListener('click', () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            playSong();
            updatePlaylistStyles();
        });

        playlistContainer.appendChild(li);
    });
}

// Highlight playing song
function updatePlaylistStyles() {
    const items = document.querySelectorAll('.playlist-item');
    items.forEach((item, index) => {
        if (index === songIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = playBtn.querySelector('i.fa-pause');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('ended', nextSong);

// Init
init();
