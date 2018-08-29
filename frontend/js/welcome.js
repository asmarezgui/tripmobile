$(document).ready(function () {

    //Si le user n'est pas connecté alors on redirige vers login.html 
    if(!window.sessionStorage["connected"]) {
        window.location.href = "login.html";
        return;
    }

    let user = JSON.parse(window.sessionStorage["user"]);
    console.log('user: ', user);
    $("#welcome_username").html('Bonjour ' + user.prenom + ' ' + user.nom);
})
