const toggleSearchbar = () => {
	document.getElementById("searchbar").classList.toggle("hidden");
	document.getElementById("wrapper").classList.toggle("blur");
};

document.getElementById("search").addEventListener("click", toggleSearchbar);
document.getElementById("closebutton").addEventListener("click", toggleSearchbar);
