const homeController = {};

homeController.index = (req, res) => {
    try {
        res.render('home/index.hbs')
    } catch (error) {
        console.log('Error: ' + error);
    }
}

export { homeController }; // Exporta tu controlador
