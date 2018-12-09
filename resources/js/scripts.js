function redirectTo(project) {
	let url = '';

	switch (project) {
		case 'tcp-server':
		case 'tcp-client':
		case 'p5-sketches':
			url = 'https://github.com/DerivadaDX/';
			break;
		case 'juegodelnumero':
			url = 'https://play.google.com/store/apps/details?id=derivadadx.';
			break;
	}

	if (url !== '') {
		window.document.location.href = url + project;
	} else {
		console.error('Invalid project name.');
	}
}