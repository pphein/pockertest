const players = {}; // Object to store player data

// When a new player joins the game
socket.on('playerJoined', (playerName) => {
    const playerId = generatePlayerId(); // Generate a unique player ID
    const newPlayer = {
        id: playerId,
        name: playerName,
        chips: 1000,
        isActive: false
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

// When the game state is updated
socket.on('gameData', () => {
    // Update the player states based on the active player ID
    for (const playerId in players) {
        players[playerId].isActive = (playerId === activePlayerId);
    }
    console.log(`Current players: ${JSON.stringify(players)}`);
});