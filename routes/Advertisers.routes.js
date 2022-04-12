const express = require('express');
const mst_AdvertisersRoute = express.Router();
//const app = new express();
const multer  = require('multer');
const auth = require("../auth");

const storage = {
    storage: multer.diskStorage({
        destination: './uploads',
        filename: function(req, file, callback) {
            callback(null, file.originalname)    
        },
    })
}

const upload = multer(storage);

const { add_mst_Advertisers,deleteData, read_mst_Advertisers, read_mst_AdvertisersById, update_mst_Advertisers, delete_mst_Advertisers } = require('../controllers/Advertiser.controller');

// let mst_Advertisers = require('../model/mst_Advertisers');
// mst_AdvertisersRoute.get('/add_mst_Advertisers', (req, res) => {
//     res.render('index.html');
//   });

mst_AdvertisersRoute.post('/add_mst_Advertisers', upload.single('add_AdvertisersFile'), add_mst_Advertisers) 

mst_AdvertisersRoute.get('/read_mst_Advertisers', auth, read_mst_Advertisers)

mst_AdvertisersRoute.get('/read_mst_AdvertisersById/:id', auth, read_mst_AdvertisersById)

mst_AdvertisersRoute.put('/update_mst_Advertisers/:id', auth, update_mst_Advertisers)
    
mst_AdvertisersRoute.put('/delete_mst_Advertisers/:id' ,auth, delete_mst_Advertisers)

mst_AdvertisersRoute.post('/delete_mst_AdvertisersData' ,/* auth */ deleteData)
    
module.exports =  mst_AdvertisersRoute;