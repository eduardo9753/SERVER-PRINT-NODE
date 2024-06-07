
import express from 'express';
import { join, dirname, extname } from 'path';
import { engine } from 'express-handlebars';
import cors from 'cors';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

// Importa tus módulos de ruta como módulos ES
import { router as homeRouter } from './routes/home.route.js'; // Cambiado aquí
import { router as printRouter } from './routes/print.route.js';


//inicialization
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//setting
app.set('port', process.env.PORT || 4000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended:false}));
app.use(cors());
app.use(express.json());

//routes
app.use('/', homeRouter);
app.use('/',printRouter);


//public files
app.use(express.static(join(__dirname, 'public')));

//run server
app.listen(app.get('port'), () => console.log('server lisening on port', app.get('port')));