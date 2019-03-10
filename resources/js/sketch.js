let w, h;

const sketches = [
	{
		initialized: false,
		parent: 'carousel_sketch_0',
		fn: (p) => {
			const borderRadius = 5;

			p.setup = () => {
				const carousel = p.select('#main_carousel');
				w = carousel.width;
				h = carousel.height;

				p.createCanvas(w, h);
				p.background(55, 105, 75);
				p.rectMode(p.CENTER);
				p.smooth();

				sketches[0].initialized = true;
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
			let point = {},
				x = 0, y = 0,
				xOffset, yOffset;

			const divisions = 50;

			p.setup = () => {
				const carousel = p.select('#main_carousel');
				w = carousel.width;
				h = carousel.height;

				p.createCanvas(w, h);
				p.background('black');
				p.stroke(p.random(255), p.random(255), p.random(255));

				w -= w % divisions;
				h -= h % divisions;
				xOffset = w / divisions;
				yOffset = h / divisions;
				point = randomCoord();
				sketches[1].initialized = true;
			};

			p.draw = () => {
				p.line(point.x, point.y, x, y);
				p.strokeWeight(p.random(3));

				if (x === 0 && y === yOffset) {
					point = randomCoord();
					p.stroke(p.random(255), p.random(255), p.random(255));
				}

				getNextPoint();
			};

			function randomCoord() {
				const x = p.width;
				const y = p.height;

				return {
					x: p.constrain(p.random(x), xOffset, x - xOffset),
					y: p.constrain(p.random(y), yOffset, y - yOffset),
				}
			}

			function getNextPoint() {
				const prevX = x;
				const prevY = y;
				const limitX = w + xOffset;
				const limitY = h + yOffset;

				if (prevX < limitX && prevY === 0) { x += xOffset; }
				else if (prevX > 0 && prevY === limitY) { x -= xOffset; }

				if (prevX === limitX && prevY < limitY) { y += yOffset; }
				else if (prevX === 0 && prevY > 0) { y -= yOffset; }
			}
		}
	},
	{
		initialized: false,
		parent: 'carousel_sketch_2',
		fn: (p) => {
			p.setup = () => {
				const carousel = p.select('#main_carousel');
				w = carousel.width;
				h = carousel.height;

				p.createCanvas(w, h);
				p.background('blue');

				sketches[2].initialized = true;
			};

			p.draw = () => {
				p.fill('yellow');
				p.arc(p.canvas.width / 2, p.canvas.height / 2, 200, 200, p.QUARTER_PI, -p.QUARTER_PI, p.PIE);
			};
		}
	}
];