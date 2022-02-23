const data = {
	data: () => {
		return {
			permalink: "data.json"
		};
	},

	render: data => {
		let a = data.ghost.posts.map(({ title, plaintext, slug }) => {
			return { title, plaintext, slug };
		});
		return JSON.stringify(a);
	}
};

module.exports = data;
