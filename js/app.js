/*
 * Create a list that holds all of your cards
 */
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
document.addEventListener('DOMContentLoaded', function() {
    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


    /*
     * set up the event listener for a card. If a card is clicked:
     *  - display the card's symbol (put this functionality in another function that you call from this one)
     *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
     *  - if the list already has another card, check to see if the two cards match
     *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
     *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
     *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
     *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
     */

    const diamond = '<i class="fa fa-diamond"></i>';
    const plane = '<i class="fa fa-paper-plane-o"></i>';
    const anchor = '<i class="fa fa-anchor"></i>';
    const bolt = '<i class="fa fa-bolt"></i>';
    const cube = '<i class="fa fa-cube"></i>';
    const leaf = '<i class="fa fa-leaf"></i>';
    const bicycle = '<i class="fa fa-bicycle"></i>';
    const bomb = '<i class="fa fa-bomb"></i>';

    const iconsArray = [diamond, diamond, plane, plane, anchor, anchor, bolt, bolt, cube, cube, leaf, leaf, bicycle, bicycle, bomb, bomb];
    const shuffledIcons = shuffle(iconsArray);

    function insertIcons() {
        for (const index in shuffledIcons) {
            const singleCard = document.querySelector('#card' + index);
            singleCard.innerHTML = shuffledIcons[index];
        }

    }
    insertIcons();
    const cards = document.getElementsByClassName('card');
    const open = document.getElementsByClassName('open');

    for (const card of cards) {
        function clickEventListener() {
            card.classList.remove('reverse');
            card.classList.add('open', 'show', 'rotate');
            if (open.length == 2) {
                card.removeEventListener('click', clickEventListener);
                console.log(open[0], open[1]);
                if (open[0].innerHTML == open[1].innerHTML) {
                    open[0].classList.replace('open', 'match');
                    open[0].classList.replace('open', 'match');
                } else {
                    window.setTimeout(function() {
                        open[0].classList.add('reverse');
                    }, 1000);
                    window.setTimeout(function() {
                        open[1].classList.add('reverse');
                    }, 1000);
                    window.setTimeout(function() {
                        open[0].classList.remove('open', 'show', 'rotate');
                    }, 1000);
                    window.setTimeout(function() {
                        open[0].classList.remove('open', 'show', 'rotate');
                    }, 1000);
                }
            }

        }

        card.addEventListener('click', clickEventListener);

    }


});