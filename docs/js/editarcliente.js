import {
    nombreInput,
    emailInput,
    telefonoInput,
    empresaInput,
    form
} from './references.js';

import { imprimirAlerta, conectarDB, DB } from './functions.js';

(() => {
    'use strict';
    let idCliente;

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

    // Actualiza un nuevo cliente
    const actualizarCliente = event => {
        event.preventDefault();

        const nombre    = nombreInput.value,
              email     = emailInput.value,
              telefono  = telefonoInput.value,
              empresa   = empresaInput.value;

        if( nombre === '' || email === '' || telefono === '' || empresa === '' ) {
            imprimirAlerta( 'Todos los campos son obligatorios', 'error', 'form' );
            return;
        }

        // Actualizar cliente
        const clienteActualizado = { nombre, email, telefono, empresa, id: idCliente }

        const transaction = DB.transaction( ['crm'], 'readwrite' );
        const objectStore = transaction.objectStore( 'crm' );
        objectStore.put( clienteActualizado );
        
        transaction.oncomplete = () => {
            imprimirAlerta( 'Editado Correctamente', 'success', 'form' );

            setTimeout( () => {
                window.location.href = 'index.html';
            }, 3000);
        }

        transaction.onerror = () => {
            imprimirAlerta( 'Hubo un error', 'error', 'form' );
        }
    }


    // Events
    document.addEventListener( 'DOMContentLoaded', () => {
        conectarDB();

        // Actualiza el registro
        form.addEventListener( 'submit', actualizarCliente );

        // Verificar el id de la url
        const parametrosURL = new URLSearchParams( window.location.search );
        idCliente = Number( parametrosURL.get( 'id' ) );
        
        if( idCliente ) {
            setTimeout( () => {
                obtenerCliente( idCliente );
            }, 1000 );
        }
    });

})();