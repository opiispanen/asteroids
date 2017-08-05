class Ship extends BaseObject {
    constructor() {
        super();

        this.velocity = createVector(0, 0);
        this.position = createVector(width / 2, height / 2);
        this.r = 10;

        this.thrusting = false;
        this.firing = false;
        this.lastFired = 0;
        this.points = 0;
        this.health = 100;
        this.color = [100, 155, 255];
        this.destroy = {
            active: false,
            time: 0,
            lasers: 0
        };
    }

    render() {
        let r = this.r,
            position = this.position;
        
        translate(position.x, position.y);
        rotate(this.heading + PI / 2);
        noFill();
        stroke.call(null, this.color);
        triangle(-r, r, r, r, 0, -r * 1.5);
    }

    update(objects) {
        let newAsteroids = [];

        if (!this.destroy.active)
            objects.forEach((object, i) => {
                if (object instanceof Asteroid && this.hits(object)) {
                    if (object.r > 15)
                        newAsteroids = object.explode();
                    
                    object.remove = true;
                    this.takeHit(object.r);
                }
            });
        else {
            if (this.destroy.time + 800 > Date.now())
                this.setState('rotation', 0.5);
            else
                objects.splice(0, 1);
            
            if (this.destroy.time + 200 < Date.now() && this.destroy.time + 800 > Date.now())
                objects.push(this.createLaser());
        }


        if (this.thrusting)
            this.thrust();

        if (this.firing && this.lastFired < Date.now() - 200) {
            objects.push(this.createLaser());
            this.lastFired = Date.now();
        }

        this.heading += this.rotation;
        this.position.add(this.velocity);
        this.velocity.mult(0.99);

        this.edges();

        return newAsteroids;
    }

    takeHit(r) {
        let hit = floor(r);

        this.health -= hit / 1.2;
        
        if (this.health <= 55) {
            this.color[0] += hit
            this.color[1] -= hit
            this.color[2] -= hit
        }

        if (this.color[1] > 100)
            this.color[1] -= floor(hit / 2) * 1.5;

        if (this.color[2] > 100)
            this.color[2] -= hit * 1.5;

        if (this.health <= 0) {
            this.destroy.active = true;
            this.destroy.time = Date.now();
        }
    }

    thrust() {
        let force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        this.velocity.add(force);
    }

    setState(state, value) {
        this[state] = value;
    }
    
    createLaser() {
        let laser = new Laser(this.position, this.heading, this.color);

        laser.whenHit = () => {
            if (this.health > 0)
                this.points += floor(laser.r);
        };

        return laser;
    }

    keyPressed() {
        if (this.destroy.active)
            return;
        
        if (keyCode === RIGHT_ARROW)
            this.setState('rotation', 0.1);

        if (keyCode === LEFT_ARROW)
            this.setState('rotation', -0.1);

        if (keyCode === UP_ARROW)
            this.setState('thrusting', true);

        if (keyCode === 32)
            this.setState('firing', true);
    }

    keyReleased() {
        if (this.destroy.active)
            return;
        
        if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW)
            this.setState('rotation', 0);

        if (keyCode === UP_ARROW)
            this.setState('thrusting', false);

        if (keyCode === 32)
            this.setState('firing', false);
    }
}