class Laser extends BaseObject {
    constructor(position, angle, color) {
        super();

        this.position = createVector(position.x, position.y);
        this.velocity = p5.Vector.fromAngle(angle);
        this.velocity.mult(8);
        this.allowOffscreen = false;
        this.color = color;
    }

    render() {
        let position = this.position;

        stroke.call(null, this.color);
        strokeWeight(4);
        point(position.x, position.y);
    }

    update(objects) {
        let newAsteroids = [];
        
        objects.forEach((object, i) => {
            if (object instanceof Asteroid && this.hits(object)) {
                if (object.r > 15)
                    newAsteroids = object.explode(this.color);

                this.remove = true;
                object.remove = true;

                if (typeof this.whenHit === 'function')
                    this.whenHit();
            }
        });

        this.position.add(this.velocity);

        return newAsteroids;
    }
}