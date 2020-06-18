const mongoose = require('mongoose');
const Place = require('../models/Place.model');
const DB_NAME = 'mypetapp';

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const places = [
    {
        type: 'park',
        name: 'Parque de la Ciudadela',
        location: 'Passeig de Picasso, 21, 08003 Barcelona',
        dimension: '17,42 ha',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Cascada_del_Parque_de_la_Ciudadela%2C_Barcelona_DSC01898.jpg',
        persons: 0
    },
    {
        type: 'park',
        name: 'Parque de la Pegaso',
        location: 'Carrer Sagrera, 179, 08027 Barcelona',
        dimension: '3,65 ha',
        image: 'https://media-edg.barcelona.cat/wp-content/uploads/2016/01/AZ8Q4099-760x428.jpg',
        persons: 0
    }

];

Place.create(places, err => {
if (err) {
    throw err;
}
console.log(`Base Datos creada con exito ${places.length} places`);
mongoose.connection.close();
});