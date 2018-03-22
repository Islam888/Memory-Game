//excute code when the document content load
document.addEventListener('DOMContentLoaded', function() {
    //****ALL VARIABLES****
    //variable of cards list
    const deck = document.querySelector('.deck');
    //variable for restart button
    const restartButton = document.querySelector('.restart');
    //variable for selecting stars list
    const stars = document.querySelector('.stars');
    //variable for counting moves number
    let movesNumber = 0;
    //variable to select the moves counter
    const movesCounter = document.querySelector('.moves');
    //variables for the cards' icons
    const diamond = '<i class="fa fa-diamond"></i>';
    const plane = '<i class="fa fa-paper-plane-o"></i>';
    const anchor = '<i class="fa fa-anchor"></i>';
    const bolt = '<i class="fa fa-bolt"></i>';
    const cube = '<i class="fa fa-cube"></i>';
    const leaf = '<i class="fa fa-leaf"></i>';
    const bicycle = '<i class="fa fa-bicycle"></i>';
    const bomb = '<i class="fa fa-bomb"></i>';
    //array of cards' icons
    const iconsArray = [diamond, diamond, plane, plane, anchor, anchor, bolt, bolt, cube, cube, leaf, leaf, bicycle, bicycle, bomb, bomb];
    //variable to represent the stars rating at game end
    const starsMessage = document.querySelector('.stars-message');
    //shuffled array variable
    const shuffledIcons = shuffle(iconsArray);
    //variables for selecting every single star
    const firstStar = stars.getElementsByTagName('li')[2].firstElementChild;
    const secondStar = stars.getElementsByTagName('li')[1].firstElementChild;
    const thirdStar = stars.getElementsByTagName('li')[0].firstElementChild;
    //variables for selecting every single star at game end message
    const firstStarMessage = starsMessage.getElementsByTagName('li')[2].firstElementChild;
    const secondStarMessage = starsMessage.getElementsByTagName('li')[1].firstElementChild;
    const thirdStarMessage = starsMessage.getElementsByTagName('li')[0].firstElementChild;
    //variable of all the successfully matched cards
    const matchedCards = document.getElementsByClassName('match');
    //variable to select the timer
    const watch = document.getElementById('watch');
    //variable to select the whole container
    const container = document.querySelector('.container');
    //variable to select the congratulation final message element
    const congrats = document.querySelector('.congrats');
    //variable to select the button in the game end message
    const button = document.querySelector('button');
    //variable to select the paragraph element representing the moves number
    const movesMessage = document.querySelector('.moves-message');
    //variable to select the paragraph element representing time taken to complete the game
    const timeMessage = document.querySelector('.time-message');
    //vaiables of seconds and minutes number to make the timer
    let sec = 1;
    let min = 0;
    //variable of the setInterval method to create the timer
    var stopwatch;

    //invoke the function to append shuffled icon elements to cards
    insertIcons();

    //***click event listeners***
    //cards click event listener
    deck.addEventListener('click', clickEventListener);
    //restart click event listener
    restartButton.addEventListener('click', restart);
    //play again button restart event listener
    button.addEventListener('click', playAgain);

    //****ALL FUNCTIONS****
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

    //function to append shuffled icons elements to cards
    function insertIcons() {
        for (const index in shuffledIcons) {
            const singleCard = document.querySelector('#card' + index);
            singleCard.innerHTML = shuffledIcons[index];
            singleCard.classList.remove('open', 'show', 'match', 'rotate', 'reverse', 'animated', 'wobble', 'rubberBand');
        }

    }

    //function of the click event listener of the cards
    function clickEventListener(evt) {
        //variable to select the clicked element
        const clickedElement = evt.target;
        //variable to select all open cards
        let openCards = deck.querySelectorAll('.open');
        //check if the clicked element is one of the cards
        if (clickedElement.nodeName == 'LI') {
            //start timer  
            timer();
            //check if it is the first card open
            if (openCards.length == 0) {
                //remove any classes from previous unsuccessful matching
                clickedElement.classList.remove('reverse', 'animated', 'wobble');
                //to prevent comparing previously matched cards with new one
                if (!clickedElement.classList.contains('match')) {
                    //open, rotate, and show card icon
                    clickedElement.classList.add('open', 'show', 'rotate');
                }
                //get the newly opened cards
                openCards = deck.querySelectorAll('.open');
                //and if there is another card open waiting for matching
            } else if (openCards.length == 1) {
                //remove any classes from previous unsuccessful matching               
                clickedElement.classList.remove('reverse', 'animated', 'wobble');
                //to prevent comparing previously matched cards with new one
                if (!clickedElement.classList.contains('match')) {
                    //open, rotate, and show card icon
                    clickedElement.classList.add('open', 'show', 'rotate');
                }
                //get the newly opened cards
                openCards = deck.querySelectorAll('.open');
                //check if the two open cards matched
                if ((openCards.length == 2) && (openCards[0].innerHTML == openCards[1].innerHTML)) {
                    openCards[1].classList.add('animated', 'rubberBand');
                    openCards[1].classList.replace('open', 'match');
                    openCards[0].classList.add('animated', 'rubberBand');
                    openCards[0].classList.replace('open', 'match');
                    //check if all cards are successfully matched to end the game
                    gameEnd();
                    //count moves 
                    setTimeout(function() {

                        movesNumber++;
                        movesCounter.textContent = movesNumber;
                        //to calculate the star level
                        starsLevel()
                    }, 100);
                    //check if the two open cards NOT matched
                } else if ((openCards.length == 2) && (openCards[0].innerHTML !== openCards[1].innerHTML)) {
                    //time out to be able to show differet effects in order
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
                        if ((!clickedElement.classList.contains('open')) && (!clickedElement.classList.contains('match'))) {
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

    //function to restart the game when clicking  restart 
    function restart() {
        //shuffle icons
        shuffle(iconsArray);
        //append them to cards
        insertIcons();
        //reset moves counter and changes text content to the new value
        movesNumber = 0;
        movesCounter.textContent = movesNumber;
        //reset stars level
        firstStar.classList.add('gold-star');
        firstStarMessage.classList.add('gold-star');
        secondStar.classList.add('gold-star');
        secondStarMessage.classList.add('gold-star');
        thirdStar.classList.add('gold-star');
        thirdStarMessage.classList.add('gold-star');
        //stop timer, reset it, and changes text content to the new value
        clearInterval(stopwatch);
        watch.textContent = "00:00";
        sec = 1;
        min = 0;
    }

    //function to calculate the star level according to moves number
    function starsLevel() {
        if (movesNumber > 26) {
            firstStar.classList.remove('gold-star');
            firstStarMessage.classList.remove('gold-star');
            secondStar.classList.remove('gold-star');
            secondStarMessage.classList.remove('gold-star');
            thirdStar.classList.remove('gold-star');
            thirdStarMessage.classList.remove('gold-star');
        } else if (movesNumber > 20) {
            firstStar.classList.remove('gold-star');
            firstStarMessage.classList.remove('gold-star');
            secondStar.classList.remove('gold-star');
            secondStarMessage.classList.remove('gold-star');
        } else if (movesNumber > 14) {
            firstStar.classList.remove('gold-star');
            firstStarMessage.classList.remove('gold-star');
        }
    }
    //function to start a new game after finishing one game
    function playAgain() {
        //remove blurring effect of the container
        container.classList.remove('blur');
        //hide the congratulation message section
        congrats.classList.add('hide');
        //restart the game after reseting values
        restart();
    }



    //function to start timer
    function timer() {
        //to prevent restarting the times with every card clicked
        //if there is a times working (stopwatch == true) then prevent the new one
        if (stopwatch) {
            clearInterval(stopwatch);
        }
        stopwatch = setInterval(function() {
            //if minutes bigger than 9 (two digit number)
            if (min > 9) {
                //if seconds more than 59 add a new minute and make seconds 0
                if (sec > 59) {
                    sec = 0;
                    min++;
                    watch.textContent = min + ":0" + sec;
                } else if (sec > 9) {
                    //if minutes bigger than 9 (two digit number)
                    watch.textContent = min + ":" + sec;
                } else {
                    watch.textContent = min + ":0" + sec;
                }
            } else {
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
            //set time interval of 1000 ms (1 second)
        }, 1000);
    }

    //function to show the congratulation message section at the game end and reset values
    function gameEnd() {
        if (matchedCards.length == 16) {
            const time = watch.textContent;
            clearInterval(stopwatch);
            watch.textContent = "00:00";
            sec = 1;
            min = 0;
            container.classList.add('blur');
            congrats.classList.remove('hide');
            movesMessage.textContent = "Completed in: " + movesNumber + " moves";
            timeMessage.textContent = "Time: " + time;
        }
    }



});