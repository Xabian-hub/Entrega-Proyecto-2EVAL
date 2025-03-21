const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    getUserAnimeList: (username) => ipcRenderer.invoke('fetch-anilist-data', username),
    searchAnime: (animeName) => ipcRenderer.invoke('search-anime', animeName),
});