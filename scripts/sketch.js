getSketches = () => {
	const sketches = [
		{
			fn: (p) => {
				sketches[0].p5 = p;

				let w, h;
				const borderRadius = 5;

				p.setup = () => {
					const carousel = $('#main_carousel').parent();
					h = carousel.height();
					w = carousel.width();

					p.createCanvas(w, h);
					p.background(55, 105, 75);
					p.rectMode(p.CENTER);
					p.smooth();

					// Must be at the end
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
			fn: (p) => {
				sketches[1].p5 = p;

				let w, h,
					point = {},
					x = 0, y = 0,
					xd = 1, yd = 0,
					xOffset, yOffset;

				const divisions = 50;

				p.setup = () => {
					const carousel = $('#main_carousel').parent();
					h = carousel.height();
					w = carousel.width();

					p.createCanvas(w, h);
					p.background('black');
					changeStrokeColor();

					xOffset = w / divisions;
					yOffset = h / divisions;
					point = randomCoord();

					// Must be at the end
					sketches[1].initialized = true;
				};

				p.draw = () => {
					drawLine();
				};

				function changeStrokeColor() {
					p.stroke(p.random(255), p.random(255), p.random(255), p.random(128, 256));
				}

				function drawLine() {
					p.line(point.x, point.y, x, y);
					p.strokeWeight(p.random(1, 3));

					if (p.frameCount % (4 * divisions) === 0) {
						changeStrokeColor();
					}

					getNextPoint();
				}

				function randomCoord() {
					return {
						x: p.constrain(p.random(w), xOffset, w - xOffset),
						y: p.constrain(p.random(h), yOffset, h - yOffset),
					}
				}

				function getNextPoint() {
					const f = p.frameCount;

					if (f % divisions === 1) {
						if (xd === 1 && yd === 0 && f !== 1) {
							xd = 0; yd = 1;
						} else if (xd === 0 && yd === 1) {
							xd = -1; yd = 0;
						} else if (xd === -1 && yd === 0) {
							xd = 0; yd = -1;
						} else if (xd === 0 && yd === -1) {
							xd = 1; yd = 0;
						}
					}

					x += xd * xOffset;
					y += yd * yOffset;
				}
			}
		},
		{
			fn: (p) => {
				sketches[2].p5 = p;

				p.setup = () => {
					const carousel = $('#main_carousel').parent();

					p.createCanvas(carousel.width(), carousel.height());
					p.background('black');

					// Must be at the end
					sketches[2].initialized = true;
				};

				p.draw = () => {

				};

				class Circle {
					get x() { return this._x; }
					get y() { return this._y; }
					get radius() { return this._radius; }
					get center() { return { x: this.x, y: this.y }; }

					set x(x) { this._x = x; }
					set y(y) { this._y = y; }
					set radius(r) { this._radius = r; }
					set center(c) { this._x = c.x; this._y = c.y; }

					constructor(config) {
						this._x = config ? (config.x ?? 0) : 0;
						this._y = config ? (config.y ?? 0) : 0;
						this._radius = config ? (config.radius ?? 0) : 0;
					}

					draw() {
						p.push();
						p.stroke('white');
						p.ellipse(this.x, this.y, this.radius);
						p.pop();
					}

					getPointByDegrees(degrees) {
						let rads = p.radians(degrees);

						return {
							x: this._getXByRadians(rads),
							y: this._getYByRadians(rads),
						};
					}

					getXByDegrees(degrees) {
						return this._getXByRadians(p.radians(degrees));
					}

					getYByDegrees(degrees) {
						return this._getYByRadians(p.radians(degrees));
					}

					_getXByRadians(rads) {
						return this._x + this._radius * p.cos(rads);
					}

					_getYByRadians(rads) {
						return this._y - this._radius * p.sin(rads);
					}
				}

				class GrowingCircle extends Circle {
					constructor(config) {
						super(config);

						// radius
						this._maxRadius = config.maxRadius ?? 101;
						this._minRadius = config.minRadius ?? 1;
					}

					draw() {
						p.push();
						p.stroke('white');
						p.ellipse(this._x, this._y, p.random(this._minRadius, this._maxRadius));
						p.pop();
					}
				}

				/**
				 * Returns a random p5.Color whose maximum or minimum values ​​can be configured through its RGBA components.
				 */
				class ColorRandomizer {
					constructor(config) {
						// Asignación de valores a través de configuración o por defecto.
						this._min = config.min ?? 0;
						this._max = config.max ?? 256;
						this._alpha = config.alpha ?? 255;

						// Se limitan valores mínimos y máximos a 0 y 256 respectivamente.
						if (this._min < 0) this._min = 0;
						if (this._max > 256) this._max = 256;

						// Asignación de valores a través de configuración.
						// Los valores por defecto son _min y _max según corresponda.
						this._minRed = config.minRed ?? this._min;
						this._maxRed = config.maxRed ?? this._max;

						this._minGreen = config.minGreen ?? this._min;
						this._maxGreen = config.maxGreen ?? this._max;

						this._minBlue = config.minBlue ?? this._min;
						this._maxBlue = config.maxBlue ?? this._max;

						this._minAlpha = config.minAlpha;
						this._maxAlpha = config.maxAlpha;

						// Se limitan valores mínimos y máximos a 0 y 256 respectivamente.
						if (this._minRed < 0) this._minRed = 0;
						if (this._maxRed > 256) this._maxRed = 256;

						if (this._minGreen < 0) this._minGreen = 0;
						if (this._maxGreen > 256) this._maxGreen = 256;

						if (this._minBlue < 0) this._minBlue = 0;
						if (this._maxBlue > 256) this._maxBlue = 256;

						if (this._minAlpha < 0) this._minAlpha = 0;
						if (this._maxAlpha > 256) this._maxAlpha = 256;
					}

					getColor() {
						return p.color(
							p.random(this._minRed, this._maxRed),
							p.random(this._minGreen, this._maxGreen),
							p.random(this._minBlue, this._maxBlue),
							(this._minAlpha ?? -1) >= 0 || (this._maxAlpha ?? -1) >= 0
								? p.random(this._minAlpha ?? 0, this._maxAlpha ?? 256)
								: this._alpha
						);
					}
				}
			}
		}
	];

	sketches.forEach((sketch, index) => {
		sketch.parent = 'carousel_sketch_' + index;
		sketch.initialized = false;
		sketch.p5 = null;
	});

	return sketches;
};