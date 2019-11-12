# 5 - Gérer les paramètres

|Nom|Description|
| - | - |
|Auteur|D. Alvarez|
|Date|12.11.2019|
|Acteur concerné|Utilisateur de l'app|
|Description|L'utilisateur consulte la page **Paramètres**|
|Préconditions|-|

## Scénario nominal
| Étape | Utilisateur | Système |
|-------|-------------|---------|
| 1.    |             | Affiche les paramètres de l'application |

Fin du cas d'utilisation

## Scénarios alternatifs

### Interaction et communication
Débute après le point 1 du scénario nominal

| Étape | Utilisateur | Système |
|-------|-------------|---------|
| 1.    | Modifie le paramètre d'autorisation de position||
| 2.    |             | Demande l'accès à la position |
| 3.    |             | Enregistre la réponse dans le *ngrx/store* et le *localstorage*
| 4.    |             | Met à jour la vue en fonction de la réponse |

Fin du cas d'utilisation

## Maquettes
**5a**, **5b** et **5c**

