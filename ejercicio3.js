
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(texto) {
    return new Promise(resolve => rl.question(texto, resolve));
}

async function principal() {
    const vendedor = (await preguntar('Nombre del vendedor: ')).trim();
    const producto = (await preguntar('Nombre del producto: ')).trim();

    const entradaPrecio = await preguntar('Precio base del producto ($): ');
    const precio = parseFloat(entradaPrecio);

    if (
        entradaPrecio.trim() === '' ||
        isNaN(precio) ||
        precio <= 0
    ) {
        console.log('Error: el precio debe ser un número positivo.');
        rl.close();
        return;
    }

    console.log('\n--- CATEGORÍAS DE PRODUCTOS ---');
    console.log('A. Línea Blanca (10% de descuento)');
    console.log('B. Electrónica (5% de descuento)');
    console.log('C. Mueblería (15% de descuento)');
    console.log('D. Accesorios/Varios (0% de descuento)');

    const entradaCategoria = await preguntar('Seleccione la categoría: ');
    const categoria = entradaCategoria.trim().toUpperCase();

    let nombreCategoria;
    let porcentajeDescuento;

    switch (categoria) {
        case 'A':
            nombreCategoria = 'Línea Blanca';
            porcentajeDescuento = 0.10;
            break;

        case 'B':
            nombreCategoria = 'Electrónica';
            porcentajeDescuento = 0.05;
            break;

        case 'C':
            nombreCategoria = 'Mueblería';
            porcentajeDescuento = 0.15;
            break;

        case 'D':
            nombreCategoria = 'Accesorios/Varios';
            porcentajeDescuento = 0;
            break;

        default:
            console.log('Error: la categoría seleccionada no existe.');
            rl.close();
            return;
    }

    const descuento = precio * porcentajeDescuento;
    const subtotal = precio - descuento;

    const respuestaGarantia = (
        await preguntar('¿Desea garantía extendida por $25.00? (S/N): ')
    ).trim().toUpperCase();

    let garantia = 0;

    if (respuestaGarantia === 'S') {
        garantia = 25;
    } else if (respuestaGarantia === 'N') {
        garantia = 0;
    } else {
        console.log('Error: responda únicamente S o N.');
        rl.close();
        return;
    }

    const subtotalConGarantia = subtotal + garantia;
    const iva = subtotalConGarantia * 0.13;
    const total = subtotalConGarantia + iva;
    const totalRedondeado = Math.round(total);

    const fecha = new Date();

    console.log('\n============================================');
    console.log('          FACTURA DE VENTA');
    console.log('============================================');
    console.log(`Fecha: ${fecha.toLocaleDateString()}`);
    console.log(`Hora de emisión: ${fecha.toLocaleString()}`);
    console.log(`Vendedor: ${vendedor}`);
    console.log(`Producto: ${producto}`);
    console.log(`Categoría: ${nombreCategoria}`);
    console.log('--------------------------------------------');
    console.log(`Precio base:             $${precio.toFixed(2)}`);
    console.log(`Descuento (${(porcentajeDescuento * 100).toFixed(0)}%):          -$${descuento.toFixed(2)}`);
    console.log(`Subtotal con descuento:  $${subtotal.toFixed(2)}`);
    console.log(`Garantía extendida:      $${garantia.toFixed(2)}`);
    console.log(`Subtotal acumulado:      $${subtotalConGarantia.toFixed(2)}`);
    console.log(`IVA (13%):               $${iva.toFixed(2)}`);
    console.log('--------------------------------------------');
    console.log(`TOTAL A PAGAR:           $${total.toFixed(2)}`);
    console.log(`Cobro aproximado:        $${totalRedondeado.toFixed(2)}`);
    console.log('============================================');
    console.log('        Gracias por su compra uwu ');
    console.log('============================================');

    rl.close();
}

principal();
```
