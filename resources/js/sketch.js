/* BACKGROUND SKETCH */
new p5((p) => {
	p.setup = () => {
		let canvas = p.createCanvas(p.windowWidth, p.windowHeight);

		canvas.style('z-index', -1);
		canvas.position(0, 0);
		p.background(0);
	};

	p.draw = () => {

	};
});

/* SLIDES SKETCHES */
let sketchWidth, sketchHeight;

new p5((p) => {
	const borderRadius = 5;

	p.setup = () => {
		sketchWidth = p.select('#carousel_sketch_0').width;
		sketchHeight = p.windowHeight * 3 / 5;

		p.createCanvas(sketchWidth, sketchHeight);
		p.background(55, 105, 75);
		p.rectMode(p.CENTER);
		p.smooth();
	};

	p.draw = () => {
		p.translate(p.width / 2, p.height / 2);

		if (!p.mouseIsPressed) {
			let size = p.constrain(p.mouseY / 3, 10, p.mouseY / 3),
				r = p.random(256),
				g = p.random(256),
				b = p.random(256),
				alpha = p.random(256);

			// center square
			p.push();
			p.noStroke();
			p.fill(r, g, b, alpha);
			p.rotate(p.radians(p.frameCount));
			p.rect(0, 0, size, size, borderRadius);
			p.pop();

			// Other squares
			if (p.frameCount % 5 === 0) {
				p.fill(255 - r, 255 - g, 255 - b, alpha);
			}
			p.rect(-sketchWidth / 2 + p.mouseX, -sketchHeight / 2 + p.mouseY, size, size, borderRadius);
			p.rect(sketchWidth / 2 - p.mouseX, sketchHeight / 2 - p.mouseY, size, size, borderRadius);
		}
	};
}, 'carousel_sketch_0');

new p5((p) => {
	p.setup = () => {
		p.createCanvas(sketchWidth, sketchHeight);
		p.background('green');
		p.rectMode(p.CENTER);
	};

	p.draw = () => {
		p.rect(p.canvas.width / 2, p.canvas.height / 2, 200, 200);
	};
}, 'carousel_sketch_1');

new p5((p) => {
	p.setup = () => {
		p.createCanvas(sketchWidth, sketchHeight);
		p.background('blue');
	};

	p.draw = () => {
		p.fill('yellow');
		p.arc(p.canvas.width / 2, p.canvas.height / 2, 200, 200, p.QUARTER_PI, -p.QUARTER_PI, p.PIE);
	};
}, 'carousel_sketch_2');