import {
    nombreInput,
    emailInput,
    telefonoInput,
    empresaInput
} from './references.js';

(() => {
    'use strict';
    let DB;

    // Nos conectamos a la base de datos
    const conectarDB = () => {
        const abrirConexion = window.indexedDB.open( 'crm', 1 );

        abrirConexion.onerror = () => {
            console.error( 'Hubo un error' );
        }

        abrirConexion.onsuccess = () => {
            DB = abrirConexion.result;
        }
    }

    // Llena el formulario
    const llenarFormulario = dataClient => {
        const { nombre, email, telefono, empresa } = dataClient; 
        nombreInput.value   = nombre;
        emailInput.value    = email;
        telefonoInput.value = telefono;
        empresaInput.value  = empresa; 
    }

    // Obtiene el cliente
    const obtenerCliente = id => {
        const transaction = DB.transaction( ['crm'], 'readonly');
        const objectStore = transaction.objectStore( 'crm' );
        const cliente = objectStore.openCursor();

        cliente.onsuccess = event => {
            const cursor = event.target.result;
            if( cursor ) {
                if( cursor.value.id === id ) {
                    llenarFormulario( cursor.value );
                }
                cursor.continue();
            }
        }
    }

    document.addEventListener( 'DOMContentLoaded', () => {
        conectarDB();

        // Verificar el id de la url
        const parametrosURL = new URLSearchParams( window.location.search );
        const idCliente = Number( parametrosURL.get( 'id' ) );
        
        if( idCliente ) {
            setTimeout( () => {
                obtenerCliente( idCliente );
            }, 1000 );
        }
    });

})();