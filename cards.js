const deck = []; // Array to store the cards
const players = {}; // Object to store player data

// When a new player joins the game
socket.on('playerJoined', (playerName) => {
    const playerId = generatePlayerId(); // Generate a unique player ID
    const newPlayer = {
        id: playerId,
        name: playerName,
        chips: 1000,
        isActive: false,
        hand: [] // Array to store the player's cards
    };
    players[playerId] = newPlayer; // Add the new player to the players object
    console.log(`Player ${playerName} joined the game`);
    console.log(`Current players: ${JSON.stringify(players)}`);
    socket.emit('playerData', newPlayer); // Send the new player data to the client
});

// When a player leaves the game
socket.on('playerLeft', (playerId) => {
    delete players[playerId]; // Remove the player from the players object
    console.log(`Player ${playerId} left the game`);
    console.log(`Current players: ${JSON.stringify(players)}`);
});

// When the game starts
socket.on('startGame', () => {
    // Create a deck of cards
    for (let i = 1; i <= 13; i++) {
        for (let j = 1; j <= 4; j++) {
            deck.push({ rank: i, suit: j });
        }
    }
    // Shuffle the deck
    shuffle(deck);
    console.log(`Deck: ${JSON.stringify(deck)}`);

    // Deal the cards to each player
    for (const playerId in players) {
        for (let i = 0; i < 13; i++) {
            players[playerId].hand.push(deck.pop());
        }
        console.log(`Player ${players[playerId].name}'s hand: ${JSON.stringify(players[playerId].hand)}`);
    }
});

// When a player plays a card
socket.on('playCard', (playerId, cardIndex) => {
    const playedCard = players[playerId].hand.splice(cardIndex, 1)[0]; // Remove the card from the player's hand
    console.log(`Player ${players[playerId].name} played ${JSON.stringify(playedCard)}`);
    console.log(`Player ${players[playerId].name}'s hand: ${JSON.stringify(players[playerId].hand)}`);
});

// Shuffle an array using the Fisher-Yates algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}