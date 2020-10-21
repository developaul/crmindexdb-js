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

        console.log( 'Agregando..' );
    }

    document.addEventListener( 'DOMContentLoaded', () => {
        conectarDB();

        form.addEventListener( 'submit', validarCliente );
    });

})();