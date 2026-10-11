const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

async function cotizarSeguroVehicular() {
    const rl = readline.createInterface({ input, output });

    try {
        console.log('=== SISTEMA DE COTIZACIÓN DE SEGUROS - AGENCIA DE AUTOS ===\n');

        
        let nombreCliente = await rl.question('Ingrese el nombre completo del cliente: ');
        nombreCliente = nombreCliente.trim().replace(/\s+/g, ' ');

        let vehiculo = await rl.question('Ingrese la marca y modelo del vehículo: ');
        vehiculo = vehiculo.trim().replace(/\s+/g, ' ');

        // 3. Validación Numérica del precio base
        let precioStr = await rl.question('Ingrese el monto base estimado del auto ($): ');
        let precioBase = parseFloat(precioStr);

        if (isNaN(precioBase) || precioBase <= 0) {
            console.log('\n Error: El valor ingresado no es un número válido o es menor/igual a $0.00.');
            rl.close();
            return;
        }

        
        console.log('\n--- Seleccione el tipo de vehículo ---');
        console.log('1: Sedán (Prima del 5%)');
        console.log('2: SUV (Prima del 8%)');
        console.log('3: Pick-up / Camioneta (Prima del 12%)');

        let opcionStr = await rl.question('Ingrese una opción (1-3): ');
        let opcion = parseInt(opcionStr);

        let porcentajePrima = 0;
        let tipoVehiculoTexto = '';

        
        switch (opcion) {
            case 1:
                porcentajePrima = 0.05;
                tipoVehiculoTexto = 'Sedán';
                break;
            case 2:
                porcentajePrima = 0.08;
                tipoVehiculoTexto = 'SUV';
                break;
            case 3:
                porcentajePrima = 0.12;
                tipoVehiculoTexto = 'Pick-up / Camioneta';
                break;
            default:
                console.log('\n Error: La opción seleccionada del menú no existe.');
                rl.close();
                return;
        }

       
        let primaAnual = precioBase * porcentajePrima;
        let totalAnual = precioBase + primaAnual; // O costo total estimado con seguro incluido

        
        let fechaCotizacion = new Date().toLocaleString();

        
        console.log('\n========================================');
        console.log('       REPORTE DETALLADO DE COTIZACIÓN');
        console.log('========================================');
        console.log(` Fecha y hora: ${fechaCotizacion}`);
        console.log(` Cliente:      ${nombreCliente}`);
        console.log(` Vehículo:     ${vehiculo} (${tipoVehiculoTexto})`);
        console.log(` Valor Base:   $${precioBase.toFixed(2)}`);
        console.log(` Prima Anual:  $${primaAnual.toFixed(2)}`);
        console.log(` Total Anual:  $${totalAnual.toFixed(2)}`);
        console.log('========================================');

    } catch (error) {
        console.error('Ocurrió un error inesperado:', error);
    } finally {
        rl.close();
    }
}

cotizarSeguroVehicular();
