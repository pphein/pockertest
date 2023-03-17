function sortPlayerHand(playerId) {
    players[playerId].hand.sort((card1, card2) => {
        // Compare the card values
        if (card1.value < card2.value) {
            return -1;
        } else if (card1.value > card2.value) {
            return 1;
        } else {
            // If the values are equal, compare the suits
            if (card1.suit < card2.suit) {
                return -1;
            } else if (card1.suit > card2.suit) {
                return 1;
            } else {
                return 0;
            }
        }
    });
    console.log(`Player ${players[playerId].name}'s hand sorted: ${JSON.stringify(players[playerId].hand)}`);
}

//
{
    /* <ul id="hand">
      <!-- Display the player's cards as list items -->
      <% for (let i = 0; i < players[playerId].hand.length; i++) { %>
        <li class="card" data-index="<%= i %>">
          <%= players[playerId].hand[i].value %> of <%= players[playerId].hand[i].suit %>
        </li>
      <% } %>
    </ul>

    <button id="sort-btn">Sort</button> */
}
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