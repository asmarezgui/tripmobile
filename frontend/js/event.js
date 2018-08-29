$(document).ready(function () {
    //Si le user n'est pas connecté alors on redirige vers login.html 
    if(!window.sessionStorage["connected"]) {
        $('#message').html("Redirection vers la page de login...");
        window.location.href = "login.html";
        return;
    }

    //On récupère le user au niveau du session storage
    //Voir https://developers.google.com/web/tools/chrome-devtools/manage-data/imgs/local-storage.png
    let user = JSON.parse(window.sessionStorage["user"]);
    console.log('user: ', user);
    $("#welcome_username").html('Bonjour ' + user.prenom + ' ' + user.nom);

    //On se connecte à l'API REST
    let client = new $.RestClient('http://localhost:3000/', {stringifyData: true});
    client.add('events');

    //Afficher l'évenement en fonction de l'idEvent
    //event.html?idEvent=5 par exemple
    function afficherEventFromId(idEvent) {
        $("#myList").html('');
 
        // GET /events/ID
        //http://localhost:3000/events/ID_EVENT
        client.events.read(idEvent)
        .done(function (data) {            
            $("#myList").html('');
                
            let rateHtml = '';
            let rate = 0;
            for(; rate < data.evaluation; rate++) {
                rateHtml += '<span class="fa fa-star checked"></span>';
            }

            for(; rate < 5; rate++) {
                rateHtml += '<span class="fa fa-star"></span>';                    
            }

            $("#myList").append(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
            <p><img width="50" height="50" src="${data.url_image}" />        
            <span class="badge badge-primary badge-pill">${data.nb_visited} visited</span>
            ${rateHtml}
            </p>
            ${data.nom}
            <br />
            <iframe 
                width="250" 
                height="170" 
                frameborder="0" 
                scrolling="no" 
                marginheight="0" 
                marginwidth="0" 
                src="https://maps.google.com/maps?q=${data.localisation_latitude},${data.localisation_longitude}&hl=fr;z=14&amp;output=embed"
                >Affichage de la carte en cours...
                </iframe>
                <br />
                <small>
                <a 
                    href="https://maps.google.com/maps?q=${data.localisation_latitude},${data.localisation_longitude}&hl=fr;z=14&amp;output=embed" 
                    style="color:#0000FF;text-align:left" 
                    target="_blank"
                >
                    Voir la map plus grande
                </a>
                </small>
            <br />
            Ouvert de ${data.horaire_debut} à ${data.horaire_fin}
            <br />
            <br />
            Description :
            <br />
            ${data.description}
            </li>
            `);
        })
        //Gestion de l'erreur de l'id
        .fail(function (e) { console.log(e);
            $("#myList").append(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
                L'événement id = ${idEvent} n'existe pas.
            </li> 
            `);
        })         
    }

    //Récupérer l'id dans l'url event.html?idEvent=4
    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }

    //Afficher l'event
    //event.html?id=
    let idEvent = getUrlParameter('idEvent');
    afficherEventFromId(idEvent);

});
