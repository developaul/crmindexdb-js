(() =>{
    'use strict';
    let DB;

    // Crea la base de datos de indexDB
    const crearDB = () => {
        const crearDB = window.indexedDB.open( 'crm', 1 );

        crearDB.onerror = () => {
            console.error( 'Hubo un error' );
        }

        crearDB.onsuccess = () => {
            DB = crearDB.result;
        }

        crearDB.onupgradeneeded = ( event ) => {
            const db = event.target.result;
            
            const objectStore = db.createObjectStore( 'crm', { keyPath: 'id', autoIncrement: true } );
            
            objectStore.createIndex( 'nombre', 'nombre', { unique: false } );
            objectStore.createIndex( 'email', 'email', { unique: true } );
            objectStore.createIndex( 'telefono', 'telefono', { unique: false } );
            objectStore.createIndex( 'empresa', 'empresa', { unique: false } );
            objectStore.createIndex( 'id', 'id', { unique: true } );
        }
    }

    document.addEventListener( 'DOMContentLoaded', () => {
        crearDB();
    });

})();