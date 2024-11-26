document.addEventListener('DOMContentLoaded', () => {

    const CLIENT_ID = '';
    const CLIENT_SECRET = '';

    let accessToken;
    let currentAudio = null;


    function playSong(previewUrl) {
        if (currentAudio) {
            currentAudio.pause();
        }
        currentAudio = new Audio(previewUrl);
        currentAudio.play();
        document.getElementById('playPauseBtn').style.display = 'inline';
        document.getElementById('playPauseBtn').textContent = '❚❚ Pause';
        currentAudio.onended = () => {
            document.getElementById('playPauseBtn').textContent = '▶ Play';
            document.getElementById('playPauseBtn').style.display = 'none';
        };
    }

    async function getAccessToken() {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
            },
            body: 'grant_type=client_credentials',
        });
        const data = await response.json();
        console.log(data)
        accessToken = data.access_token;
    }

    document.getElementById('searchButton').addEventListener('click', () => {
        const query = document.getElementById('searchInput').value.trim();
        if (query) {
            searchSongs(query);
        }
    });

    async function searchSongs(query) {
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`;
        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            console.log(data)
            displayResults(data.tracks.items);
        } catch (error) {
            console.error('Erreur lors de la recherche', error);
        }
    }

    function displayResults(songs) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        songs.forEach(song => {
            const songDiv = document.createElement('div');
            songDiv.className = 'resultItem';

            const hasPreview = song.preview_url !== null;
            songDiv.innerHTML = `
            <img src="${song.album.images[0].url}" alt="${song.name}">
            <p>${song.name} - ${song.artists.map(artist => artist.name).join(', ')}</p>
            ${hasPreview ? `<button class="playButton" data-preview-url="${song.preview_url}">Écouter un extrait</button>` : '<p>Aperçu non disponible</p>'}
        `;

            resultsDiv.appendChild(songDiv);
        });

        const playButtons = document.querySelectorAll('.playButton');
        playButtons.forEach(button => {
            button.addEventListener('click', function() {
                playSong(button.getAttribute('data-preview-url'));
            });
        });
    }



    document.getElementById('playPauseBtn').addEventListener('click', () => {
        if (currentAudio) {
            if (currentAudio.paused) {
                currentAudio.play();
                document.getElementById('playPauseBtn').textContent = '❚❚ Pause';
            } else {
                currentAudio.pause();
                document.getElementById('playPauseBtn').textContent = '▶ Play';
            }
        }
    });


    getAccessToken();

});
