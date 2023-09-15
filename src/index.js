const path = require('path');
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars'); // Thay đổi tên biến này thành exphbs

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// HTTP Logger
app.use(morgan('combined'));

// Template Engine
app.engine('hbs', exphbs(
    {
        extname: '.hbs'
    }
)); // Sửa tên biến này thành exphbs
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
    res.render('home');
});
app.get('/news', (req, res) => {
    res.render('news');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
