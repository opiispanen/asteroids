let engine = new Game(640, 480),
    ui = new UI(),
    enemies = 5,
    total = 0,
    lives = 3,
    game = Asteroids(engine, ui, enemies).then(callback);

function callback(result) {
    if (result.won)
        enemies += 10;
    else {
        lives--;
        ui.removeLife();
    }

    total = result.points;

    if (lives > 0)
        game = Asteroids(engine, ui, enemies, total).then(callback);
    else
        ui.gameOverScreen().then(() => { 
            enemies = 5;
            total = 0;
            lives = 3;
            game = Asteroids(engine, ui, enemies, total).then(callback); 
        });
}