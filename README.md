🔍 Problemas y soluciones durante el desarrollo
1️⃣ Problema: fetch no era reconocido en api.js
🔹 Causa: node-fetch no estaba instalado correctamente.
✅ Solución: Se instaló la versión correcta con npm install node-fetch@2 y se eliminaron las importaciones innecesarias en Node.js 18+.
2️⃣ Problema: preload.js no se cargaba
🔹 Causa: __dirname no estaba definido en main.js.
✅ Solución: Se usó fileURLToPath(import.meta.url) para obtener correctamente la ruta del preload.
3️⃣ Problema: La búsqueda de usuario no mostraba datos
🔹 Causa: Se estaba usando searchUser en preload.js, pero en renderer.js se llamaba getUserAnimeList.
✅ Solución: Se sincronizó correctamente el nombre de las funciones.
4️⃣ Problema: Diseño visual muy básico
🔹 Causa: La presentación de datos era solo texto plano.
✅ Solución: Se implementaron tarjetas con Tailwind CSS, mejorando la estética con bloques, colores y bordes redondeados.
📊 Autoevaluación
🔹 Nota estimada: 8/10
Justificación:
✔️ Se han implementado todas las funcionalidades requeridas por el profesor.
✔️ La app tiene una interfaz atractiva y funcional.
✔️ Se han resuelto múltiples problemas técnicos durante el desarrollo.
❌ No se integró Puppeteer para web scraping, lo que hubiera agregado más funcionalidades.

📝 Conclusión
Este proyecto ha sido un gran aprendizaje sobre Electron, APIs y manipulación del DOM, enfrentando y resolviendo varios problemas técnicos.
