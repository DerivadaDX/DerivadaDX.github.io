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

new p5((p) => {
	p.setup = () => {
		p.createCanvas(p.windowWidth * 3 / 5, p.windowHeight * 3 / 5);
		p.background('red');
	};

	p.draw = () => {
		
	};
}, 'carousel_sketch_0');

new p5((p) => {
	p.setup = () => {
		p.createCanvas(p.windowWidth * 3 / 5, p.windowHeight * 3 / 5);
		p.background('green');
	};

	p.draw = () => {
		
	};
}, 'carousel_sketch_1');

new p5((p) => {
	p.setup = () => {
		p.createCanvas(p.windowWidth * 3 / 5, p.windowHeight * 3 / 5);
		p.background('blue');
	};

	p.draw = () => {
		
	};
}, 'carousel_sketch_2');