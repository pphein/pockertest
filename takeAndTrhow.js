// When a player takes a card
socket.on('takeCard', (playerId) => {
    if (deck.length > 0) {
        const newCard = deck.pop(); // Take the top card from the deck
        players[playerId].hand.push(newCard); // Add the new card to the player's hand
        console.log(`Player ${players[playerId].name} took a card`);
        console.log(`Player ${players[playerId].name}'s hand: ${JSON.stringify(players[playerId].hand)}`);
    } else {
        console.log('The deck is empty');
    }
});

// When a player plays a card
socket.on('playCard', (playerId, cardIndex) => {
    const playedCard = players[playerId].hand.splice(cardIndex, 1)[0]; // Remove the card from the player's hand
    console.log(`Player ${players[playerId].name} played ${JSON.stringify(playedCard)}`);
    console.log(`Player ${players[playerId].name}'s hand: ${JSON.stringify(players[playerId].hand)}`);
});

//<button onClick="takeCard()">Take a card</button>
function takeCard() {
    socket.emit('takeCard', playerId);
}

function playCard(cardIndex) {
    socket.emit('playCard', playerId, cardIndex);
}