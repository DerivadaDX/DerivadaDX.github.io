let w, h;

const sketches = [
	{
		initialized: false,
		parent: 'carousel_sketch_0',
		fn: (p) => {
			const borderRadius = 5;
			let canvas, prevW, prevH;

			p.setup = () => {
				const carousel = $('#main_carousel').parent();
				h = carousel.height();
				w = carousel.width();

				canvas = p.createCanvas(w, h);
				setConfig();
				updateWH();

				sketches[0].initialized = true;
			};

			p.draw = () => {
				if (prevW != w || prevH != h) {
					canvas.size(w, h);
					setConfig();
				}
				updateWH();
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

			function updateWH() {
				prevW = w;
				prevH = h;
			}

			function setConfig() {
				p.background(55, 105, 75);
				p.rectMode(p.CENTER);
				p.smooth();
			}
		},
	},
	{
		initialized: false,
		parent: 'carousel_sketch_1',
		fn: (p) => {
			let point = {},
				x = 0, y = 0,
				xOffset, yOffset;

			let xDir = 1, yDir = 0;

			const divisions = 50;

			p.setup = () => {
				const carousel = $('#main_carousel').parent();
				h = carousel.height();
				w = carousel.width();

				p.createCanvas(w, h);
				p.background('black');
				p.stroke(p.random(255), p.random(255), p.random(255));

				xOffset = w / divisions;
				yOffset = h / divisions;
				point = randomCoord();

				// Must be at the end
				sketches[1].initialized = true;
			};

			p.draw = () => {
				drawLine(p);
			};

			function drawLine(p) {
				p.line(point.x, point.y, x, y);
				p.strokeWeight(p.random(1, 3));

				if (p.frameCount % 200 === 0) {
					p.stroke(p.random(255), p.random(255), p.random(255), p.random(128, 256));
				}

				getNextPoint(p);
			}

			function randomCoord() {
				const x = p.width;
				const y = p.height;

				return {
					x: p.constrain(p.random(x), xOffset, x - xOffset),
					y: p.constrain(p.random(y), yOffset, y - yOffset),
				}
			}

			function getNextPoint(p) {
				const f = p.frameCount;

				if (f % 50 === 0) {
					if (xDir === 1 && yDir === 0) {
						xDir = 0; yDir = 1;
					} else if (xDir === 0 && yDir === 1) {
						xDir = -1; yDir = 0;
					} else if (xDir === -1 && yDir === 0) {
						xDir = 0; yDir = -1;
					} else if (xDir === 0 && yDir === -1) {
						xDir = 1; yDir = 0;
					}
				}

				x += xDir * xOffset;
				y += yDir * yOffset;
			}
		}
	}
];