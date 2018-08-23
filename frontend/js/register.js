$(document).ready(function () {
    
    let client = new $.RestClient('http://localhost:3000/', {stringifyData: true, ajax: {processData: false}});
    client.add('users');

    $("#register").on('click', function (e) {
        e.preventDefault();
        
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