import { readOneLyrics, updateLyrics } from "./firebase.js";


document.addEventListener('DOMContentLoaded', init);
function init() {

    // UPDATE
    const formEdit = document.querySelector('#formEdit');
    if (formEdit) {

        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        const id = params.id;

        readOneLyrics(id).then(songLyrics => {
            if (!songLyrics) {
                window.location.href = "./home.html";
                return;
            }

            formEdit["nameEdit"].value = songLyrics.name;
            formEdit["authorEdit"].value = songLyrics.author;
            formEdit["lyricsEdit"].value = songLyrics.lyrics;

            formEdit.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = formEdit["nameEdit"]
                const author = formEdit["authorEdit"]
                const lyrics = formEdit["lyricsEdit"]

                updateLyrics(id,name.value, author.value, lyrics.value).then(() => {
                    window.location.href = "./home.html";
                });
            });
        });
    }
}
