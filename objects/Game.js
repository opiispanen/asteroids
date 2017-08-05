class Game {

    constructor(width = 640, height = 480) {
        this.objects = [];
        this.width = width;
        this.height = height;
        this.element = null;

        window.draw = this.render.bind(this);
        window.keyReleased = this.keyReleased.bind(this);
        window.keyPressed = this.keyPressed.bind(this);
    }

    init(callback) {
        if (this.element)
            callback(this.element);
        else
            window.setup = () => {
                this.element = createCanvas(this.width, this.height);
                callback(this.element);
            };
    }

    addRenderHook(hookFunction) {
        this.renderHook = hookFunction;
    }

    render() {
        let updatedObjects = [];

        background(33, 33, 33);
        
        this.objects.forEach((obj, i) => {
            if (typeof obj.update === 'function') {
                let returnedObjects = obj.update(this.objects);

                if (returnedObjects instanceof  Array)
                    updatedObjects = updatedObjects.concat(returnedObjects);
            }

            if (typeof obj.render === 'function') {
                push();
                obj.render();
                pop();
            } else
                console.warn('Object with no render function detected!');
        });

        this.objects = this.objects.concat(updatedObjects);

        if (typeof this.renderHook === 'function')
            this.renderHook(this);
    }

    keyReleased() {
        this.objects.forEach((obj, i) => {
            if (obj.keyReleased)
                obj.keyReleased();
        });
    }

    keyPressed() {
        this.objects.forEach((obj, i) => {
            if (obj.keyPressed)
                obj.keyPressed();
        });
    }
}