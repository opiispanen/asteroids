class BaseObject {

    constructor() {
        this.heading = 0;
        this.rotation = 0;
        this.velocity = p5.Vector.random2D();
        this.position = createVector(random(width), random(height));
        this.r = random(15, 50);
        this.remove = false;
        this.allowOffscreen = true;
        this.color = [255,255,255];
    }

    edges() {
        let position = this.position,
            r = this.r;

        if (position.x > width + r)
            position.x = -r;
        else if (position.x < -r)
            position.x = width + r;

        if (position.y > height + r)
            position.y = -r;
        else if (position.y < -r)
            position.y = height + r;
    }

    offscreen() {
        let position = this.position;

        return (position.x > width || position.x < 0) || (position.y > height || position.y < 0);
    }

    hits(target) {
        let position = this.position,
            distance = dist(position.x, position.y, target.position.x, target.position.y);

        return distance < target.r;
    }
}