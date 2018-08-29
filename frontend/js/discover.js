$(document).ready(function () {
    //Si le user n'est pas connecté alors on redirige vers login.html 
    if (!window.sessionStorage["connected"]) {
        $('#message').html("Redirection vers la page de login...");
        window.location.href = "login.html";
        return;
    }

    //On récupère le user au niveau du session storage
    //Voir https://developers.google.com/web/tools/chrome-devtools/manage-data/imgs/local-storage.png
    let user = JSON.parse(window.sessionStorage["user"]);
    console.log('user: ', user);
    $("#welcome_username").html('Bonjour ' + user.prenom + ' ' + user.nom);

    //Gestion du filtre de la search bar
    $('#myInputSearch').on('keyup', function () {
        var value = $(this).val().toLowerCase();
        $("#myList li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });


    let client = new $.RestClient('http://localhost:3000/', { stringifyData: true });
    client.add('events');

    //Récupérer les événement en fonction du type
    //afin que lorsqu'on clique sur un bouton on récupère les événements de même type
    function afficherEvents(typeEvent) {
        // GET /events
        //http://localhost:3000/events?type_event=TYPE_EVENT
        client.events.read({ "type_event": typeEvent }).done(function (data) {
            $("#myList").html('');
            for (let i = 0; i < data.length; i++) {

                let rateHtml = '';
                let rate = 0;
                for (; rate < data[i].evaluation; rate++) {
                    rateHtml += '<span class="fa fa-star checked"></span>';
                }

                for (; rate < 5; rate++) {
                    rateHtml += '<span class="fa fa-star"></span>';
                }

                $("#myList").append(`
                <a href="event.html?idEvent=${data[i].id}">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                    <p><img width="50" height="50" src="${data[i].url_image}" />        
                    <span class="badge badge-primary badge-pill">${data[i].nb_visited} visited</span>
                    ${rateHtml}
                    </p>
                    ${data[i].nom}
                    <br />
                    Ouvert de ${data[i].horaire_debut} à ${data[i].horaire_fin}
                    </li>
                </a>    
                `);
            }
        });
    }

    //Gestion de l'événement du clic sur le bouton "Lieux"
    $('#lieuxEvents').on('click', function () {
        afficherEvents('lieu');
    });


    //Gestion de l'événement du clic sur le bouton "Excursion"
    $('#lieuxExcursions').on('click', function () {
        afficherEvents('excursion');
    });

    //Gestion de l'événement du clic sur le bouton "Restaurants"
    $('#lieuxRestaurants').on('click', function () {
        afficherEvents('restaurant');
    });

    //Provoquer le clic afin d'avoir une liste à l'affichage
    $('#lieuxEvents').trigger('click');

});
