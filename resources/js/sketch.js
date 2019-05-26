let w, h;

const sketches = [
	{
		initialized: false,
		parent: 'carousel_sketch_0',
		fn: (p) => {
			const borderRadius = 5;
			let canvas, prevW, prevH;

			p.setup = () => {
				const carousel = p.select('#main_carousel');
				w = carousel.width;
				h = carousel.height;

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

			const divisions = 50;

			p.setup = () => {
				let carousel = $('#main_carousel').parent();
				w = carousel.width();
				h = carousel.height();
				w -= w % divisions;
				h -= h % divisions;

				carousel.width(w);
				carousel.height(h);

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
				drawLine();
			};

			function drawLine() {
				p.line(point.x, point.y, x, y);
				p.strokeWeight(p.random(1, 3));

				if (x === 0 && y === yOffset) {
					p.stroke(p.random(255), p.random(255), p.random(255), p.random(128, 256));
					//point = randomCoord();
				}

				getNextPoint();
			}

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
	// {
	// 	initialized: false,
	// 	parent: 'carousel_sketch_2',
	// 	fn: (p) => {
	// 		let logo, img;
	// 		const space = 3.5;

	// 		p.preload = () => {
	// 			logo = p.loadImage('/resources/images/logo.png');
	// 		};

	// 		p.setup = () => {
	// 			const carousel = p.select('#main_carousel');
	// 			w = carousel.width;
	// 			h = carousel.height;

	// 			canvas = p.createCanvas(w, h);
	// 			p.background(128);

	// 			p.imageMode(p.CENTER);
	// 			logo.loadPixels();

	// 			img = p.createImage(logo.width * space, logo.height * space);

	// 			p.noStroke();
	// 			for (let x = 0; x < img.width; x++) {
	// 				for (let y = 0; y < img.height; y++) {
	// 					if (x % space === 0 && y % space === 0) {
	// 						//img.set(x, y, logo.get(x / space, y / space));

	// 						p.fill(logo.get(x / space, y / space));
	// 						p.ellipse(w / 2 - img.width / 2 + x, h / 2 - img.height / 2 + y, 25, 2.5);
	// 						p.ellipse(w / 2 - img.width / 2 + x, h / 2 - img.height / 2 + y, 2.5, 25);
	// 					} else {
	// 						//img.set(x, y, [0, 128, 0, 64]);
	// 					}
	// 				}
	// 			}

	// 			//img.updatePixels();

	// 			sketches[2].initialized = true;
	// 		};

	// 		p.draw = () => {
	// 			p.image(logo, logo.width / 2 + 5, logo.height / 2 + 5);
	// 			// p.image(img, w / 2, h / 2);
	// 			p.noLoop();
	// 		};
	// 	}
	// },
	{
		initialized: false,
		parent: 'carousel_sketch_2',
		fn: (p) => {
			let x1, x2, dx, alpha, r, c;

			p.setup = () => {
				const carousel = p.select('#main_carousel');
				w = carousel.width;
				h = carousel.height;

				canvas = p.createCanvas(w, h);

				x1 = w * .05;
				x2 = w - w * .01;
				let hip = pitagoras(x1, 0, x2, h);
				dx = hip / p.abs(x1 - x2);
				dy = hip / h;

				sketches[2].initialized = true;
			};

			p.draw = () => {
				// bg
				p.background('black');

				// diagonal
				p.stroke('white');
				p.line(x1, 0, x2, h);

				// shapes
				const c0 = rectCenterPoint(x1, 0, x2, h);
				alphaEllipse(c0.x, c0.y, pitagoras(x1, 0, x2, h) / 8);

				r = 100;
				alpha = 255 * .25;
				c = color(65, 155, 146, alpha);
				const c1 = rectCenterPoint(c0.x, c0.y, x2, h);
				ellipse(c1.x, c1.y, r, c);

				r -= r * .5;
				c = getColor(c);
				const c2 = rectCenterPoint(c1.x, c1.y, getX(c1.x, 12.5), getY(c1.y, 12.5));
				ellipse(c2.x, c2.y, r, c);

				r -= r * .5;
				c = getColor(c);
				const c3 = rectCenterPoint(c2.x, c2.y, getX(c2.x, 12.5), getY(c2.y, 12.5));
				ellipse(c3.x, c3.y, r, c);

				r -= r * .5;
				c = getColor(c);
				const c4 = rectCenterPoint(c3.x, c3.y, getX(c3.x, 12.5), getY(c3.y, 12.5));
				ellipse(c4.x, c4.y, r, c);

				// bottom
				p.push();
				p.noFill();
				p.strokeWeight(3);
				p.rect(0, 0, w, h);
				p.pop();
				p.noLoop();
			};

			function blurredCircle(x1, y1, x2, y2) {
				const c = rectCenterPoint(x1, y1, x2, y2);

				alphaEllipse(c.x, c.y, pitagoras(x1, y1, x2, y2) / 2);

				return c;
			}

			function rectCenterPoint(x1, y1, x2, y2) {
				return {
					x: (x1 + x2) / 2,
					y: (y1 + y2) / 2
				}
			}

			function alphaEllipse(x, y, r, c) {
				p.push();
				p.noFill();
				for (let i = 0; i < r; i++) {
					if (c) {
						p.stroke(c.r, c.g, c.b, 255 - (i * (255 / r)));
					} else {
						p.stroke(255, 255, 255, 255 - (i * (255 / r)));
					}
					p.ellipse(x, y, i);
				}
				p.pop();
			}

			function ellipse(x, y, r, c) {
				p.push();
				p.noStroke();
				p.fill(c.r, c.g, c.b, c.a);
				p.ellipse(x, y, r);
				p.pop();
			}

			function pitagoras(x1, y1, x2, y2) {
				return p.sqrt(p.sq(p.abs(x1 - x2)) + p.sq(p.abs(y1 - y2)));
			}

			function color(r, g, b, a) {
				return { r: r, g: g, b: b, a: a };
			}

			function getX(x, r) {
				return (r / dx) + x;
			}

			function getY(y, r) {
				return (r / dy) + y;
			}

			function getColor(c) {
				const n = (ca, v) => { return ca + (255 - v) / 3; };

				return {
					r: n(c.r, 65),
					g: n(c.g, 155),
					b: n(c.b, 146),
					a: c.a + 255 * .25
				};
			}
		}
	}
];