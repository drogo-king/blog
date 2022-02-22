const data = {
	data: () => {
		return {
			permalink: "data.json"
		};
	},

	render: data => {
		let a = data.ghost.posts.map(({ title, plaintext }) => {
			return { title, plaintext };
		});
		return JSON.stringify(a);
	}
};

module.exports = data;
