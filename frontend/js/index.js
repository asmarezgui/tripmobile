
$(document).ready(function () {

    //Si le user n'est pas connecté alors on redirige vers login.html 
    if(!window.sessionStorage["connected"]) {
        $('#message').html("Redirection vers la page de login...");
        window.location.href = "login.html";
    } 
    //Sinon renvoyer le user vers la page welcome.html 
    else {
        $('#message').html("Redirection vers la page d'acceuil du profil...");
        window.location.href = "welcome.html";
    }
})
