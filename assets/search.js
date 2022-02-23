import Index from "flexsearch/dist/module/index";

let state = false;
const toggleSearchbar = () => {
	state = !state;
	document.getElementById("searchbar").classList.toggle("hidden");
	document.getElementById("wrapper").classList.toggle("blur");
	if (state) document.querySelector("input").focus();
};

const createElement = (title, excerpt, slug) => {
	const a = document.createElement("a");
	const li = document.createElement("li");
	const h2 = document.createElement("h2");
	const p = document.createElement("p");

	h2.textContent = title;
	p.textContent = excerpt;

	a.setAttribute("href", "https://alfheimr.xyz/" + slug);
	li.appendChild(h2);
	li.appendChild(p);
	a.appendChild(li);

	document.getElementById("searchresults").appendChild(a);
};

const removeAllElements = () => {
	const lis = document.querySelectorAll("#searchresults li");
	lis.forEach(li => {
		li.remove();
	});
};

const main = async () => {
	const input = document.querySelector("input");
	document.getElementById("search").addEventListener("click", toggleSearchbar);
	document.getElementById("closebutton").addEventListener("click", toggleSearchbar);
	const index = new Index({ tokenize: "forward" });
	const data = await (await fetch("/data.json")).json();
	data.forEach(({ title, plaintext }, i) => {
		index.add(i, title + " " + plaintext);
	});
	input.addEventListener("input", e => {
		removeAllElements();
		const results = index.search(e.target.value);
		results.forEach(i => {
			createElement(data[i].title, data[i].plaintext.slice(0, 200), data[i].slug);
		});
	});
};

main();
