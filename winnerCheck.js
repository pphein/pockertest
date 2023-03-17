// Enable drag-and-drop sorting using jQuery UI
$('#hand').sortable({
    // When a card is dropped, update the player's hand array and log the new order
    stop: (event, ui) => {
        const cardIndex = ui.item.data('index');
        const newHand = $('#hand').find('.card').map((i, card) => players[playerId].hand[$(card).data('index')]).toArray();
        players[playerId].hand = newHand;
        console.log(`Player ${players[playerId].name}'s hand sorted: ${JSON.stringify(players[playerId].hand)}`);
    }
});

// When the sort button is clicked, sort the player's hand array
$('#sort-btn').click(() => {
    sortPlayerHand(playerId);
});