function handleChips(winningPlayerId) {
    const potSize = calculatePotSize();

    // Distribute the pot to the winning player
    players[winningPlayerId].chips += potSize;

    // Calculate the amount of chips that each player needs to pay
    const chipsPerPlayer = Math.floor(potSize / Object.keys(players).length);

    // Take chips from each player and add it to the pot
    for (let playerId in players) {
        if (playerId !== winningPlayerId) {
            const chipsToTake = Math.min(chipsPerPlayer, players[playerId].chips);
            players[playerId].chips -= chipsToTake;
            pot += chipsToTake;
        }
    }
}