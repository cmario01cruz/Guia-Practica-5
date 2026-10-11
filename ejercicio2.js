const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(texto) {
    return new Promise(resolve => rl.question(texto, resolve));
}

async function principal() {
    const huesped = (await preguntar('Nombre del huésped: ')).trim();

    const entradaNoches = await preguntar('Cantidad de noches: ');
    const noches = Number(entradaNoches);

    if (
        entradaNoches.trim() === '' ||
        !Number.isInteger(noches) ||
        noches <= 0
    ) {
        console.log('Error: ingrese una cantidad entera de noches mayor a 0.');
        rl.close();
        return;
    }

    const entradaTarifa = await preguntar('Tarifa base por noche ($): ');
    const tarifaBase = parseFloat(entradaTarifa);

    if (
        entradaTarifa.trim() === '' ||
        isNaN(tarifaBase) ||
        tarifaBase <= 0
    ) {
        console.log('Error: la tarifa debe ser un número mayor a $0.00.');
        rl.close();
        return;
    }

    console.log('\n--- TEMPORADA DE RESERVA ---');
    console.log('1. Temporada Baja (0% de recargo)');
    console.log('2. Temporada Media (15% de recargo)');
    console.log('3. Temporada Alta (35% de recargo)');

    const opcion = (await preguntar('Seleccione la temporada: ')).trim();

    let recargo;

    switch (opcion) {
        case '1':
            recargo = 0;
            break;

        case '2':
            recargo = 0.15;
            break;

        case '3':
            recargo = 0.35;
            break;

        default:
            console.log('Error: la temporada seleccionada no existe.');
            rl.close();
            return;
    }

    const costoNoche = tarifaBase * (1 + recargo);
    let subtotal = costoNoche * noches;
    let descuento = 0;

    if (noches >= 5) {
        descuento = subtotal * 0.10;
        subtotal -= descuento;
    } else {
        console.log('No aplica descuento por estadía larga.');
    }

    const impuesto = subtotal * 0.05;
    const totalExacto = subtotal + impuesto;
    const totalRedondeado = Math.ceil(totalExacto);

    const fechaCheckOut = new Date();
    fechaCheckOut.setDate(fechaCheckOut.getDate() + noches);

    console.log('\n====================================');
    console.log('       LIQUIDACIÓN DE HOSPEDAJE');
    console.log('====================================');
    console.log(`Huésped: ${huesped}`);
    console.log(`Fecha de entrada: ${new Date().toLocaleDateString()}`);
    console.log(`Fecha de check-out: ${fechaCheckOut.toLocaleDateString()}`);
    console.log(`Noches de hospedaje: ${noches}`);
    console.log(`Tarifa base por noche: $${tarifaBase.toFixed(2)}`);
    console.log(`Costo por noche con recargo: $${costoNoche.toFixed(2)}`);
    console.log(`Subtotal del hospedaje: $${(costoNoche * noches).toFixed(2)}`);
    console.log(`Descuento aplicado: $${descuento.toFixed(2)}`);
    console.log(`Subtotal con descuento: $${subtotal.toFixed(2)}`);
    console.log(`Impuesto de turismo (5%): $${impuesto.toFixed(2)}`);
    console.log(`Total exacto: $${totalExacto.toFixed(2)}`);
    console.log(`Total redondeado hacia arriba: $${totalRedondeado.toFixed(2)}`);
    console.log('====================================');

    rl.close();
}

principal();
