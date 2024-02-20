// Definir las jugadas como constantes
const ROCK = 'R';
const PAPER = 'P';
const SCISSORS = 'T';

let player1Score = 0;
let player2Score = 0;
let ties = 0;
let totalGames = 0;
let gameMode = '';

// Función para seleccionar el modo de juego
function selectGameMode(mode) {
    gameMode = mode;
    if (mode === 'singleplayer') {
        document.getElementById('player2').placeholder = 'R, P, T (Máquina)';
    } else {
        document.getElementById('player2').placeholder = 'R, P, T';
    }
}

// Función para que la máquina escoja una jugada aleatoria
function machinePlay() {
    const choices = [ROCK, PAPER, SCISSORS];
    return choices[Math.floor(Math.random() * choices.length)];
}

// Función principal para jugar
function play() {
    // Limpiar resultados anteriores
    document.getElementById('result').innerHTML = '';

    let player1Choice = document.getElementById('player1').value.toUpperCase();
    let player2Choice = '';

    if (gameMode === 'singleplayer') {
        player2Choice = machinePlay();
    } else {
        player2Choice = document.getElementById('player2').value.toUpperCase();
    }

    let result = document.getElementById('result');
    let resultText = '';

    if (![ROCK, PAPER, SCISSORS].includes(player1Choice) || ![ROCK, PAPER, SCISSORS].includes(player2Choice)) {
        resultText = 'Por favor, ingresa una opción válida.';
    } else {
        let winner = '';

        switch (player1Choice) {
            case ROCK:
                switch (player2Choice) {
                    case ROCK:
                        winner = 'Empate';
                        ties++;
                        break;
                    case PAPER:
                        winner = gameMode === 'singleplayer' ? 'Máquina' : 'Jugador 2';
                        player2Score++;
                        break;
                    case SCISSORS:
                        winner = 'Jugador 1';
                        player1Score++;
                        break;
                }
                break;
            case PAPER:
                switch (player2Choice) {
                    case ROCK:
                        winner = 'Jugador 1';
                        player1Score++;
                        break;
                    case PAPER:
                        winner = 'Empate';
                        ties++;
                        break;
                    case SCISSORS:
                        winner = gameMode === 'singleplayer' ? 'Máquina' : 'Jugador 2';
                        player2Score++;
                        break;
                }
                break;
            case SCISSORS:
                switch (player2Choice) {
                    case ROCK:
                        winner = gameMode === 'singleplayer' ? 'Máquina' : 'Jugador 2';
                        player2Score++;
                        break;
                    case PAPER:
                        winner = 'Jugador 1';
                        player1Score++;
                        break;
                    case SCISSORS:
                        winner = 'Empate';
                        ties++;
                        break;
                }
                break;
        }

        totalGames++;

        resultText = `${player1Choice}-${player2Choice} ${winner === 'Empate' ? 'Empate' : 'gana el ' + winner}`;

        // Mostrar el resultado de la partida
        result.innerHTML += `<p>${resultText}</p>`;
    }

    // Mostrar las estadísticas solo al finalizar el juego
    if (!confirm('¿Quieres seguir jugando?')) {
        result.innerHTML += `<br>--- Estadísticas del juego ---<br>`;
        result.innerHTML += `Total de partidas: ${totalGames}<br>`;
        result.innerHTML += `Partidas ganadas por Jugador 1: ${player1Score}<br>`;
        result.innerHTML += `Partidas ganadas por ${gameMode === 'singleplayer' ? 'Máquina' : 'Jugador 2'}: ${player2Score}<br>`;
        result.innerHTML += `Empates: ${ties}<br>`;
        result.innerHTML += `-------------------------------`;

        // Reiniciar estadísticas
        player1Score = 0;
        player2Score = 0;
        ties = 0;
        totalGames = 0;
    }
}