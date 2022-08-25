import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';

import './style/style.scss';


// const express = require('express')
// const path = require('path')
const PORT = process.env.PORT || '8080'

app = express();

app.set("port", PORT)

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);