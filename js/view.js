import { readOneLyrics } from "./firebase.js";
import { onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"


document.addEventListener('DOMContentLoaded', init);
function init() {

    // READ ONE
    const containerView = document.querySelector('#containerView');
    if (containerView) {
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
        const id = params.id;

        readOneLyrics(id).then(songLyrics => {
            if (!songLyrics) {
                window.location.href = "./home.html";
                return;
            }
    
            const lyrics = songLyrics.lyrics;
            const name = songLyrics.name;
            const author = songLyrics.author;
    
            let html = `
            <h1 class="display-6">${name}</h1>
            <p class="h6">${author}</p>
            <span style="white-space: pre-line;">
                ${lyrics}
            </span>
                `;
    
            containerView.innerHTML = html;

        });

    }

}
