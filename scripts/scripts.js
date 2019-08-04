$().ready(() => {
	if ($('#carousel_sketch_0').length) {
		showHiddenChildrens('#indicators');
		showHiddenChildrens('#slides');
	}

	const carousel = $('#main_carousel');
	const height = carousel.height();

	carousel.on('slide.bs.carousel', (event) => {
		if (event.to > 0) {
			const sketch = sketches[event.to - 1];

			if (!sketch.initialized) {
				new p5(sketch.fn, sketch.parent);
			} else {
				sketch.p5.loop();
			}

			carousel.height(height);
		}

		if (event.from > 0) {
			sketches[event.from - 1].p5.noLoop();
		}
	});
});

function showHiddenChildrens(selector) {
	$(selector).children().toArray().forEach(e => {
		$(e).removeClass('hidden');
	});
}