import {
    form,
    nombreInput,
    emailInput,
    telefonoInput,
    empresaInput
} from './references.js';

import { imprimirAlerta } from './functions.js';

(() => {
    'use strict';
    let DB;

    // Nos conectamos a la Base de datos de indexDB
    const conectarDB = () => {
        const abrirConexion = window.indexedDB.open( 'crm', 1 );

        abrirConexion.onerror = () => {
            console.error( 'Hubo un error' );
        }

        abrirConexion.onsuccess = () => {
            DB = abrirConexion.result;
        }
    }

    // Agrega un nuevo cliente
    const crearNuevoCliente = ( client ) => {
        const transaction = DB.transaction( ['crm'], 'readwrite' );
        const objectStore = transaction.objectStore( 'crm' );
        objectStore.add( client );

        transaction.onerror = () => {
            imprimirAlerta( 'Hubo un error', 'error' );
        }

        transaction.oncomplete = () => {
            imprimirAlerta( 'El Cliente se agregadó Correctamente' );

            setTimeout( () => {
                window.location.href = 'index.html';
            }, 3000);
        }
    }

    // Valida el cliente
    const validarCliente = event => {
        event.preventDefault();

        const nombre    = nombreInput.value,
              email     = emailInput.value,
              telefono  = telefonoInput.value,
              empresa   = empresaInput.value;
              
        if( nombre === '' || email === '' || telefono === '' || empresa === '' ) {
            imprimirAlerta( 'Todos los campos son obligatorios', 'error' );
            return;
        }

        // crear un objecto con la información
        const cliente = { nombre, email, telefono, empresa, id: Date.now() };
        crearNuevoCliente( cliente );
    }

    document.addEventListener( 'DOMContentLoaded', () => {
        conectarDB();

        form.addEventListener( 'submit', validarCliente );
    });

})();