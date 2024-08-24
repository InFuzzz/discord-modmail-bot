# **Discord Modmail Bot (v14)**

Un bot de modmail simple à utiliser utilisant la dernière version de Discord.js en slash commands

## **Fonctionnalités**
> - Système de tickets en envoyant un message privé au bot
> - Tous les tickets sont stockés dans une catégorie afin de simplifier la centralisation des tickets
> - Un rôle support peut être configuré pour donner l'accès de tous les tickets aux membres possédant ce rôle

## **Configuration :**
> 1. Création d'un bot discord sur [le portail de développement de Discord](https://discord.com/developers/applications)
> 2. Créez un dossier puis clonez le dépôt github avec la commande
>   ```shell
>   git clone https://github.com/ton-utilisateur/discord-modmail-bot.git
>   ```
> 3. Installez les dépendance avec npm (assurez vous d'avoir installé [Node.js](https://nodejs.org/fr))
> 4. Configurez le fichier `config.json`
>   ```json
>   {
>    "token": "(token du bot, disponible sur le portail de développement Discord)",
>    "clientId": "(identifiant du bot)",
>    "guildId": "(identifiant du serveur)",
>    "color": "#FFFFFF"
>   }
>   ```
> 5. Lancez le bot avec la commande
>   ```shell
>   node index.js
>   ```

## **Images**

#### Bot
![Bot](https://cdn.discordapp.com/attachments/937757443893637231/1276895413932261507/image.png?ex=66cb3106&is=66c9df86&hm=6f429f970bd968deb96066e0c0629ab61eef5757872a71b15571b362321ab9db&)

#### Configuration
![Configuration](https://cdn.discordapp.com/attachments/937757443893637231/1276895754945953883/image.png?ex=66cb3157&is=66c9dfd7&hm=68b828f1614bd387f38b42c9628db26fbe0c0852de296fb990135bb4a09368d3&)

#### Ticket en privé (côté membre)
![Ticket en privé (côté membre)](https://cdn.discordapp.com/attachments/937757443893637231/1276896351396958338/image.png?ex=66cb31e5&is=66c9e065&hm=665734dc1e66a863818e1446905a307aa7cb7ccb36809cadfffeb310187a4fd5&)

#### Ticket en privé (côté staff)
![Ticket en privé (côté staff)](https://cdn.discordapp.com/attachments/937757443893637231/1276896383810539712/image.png?ex=66cb31ed&is=66c9e06d&hm=094bd0b8da6b67632ba1420ea49767a384b3c84ad753366b07363f85a4dae57a&)

#### Fermeture ticket (côté membre)
![Fermeture ticket (côté membre)](https://cdn.discordapp.com/attachments/937757443893637231/1276896616808190023/image.png?ex=66cb3225&is=66c9e0a5&hm=bba98f7a18eda55d0d84e2ff298da34f2fbe8ef36cb5fce579f84c27ebd3c3aa&)

## Contribution
> Pour me soutenir vous pouvez ajouter une étoile au dépôt et/ou me faire un don sur [BuyMeACoffee](https://buymeacoffee.com/mmonfray)
