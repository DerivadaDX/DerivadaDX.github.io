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

				const getMousePoint = () => ({ x: p.mouseX, y: p.mouseY });

				let main;
				let middle = [];
				let small = [];

				p.setup = () => {
					const carousel = $('#main_carousel').parent();

					p.createCanvas(carousel.width(), carousel.height());

					p.noFill();

					main = new GrowingCircle({
						x: p.width / 2,
						y: p.height / 2,
						maxRadius: 50,
						frameSkip: 4
					});

					for (let times = 0; times < 8; times++) {
						middle.push(new GrowingCircle({
							parent: main,
							maxRadius: main.maxRadius / 4,
							frameSkip: 8,
							distanceFromParent: p.abs(100 - main.maxRadius),
							angleFromParent: 45 * times,
						}));

						let ref = middle[times];

						small.push(new GrowingCircle({
							parent: ref,
							maxRadius: ref.maxRadius / 2,
							frameSkip: 8,
							distanceFromParent: p.abs(50 - ref.maxRadius),
							angleFromParent: ref.angleFromParent,
							step: 1,
							static: false
						}));
					}

					// Must be at the end
					sketches[2].initialized = true;
				};

				p.draw = () => {
					p.background(50, 0, 50, 25);
					main.drawCircle();
					middle.forEach(m => m.drawCircle());
					small.forEach(s => s.drawCircle());
				};

				/**
				 * Simple representation of a circle from a center and a radius.
				 * Provides some useful methods for obtaining positions on its circumference.
				 */
				class Circle {
					//#region getters & setters
					get center() { return { x: this.x, y: this.y }; }
					set center(c) { this.x = c.x; this.y = c.y; }

					getX() { return this.x; }
					getY() { return this.y; }
					getRadius() { return this.radius; }
					getCenter() { return this.center; }
					getChildren() { return this.children; }

					setX(x) { this.x = x; return this; }
					setY(y) { this.y = y; return this; }
					setRadius(r) { this.radius = r; return this; }
					setCenter(c) { this.center = c; return this; }
					setChildren(c) { this.children = c; return this; }
					//#endregion

					constructor(config) {
						Object.assign(this, config);

						this.x = this.x ?? 0;
						this.y = this.y ?? 0;
						this.radius = this.radius ?? 0;
						this.static = this.static ?? true;

						this.distanceFromParent = this.distanceFromParent ?? 0;
						this.angleFromParent = this.angleFromParent ?? 0;
						this._currentAngle = this.angleFromParent;
						this.step = this.step ?? 1;

						this.children = this.children ?? [];
						this.setParent(this.parent);
					}

					/**
					 * Draws the circle.
					 */
					draw() {
						this.update();

						p.push();
						p.stroke('white');
						p.ellipse(this.x, this.y, 2 * this.radius);
						p.pop();
					}

					drawCascade() {
						this.draw();
						this.children.forEach(child => child.drawCascade());
					}

					update() {
						this._updateCurrentAngle();
						this._updateCenter();
					}

					_updateCurrentAngle() {
						if (this.static === false) {
							this._currentAngle += this.step;
						}
					}

					_updateCenter() {
						if (this.parent) {
							this.center = this.parent.getPointByDegrees(this._currentAngle, this.distanceFromParent);
						}
					}

					//#region parent
					setParent(p) {
						this.parent = p;

						if (this.parent) {
							this.parent.children.push(this);
						}

						this.update();
						return this;
					}

					setAngleFromParent(a) {
						this.angleFromParent = a;
						this._currentAngle = a;
						this.update();
						return this;
					}

					setDistanceFromParent(d) {
						this.distanceFromParent = d;
						this.update();
						return this;
					}
					//#endregion

					//#region trigonometry
					getPointByDegrees(degrees, offset) {
						let rads = p.radians(degrees);

						return {
							x: this.getXByRadians(rads, offset),
							y: this.getYByRadians(rads, offset),
						};
					}

					getXByDegrees(degrees, offset) {
						return this.getXByRadians(p.radians(degrees), offset);
					}

					getYByDegrees(degrees, offset) {
						return this.getYByRadians(p.radians(degrees), offset);
					}

					getXByRadians(rads, offset) {
						return this.x + (this.radius + (offset ?? 0)) * p.cos(rads);
					}

					getYByRadians(rads, offset) {
						return this.y - (this.radius + (offset ?? 0)) * p.sin(rads);
					}
					//#endregion
				}

				/**
				 * A circle that randomly changes the value of its radius, whose maximum and minimum values can be configured.
				 * @extends Circle
				 */
				class GrowingCircle extends Circle {
					//#region getters & setters
					getMinRadius() { return this.minRadius; }
					getMaxRadius() { return this.maxRadius; }

					setMinRadius(mr) { this.minRadius = mr; return this; }
					setMaxRadius(mr) { this.maxRadius = mr; return this; }
					setFrameSkip(fs) {
						if (typeof fs === 'number' && this.frameSkip !== fs) {
							this._frameSkipChange = p.frameCount;
							this.frameSkip = fs;
						}

						return this;
					}
					//#endregion

					constructor(config) {
						super(config);

						Object.assign(this, config);

						// radius
						this.minRadius = this.minRadius ?? 1;
						this.maxRadius = this.maxRadius ?? 101;
						this.radius = this.maxRadius;

						// control
						this.frameSkip = this.frameSkip ?? 1;
						this._frameSkipChange = 0;
						this._drawingRadius = this.maxRadius;

						this.setParent(this.parent);
					}

					/**
					 * Draws the circle with a random radius value.
					 */
					draw() {
						this.update();

						p.push();
						p.stroke('white');
						p.ellipse(this.x, this.y, this._drawingRadius);
						p.pop();
					}

					drawCircle() {
						super.draw();
					}

					drawCircleCascade() {
						this.drawCircle();
						this.children.forEach(child => child.drawCircleCascade());
					}

					update() {
						super.update();
						this._updateDrawingRadius();
					}

					_updateDrawingRadius() {
						if (this.frameSkip === 1 || (p.frameCount - this._frameSkipChange) % this.frameSkip === 0) {
							this._drawingRadius = 2 * p.random(this.minRadius, this.maxRadius);
						}
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