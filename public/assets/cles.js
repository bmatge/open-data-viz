/* Clé de lecture de l'API Opendatasoft de data.economie.gouv.fr.
 *
 * Ce n'est PAS un secret : le portail l'expose lui-même en clair dans le source
 * HTML de ses propres pages (`ctx-apikey` des directives ods-dataset-context).
 * Elle est en lecture seule et ne donne accès qu'aux jeux de données publics.
 *
 * Elle est déclarée ici plutôt qu'en `headers='{"apikey":"…"}'` sur chaque
 * source, pour deux raisons :
 *   1. un seul endroit à mettre à jour si le portail la fait tourner ;
 *   2. surtout : Opendatasoft n'autorise en CORS que l'en-tête `Authorization`
 *      (voir `Access-Control-Allow-Headers` de ses réponses). Un en-tête nommé
 *      `apikey` fait échouer la préflight avant même la requête. `api-key-ref`
 *      pose la valeur ci-dessous directement en `Authorization`.
 */
window.DSFR_DATA_KEYS = {
  'ods-mef': 'Apikey cd2cbe36f45ff5f17f5455606e4ae3af783fc8b793993b0b7528e7b1'
};
