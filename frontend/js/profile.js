$(document).ready(function () {

    //Si le user n'est pas connecté alors on redirige vers login.html 
    if(!window.sessionStorage["connected"]) {
        window.location.href = "login.html";
        return;
    }

    //On récupère le user au niveau du session storage
    //Voir https://developers.google.com/web/tools/chrome-devtools/manage-data/imgs/local-storage.png
    let user = JSON.parse(window.sessionStorage["user"]);
    console.log('user: ', user);
    $("#welcome_username").html('Bonjour ' + user.prenom + ' ' + user.nom);

    //Remplir le formulaire avec les informations du user
    $('#nom').val(user.nom);
    $('#prenom').val(user.prenom);
    $('#email').val(user.email);
    $('#password').val(user.password);
    $('#adresse').html(user.adresse);
    $('#tel').val(user.tel);

    //On se connecte sur l'API REST
    let client = new $.RestClient('http://localhost:3000/', {stringifyData: true});
    client.add('users');

    //On gère l'évenmenet au niveau du submit du formulaire
    $("#update").on('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        //On récupère les valeurs du formulaire
        let changes = {
            "nom": $('#nom').val(),
            "prenom": $('#prenom').val(),
            "email": $('#email').val(),
            "password": $('#password').val(),
            "adresse": $('#adresse').val(),
            "tel": $('#tel').val()
        };

        // Merge object2 into object1        
        let updateUser = Object.assign( user, changes );
 
        console.log('changes: ', changes);
        
        //Mettre à jour le user côté backend
        // PUT /users
        //http://localhost:3000/users/ID
        client.users.update(user.id, updateUser).done(function (data) {
            console.log('CHANGED: ', data);
            window.sessionStorage["user"] = JSON.stringify(updateUser);
            $("#myModalTitle").html("Mise à jour du profil effectué");
            $("#myModalBody").html("");               
            $("#myModal").modal({"focus": true})
        });
    });
});
