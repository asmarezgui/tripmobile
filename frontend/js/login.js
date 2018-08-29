$(document).ready(function () {

    //On se connecte à l'API REST
    let client = new $.RestClient('http://localhost:3000/');
    client.add('users');

    //On g_re 
    $("#login").on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        let email = $('#email').val();
        let password = $('#password').val();
        
        console.log('email: ', email);
        console.log('password: ', password);
        
        // GET /users
        //http://localhost:3000/users?email=EMAIL&password=PASSWORD
        client.users.read({"email": email, "password": password}).done(function (data) {
            console.log('Récupération Data: ', data);

            if(data.length == 1) {
                window.sessionStorage["connected"] = true;
                window.sessionStorage["user"] = JSON.stringify(data[0]);                
                $("#myModalTitle").html("Vous êtes bien connecté !!!");
                $("#myModalBody").html("Patientez, nous allons vous rediriger...");               
                $("#myModal").modal({"focus": true})
                setTimeout(function() {
                    window.location.href = "welcome.html";
                }, 1000);
            } else {
                $("#myModalTitle").html("Votre login et/ou mot de passe sont incorrects !!!");
                $("#myModalBody").html("Veuillez réessayez.");               
                $("#myModal").modal({"focus": true})
            }
        });

    })

});
