# Analyse métier — Le mix électrique mois par mois (deuxième vague, création du 2026-09-27)

## L'histoire

**Question** : d'où vient l'électricité française, et le pays en manque-t-il ou en a-t-il trop ?
**Lecteur** : lecteur de rapport (presse, élus, grand public) ; l'explorateur mensuel vient après.

**Message** : 2022 est la **seule année importatrice nette depuis 1981** (solde importateur 14,7 TWh ;
nucléaire net 279,0 TWh, au plus bas depuis 1988). Trois ans plus tard, 2025 est le **record
d'exportations nettes** : 93,8 TWh (90,0 en 2024 ; précédent record 76,9 en 2002). Le record ne vient
pas du nucléaire (373,0 TWh contre 379,5 en 2019) : éolien + solaire +36,8 TWh, énergie appelée
−29,9 TWh, thermique −24,8 TWh par rapport à 2019.

**Figures trouvées** :
- *exception* : une seule barre négative sur 45 années complètes ;
- *paradoxe* : le record d'exportations avec un nucléaire encore sous son niveau d'avant-crise ;
- *rupture saisonnière* : le solaire dépasse l'hydraulique 4 mois sur 547 (juillet et août 2025, juin et
  juillet 2026) ; record mensuel juillet 2026 : 5,54 TWh, 12,5 % de la production du mois (hydraulique
  8,0 %, éolien 6,7 %). Le solaire dépasse l'éolien presque chaque été depuis 2022.

## Ce qui a changé par rapport au cadrage

- Le cadrage donnait un titre descriptif (« mois par mois ») et un chiffre (559 mois). La donnée porte un
  récit annuel (2022 / 2025) ; le « mois par mois » devient le bloc du soleil et l'exploration.
- 559 lignes, mais **547 mois de production** : les 12 mois de 1980 n'ont que les degrés-jours.
- Colonnes **nettes** (`PRODN_*`) retenues. Le fichier « 4.2 Synthèse Électricité » compte le nucléaire
  en équivalent primaire (chaleur, environ trois fois l'électricité) : à ne pas mélanger.

## La forme

1. Barres annuelles du solde, positif = exportations (signe du SDES retourné par `0 - solde`), repère 2022.
2. Trois courbes annuelles : nucléaire, énergie appelée, éolien + solaire ; repères 2019 et 2022.
3. Trois courbes mensuelles depuis 2019 : solaire, hydraulique, éolien (le croisement estival).
4. Exploration : barres empilées par filière, 24 derniers mois par défaut, ou une année au choix
   (facette `select` + `limit="24"`) ; tableau de tous les mois, export CSV.

## L'honnêteté

- Années complètes seulement (compte des mois, `nm:eq:12`) : 2026 (7 mois) serait sinon « l'année la
  plus basse ».
- Chiffres du chapô et des phrases calculés (`order-by … limit 1`, jointures) ; « au plus bas depuis »
  calculé comme la dernière année antérieure au nucléaire plus faible.
- Énergie appelée non corrigée du climat : dit sous le graphique. Écarts à 2019 qui ne s'additionnent pas
  exactement au solde (hydraulique, pompage) : dit.
- Thermique = fossile + bioénergies : dit.
- Rupture de champ en janvier 2018 (DROM inclus) : dite (note méthodologique du SDES).
- Dernier mois provisoire, éolien et solaire les plus révisés : dit.

## Phrase de lecture

« En 2025, les réacteurs ont produit 373,0 TWh, soit 6,4 TWh de moins qu'en 2019. Pourtant le pays a
exporté 35,8 TWh de plus : l'éolien et le solaire ont ajouté 36,8 TWh, la consommation en a perdu 29,9,
et les centrales thermiques ont produit 24,8 TWh de moins. »

## Ce qu'on ne montre pas

Gaz/charbon/fioul séparés (le fichier ne les distingue pas), valeur des échanges (énergie, pas euros),
causes de 2022 (corrosion sous contrainte, sécheresse : hors fichier), l'année en cours dans les totaux,
les 12 mois de 1980. Aucune cellule `secret` ni `na` dans les colonnes utilisées (vérifié sur l'export).

## Angles écartés

- Consommation corrigée du climat (`CONSO_ELE_COR2`) : hors pertes, CVS ; aurait brouillé la comparaison
  avec l'énergie appelée utilisée dans le bilan. Candidat pour une version « consommation ».
- Pointe (`PUISSMAX_ELE`) : une autre histoire (sécurité d'approvisionnement).
- Concurrence avec éCO2mix (RTE) : la page ne double pas le temps réel ; elle prend le recul de 45 ans.
