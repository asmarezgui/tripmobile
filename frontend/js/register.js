$(document).ready(function () {
    
    //On se connecte à l'API REST
    let client = new $.RestClient('http://localhost:3000/', {stringifyData: true, ajax: {processData: false}});
    client.add('users');

    $("#register").on('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        //On récupère les valeurs du formulaire
        let newUser = {
            "nom": $('#nom').val(),
            "prenom": $('#prenom').val(),
            "email": $('#email').val(),
            "password": $('#password').val(),
            "adresse": $('#adresse').val(),
            "tel": $('#tel').val(),
            "circuits": []
        };

        console.log('newUser: ', newUser);
        
        //On envoie la requête pour créer l'utilisateur côté backend
        // POST /users
        //http://localhost:3000/users
        client.users.create(newUser).done(function (data) {
            console.log('USER CREE: ', data);

            //$("#myModalTitle").html("L'utilisateur a bien été créé !!!");
            //$("#myModalBody").html("Patientez, nous allons vous rediriger sur la page de login...");               
            //$("#myModal").modal({"focus": true});
            setTimeout(function() {
                window.location.href = "login.html";
            }, 2000);
        });


    });
});