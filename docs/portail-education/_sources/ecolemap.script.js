// ÉcoleMap
// Arnaud Champollion, 2024

// Consituants de la page
const zoneCarte = document.getElementById('zonecarte');
const iFrameCarte = document.getElementById('carte');
const inputRecherche = document.getElementById('input-recherche');
const inputUai = document.getElementById('input-uai');
const divInfos = document.getElementById('infos');
const divHaut = document.getElementById('haut');
const divBas = document.getElementById('bas');
const divResultatsRecherche = document.getElementById('resultats-recherche');

// On vide les input au lancement
inputRecherche.value = '';
inputUai.value = '';

// Fonds Geoportail
const fondOpenstreetmap = "l0=OPEN_STREET_MAP::GEOPORTAIL:OGC:WMTS(1)";
const fondOrthoPhoto = "l0=ORTHOIMAGERY.ORTHOPHOTOS::GEOPORTAIL:OGC:WMTS(1)";
// Ordre des fonds
let fond = fondOrthoPhoto;

//Lecture de l'URL
let url = window.location.search;
let urlParams = new URLSearchParams(url);
let uaiUrl = urlParams.get('uai');
if (uaiUrl){
    mettreAJourCarteEtInfos(uaiUrl);
} 


///////// RECHERCHE PAR NOM, COMMUNE, ADRESSE //////////////

function chercherEcoles(entree) {

    // On vide les résultats précédents
    divResultatsRecherche.innerHTML='';
    // On récupère l'UAI d'après le champ de texte
    const recherche = entree.trim();
    if (recherche) {
        listerEcoles(recherche);
    }

}

// Recherche en direct pendant la frappe
inputRecherche.addEventListener('input', function (event) {
    const recherche = inputRecherche.value.trim();
    if (recherche) {
        chercherEcoles(recherche);
    }
});

// Recherche sur l'API et listage des résultats
async function listerEcoles(recherche) {
    console.log('Lancement de la recherche sur', recherche);
    const etablissements = await getEtablissements(recherche);  
               
        if (etablissements.length > 1 ) { // Si au moins un établissement est trouvé

            etablissements.forEach(etablissement => {
                let nom = etablissement.nom_etablissement;
                let commune = etablissement.nom_commune;
                let codeDepartement = etablissement.code_departement;
                let adresse_1 = etablissement.adresse_1;               

                // Ajout à la liste des résultats
                let ligne = document.createElement('p');
                if (codeDepartement.startsWith('0')) {
                    // Supprimer le premier zéro
                    codeDepartement = codeDepartement.slice(1);
                }
                ligne.innerHTML = `<strong>${nom}</strong><br>${commune} (${codeDepartement}) `;
                let uai = etablissement.identifiant_de_l_etablissement;

                // On associe un événement à chaque ligne de résultat ...
                ligne.addEventListener('click', function () {
                    divResultatsRecherche.classList.add('hide');
                    inputUai.value = uai;
                    inputRecherche.value=''; 
                    mettreAJourCarteEtInfos(uai); // ... qui met à jour la carte
                });
                divResultatsRecherche.classList.remove('hide');
                divResultatsRecherche.appendChild(ligne);

            });            


    } else {
        divResultatsRecherche.classList.remove('hide');
        divResultatsRecherche.innerHTML = 'Aucun résultat';
    }
    
}

///////// FIN DE LA RECHERCHE PAR NOM, COMMUNE, ADRESSE //////////////


////////////////// RECHERCHE PAR UAI ET AFFICHAGE DE LA CARTE /////////////////////////////////

// Dès que l'input atteint 8 caractères on met à jour la carte
inputUai.addEventListener('input', function (event) {
    inputUai.classList.remove('correct','incorrect');
    const recherche = inputUai.value.trim();
    if (recherche.length === 8) {
        inputRecherche.value='';
        console.log(recherche)        
        mettreAJourCarteEtInfos(recherche);
    }
});


// Afficher les informations et mettre à jour la carte d'après l'UAI
async function mettreAJourCarteEtInfos(numeroUai) {
    console.log('Lancement de la recherche sur',numeroUai);
    // On récupère l'établissement via l'API d'après l'UAI
    const etablissement = await getEtablissement(numeroUai);
    // On récupère les données qui nous intéressent
    if (etablissement) {
        inputUai.classList.add('correct');
        // Déstructuration des données
        const {
            // Valeurs par défaut pour éviter undefined
            nom_circonscription = '',
            nom_etablissement = 'Établissement non renseigné',
            nom_commune = 'Commune non renseignée',
            code_postal = 'Code postal non renseigné',
            adresse_1 = '',
            adresse_2 = '',
            telephone = '',
            mail = '',
            code_circonscription = '',
            position = []
        } = etablissement;

        // Récupération des coordonnées

        let positionOsm = await getPosition(numeroUai);
        
        let latitude, longitude;
        
        if (positionOsm) {
            latitude = positionOsm.lat;
            longitude = positionOsm.lon;
            console.log("position déterminée par OSM : ",positionOsm.lat,positionOsm.lon);
        } else

        if (position.length === 2) {
            console.log("position déterminée par Data.gouv.fr : ",position);
            [latitude, longitude] = position;
        } else {
            console.error('Coordonnées invalides : ', position);
            latitude = longitude = null; // Valeur par défaut si les coordonnées sont absentes
        }

        // Traitement de la circonscription
        let circo = '';
        if (nom_circonscription) {
            circo = nom_circonscription.replace("d'inspection du 1er degré", '').trim();
        } else {
            circo = '';
        }

        // Vérification avant mise à jour de la carte
        if (latitude && longitude) {
            const zoom = 19; // Ajustez selon votre préférence
            const layer = fond;
            const iframeUrl = `https://www.geoportail.gouv.fr/embed/visu.html?c=${longitude},${latitude}&z=${zoom}&${layer}&permalink=yes`;
            iFrameCarte.src = iframeUrl;
        } else {
            console.warn('Carte non mise à jour : coordonnées manquantes.');
        }


        // Mise à jour des informations affichées
        divInfos.innerHTML = `
        <div class="section">
            <div class="etablissement">${nom_etablissement}</div>
            <div class="hide-mobile">${adresse_1} ${adresse_2}</div>
            <div>${code_postal} ${nom_commune}</div>
            <div class="hide-mobile"><a  style="padding-left: 0px "href="https://data.education.gouv.fr/explore/dataset/fr-en-annuaire-education/table/?disjunctive.type_etablissement&disjunctive.code_postal&disjunctive.nom_commune&disjunctive.code_departement&disjunctive.appartenance_education_prioritaire&disjunctive.libelle_academie&disjunctive.libelle_region&disjunctive.ministere_tutelle&q=code_circonscription:${code_circonscription}">${circo}</a></div>
        </div>
        <div class="section">
            <div class="hide-mobile">✉️<a href="mailto:${mail}">${mail}</a></div>
            <div class="hide-mobile">☎️<a href="tel:${telephone}">${telephone}</a></div>
            <div class="hide-mobile">🇫🇷 <a href="https://data.education.gouv.fr/explore/dataset/fr-en-annuaire-education/table/?q=${numeroUai}">Voir sur data.education.gouv.fr</a></div>
            <div>📌 <a href="https://www.openstreetmap.org/?mlat=${latitude}&mlon${longitude}#map=19/${latitude}/${longitude}">Openstreetmap</a> 📌 <a href="https://www.google.fr/maps/@${latitude},${longitude},19.08z">Google Maos</a></div>
        </div>
        `;
        
    // Lecture de l'URL actuelle
    let url = new URL(window.location.href); // Utilise l'URL complète
    let urlParams = url.searchParams; // Récupère les paramètres existants

    // Ajout ou mise à jour du paramètre 'uai'
    urlParams.set('uai', numeroUai);

    // Applique les paramètres modifiés à l'URL
    url.search = urlParams.toString(); 

    // Mise à jour de l'URL dans le navigateur
    window.history.replaceState({}, '', url.toString()); 

    } else {
        inputUai.classList.add('incorrect');
        divInfos.innerHTML = 'Aucune école trouvée avec cet UAI.'
    }
}

////////////////// FIN DE LA RECHERCHE PAR UAI ET DE L'AFFICHAGE DE LA CARTE /////////////////////////////////

// Pour changer de fond, on modifie le src de l'Iframe
function changeFond() {

    // Mise en mémoire du fond actuel
    let fondActuel = fond;

    // Changer la variable fond
    if (fond === fondOrthoPhoto) {
        fond = fondOpenstreetmap;
    } else {
        fond = fondOrthoPhoto;
    }

    // Changer le fond dans l'URL de l'Iframe
    iFrameCarte.src = iFrameCarte.src.replace(fondActuel,fond)

}

// Récupération de l'établissement d'après l'API de data.education.gouv.fr
async function getEtablissement(numeroUai) {
    // Adresse de l'API
    const baseURL = 'https://data.education.gouv.fr/api/records/1.0/search/';
    // Paramètres de l'API
    const params = new URLSearchParams({
        dataset: 'fr-en-annuaire-education',
        // Sur cette API la clé correspondant à l'UAI s'appelle "identifiant_de_l_etablissement".
        q: `identifiant_de_l_etablissement:${numeroUai}`,
        // On ne veut qu'un seul résultat.
        rows: 1
    });
    
    try {
        // On lance la recherche
        const response = await fetch(`${baseURL}?${params.toString()}`);

        // Si pas de réponse, on affiche l'erreur en console.
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

        // On stocke la réponse sous forme d'objet.
        const data = await response.json();

        if (data.records && data.records.length > 0) {
            // On renvoie les champs de l'objet trouvé.
            return data.records[0].fields;
        } else {
            return null;
        }
    } catch (error) {
        // Si erreur  on l'affiche en console.
        console.error('Erreur lors de la récupération des données:', error);
        return null;
    }
}

async function getPosition(uai) {
    console.log('Recherche sur OSM de', uai);
    // Construction de la requête Overpass qui inclut maintenant les nodes
    const query = `
        [out:json];
        (
            node["ref:UAI"~"${uai}",i];
            way["ref:UAI"~"${uai}",i];
            relation["ref:UAI"~"${uai}",i];
        );
        out center;
    `;

    try {
        // Encodage de la requête pour l'URL
        const encodedQuery = encodeURIComponent(query);
        
        // Appel à l'API Overpass
        const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodedQuery}`);
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();

        // Vérification si des résultats ont été trouvés
        if (data.elements && data.elements.length > 0) {
            const element = data.elements[0];
            
            // Pour un node, les coordonnées sont directement dans lat et lon
            if (element.type === 'node') {
                console.log('noeud trouvé', element.lat, element.lon);
                return {
                    lat: element.lat,
                    lon: element.lon
                };
            }
            // Pour une relation ou un way, les coordonnées sont dans center
            else {
                
                if (element.center) {
                    console.log(`${element.type} trouvé`, element.center.lat, element.center.lon);
                    return {
                        lat: element.center.lat,
                        lon: element.center.lon
                    };
                }
            }
            
            return null;
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération de la position pour l'UAI ${uai}:`, error);
        throw error;
    }
}

// Récupération d'une liste d'établissements d'après l'API de data.education.gouv.fr
async function getEtablissements(recherche, types = ["École", "Collège", "Lycée"], nombreDeResultats = 100) {
    // Vérification de l'entrée utilisateur
    if (!recherche || recherche.trim() === '') {
        console.warn('La recherche est vide ou invalide.');
        return [];
    }

    // Adresse de l'API
    const baseURL = 'https://data.education.gouv.fr/api/records/1.0/search/';

    // Construction des types d'établissements dynamiques
    const typesFilter = types.map(type => `type_etablissement:"${type}"`).join(' OR ');

    // Découper la recherche en mots-clés
    const termes = recherche.split(" ").map(terme => terme.trim()).filter(terme => terme !== "");

    // Construire une requête dynamique pour chaque champ
    const champs = ["nom_etablissement", "nom_commune", "adresse_1"];
    const conditions = termes.map(terme => 
        `(${champs.map(champ => `${champ}:${terme}~`).join(' OR ')})`
    ).join(' OR ');

    // Construire la requête complète
    const query = `
        (${conditions}) 
        AND (${typesFilter})
    `;

    console.log('Recherche',query)

    // Paramètres de l'API
    const params = new URLSearchParams({
        dataset: 'fr-en-annuaire-education',
        q: query,
        nombreDeResultats
    });

    try {
        // Lancer la requête
        const response = await fetch(`${baseURL}?${params.toString()}`);

        // Vérification de la réponse
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

        // Récupérer les données en JSON
        const data = await response.json();

        // Retourner tous les établissements trouvés
        if (data.records && data.records.length > 0) {
            return data.records.map(record => record.fields);
        } else {
            console.warn('Aucun établissement trouvé pour la recherche:', recherche);
            return [];
        }
    } catch (error) {
        // Gestion des erreurs
        console.error('Erreur lors de la récupération des données:', error);
        return [];
    }
}

function masquerResultats() {
    divResultatsRecherche.classList.add('hide');
}


function clic(event) {
    masquerResultats();
}

window.addEventListener('click',clic);

window.addEventListener('blur', masquerResultats);



// Fonction appelée sur chaque changement d'orientation
function gererChangementOrientation(event) {
    if (event.matches) {
        // Mode portrait : Ajouter divInfos à divBas
        divBas.appendChild(divInfos);
        console.log("L'écran est maintenant en mode portrait.");
    } else {
        // Mode paysage : Ajouter divInfos à divHaut
        divHaut.appendChild(divInfos);
        console.log("L'écran est maintenant en mode paysage.");
    }
}

// Créer une MediaQuery pour détecter le mode portrait
const portraitMediaQuery = window.matchMedia("(orientation: portrait)");

// Ajouter un écouteur pour les changements d'orientation
portraitMediaQuery.addEventListener("change", gererChangementOrientation);

// Gérer l'état initial
if (portraitMediaQuery.matches) {
    // Mode initial portrait
    divBas.appendChild(divInfos);
    console.log("Mode initial : portrait.");
} else {
    // Mode initial paysage
    divHaut.appendChild(divInfos);
    console.log("Mode initial : paysage.");
}

