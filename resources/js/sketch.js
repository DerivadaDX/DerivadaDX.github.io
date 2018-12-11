let allowDrawing = false;

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight),
		navbarButton = select('#hide-navbar-button'),
		footer = select('#derivadadx-footer'),
		profileBox = select('#profile-div');

	select('#hide-profile-button').mouseClicked(() => {
		allowDrawing = true;
		navbarButton.show();
		profileBox.hide();
		footer.hide();
		loop();
	});

	navbarButton.mouseClicked(() => {
		allowDrawing = false;
		navbarButton.hide();
		profileBox.show();
		background(255);
		footer.show();
		noLoop();
	});

	canvas.style('z-index', '-1');
	canvas.position(0, 0);
}

function draw() {
	if (allowDrawing) {
		// Drawing code here!
	}
}