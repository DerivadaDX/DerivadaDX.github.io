let allowDrawing = false;

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight),
		navbarButton = select('#hide-navbar-button'),
		footer = select('#derivadadx-footer'),
		profileBox = select('#profile-div');

	select('#hide-profile-button').mouseClicked(() => {
		background(55, 105, 75);
		allowDrawing = true;
		navbarButton.show();
		profileBox.hide();
		footer.hide();
		loop();
	});

	navbarButton.mouseClicked(() => {
		background(255, 255, 255);
		allowDrawing = false;
		navbarButton.hide();
		profileBox.show();
		footer.show();
		noLoop();
	});

	canvas.style('z-index', '-1');
	canvas.position(0, 0);

	rectMode(CENTER);
	smooth();
}

function draw() {
	if (allowDrawing) {
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
			rect(-width/2 + mouseX, -height/2 + mouseY, size, size);
			rect(width/2 - mouseX, height/2 - mouseY, size, size);
		}
	}
}