const searchBox = document.getElementById("searchBox");
const suggestionsBox = document.getElementById("suggestionsBox");

searchBox.addEventListener("keyup", function () {
    let query = this.value;

    if (query.length === 0) {
        suggestionsBox.innerHTML = "";
        return;
    }

    fetch(`/suggest/?q=${query}`)
        .then(response => response.json())
        .then(data => {
            suggestionsBox.innerHTML = "";

            data.forEach(item => {
                let div = document.createElement("div");
                div.innerHTML = item;
                div.style.padding = "5px";
                div.style.cursor = "pointer";

                div.onclick = function () {
                    searchBox.value = item;
                    suggestionsBox.innerHTML = "";
                };

                suggestionsBox.appendChild(div);
            });
        });
});