let w, h;

const sketches = [
	{
		initialized: false,
		parent: 'carousel_sketch_0',
		fn: (p) => {
			const borderRadius = 5;

			p.setup = () => {
				const carousel = p.select('#main_carousel');

				p.createCanvas(carousel.width, carousel.height);
				p.background(55, 105, 75);
				p.rectMode(p.CENTER);
				p.smooth();

				sketches[0].initialized = true;
				h = carousel.height;
				w = carousel.width;
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
					p.ellipse(0, 0, size, size);
					p.pop();

					// Other squares
					if (p.frameCount % 5 === 0) {
						p.fill(255 - r, 255 - g, 255 - b, alpha);
					}
					p.rect(-w / 2 + p.mouseX, -h / 2 + p.mouseY, size, size, borderRadius);
					p.rect(w / 2 - p.mouseX, h / 2 - p.mouseY, size, size, borderRadius);
				}
			};
		},
	},
	{
		initialized: false,
		parent: 'carousel_sketch_1',
		fn: (p) => {
			p.setup = () => {
				const carousel = p.select('#main_carousel');

				p.createCanvas(carousel.width, carousel.height);
				p.background('green');
				p.rectMode(p.CENTER);

				sketches[1].initialized = true;
				h = carousel.height;
				w = carousel.width;
			};

			p.draw = () => {
				p.rect(p.canvas.width / 2, p.canvas.height / 2, 200, 200);
			};
		}
	},
	{
		initialized: false,
		parent: 'carousel_sketch_2',
		fn: (p) => {
			p.setup = () => {
				const carousel = p.select('#main_carousel');

				p.createCanvas(carousel.width, carousel.height);
				p.background('blue');

				sketches[2].initialized = true;
				h = carousel.height;
				w = carousel.width;
			};

			p.draw = () => {
				p.fill('yellow');
				p.arc(p.canvas.width / 2, p.canvas.height / 2, 200, 200, p.QUARTER_PI, -p.QUARTER_PI, p.PIE);
			};
		}
	}
];