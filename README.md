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
![Bot](https://cdn.discordapp.com/attachments/937757443893637231/1276895413932261507/image.png?ex=66d70e86&is=66d5bd06&hm=8c8cfbafac4aadda6f76d0773f867ba19c564dca09710d98c0c9fc0612fd7154&)

#### Configuration
![Configuration](https://cdn.discordapp.com/attachments/937757443893637231/1276895754945953883/image.png?ex=66d70ed7&is=66d5bd57&hm=5a498e23e4d80a20999fb994f4355d4f46b2ee7fc762c3532f6e7d9f42064d3a&)

#### Ticket en privé (côté membre)
![Ticket en privé (côté membre)](https://cdn.discordapp.com/attachments/937757443893637231/1276896351396958338/image.png?ex=66d70f65&is=66d5bde5&hm=3c4ff6f24fa3b96922af89ea7bc616a614a213cba897242dba4779e267cd345b&)

#### Ticket en privé (côté staff)
![Ticket en privé (côté staff)](https://cdn.discordapp.com/attachments/937757443893637231/1276896383810539712/image.png?ex=66d70f6d&is=66d5bded&hm=96ae2c44efc96b8ce18eb46765a339f7608a3bd5feb89d13f7c918a2bcbff777&)

#### Fermeture ticket (côté membre)
![Fermeture ticket (côté membre)](https://cdn.discordapp.com/attachments/937757443893637231/1276896616808190023/image.png?ex=66d70fa5&is=66d5be25&hm=2ea667a4f5cf41695d2d9297a3dac66dce4bfa989227a9161b2e8057943415c0&)

## Contribution
> Pour me soutenir vous pouvez ajouter une étoile au dépôt et/ou me faire un don sur [BuyMeACoffee](https://buymeacoffee.com/mmonfray)
