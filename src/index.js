const path = require('path');
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars'); // Thay đổi tên biến này thành exphbs
const route = require('./routes');
const methodOverride = require('method-override')
const db = require('./config/db/index');

const SortMiddleware = require('./app/middleware/SortMiddleware');

// connect DB;
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded(
    {
        extended: true
    }
));

app.use(express.json());

app.use(methodOverride('_method'))

// custom middleware
app.use(SortMiddleware);

// HTTP Logger
app.use(morgan('combined'));

// Template Engine
app.engine('hbs', exphbs(
    {
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                </a>`

            }
        }
    }
));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
