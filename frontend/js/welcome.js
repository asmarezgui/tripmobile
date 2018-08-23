$(document).ready(function () {

    if(!window.sessionStorage["connected"]) {
        window.location.href = "login.html";
        return;
    }

    let user = JSON.parse(window.sessionStorage["user"]);
    console.log('user: ', user);
    $("#welcome_username").html('Bonjour ' + user.prenom + ' ' + user.nom);
})
