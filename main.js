//Verificar si el navegador soporta Service Worker
if ('serviceWorker' in navigator) {
    //regsitramos el service worker
    navigator.serviceWorker.register('service-worker.js')
        .then((registration) => {
            console.log('serice worker registrado con exito.'.registration);
        })
        .catch((error) => {
            console.log('Error en el registro del service worker', error);
        });
}