
$(document).ready(function () {

    if(!window.sessionStorage["connected"]) {
        $('#message').html("Redirection vers la page de login...");
        window.location.href = "login.html";
    } else {
        $('#message').html("Redirection vers la page d'acceuil du profil...");
        window.location.href = "welcome.html";
    }
})
