//Importamos los modulos para la impresion
import escpos from 'escpos';
import escposNetwork from 'escpos-network';

//Configuración de la impresora (ajusta según tu impresora)
escpos.Network = escposNetwork;

const printController = {};

printController.index = (req, res) => {
    try {
        const { order } = req.body;
        console.log('datos de la orden: ' + JSON.stringify(order));

        order.order_dishes.forEach(dish => {
            console.log('Id orden dishes: ' + dish.id);
            console.log('Id orden: ' + dish.order_id);
            console.log('Id plato: ' + dish.dish_id);
            console.log('nomre plato: ' + dish.dish.name);
            console.log('Cant: ' + dish.quantity);
        });

        const device = new escpos.Network('192.168.0.100');//IP de la impresora
        const printer = new escpos.Printer(device);

        device.open((error) => {
            if (error) {
                console.log('Error de impresora: ' + error);
                return res.status(500).send('Error al conectarse con la impresora');
            }

            //si hubó conexión, imprimimos los datos a la impresora 
            printer
                .text('Orden Detalles\n')
                .text('==============================\n')

            order.order_dishes.forEach(dish => {
                printer
                    .text(`Dish: ${dish.dish_id}\n`)
                    .text(`Cant: ${dish.quantity}\n`);
            });

            printer.cut();
            printer.close();
            console.log('Orden enviada');
            res.status(200).send('Orden sent to printer');
        });
    } catch (error) {
        console.log('Error Catch: ' + error);
        res.status(500).send('Error Node JS: ' + error);
    }
}

export { printController }