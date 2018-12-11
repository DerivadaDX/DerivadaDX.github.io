function setup() {
	let navbarButton = select('#hide-navbar-button'),
		profileBox = select('#profile-div');

	select('#hide-profile-button').mouseClicked(() => {
		navbarButton.show(); profileBox.hide();
	});

	navbarButton.mouseClicked(() => {
		navbarButton.hide();
		profileBox.show();
	});

}

function draw() {
	// some code here
}