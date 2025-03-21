document.addEventListener('DOMContentLoaded', () => {
    console.log("Cargando datos...");

    if (!window.api) {
        console.error("Error: window.api no está disponible.");
        return;
    }

    // Mostrar/Ocultar secciones de búsqueda
    document.getElementById('showUserSearch').addEventListener('click', () => {
        document.getElementById('userSearch').classList.remove('hidden');
        document.getElementById('animeSearch').classList.add('hidden');
    });

    document.getElementById('showAnimeSearch').addEventListener('click', () => {
        document.getElementById('animeSearch').classList.remove('hidden');
        document.getElementById('userSearch').classList.add('hidden');
    });

    // 🔹 Evento para buscar usuario
    document.getElementById('searchUser').addEventListener('click', async () => {
        const username = document.getElementById('usernameInput').value;
        if (!username) {
            alert("Por favor, ingresa un usuario de AniList.");
            return;
        }
    
        try {
            const userData = await window.api.getUserAnimeList(username);
            console.log("Datos obtenidos del usuario:", userData); // 🔥 Para depuración
    
            if (userData) {
                const minutesWatched = userData.statistics.anime.minutesWatched || 0;
                const daysWatched = (minutesWatched / 1440).toFixed(1);
                const genres = userData.statistics.anime.genres.map(g => g.genre).join(', ');
                const favourites = userData.favourites.anime.nodes.map(a => a.title.romaji).join(', ');
    
                document.getElementById("userResult").innerHTML = `
                    <div class="bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-md mx-auto">
                        <img src="${userData.avatar.large}" alt="Avatar de ${userData.name}" class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500 shadow-md">
                        <h2 class="text-2xl font-bold text-white">${userData.name}</h2>
                        <p class="text-gray-400 text-sm">Cuenta creada el: ${new Date(userData.createdAt * 1000).toLocaleDateString()}</p>
    
                        <div class="mt-4 text-left">
                            <div class="bg-gray-700 p-3 rounded-lg mb-2">
                                <p class="text-blue-300 font-semibold">📺 Animes vistos:</p>
                                <p class="text-white">${userData.statistics.anime.count}</p>
                            </div>
                            <div class="bg-gray-700 p-3 rounded-lg mb-2">
                                <p class="text-blue-300 font-semibold">⭐ Puntuación media:</p>
                                <p class="text-white">${userData.statistics.anime.meanScore}/100</p>
                            </div>
                            <div class="bg-gray-700 p-3 rounded-lg mb-2">
                                <p class="text-blue-300 font-semibold">⏳ Tiempo viendo anime:</p>
                                <p class="text-white">${daysWatched} días</p>
                            </div>
                            <div class="bg-gray-700 p-3 rounded-lg mb-2">
                                <p class="text-blue-300 font-semibold">🎭 Géneros favoritos:</p>
                                <p class="text-white">${genres || "No especificado"}</p>
                            </div>
                            <div class="bg-gray-700 p-3 rounded-lg">
                                <p class="text-blue-300 font-semibold">🏆 Animes favoritos:</p>
                                <p class="text-white">${favourites || "No especificado"}</p>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                document.getElementById("userResult").innerHTML = '<p class="text-red-500">Error al cargar datos del usuario.</p>';
            }
        } catch (error) {
            console.error("Error al obtener datos del usuario:", error);
            document.getElementById("userResult").innerHTML = '<p class="text-red-500">Error al obtener datos.</p>';
        }
    });

    // 🔹 Evento para buscar anime
    document.getElementById('searchAnime').addEventListener('click', async () => {
        const animeName = document.getElementById('animeInput').value;
        if (!animeName) {
            alert("Por favor, ingresa el nombre de un anime.");
            return;
        }
    
        try {
            const animeData = await window.api.searchAnime(animeName);
            console.log("Datos obtenidos del anime:", animeData); // 🔥 Para depuración
    
            if (!animeData) {
                document.getElementById('animeResult').innerHTML = '<p class="text-red-500">Error al obtener los datos del anime.</p>';
                return;
            }
    
            // 🔹 Obtener relaciones (mangas, películas, secuelas, precuelas)
            const relatedWorks = animeData.relations.edges
                .map(edge => `${edge.node.title.romaji} (${edge.relationType})`)
                .join(', ') || "No hay información disponible.";
    
            document.getElementById("animeResult").innerHTML = `
                <div class="bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-md mx-auto">
                    <h2 class="text-2xl font-bold text-white">${animeData.title.romaji} (${animeData.title.english || 'Sin título en inglés'})</h2>
                    <img src="${animeData.coverImage.large}" alt="Imagen de ${animeData.title.romaji}" class="mt-2 mx-auto rounded-lg shadow-md w-48">
                    
                    <div class="mt-4 text-left">
                        <div class="bg-gray-700 p-3 rounded-lg mb-2">
                            <p class="text-green-300 font-semibold">🎭 Géneros:</p>
                            <p class="text-white">${animeData.genres.join(', ')}</p>
                        </div>
                        <div class="bg-gray-700 p-3 rounded-lg mb-2">
                            <p class="text-green-300 font-semibold">⭐ Puntuación:</p>
                            <p class="text-white">${animeData.averageScore}/100</p>
                        </div>
                        <div class="bg-gray-700 p-3 rounded-lg mb-2">
                            <p class="text-green-300 font-semibold">📖 Relacionados:</p>
                            <p class="text-white">${relatedWorks}</p>
                        </div>
                        <div class="bg-gray-700 p-3 rounded-lg">
                            <p class="text-green-300 font-semibold">📜 Descripción:</p>
                            <p class="text-white">${animeData.description}</p>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error("Error al obtener datos del anime:", error);
            document.getElementById("animeResult").innerHTML = '<p class="text-red-500">Error al obtener datos.</p>';
        }
    });

    document.getElementById('searchAnime').addEventListener('click', async () => {
        const animeName = document.getElementById('animeInput').value;
        if (!animeName) return;
    
        try {
            const animeData = await window.api.searchAnime(animeName);
            const scrapedData = await window.api.scrapeAnimeInfo(animeName);
            console.log("📌 Datos obtenidos de AniList:", animeData);
            console.log("📌 Datos obtenidos de MyAnimeList:", scrapedData);
    
            if (!animeData) {
                document.getElementById('animeResult').innerHTML = '<p class="text-red-500">Error al obtener los datos.</p>';
                return;
            }
    
            document.getElementById("animeResult").innerHTML = `
                <div class="bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-md mx-auto">
                    <h2 class="text-2xl font-bold text-white">${animeData.title.romaji} (${animeData.title.english || 'Sin título en inglés'})</h2>
                    <img src="${animeData.coverImage.large}" alt="Imagen de ${animeData.title.romaji}" class="mt-2 mx-auto rounded-lg shadow-md w-48">
                    
                    <div class="mt-4 text-left">
                        <div class="bg-gray-700 p-3 rounded-lg mb-2">
                            <p class="text-green-300 font-semibold">🎭 Géneros:</p>
                            <p class="text-white">${animeData.genres.join(', ')}</p>
                        </div>
                        <div class="bg-gray-700 p-3 rounded-lg mb-2">
                            <p class="text-green-300 font-semibold">⭐ Puntuación AniList:</p>
                            <p class="text-white">${animeData.averageScore}/100</p>
                        </div>
                        <div class="bg-gray-700 p-3 rounded-lg mb-2">
                            <p class="text-green-300 font-semibold">🏆 Ranking MAL:</p>
                            <p class="text-white">${scrapedData.ranking}</p>
                        </div>
                        <div class="bg-gray-700 p-3 rounded-lg mb-2">
                            <p class="text-green-300 font-semibold">📊 Popularidad MAL:</p>
                            <p class="text-white">${scrapedData.popularity}</p>
                        </div>
                        <div class="bg-gray-700 p-3 rounded-lg">
                            <p class="text-green-300 font-semibold">📜 Descripción:</p>
                            <p class="text-white">${scrapedData.synopsis}</p>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error("❌ Error al obtener datos:", error);
            document.getElementById("animeResult").innerHTML = '<p class="text-red-500">Error al obtener datos.</p>';
        }
    });



});
