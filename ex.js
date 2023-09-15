var app = angular.module('ColorGameApp', []);

app.controller('GameController', ['$scope', '$interval', function ($scope, $interval) {
    var game = this;

    // Initialize the timer variables
    var countdown;

    // Initialize the game
    game.init = function () {
        game.colors = [];
        game.pickedColor = '';
        game.message = '';
        game.showModal = false;
        game.modalMessage = '';
        game.remainingTime = 10;
        //game.selectedDifficulty = 'Medium'; // Set the default difficulty to Medium
        game.setDifficulty(game.selectedDifficulty); // Set the initial difficulty and start the game
    };

    // Function to generate a random RGB color
    game.generateRandomColor = function () {
        return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    };

    // Function to generate colors for the circles
    game.generateColors = function () {
        game.colors = [];
        for (var i = 0; i < game.numCircles; i++) {
            // Add random colors to the circles
            game.colors.push(game.generateRandomColor());
        }

        // Pick a random index to set the correct color
        var correctIndex = Math.floor(Math.random() * game.numCircles);
        game.pickedColor = game.colors[correctIndex];

        // Stop the timer (if it's running) and start a new one when colors are generated
        game.stopTimer();
        startTimer();
    };

    // Function to check if the guessed color is correct
    game.checkGuess = function (color, index) {
        if (color === game.pickedColor) {
            game.message = 'Correct';
            game.showModal = true;
            game.modalMessage = 'Correct! Play Again';
            game.stopTimer();
        } else {
            game.message = 'Try again';

            // Set the color of the wrong circle to transparent
            game.colors[index] = 'transparent';
        }
    };

    // Function to start the timer
    function startTimer() {
        game.remainingTime = 10;
        countdown = $interval(function () {
            if (game.remainingTime <= 0) {
                game.stopTimer();
                game.remainingTime = "Time's up!";
                game.showModal = true;
                game.modalMessage = "Time's up! Play Again";
            } else {
                game.remainingTime--; // Decrement the timer value
            }
        }, 1000);
    }

    // Function to stop the timer
    game.stopTimer = function () {
        if (angular.isDefined(countdown)) {
            $interval.cancel(countdown);
        }
    };

    // Function to set the difficulty level
    game.setDifficulty = function (difficulty) {
        game.selectedDifficulty = difficulty;
        switch (difficulty) {
            case 'Easy':
                game.numCircles = 3;
                break;
            case 'Medium':
                game.numCircles = 4;
                break;
            case 'Hard':
                game.numCircles = 6;
                break;
            default:
                game.numCircles = 4; // Default to Medium
                break;
        }
        game.generateColors();
    };

    // Function to reset the game
    game.resetGame = function () {
        game.showModal = false;
        game.message = '';
        game.init();
    };

    // Initialize the game when the page loads
    game.init();
}]);
