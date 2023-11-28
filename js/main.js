import { readAllLyrics, deleteLyrics, getAuthFirebase, loginWithGoogle } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"


document.addEventListener('DOMContentLoaded', init);
function init() {
    const auth = getAuthFirebase();
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            // No hay ningún usuario que haya iniciado sesión.
            // Redirige al usuario a la página de inicio de sesión.
            const btnLogin = document.querySelector('#btnLogin');
            const containerList = document.querySelector('#containerList');

            btnLogin.removeAttribute("hidden");
            containerList.innerHTML = "<h1>Not logged in</h1>"
        }
        else{
            const btnLogin = document.querySelector('#btnLogin');
            btnLogin.setAttribute("hidden", "");

            // TODO: Borrar boton
            const btnLogout = document.querySelector('#btnLogout');
            btnLogout.removeAttribute("hidden");


            const btnNew = document.querySelector('#btnNew');
            btnNew.removeAttribute("hidden");

            loadMethodList(user.uid)
        }
    });


    const btnLogin = document.querySelector('#btnLogin');
    if (btnLogin) {
        btnLogin.addEventListener('click', function (e) {
            e.preventDefault();
            loginWithGoogle()
        });
    }


    // Logout with Google
    const btnLogout = document.querySelector('#btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', function (e) {
            e.preventDefault();
            signOut(auth).then(() => {
                //window.location.href = "./home.html";
                
                const btnLogout = document.querySelector('#btnLogout');
                btnLogout.setAttribute("hidden","");
                const btnNew = document.querySelector('#btnNew');
                btnNew.setAttribute("hidden","");

            }).catch((error) => {
                console.log(error);
            });

        });
    }

    function loadMethodList(idUser) {
        // READ
        
        const containerList = document.querySelector('#containerList');
        if (containerList) {
            readAllLyrics(idUser).then((lyricsList) => {
                let html = '';
                lyricsList.forEach(doc => {
                    html += `
                    <div class="d-md-flex align-items-center justify-content-between  border border-1" id-data=${doc.id}>
                        <div class="my-4">
                            <h5>${doc.name}</h5>
                            <p class="m-0">${doc.author}</p>
                        </div>
                        <div class="d-md-flex my-4">
                            <a href="view.html?id=${doc.id}" class="btn w-100 btn-info mx-1 my-1">View</a>
                            <a href="edit.html?id=${doc.id}" class="btn w-100 btn-warning mx-1 my-1">Edit</a>
                            <a href="#" class="btn w-100 btn-danger mx-1 my-1" id="${doc.id}">Delete</a>
                        </div>
                    </div>
                    `;
    
                });
                containerList.innerHTML = html;

                loadMethodDelete()
            });
        }
    }
    
    function loadMethodDelete() {
        // DELETE
        const deleteButtons = document.querySelectorAll('.btn-danger');
        if (deleteButtons) {
            deleteButtons.forEach(button => {
                button.addEventListener('click', function (e) {
                    e.preventDefault();
    
                    if (confirm('Are you sure you want to delete it?')) {
                        const idButton = button.getAttribute("id");
                        deleteLyrics(idButton).then(() => {
                            console.log('deleted. ' + idButton);
                            document.querySelector(`div[id-data=${idButton}]`).remove();
                        }).catch((error) => {
                            console.error('Error deleting lyrics: ', error);
                        });
                    }
    
                });
            });
        }
        
    }


}

