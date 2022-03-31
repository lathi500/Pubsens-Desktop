let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  mongoDb = require('./database/db');
  require("dotenv").config();


mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db,{
 
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log('Database sucessfully connected ')
  },
  error => {
    console.log('Database error: ' + error)
  }
)

const LoginRoute = require('./routes/login.routes')
const mst_AdvertisersRoute = require('./routes/Advertisers.routes')
const mst_BrandsRoute = require('./routes/Brands.routes')
const mst_CommercialsRoutes = require('./routes/Commercials.routes')
const mst_ProgrammesRoutes = require('./routes/Programmes.routes')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
 
// app.use(express.static(path.join(__dirname, 'dist/angular-mean-crud-tutorial')));

app.use('/api', mst_AdvertisersRoute)
app.use('/api', mst_BrandsRoute)
app.use('/api', mst_CommercialsRoutes)
app.use('/api', mst_ProgrammesRoutes)
app.use('/api', LoginRoute)

// app.use(express.static(path.join(__dirname,'index.html')));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

const port = process.env.PORT || 8000;
 
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
 
// function createError(res, code){ 
//   res.status(code).send({code});
// }
// // 404 Handler
// app.use((req, res, next) => {
//   next(createError(res, 404));
// });
 

app.get('/', (req, res) => {
  res.render('index.html');
});
 
app.get('*', (req, res) => {
  res.send('test');
});
 

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});