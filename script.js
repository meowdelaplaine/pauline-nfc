/* ========================================= */
/* KÉKÉ LAND - SCRIPT PRINCIPAL              */
/* ========================================= */


/* ========================================= */
/* LISTE DES 20 PHOTOS                       */
/* ========================================= */

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
/* MÉLANGER LES PHOTOS                       */
/* ========================================= */

function melangerListe(liste) {

    const copie = [...liste];

    for (let i = copie.length - 1; i > 0; i--) {

        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [copie[i], copie[j]] =
            [copie[j], copie[i]];

    }

    return copie;
}


/* ========================================= */
/* CRÉER LES 4 PHOTOS                        */
/* ========================================= */

function creerPhotosFlottantes() {

    const container =
        document.getElementById("floatingPhotos");

    if (!container) {
        return;
    }

    container.innerHTML = "";


    /* Choisit 4 photos sur les 20 */

    const photosChoisies =
        melangerListe(photos).slice(0, 4);


    /* Positions de départ */

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


    photosChoisies.forEach(
        (photoSource, index) => {

            const img =
                document.createElement("img");


            img.src = photoSource;

            img.alt = "Souvenir";

            img.classList.add(
                "floating-photo"
            );


            /* On mémorise quelle photo c'est */

            img.dataset.photo =
                photoSource;


            img.style.left =
                positions[index].x + "%";

            img.style.top =
                positions[index].y + "%";

            img.style.rotate =
                positions[index].rotation + "deg";


            container.appendChild(img);


            rendrePhotoDeplacable(img);


            /* Easter egg PHOTO 5 */

            if (
                photoSource.includes("photo5.jpg")
            ) {

                activerEasterEggCoeurs(img);

            }


            /* Easter egg PHOTO 10 */

            if (
                photoSource.includes("photo10.jpg")
            ) {

                activerEasterEggGel(img);

            }

        }
    );

}


/* ========================================= */
/* DÉPLACER LES PHOTOS                       */
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


        photo.setPointerCapture(
            event.pointerId
        );


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


        let x =
            event.clientX - offsetX;

        let y =
            event.clientY - offsetY;


        const largeur =
            photo.offsetWidth;

        const hauteur =
            photo.offsetHeight;


        x = Math.max(
            0,
            Math.min(
                x,
                window.innerWidth - largeur
            )
        );


        y = Math.max(
            0,
            Math.min(
                y,
                window.innerHeight - hauteur
            )
        );


        photo.style.left =
            x + "px";

        photo.style.top =
            y + "px";

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

        photo.classList.remove(
            "dragging"
        );


        if (
            photo.hasPointerCapture(event.pointerId)
        ) {

            photo.releasePointerCapture(
                event.pointerId
            );

        }

    }

}


/* ========================================= */
/* EASTER EGG 1                              */
/* PHOTO 5 = 5 CLICS = PLUIE DE COEURS       */
/* ========================================= */

function activerEasterEggCoeurs(photo) {

    let compteur = 0;

    let dernierClic = 0;


    photo.addEventListener(
        "click",
        function () {

            const maintenant =
                Date.now();


            /*
            Si elle attend trop longtemps entre
            les clics, le compteur recommence.
            */

            if (
                maintenant - dernierClic > 2500
            ) {

                compteur = 0;

            }


            compteur++;

            dernierClic = maintenant;


            if (compteur >= 5) {

                pluieDeCoeurs();

                compteur = 0;

            }

        }
    );

}


/* ========================================= */
/* PLUIE DE COEURS                           */
/* ========================================= */

function pluieDeCoeurs() {

    const emojis = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💘",
        "💓",
        "💞",
        "🩷"
    ];


    for (let i = 0; i < 35; i++) {

        const coeur =
            document.createElement("div");


        coeur.textContent =
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];


        coeur.style.position =
            "fixed";

        coeur.style.left =
            Math.random() * 100 + "vw";

        coeur.style.top =
            "-60px";

        coeur.style.zIndex =
            "9999";

        coeur.style.pointerEvents =
            "none";

        coeur.style.fontSize =
            (20 + Math.random() * 25) +
            "px";


        document.body.appendChild(
            coeur
        );


        const duree =
            1800 + Math.random() * 1800;


        const destinationX =
            (Math.random() - 0.5) * 180;


        coeur.animate(

            [

                {
                    transform:
                        "translate(0, 0) rotate(0deg)",

                    opacity: 1
                },

                {
                    transform:
                        `translate(${destinationX}px, 110vh) rotate(360deg)`,

                    opacity: 0.8
                }

            ],

            {
                duration: duree,

                easing: "ease-in",

                fill: "forwards"
            }

        );


        setTimeout(
            function () {

                coeur.remove();

            },
            duree
        );

    }

}


/* ========================================= */
/* EASTER EGG 2                              */
/* PHOTO 10 = SECOUÉE = GEL VERT             */
/* ========================================= */

function activerEasterEggGel(photo) {

    let mouvements = [];

    let dernierX = null;

    let dernierY = null;

    let gelDeclenche = false;


    photo.addEventListener(
        "pointerdown",
        function () {

            mouvements = [];

            dernierX = null;
            dernierY = null;

        }
    );


    photo.addEventListener(
        "pointermove",
        function (event) {

            /*
            On ne compte que les mouvements
            lorsque la photo est vraiment saisie.
            */

            if (
                !photo.classList.contains(
                    "dragging"
                )
            ) {

                return;

            }


            if (
                dernierX !== null &&
                dernierY !== null
            ) {

                const differenceX =
                    event.clientX - dernierX;

                const differenceY =
                    event.clientY - dernierY;


                const distance =
                    Math.sqrt(
                        differenceX *
                        differenceX +

                        differenceY *
                        differenceY
                    );


                /*
                On ne compte que les mouvements
                suffisamment brusques.
                */

                if (distance > 10) {

                    mouvements.push(
                        Date.now()
                    );

                }

            }


            dernierX =
                event.clientX;

            dernierY =
                event.clientY;


            /*
            On garde seulement les mouvements
            effectués pendant la dernière seconde.
            */

            const maintenant =
                Date.now();


            mouvements =
                mouvements.filter(
                    temps =>
                        maintenant - temps < 1000
                );


            /*
            Si elle fait beaucoup de mouvements
            brusques en 1 seconde :
            GEL VERT.
            */

            if (
                mouvements.length >= 10 &&
                !gelDeclenche
            ) {

                gelDeclenche = true;

                invasionDeGel();


                setTimeout(
                    function () {

                        gelDeclenche = false;

                    },
                    5000
                );

            }

        }
    );

}


/* ========================================= */
/* INVASION DE GEL VERT                      */
/* ========================================= */

function invasionDeGel() {

    const gel =
        document.createElement("div");


    gel.id =
        "greenGelEasterEgg";


    gel.style.position =
        "fixed";

    gel.style.left =
        "0";

    gel.style.bottom =
        "-100%";

    gel.style.width =
        "100%";

    gel.style.height =
        "110%";

    gel.style.zIndex =
        "99999";

    gel.style.pointerEvents =
        "none";


    /*
    Plusieurs verts pour donner
    un aspect slime / gel.
    */

    gel.style.background = `
        radial-gradient(
            circle at 20% 10%,
            rgba(200, 255, 120, 0.85),
            transparent 8%
        ),

        radial-gradient(
            circle at 70% 20%,
            rgba(100, 255, 80, 0.8),
            transparent 12%
        ),

        radial-gradient(
            circle at 45% 60%,
            rgba(190, 255, 110, 0.8),
            transparent 15%
        ),

        linear-gradient(
            180deg,
            rgba(95, 235, 75, 0.88),
            rgba(25, 165, 60, 0.94)
        )
    `;


    gel.style.borderRadius =
        "45% 55% 0 0";


    gel.style.filter =
        "saturate(1.3)";


    document.body.appendChild(
        gel
    );


    /* Le gel monte */

    const animation =
        gel.animate(

            [

                {
                    transform:
                        "translateY(100%)"
                },

                {
                    transform:
                        "translateY(0%)"
                }

            ],

            {

                duration: 900,

                easing:
                    "cubic-bezier(.2,.8,.3,1)",

                fill:
                    "forwards"

            }

        );


    animation.onfinish =
        function () {


            /*
            Le gel reste environ
            1,3 seconde.
            */

            setTimeout(
                function () {


                    const disparition =
                        gel.animate(

                            [

                                {
                                    opacity: 1
                                },

                                {
                                    opacity: 0
                                }

                            ],

                            {

                                duration: 1000,

                                easing:
                                    "ease",

                                fill:
                                    "forwards"

                            }

                        );


                    disparition.onfinish =
                        function () {

                            gel.remove();

                        };


                },

                1300
            );

        };

}


/* ========================================= */
/* NAVIGATION ENTRE LES CARTES               */
/* ========================================= */

function ouvrirCarte(carte) {

    if (carte === "everyday") {

        window.location.href =
            "everyday.html";

        return;
    }


    if (carte === "keke") {

        window.location.href =
            "keke.html";

        return;
    }


    if (carte === "noel") {

        window.location.href =
            "noel2026.html";

        return;
    }


    if (carte === "anniversaire") {

        window.location.href =
            "anniversaire26.html";

        return;
    }


    if (carte === "oldcards") {

        window.location.href =
            "oldcards.html";

        return;
    }

}


/* ========================================= */
/* FERMETURE EVENT OVERLAY                   */
/* ========================================= */

function fermerCarte() {

    const overlay =
        document.getElementById(
            "eventOverlay"
        );


    if (!overlay) {

        return;

    }


    overlay.classList.remove(
        "active"
    );


    const eventPage =
        document.getElementById(
            "eventPage"
        );


    if (eventPage) {

        eventPage.innerHTML = "";

    }

}


/* ========================================= */
/* DÉMARRAGE                                 */
/* ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        creerPhotosFlottantes();

    }
);
