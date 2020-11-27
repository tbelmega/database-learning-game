/* show and hide screens before and after the game. see index.html for the content */

const GAME_MENU = document.getElementById("game-menu");
const GAME_RUNNING_SCREEN = document.getElementById("game-running");
const NAV_LINKS = $(".nav-link");

function initGameMenu(runGameFn) {
    const START_GAME_BUTTON = document.getElementById("btn-start-game");

    START_GAME_BUTTON.onclick = () => {
        GAME_MENU.classList.toggle('d-none');
        GAME_RUNNING_SCREEN.classList.toggle('d-none');
        runGameFn();

        NAV_LINKS.addClass('disabled');
    };
}

function backToMenu(score) {
    const START_GAME_SECTION = document.getElementById("start-game-section");
    const SCORE_SECTION = document.getElementById("score-section");

    GAME_MENU.classList.toggle('d-none');
    GAME_RUNNING_SCREEN.classList.toggle('d-none');

    function toggleSections() {
        START_GAME_SECTION.classList.toggle('d-none');
        START_GAME_SECTION.classList.toggle('d-flex');
        SCORE_SECTION.classList.toggle('d-none');
        SCORE_SECTION.classList.toggle('d-flex');
    }

    toggleSections();
    NAV_LINKS.removeClass('disabled');

    document.getElementById("btn-restart-game").onclick = () => toggleSections();
    document.getElementById("btn-submit-highscore").onclick = () => {
        let playerName = document.getElementById("input-player-name").value;
        let highscoreRequestData = {
            playerName,
            score
        }
        fetch('/setgame/api/highscore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(highscoreRequestData)
        }).then(response => {
            if (response.ok) {
                let href = window.location.href;
                let newHref = href.replace('game.html', 'highscore.html');
                window.location.href = newHref;
            }
        })
    };
    document.getElementById("final-score").innerText = score;
}
