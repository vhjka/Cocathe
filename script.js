let game = new Chess();
let board = null;

function initGame() {
    let config = {
        draggable: true,
        position: 'start',
        onDrop: handleMove,
        pieceTheme: 'https://cdnjs.cloudflare.com/ajax/libs/chessboard-js/1.0.0/img/chesspieces/wikipedia/{piece}.png'
    };
    board = Chessboard('board', config);
}

function handleMove(source, target) {
    let move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });
    
    if (move === null) return 'snapback';
    
    updateStatus();
}

function updateStatus() {
    document.getElementById('info').innerHTML = `
        <h3>اللاعب: ${game.turn() === 'w' ? 'أبيض' : 'أسود'}</h3>
        ${game.in_check() ? '<h4>كش ملك!</h4>' : ''}
    `;
}

function undo() {
    game.undo();
    board.position(game.fen());
    updateStatus();
}

function reset() {
    game.reset();
    board.start();
    updateStatus();
}

// بدء اللعبة
initGame();
updateStatus();
