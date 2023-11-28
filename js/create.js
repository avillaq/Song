import { createLyrics, getAuthFirebase } from "./firebase.js";

import { onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"

document.addEventListener('DOMContentLoaded',init);
function init(){
    let idUser = null;
    const auth = getAuthFirebase();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            idUser = user.uid;
        }
    });


    // CREATE
    const formCreate = document.querySelector('#formCreate');
    if (formCreate) {
        formCreate.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = formCreate["nameCreate"]
            const author = formCreate["authorCreate"]
            const lyrics = formCreate["lyricsCreate"]
        
            createLyrics(name.value, author.value, lyrics.value, idUser).then(() => {
                alert("Created successfully !!");
                formCreate["nameCreate"].value = "" 
                formCreate["authorCreate"].value = "" 
                formCreate["lyricsCreate"].value = ""

            });
        });
    }
}
