//excute code when the document content load
document.addEventListener('DOMContentLoaded', function() {
    //ALL VARIABLES
    //variable of cards list
    const deck = document.querySelector('.deck');
    const restartButton = document.querySelector('.restart');
    //variables for the cards' icons
    const diamond = '<i class="fa fa-diamond"></i>';
    const plane = '<i class="fa fa-paper-plane-o"></i>';
    const anchor = '<i class="fa fa-anchor"></i>';
    const bolt = '<i class="fa fa-bolt"></i>';
    const cube = '<i class="fa fa-cube"></i>';
    const leaf = '<i class="fa fa-leaf"></i>';
    const bicycle = '<i class="fa fa-bicycle"></i>';
    const bomb = '<i class="fa fa-bomb"></i>';
    //array of icons
    const iconsArray = [diamond, diamond, plane, plane, anchor, anchor, bolt, bolt, cube, cube, leaf, leaf, bicycle, bicycle, bomb, bomb];
    //shuffle array
    const shuffledIcons = shuffle(iconsArray);
    //ALL FUNCTIONS
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

    //function to append shuffled icon elements to cards
    function insertIcons() {
        for (const index in shuffledIcons) {
            const singleCard = document.querySelector('#card' + index);
            singleCard.innerHTML = shuffledIcons[index];
            singleCard.classList.remove('open', 'show', 'match', 'rotate', 'reverse', 'animated', 'wobble', 'rubberBand');
        }

    }

    function clickEventListener(evt) {
        const clickedElement = evt.target;
        let openCards = deck.querySelectorAll('.open');

        if (clickedElement.nodeName == 'LI') {
            if (openCards.length == 0) {
                clickedElement.classList.remove('reverse', 'animated', 'wobble');
                clickedElement.classList.add('open', 'show', 'rotate');
                openCards = deck.querySelectorAll('.open');
                console.log(openCards.length);

            } else if (openCards.length == 1) {
                clickedElement.classList.remove('reverse', 'animated', 'wobble');
                clickedElement.classList.add('open', 'show', 'rotate');
                openCards = deck.querySelectorAll('.open');
                console.log(openCards.length);

                if (openCards[0].innerHTML == openCards[1].innerHTML) {
                    console.log('equal');
                    openCards[1].classList.add('animated', 'rubberBand');
                    openCards[1].classList.replace('open', 'match');
                    openCards[0].classList.add('animated', 'rubberBand');
                    openCards[0].classList.replace('open', 'match');

                } else {
                    window.setTimeout(function() {
                        openCards[1].classList.add('red-background', 'animated', 'wobble');
                    }, 400);
                    window.setTimeout(function() {
                        openCards[0].classList.add('red-background', 'animated', 'wobble');
                    }, 400);
                    window.setTimeout(function() {
                        openCards[1].classList.replace('rotate', 'reverse');
                    }, 1250);
                    window.setTimeout(function() {
                        openCards[0].classList.replace('rotate', 'reverse');
                    }, 1250);
                    window.setTimeout(function() {
                        openCards[1].classList.remove('red-background', 'show', 'open');
                    }, 1200);
                    window.setTimeout(function() {
                        openCards[0].classList.remove('red-background', 'show', 'open');
                    }, 1200);
                    console.log('un');
                }
            }
        }
    }

    function restart() {

        shuffle(iconsArray);
        insertIcons();
        console.log(shuffledIcons);
    }

    //invoke the function to append shuffled icon elements to cards
    insertIcons();
    //click event listener
    deck.addEventListener('click', clickEventListener);
    restartButton.addEventListener('click', restart);


});