# Consulter la liste des annonces

|Nom|Description|
| - | - |
|Auteur|D. Alvarez|
|Date|11.11.2019|
|Acteur concerné|Utilisateur de l'app|
|Description|L'utilisateur consulte la liste des annonces|
|Préconditions|Aucune|

## Scénario nominal
| Étape | Utilisateur | Système |
|-------|-------------|---------|
| 1.    |             | Récupère toutes les annonces |
| r1.   |             | Le nombre d'annonces > 0 |
| r1b.  |             | Le nombre d'annonces == 0 --> **Pas d'annonce** |
| 2.    |             | Vérifie que l'autorisation de localisation a déjà été demandée |
| 3.    |             | L'autorisation a déjà été demandée |
| 3b.   |             | L'autorisation n'as jamais été demandée --> **Initialisation** |
| 4.    |             | Vérifie qu'il a accès à la localisation de l'utilisateur |
| 5.    |             | Le système a accès à sa localisation |
| 5b.   |             | Le système n'a pas accès à sa localisation --> **Localisation non-disponible** |
| 6.    |             | Le système tente de localiser l'utilisateur |
| 7.    |             | La localisation réussi |
| 7b.   |             | La localisation échoue --> **Localisation non-disponible** |
| 8.    |             | Calcule la distance entre chacune des annonces et la distance de l'utilisateur |
| 9.    |             | Trie la liste de l'annonce la plus proche à la plus lointaine |
| 10.   |             | Affiche chacune des annonces dans la vue |

Fin du cas d'utilisation

## Scénarios alternatifs

### Pas d'annonces
Débute après le point **r1b** du **scénario nominal**

| Étape | Utilisateur | Système |
|-------|-------------|---------|
| 1.    |             | Affiche un message indiquant qu'il n'y a pas d'annonces pour le moment |

Fin du cas d'utilisation

### Initialisation
Ce scénario a lieu lorsque ce cas d'utilisation est éxecuté pour la première fois.

Débute après le point **3b** du **scénario nominal**.

| Étape | Utilisateur | Système |
|-------|-------------|---------|
| 1.    |             | Le système demande l'autorisation de localisation à l'utilisateur |
| 2.    |             | Le système enregistre la réponse de l'utilisateur dans sa mémoire |
| 3.    | Accepte     | --> **scenario nominal** point **4**
| 3b.   | Refuse      | --> **Localisation non-disponible**

Fin du cas d'utilisation


### Localisation non-disponible
Ce scénario a lieu lorsque l'utilisateur a refusé que l'application aie accès à sa localisation ou lorsque la localisation n'est pas disponible.

Débute après le point **5b** ou **7b** du **scénario nominal** ou le point **3b** de **Initialisation**

| Étape | Utilisateur | Système |
|-------|-------------|---------|
| 1.    |             | --> **scenario nominal** point **10**

