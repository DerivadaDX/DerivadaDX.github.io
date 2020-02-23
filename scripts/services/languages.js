class LanguageService {
	constructor() {
		this.lng = localStorage.getItem('lang');

		if (!this.lng) {
			this.lng = 'en'; // default
			localStorage.setItem('lang', this.lng);
		}
	}

	initialize() {
		let scriptTag = document.createElement('script');

		scriptTag.type = 'text/javascript';
		scriptTag.src = `../../locale/${this.lng}.js`;

		document.querySelector('head').appendChild(scriptTag);

		scriptTag.onload = () => document.lang.forEach(e => $(`.${e.id}`).html(e.text));
	}
}