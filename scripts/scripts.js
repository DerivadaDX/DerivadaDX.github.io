$().ready(() => {
	const sk = $('#carousel_sketch_0').css('display') !== 'none' ? 0 : 1;
	const carousel = $('#main_carousel');
	const height = carousel.height();

	if (sketches.length > 1) {
		let indicators = $('#indicators'),
			slides = $('#slides');

		for (let i = 1; i < sketches.length; i++) {
			indicators.append($(
				`<li data-target="#main_carousel" data-slide-to="${i + 1}"></li>`
			));
			slides.append($(
				`<div class="carousel-item">
					<div id="${sketches[i].parent}"></div>
				</div>`
			));
		}
	}

	carousel.on('slide.bs.carousel', (event) => {
		if (event.to > sk) {
			const sketch = sketches[event.to - 1];

			if (!sketch.initialized) {
				new p5(sketch.fn, sketch.parent);
			} else {
				sketch.p5.loop();
			}

			carousel.height(height);
		}

		if (event.from > sk) {
			sketches[event.from - 1].p5.noLoop();
		}
	});
});