import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';
import { searchAnime, getUserAnimeList } from './api.js';
// 🔹 Solución para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("Ruta real del preload:", path.join(__dirname, 'preload.js'));

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile(path.join(__dirname, '../views/index.html'));
});

// ✅ Manejador de búsqueda de usuario
ipcMain.handle('fetch-anilist-data', async (event, username) => {
    return await getUserAnimeList(username);
});

// ✅ Manejador de búsqueda de anime
ipcMain.handle('search-anime', async (event, animeName) => {
    return await searchAnime(animeName);
   
});
