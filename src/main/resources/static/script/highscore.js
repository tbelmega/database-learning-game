let highscoreList = document.getElementById('highscore-list');

// Fetch the highscore data from backend and fill table with rows
fetch('/setgame/api/highscore').then(async response => {
    let data = await response.json();

    data.forEach((scoreEntry, i) => {
        let scoreNode = document.createElement('tr');
        scoreNode.innerHTML = `
                <th scope="row">${i + 1}</th>
                <td>${scoreEntry.player}</td>
                <td>${scoreEntry.score}</td>`;
        highscoreList.appendChild(scoreNode);
    });
});
