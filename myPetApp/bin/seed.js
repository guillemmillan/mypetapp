const mongoose = require('mongoose');
const Place = require('../models/Place.model');
const DB_NAME = 'mypetapp';

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const places = [{
        type: 'park',
        name: 'Parque de la Ciudadela',
        location: 'Passeig de Picasso, 21, 08003 Barcelona',
        dimension: '17,42 ha',
        description: `El parque de la Ciudadela (en catalán parc de la Ciutadella) se encuentra en el distrito de Ciutat Vella, en Barcelona (España). Durante muchos años fue el único parque público de la Ciudad Condal. Fue trazado en los antiguos terrenos de la fortaleza de la Ciudadela —de ahí su nombre—, a imagen y semejanza del jardín de Luxemburgo de París. Fue diseñado por José Fontseré e inaugurado en 1881. Pocos años después, en 1888, acogió a la Exposición Universal de Barcelona.
        Está situado en el barrio de la Ribera, en el triángulo comprendido entre la estación de Francia, el Arco de Triunfo y la Villa Olímpica. Está delimitado por cuatro vías principales: el paseo de Pujades, el paseo de Picasso, el paseo de Circunvalación y la calle de Wellington. Dispone de diez accesos y tiene una extensión de 17,42 hectáreas (31 con el Zoo de Barcelona). Es el parque urbano más grande de Barcelona después del de Montjuic.1
        En el parque se encuentra el antiguo Arsenal de la Ciudadela, actual sede del Parlamento de Cataluña, además de diversos edificios: dos antiguos museos que forman parte del Museo de Ciencias Naturales de Barcelona (en curso de reafectación), una iglesia y un colegio (IES Verdaguer), además del Umbráculo y el Invernáculo, dedicados a la conservación de especies botánicas. También alberga el Zoo de Barcelona. En su terreno se halla una extensa colección de arte público que lo convierte en un museo de esculturas al aire libre.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Cascada_del_Parque_de_la_Ciudadela%2C_Barcelona_DSC01898.jpg',
        persons: 0
    },
    {
        type: 'park',
        name: 'Parque de la Pegaso',
        location: 'Carrer Sagrera, 179, 08027 Barcelona',
        dimension: '3,65 ha',
        description: `Este parque se halla en el terreno de la antigua fábrica ENASA (Empresa Nacional de Autocamiones, Sociedad Anónima),
        constructora de los famosos camiones Pegaso. Aún se conservan algunos restos de la antigua factoría, como la puerta de entrada y el edificio de oficinas, destinado a equipamientos del barrio. En 1986 se acondicionó la zona y se creó el nuevo parque, que combina el paisajismo con espacios lúdicos y deportivos.
        Se perciben tres áreas principales: la de juegos infantiles; una zona de aspecto más arquitectónico, con paredes y columnas con pérgolas, que aloja varias pistas deportivas; y la zona paisajística, que es quizá el elemento más destacado del parque, con un estanque de trazado sinuoso que recorre buena parte del parque como un canal, atravesado por varios puentes, uno de ellos curvado, al estilo japonés.
        El canal circunda una extensa área verde que adquiere cierta altura en varios puntos, con miradores que ofrecen una amplia vista del conjunto. (edited) 
        12:37
        El parque de la Pegaso es un parque público de Barcelona que se encuentra en el Distrito de Sant Andreu. Fue creado en 1986 por Enric Batlle y Joan Roig`,
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