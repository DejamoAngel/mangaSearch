document.addEventListener("DOMContentLoaded", () => {
    const findInput = document.getElementById("findInput");
    const findButton = document.getElementById("findButton");
    const findContainer = document.getElementById("findContainer");

    findButton.addEventListener("click", async () => {
        const findValue = encodeURIComponent(input.value.trim());
        if (!searchValue) return;

        try {
            const response = await fetch('https://api.mangadex.org/manga?title=${findValue}&limit=10includes[]=cover_art');
            const data = await response.json();

            resultsContainer.innerHTML = data.data.map(manga => `
                <h1>${manga.attributes.title.en}</h1>
                <p>${manga.attributes.description.en}</p>
                <img src="https://uploads.mangadex.org/covers/${manga.id}/${manga.relationships.find
                (r => r.type === "cover_art").attributes.fileName}" alt="${manga.attributes.title.en} Cover">
            `).join('');
        } catch (error) {
            console.log(error);
        }
    });
});