# Rock Paper Scissors Ethers
![main-page](/doc/rps메인1.png)
This repository is front-end that enables to play rock-paper-scissors betting player's ethers. \
It was created using Reack + metamask + solidity smartcontract and you can check the contract on [link](https://github.com/aad3365/rock-paper-scissors-ethers-contract).
Since there are no secret (anyone can access global states), it needs commit-reveal scheme.\
Once both player commit his/her hand card with random salt, they eventually reveal there hand card with the salt they used.

## How to play
Game has 4 phases. Participate, Bet, Commit, Reveal. On each phases, players should take an action which is required at the specific phase before phase expires (phase expires in 5 minutes).

### Creating game
![creating-game](/doc/rps-메인2.png)
Player can create a new game via clicking get started button on main page. \
Player can select network to play, betSize which will be the betting fee for both players.

### Participate phase
![participate-game](/doc/rps-게임-participate.png)
Once game is created, it should wait until opponent participate this game. \
The expiration clock can be checked at right, top side, and it does not tick at this phase.

![participate-dialog](/doc/rps-게임참여.png)
Game creator can share the link of the game, and another player can join the game by just pasting the link to browser. \
This will show participating-dialog with betting size and opponent's address.

### Bet phase
![bet](/doc/rps-게임-bet.png)
Once opponent finishes participation, the game switches it's phase to bet. \
In this phase, both player should bet clicking Bet button. \
They finally deposit betSize ethers to the game contract.

### Commit phase
![commit](/doc/rps-게임-commit.png)
Once opponent finishes betting, the game switches it's phase to commit. \
Players can commit by drag & drop their card.

### Reveal phase
![reveal](/doc/rps-게임-reveal.png)
Once opponent finishes setting the card, the game switches it's phase to reveal. \
Players can reveal by clicking their set card. \
If both players open their cards, the game is won or lost, and the winner takes all the betting money.

### What if phase expires?
![claim](/doc/rps-게임-claim.png)
If opponent does not do anything on bet, commit, reveal phase, you can kick out the player and get win if phase is commit or reveal.

- bet phase: kick out opponent only
- commit & reveal: kick out and take all the betting money.

### Where is salt?
When I was designing this game, I knew there are two way.
1. create dialog to get salt (like a password) when commiting.
2. create salt using crypto `crypto.getRandomValue` and store it browser local storage.

First way is better security, but poor game experience. \
Second way is better, smooth game experience, but poor security \
I knew browser localstorage is not safe but wanted to create smooth game.

## End
This project was built for educational myself to learn how to create dapp. \
I've learned blockchain concept, smartcontract, developement of dapp. \
So there can be some points to fix or add to deploy on mainnet. \
If you are interested on my project, you can make issue or PR anytime. \
Thanks to reach out my small dapp project.
