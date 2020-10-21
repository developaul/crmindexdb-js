import { listadoClientes } from './references.js';

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

    // Obtiene los clientes de la base de datos
    const obtenerClientes = () => {
        const abrirConexion = window.indexedDB.open( 'crm', 1 );

        abrirConexion.onerror = () => {
            console.error( 'Hubo un error' );
        }

        abrirConexion.onsuccess = () => {
            DB = abrirConexion.result;

            const objectStore = DB.transaction( ['crm'] ).objectStore( 'crm' );

            // Abriendo cursor
            objectStore.openCursor().onsuccess = event => {
                const cursor = event.target.result;

                if( cursor ) {
                    const { nombre, email, telefono, empresa, id } = cursor.value;

                    listadoClientes.innerHTML += ` 
                    <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                            <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                            <p class="text-gray-700">${telefono}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                            <p class="text-gray-600">${empresa}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                            <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                            <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900">Eliminar</a>
                        </td>
                    </tr>`;
                    
                    cursor.continue();
                }
            }
        }
    }

    document.addEventListener( 'DOMContentLoaded', () => {
        crearDB();

        if( window.indexedDB.open( 'crm', 1 ) ) {
            obtenerClientes();
        }
    });

})();