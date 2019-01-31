let allowDrawing = false;

function setup() {
	let sketchHolder = select('#sketch-holder'),
		switchButton = select('#switch-sketch-button'),
		canvas = createCanvas(sketchHolder.width - 2, sketchHolder.height - 2);

	canvas.parent('sketch-holder');
	canvas.hide();

	switchButton.mouseClicked(() => {
		if (!switchButton.isPressed) {
			canvas.show();
			background(55, 105, 75);
			switchButton.isPressed = true;
		} else {
			canvas.hide();
			switchButton.isPressed = false;
		}
	});

	canvas.position(0, 0);
	rectMode(CENTER);
	smooth();
}

function draw() {
	translate(width / 2, height / 2);

	if (!mouseIsPressed) {
		let size = constrain(mouseY / 3, 10, mouseY / 3),
			r = random(256),
			g = random(256),
			b = random(256),
			alpha = random(256);

		// center square
		push();
		noStroke();
		fill(color(r, g, b, alpha));
		rotate(radians(frameCount));
		rect(0, 0, size, size);
		pop();

		// Other squares
		if (frameCount % 5 === 0) {
			fill(color(255 - r, 255 - g, 255 - b, alpha));
		}
		rect(-width / 2 + mouseX, -height / 2 + mouseY, size, size);
		rect(width / 2 - mouseX, height / 2 - mouseY, size, size);
	}
}