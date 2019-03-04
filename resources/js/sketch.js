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
	p.setup = () => {
		sketchWidth = p.select('#carousel_sketch_0').width;
		sketchHeight = p.windowHeight * 3 / 5;

		p.createCanvas(sketchWidth, sketchHeight);
		p.background('red');
	};

	p.draw = () => {
		p.ellipse(p.canvas.width / 2, p.canvas.height / 2, 200, 200);
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