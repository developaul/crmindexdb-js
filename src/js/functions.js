import { form, messages } from './references.js';
let DB;

// Nos conectamos a la Base de datos de indexDB
const conectarDB = () => {
    const abrirConexion = window.indexedDB.open( 'crm', 1 );
    abrirConexion.onerror = () => {
        imprimirAlerta( 'Hubo un error', 'error' );
    }
    
    abrirConexion.onsuccess = () => {
        DB = abrirConexion.result;
    }
}

// Muestra una alerta en pantalla
const imprimirAlerta = ( message, type, where ) => {
    const alert = document.querySelector( '.alert' );

    if( !alert ) {
        const divMessage = document.createElement( 'div' );
        divMessage.classList.add( 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alert' );
        
        if( type === 'error' ) {
            divMessage.classList.add( 'bg-red-100', 'border-red-400', 'text-red-700' );
        } else {
            divMessage.classList.add( 'bg-green-100', 'border-green-400', 'text-green-700' );
        }

        divMessage.textContent = message;


        if( where === 'form' ) {
            form.appendChild( divMessage );
        } else {
            messages.appendChild( divMessage );
        }

        setTimeout( () => {
            divMessage.remove();
        }, 3000 );
    }
}

export {
    imprimirAlerta,
    conectarDB,
    DB
}