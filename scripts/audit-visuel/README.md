# Audit visuel — un dossier de suivi par dataviz

Outil de **pré-lecture**, pas de verdict. Pour chaque dataviz du banc, il capture
l'original sur le portail et la reprise côté DSFR, les soumet à un modèle multimodal,
et dépose ses constats dans le dossier de suivi de cette dataviz — à côté du corpus,
de l'analyse métier et du journal technique, pour que la transformation se documente
au fil de l'eau.

## Pourquoi déléguer celle-ci (et pas l'analyse de texte)

Une capture coûte ~2–3 k tokens de contexte. Comparer les 68 paires, c'est ~400 k tokens
consacrés à *regarder* — le poste qu'on ne peut pas compresser, et la raison pour laquelle
ce travail n'a jamais été fait à l'échelle. Un modèle multimodal bon marché l'absorbe et
rend ~200 tokens de constats par paire.

L'économie tient à une asymétrie : l'outil produit des **observations chiffrées**
(« original : 6 979 / reprise : 7 001 »), vérifiables par un recompte, et non des
**jugements**, dont la vérification reviendrait à les refaire. C'est ce qui distingue
cet usage d'une analyse de texte déléguée, qui ne fait économiser rien du tout.

## Le dossier d'une dataviz

```
dossiers/<id>/
  fiche.json          identité, jeux mobilisés — SEUL fichier régénéré
  corpus.md           contexte : jeux, millésime, périmètre, définitions
  analyse-metier.md   la lecture dataviz-metier : question, forme, honnêteté
  technique.md        problèmes et solutions, renvois au registre (AM-, PG-, BUG-…)
  suivi.md            le journal : ce qui a changé, quand, vérifié comment
  captures/<relevé>/  original.png + reprise.png + mesures.json
  constats/           <relevé>--<modèle>.json et .md — sorties du modèle
```

Les quatre `.md` sont amorcés une fois puis **appartiennent à l'humain** : aucun script
ne les réécrit. Les captures sont archivées par relevé et **jamais écrasées** — un écart
signalé sans l'image qui l'établit n'est pas rejouable six mois plus tard.

Deux modèles sur les mêmes images cohabitent dans `constats/` : ils sont comparables.

## Le piège que le prompt désamorce

Décision de cadrage n°1 du dépôt : **équivalence fonctionnelle, pas clone pixel**.
Un comparateur d'images produit spontanément « remets la légende à droite comme
l'original » — exactement la faute qui a produit FP-001 et FP-002. `prompt.mjs` interdit
donc explicitement tout constat de forme, et ne laisse passer que trois champs :

| Champ | Ce qu'il capture | Comment on le vérifie |
|---|---|---|
| `ecarts_donnees` | un nombre lisible des deux côtés qui ne concorde pas | recompte à l'API — **automatique** |
| `pertes_lecteur` | ce que le lecteur ne peut plus faire ou savoir | coup d'œil sur la paire |
| `phrase_de_lecture` | proposition de datajournaliste, chiffres cités | recontrôle des chiffres |

`ecarts_donnees` est le gros lot : c'est la classe PG-001, les comptes faux **du bon ordre
de grandeur**, qui ne produisent ni erreur, ni avertissement, ni valeur aberrante, et que
seul un recoupement indépendant révèle.

## Marche à suivre

```bash
npm start &                                   # le banc sur :3000
node scripts/audit-visuel/paires.mjs          # 68 paires original/reprise
node scripts/audit-visuel/dossiers.mjs        # 68 dossiers de suivi (idempotent)
node scripts/audit-visuel/captures.mjs --n 5  # captures (--n pour un pilote)
AUDIT_MODELE=anthropic:claude-haiku-4-5-20251001 ANTHROPIC_API_KEY=… \
  node scripts/audit-visuel/analyse.mjs --n 5
```

Filtres communs : `--id <id>`, `--portail bercy|education|sports`, `--n <k>`.
`captures.mjs --refaire` force une capture déjà prise dans le relevé courant.
`analyse.mjs --releve AAAA-MM-JJ` rejoue l'analyse sur d'anciennes images.

## Modèles

`AUDIT_MODELE="<provider>:<modèle>"`, même convention que `sophia-lycee`
(`app/llm/router.py`). Providers connus : `anthropic` (API native), puis `openai`,
`mistral`, `albert`, `openrouter` (tous en forme OpenAI-compatible). Chacun lit
`<PROVIDER>_API_KEY` et, si besoin, `<PROVIDER>_BASE_URL` — un vLLM local ou tout
endpoint compatible passe donc par `openai:` avec `OPENAI_BASE_URL`.

⚠️ **Le modèle doit être multimodal.** Albert (`gpt-oss-120b`) ne l'est pas : le client
sait lui parler, mais pas pour cet audit.

`--rythme 6000` espace les appels de 6 s (10 req/min) pour un endpoint sous quota.

## Les précautions payées d'avance

1. **Rendu à la visibilité.** Cartes et graphiques ne se dessinent qu'une fois visibles :
   `captures.mjs` déroule la page avant de photographier. Sans ça on capture du vide, et
   on croit à une régression — le dépôt a déjà produit trois faux positifs ainsi.
2. **Cadrage identique des deux côtés** (1280 px, hauteur plafonnée à 2600), sinon le
   modèle compare des cadrages au lieu de comparer des données. `tronquee: true` signale
   une page plus longue que le plafond, et le `.md` le dit en tête.
3. **Les deux côtés le même jour, en date locale.** Un écart de chiffres peut venir d'une
   mise à jour du jeu ODS et non d'un bug ; la date est rappelée au modèle.
4. **`lisible` avant tout constat.** Une capture blanche, en erreur ou masquée par un
   bandeau cookies ne donne aucun écart : le prompt l'exige, et le `.md` l'affiche.

## Ce que l'outil ne sait pas faire

- Il ne voit que le haut de page au-delà de 2600 px (`tronquee`).
- Il ne survole rien : une infobulle non stylée ou une pastille fausse au survol
  (BUG-022) lui reste invisible.
- Il ne clique aucun filtre : il juge l'état initial de la page.

## Et surtout

La sortie est une **file de candidats**. Rien n'entre dans `public/data/retours.json`
sans un champ `verifie` décrivant une observation rejouée. Ce que le modèle lit sur une
image est une piste, pas une preuve.
