//excute code when the document content load
document.addEventListener('DOMContentLoaded', function() {
    //ALL VARIABLES
    //variable of cards list
    const deck = document.querySelector('.deck');
    //variable for restart button
    const restartButton = document.querySelector('.restart');
    //variable for counting moves number
    let movesNumber = 0;
    //variables for the cards' icons
    const diamond = '<i class="fa fa-diamond"></i>';
    const plane = '<i class="fa fa-paper-plane-o"></i>';
    const anchor = '<i class="fa fa-anchor"></i>';
    const bolt = '<i class="fa fa-bolt"></i>';
    const cube = '<i class="fa fa-cube"></i>';
    const leaf = '<i class="fa fa-leaf"></i>';
    const bicycle = '<i class="fa fa-bicycle"></i>';
    const bomb = '<i class="fa fa-bomb"></i>';
    //variable to count numbers of moves
    const movesCounter = document.querySelector('.moves');
    //variable for selecting stars list
    const stars = document.querySelector('.stars');
    //array of icons
    const iconsArray = [diamond, diamond, plane, plane, anchor, anchor, bolt, bolt, cube, cube, leaf, leaf, bicycle, bicycle, bomb, bomb];
    //shuffle array
    const shuffledIcons = shuffle(iconsArray);
    //variables for selecting every single star
    const firstStar = stars.getElementsByTagName('li')[2].firstElementChild;
    const secondStar = stars.getElementsByTagName('li')[1].firstElementChild;
    const thirdStar = stars.getElementsByTagName('li')[0].firstElementChild;

    const watch = document.getElementById('watch');
    let sec = 1;
    let min = 0;
    var stopwatch;

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
            timer();
            if (openCards.length == 0) {
                clickedElement.classList.remove('reverse', 'animated', 'wobble');
                clickedElement.classList.add('open', 'show', 'rotate');
                openCards = deck.querySelectorAll('.open');
               

            } else if (openCards.length == 1) {
                clickedElement.classList.remove('reverse', 'animated', 'wobble');
                clickedElement.classList.add('open', 'show', 'rotate');
                openCards = deck.querySelectorAll('.open');
               

                if ((openCards.length == 2) && (openCards[0].innerHTML == openCards[1].innerHTML)) {
                    console.log('equal');
                    openCards[1].classList.add('animated', 'rubberBand');
                    openCards[1].classList.replace('open', 'match');
                    openCards[0].classList.add('animated', 'rubberBand');
                    openCards[0].classList.replace('open', 'match');
                    setTimeout(function() {
                        
                            movesNumber++;
                            movesCounter.textContent = movesNumber;
                            //to calculate the star level
                            starsLevel()

                    }, 100);
                } else if ((openCards.length == 2) && (openCards[0].innerHTML !== openCards[1].innerHTML)) {
                    setTimeout(function() {
                        openCards[1].classList.add('red-background', 'animated', 'wobble');
                    }, 400);
                    setTimeout(function() {
                        openCards[0].classList.add('red-background', 'animated', 'wobble');
                    }, 400);
                    setTimeout(function() {
                        openCards[1].classList.replace('rotate', 'reverse');
                    }, 1250);
                    setTimeout(function() {
                        openCards[0].classList.replace('rotate', 'reverse');
                    }, 1250);
                    setTimeout(function() {
                        openCards[1].classList.remove('red-background', 'show', 'open');
                    }, 1200);
                    setTimeout(function() {
                        openCards[0].classList.remove('red-background', 'show', 'open');
                    }, 1200);
                    setTimeout(function() {
                        if ((!clickedElement.classList.contains('open')) && (!clickedElement.classList.contains('match'))){
                            //increment moves number with every click on cards that are not opened
                            movesNumber++;
                            movesCounter.textContent = movesNumber;
                            //to calculate the star level
                            starsLevel()

                        }
                    }, 1250);
                }
            }
        }
         
    }

    function restart() {
        shuffle(iconsArray);
        insertIcons();
        movesNumber = 0;
        movesCounter.textContent = movesNumber;
        firstStar.classList.add('gold-star');
        secondStar.classList.add('gold-star');
        thirdStar.classList.add('gold-star');

    }
    //to calculate the star level
    function starsLevel() {
        if (movesNumber > 14){
            firstStar.classList.remove('gold-star');
        }else if (movesNumber > 20) {
            secondStar.classList.remove('gold-star');
        }else if (movesNumber > 26) {
            thirdStar.classList.remove('gold-star');
        }
    }

    //invoke the function to append shuffled icon elements to cards
    insertIcons();
    //click event listener
    deck.addEventListener('click', clickEventListener);
    restartButton.addEventListener('click', restart);


    //function to start timer
    function timer() {
        if (stopwatch) {
            clearInterval(stopwatch);
        }
        stopwatch = setInterval(function() {
            if (min > 9) {
              if (sec > 59) {
                 sec = 0;
                 min++;
                 watch.textContent =  min + ":0" + sec;
             } else if (sec > 9) {
                 watch.textContent =  min + ":" + sec;
             } else {
                 watch.textContent =  min + ":0" + sec;
             }
            }else{
               if (sec > 59) {
                 sec = 0;
                 min++;
                 watch.textContent = "0" + min + ":0" + sec;
             } else if (sec > 9) {
                 watch.textContent = "0" + min + ":" + sec;
             } else {
                 watch.textContent = "0" + min + ":0" + sec;
             }
            }
             sec++;
         }, 1000);
    }

});
