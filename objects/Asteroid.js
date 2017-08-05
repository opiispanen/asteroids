class Asteroid extends BaseObject {
    constructor(position = null, r = null, color = null) {
        super();

        if (position)
            this.position = position.copy();

        if (r)
            this.r = r * 0.5;

        if (color)
            this.color = [color[0], color[1], color[2]];

        this.points = floor(random(4, 10));
        this.offset = [];

        for (let i=0;i < this.points;i++) {
            this.offset.push(random(-this.r * 0.5, this.r * 0.5));
        }
    }

    render() {
        let position = this.position,
            radius = this.r,
            offset = this.offset,
            points = this.points;

        stroke.call(null, this.color);
        noFill();
        translate(position.x, position.y);

        beginShape();
        for (let i=0;i < points; i++) {
            let angle = map(i, 0, points, 0, TWO_PI),
                r = radius + offset[i],
                x = r * cos(angle),
                y = r * sin(angle);

            vertex(x, y);
        }
        endShape(CLOSE);
    }

    update() {
        this.position.add(this.velocity);
        this.edges();
    }

    explode(color) {
        return [ new Asteroid(this.position, this.r, color), new Asteroid(this.position, this.r, color) ];
    }
}