import fetch from 'node-fetch';


const API_URL = 'https://graphql.anilist.co';

// 🔹 Función para buscar un anime por nombre
export async function searchAnime(animeName) {
    const query = `
        query ($search: String) {
            Media(search: $search, type: ANIME) {
                title {
                    romaji
                    english
                }
                coverImage {
                    large
                }
                genres
                averageScore
                description
                relations {
                    edges {
                        relationType
                        node {
                            title {
                                romaji
                            }
                        }
                    }
                }
            }
        }
    `;

    const variables = { search: animeName };

    try {
        const response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables })
        });

        const data = await response.json();
        console.log("🔍 Datos recibidos de AniList:", data); // 🔥 VER QUÉ LLEGA EN CONSOLA

        return data.data.Media;
    } catch (error) {
        console.error('❌ Error al buscar anime:', error);
        return null;
    }
}

// 🔹 Función para obtener información de un usuario
export async function getUserAnimeList(username) {
    const query = `
    query ($name: String) {
        User(name: $name) {
            id
            name
            avatar {
                    large
                }
            createdAt
            statistics {
                    anime {
                        count
                        meanScore
                        minutesWatched
                        genres {
                            genre
                            count
                        }
                    }
                }
                favourites {
                    anime {
                        nodes {
                            title {
                                romaji
                            }
                        }
                    }
                }
            }
        }
    `;

    const variables = { name: username };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
        });

        const data = await response.json();
        return data.data.User;
    } catch (error) {
        console.error('Error obteniendo datos del usuario:', error);
        return null;
    }
}
