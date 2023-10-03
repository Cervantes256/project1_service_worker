//Nombre del cache
const cacheName = 'project';
//Archivos y recuros para almacenar en cache
const cacheAssets = [
    'index.html',
    'main.js'
    //Agregar mas recursos que se necesiten como imagenes, css, etc.
];
//Instalar el service worker
self.addEventListener('install', (event) => {
    console.log('Service worker: Instalado');

    //Precarga de los recursos para guardar en cache
    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                console.log('Service worker: Cacheado en archivos.');
                return cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

//Activar el service worker

self.addEventListener('activate', (event) => {
    console.log('Service worker: Activado');
    //Eliminar caches antiguas
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service worker: Limpiando cache antigua');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

//Manejo de peticiones 
self.addEventListener('fetch', (event) => {
    console.log('Service worker: Fetching');
    event.respondWith(fetch(event.request).catch(() =>
        caches.match(event.request))
    );
});
