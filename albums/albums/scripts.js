// Function to filter songs based on search input
document.getElementById('searchBar').addEventListener('input', function () {
    const query = this.value.toLowerCase(); // Get the search input in lowercase
    const songList = document.getElementById('songList').getElementsByTagName('li'); // Get all song items

    for (let song of songList) {
        const songName = song.querySelector('span').textContent.toLowerCase(); // Get the song name in lowercase
        if (songName.includes(query)) {
            song.style.display = ''; // Show matching songs
        } else {
            song.style.display = 'none'; // Hide non-matching songs
        }
    }
});

// Function to toggle the "liked" state of a song
function toggleLike(button) {
    button.classList.toggle('liked');
}

// Function to play a selected song
function playSong(songUrl) {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');

    audioSource.src = songUrl;
    audioPlayer.load();
    audioPlayer.play();

    // Play the next song when the current one ends
    audioPlayer.onended = function () {
        playNextSong();
    };
}

// Function to add a song to the playlist
function addToPlaylist(songName, songImage, songUrl) {
    const playlist = JSON.parse(localStorage.getItem('playlist')) || [];

    // Check if the song is already in the playlist
    const songExists = playlist.some(song => song.name === songName);
    if (!songExists) {
        playlist.push({ name: songName, image: songImage, url: songUrl });
        localStorage.setItem('playlist', JSON.stringify(playlist));
        alert(`${songName} added to your playlist.`);
    } else {
        alert(`${songName} is already in your playlist.`);
    }
}

// Function to remove a song from the playlist
function removeFromPlaylist(songName) {
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];

    // Remove the song from the playlist
    playlist = playlist.filter(song => song.name !== songName);
    localStorage.setItem('playlist', JSON.stringify(playlist));

    // Re-render the playlist
    renderPlaylist();
    alert(`${songName} removed from your playlist.`);
}

// Function to play the next song in the playlist
function playNextSong() {
    const playlist = JSON.parse(localStorage.getItem('playlist')) || [];
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    const currentSongIndex = playlist.findIndex(song => song.url === audioSource.src);

    if (playlist.length > 0) {
        const nextSongIndex = (currentSongIndex + 1) % playlist.length; // Loop back to the first song
        const nextSong = playlist[nextSongIndex];

        audioSource.src = nextSong.url;
        audioPlayer.load();
        audioPlayer.play();
    }
}

// Function to render the playlist dynamically on the playlist page
function renderPlaylist() {
    const playlistContainer = document.getElementById('playlist');
    const playlist = JSON.parse(localStorage.getItem('playlist')) || [];

    // Clear the existing playlist
    playlistContainer.innerHTML = '';

    // Render each song in the playlist
    playlist.forEach(song => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div>
                <img src="${song.image}" alt="${song.name}" class="song-img">
                <span>${song.name}</span>
            </div>
            <div>
                <button onclick="playSong('${song.url}')">Play</button>
                <button onclick="removeFromPlaylist('${song.name}')">Remove</button>
            </div>
        `;
        playlistContainer.appendChild(listItem);
    });
}

// Render the playlist on page load (only on playlist page)
if (document.getElementById('playlist')) {
    renderPlaylist();
}
