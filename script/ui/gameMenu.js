const GAME_MENU = document.getElementById("game-menu");
const GAME_RUNNING_SCREEN = document.getElementById("game-running");
const NAV_LINKS = $(".nav-link");

function initGameMenu(runGameFn) {
    const START_GAME_BUTTON = document.getElementById("start-game");

    START_GAME_BUTTON.onclick = () => {
        GAME_MENU.classList.toggle('d-none');
        GAME_RUNNING_SCREEN.classList.toggle('d-none');
        runGameFn();

        NAV_LINKS.addClass('disabled');
    };
}

function backToMenu() {
    GAME_MENU.classList.toggle('d-none');
    GAME_RUNNING_SCREEN.classList.toggle('d-none');
    NAV_LINKS.removeClass('disabled');
}
