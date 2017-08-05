function Asteroids(game, ui, enemies, total = 0) {
    game.objects = [];

    return new Promise((resolve, reject) => {
        game.init((canvas) => {
            let ship = new Ship();

            ship.points = total;
            ui.init(canvas.elt);

            game.objects.push(ship);

            for (let i = 0;i < enemies;i++) {
                game.objects.push(new Asteroid());
            }
            
            game.addRenderHook((game) => {
                game.objects.forEach((object, i) => {
                    if (object.remove || (object.offscreen() && !object.allowOffscreen))
                        game.objects.splice(i, 1);
                });

                if (!game.objects.filter(obj => obj instanceof Asteroid).length)
                    setTimeout(resolve, 2000, { won: true, points: ship.points });
                
                if (game.objects[0].health <= 0)
                    setTimeout(resolve, 2000, { won: false, points: ship.points });

                ui.update(ship.points);
            });

            window.objects = game.objects;
        });
    });
}