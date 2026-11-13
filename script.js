/* ========================================= */
/* KÉKÉ LAND - SCRIPT PAGE PRINCIPALE        */
/* ========================================= */


/* ========================================= */
/* PHOTOS DISPONIBLES                        */
/* ========================================= */

/*
Mets tes 20 photos dans un dossier "photos".

Exemple :

photos/photo1.jpg
photos/photo2.jpg
...
photos/photo20.jpg
*/

const photos = [
    "photos/photo1.jpg",
    "photos/photo2.jpg",
    "photos/photo3.jpg",
    "photos/photo4.jpg",
    "photos/photo5.jpg",
    "photos/photo6.jpg",
    "photos/photo7.jpg",
    "photos/photo8.jpg",
    "photos/photo9.jpg",
    "photos/photo10.jpg",
    "photos/photo11.jpg",
    "photos/photo12.jpg",
    "photos/photo13.jpg",
    "photos/photo14.jpg",
    "photos/photo15.jpg",
    "photos/photo16.jpg",
    "photos/photo17.jpg",
    "photos/photo18.jpg",
    "photos/photo19.jpg",
    "photos/photo20.jpg"
];


/* ========================================= */
/* MÉLANGER UNE LISTE                        */
/* ========================================= */

function melangerListe(liste) {

    const copie = [...liste];

    for (let i = copie.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [copie[i], copie[j]] = [copie[j], copie[i]];
    }

    return copie;
}


/* ========================================= */
/* CRÉATION DES 4 PHOTOS ALÉATOIRES          */
/* ========================================= */

function creerPhotosFlottantes() {

    const container = document.getElementById("floatingPhotos");

    if (!container) {
        return;
    }

    /* On vide d'abord le conteneur */
    container.innerHTML = "";


    /* On mélange les 20 photos */
    const photosMelangees = melangerListe(photos);


    /* On garde seulement les 4 premières */
    const photosChoisies = photosMelangees.slice(0, 4);


    /* Positions de départ des photos */

    const positions = [
        {
            x: 5,
            y: 22,
            rotation: -8
        },

        {
            x: 74,
            y: 30,
            rotation: 9
        },

        {
            x: 7,
            y: 62,
            rotation: 7
        },

        {
            x: 72,
            y: 72,
            rotation: -6
        }
    ];


    photosChoisies.forEach((photo, index) => {

        const img = document.createElement("img");

        img.src = photo;

        img.alt = "Souvenir";

        img.classList.add("floating-photo");


        /* Position */

        img.style.left = positions[index].x + "%";

        img.style.top = positions[index].y + "%";


        /* Petite rotation */

        img.style.rotate =
            positions[index].rotation + "deg";


        /* On ajoute la photo à la page */

        container.appendChild(img);


        /* Active le déplacement */

        rendrePhotoDeplacable(img);

    });

}


/* ========================================= */
/* PHOTOS DÉPLAÇABLES AVEC LE DOIGT          */
/* ========================================= */

function rendrePhotoDeplacable(photo) {

    let enDeplacement = false;

    let offsetX = 0;
    let offsetY = 0;


    photo.addEventListener(
        "pointerdown",
        commencerDeplacement
    );


    function commencerDeplacement(event) {

        enDeplacement = true;

        photo.classList.add("dragging");


        /*
        Permet de continuer à suivre le doigt
        même s'il sort légèrement de la photo.
        */

        photo.setPointerCapture(event.pointerId);


        const rect =
            photo.getBoundingClientRect();


        offsetX =
            event.clientX - rect.left;

        offsetY =
            event.clientY - rect.top;

    }


    photo.addEventListener(
        "pointermove",
        deplacerPhoto
    );


    function deplacerPhoto(event) {

        if (!enDeplacement) {
            return;
        }


        let nouvellePositionX =
            event.clientX - offsetX;

        let nouvellePositionY =
            event.clientY - offsetY;


        /*
        Empêche la photo de disparaître
        complètement hors de l'écran.
        */

        const largeurPhoto =
            photo.offsetWidth;

        const hauteurPhoto =
            photo.offsetHeight;


        const largeurEcran =
            window.innerWidth;

        const hauteurEcran =
            window.innerHeight;


        nouvellePositionX =
            Math.max(
                0,
                Math.min(
                    nouvellePositionX,
                    largeurEcran - largeurPhoto
                )
            );


        nouvellePositionY =
            Math.max(
                0,
                Math.min(
                    nouvellePositionY,
                    hauteurEcran - hauteurPhoto
                )
            );


        photo.style.left =
            nouvellePositionX + "px";


        photo.style.top =
            nouvellePositionY + "px";

    }


    photo.addEventListener(
        "pointerup",
        terminerDeplacement
    );


    photo.addEventListener(
        "pointercancel",
        terminerDeplacement
    );


    function terminerDeplacement(event) {

        enDeplacement = false;

        photo.classList.remove("dragging");


        if (
            photo.hasPointerCapture &&
            photo.hasPointerCapture(event.pointerId)
        ) {

            photo.releasePointerCapture(
                event.pointerId
            );

        }

    }

}


/* ========================================= */
/* OUVERTURE DES CARTES                      */
/* ========================================= */

/*
Ton HTML contient par exemple :

onclick="ouvrirCarte('noel')"

Le script regarde alors quelle carte
a été sélectionnée et ouvre la bonne page.
*/

function ouvrirCarte(carte) {


    /* EVERYDAY FUN */

    if (carte === "everyday") {

        window.location.href =
            "everyday.html";

        return;
    }


    /* PARCE QUE KÉKÉ */

    if (carte === "keke") {

        window.location.href =
            "keke.html";

        return;
    }


    /* NOËL */

    if (carte === "noel") {

        window.location.href =
            "noel.html";

        return;
    }


    /* ANNIVERSAIRE */

    if (carte === "anniversaire") {

        window.location.href =
            "anniversaire.html";

        return;
    }


    /* OLD CARDS */

    if (carte === "oldcards") {

        window.location.href =
            "oldcards.html";

        return;
    }


    console.log(
        "Carte inconnue : " + carte
    );

}


/* ========================================= */
/* CHARGEMENT DE LA PAGE                     */
/* ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        creerPhotosFlottantes();

    }
);

