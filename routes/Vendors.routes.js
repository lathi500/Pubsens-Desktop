const express = require('express');
const vendorsroute = express.Router();
const app = new express();
const auth = require('../auth');
const multer  = require('multer');




const storage = {
    storage: multer.diskStorage({
        destination: './uploads',
        filename: function(req, file, callback) {
            callback(null, file.originalname)
        },
    })
}
const upload = multer(storage);

const { deleteAllVendorsData,addVendors, getVendors, updateVendors, deleteVendors,getVendorsById } = require('../controllers/vendors.controllers');



vendorsroute.post('/addVendors', upload.single('add_VendorsFile'), /*auth*/ addVendors) 

vendorsroute.get('/getVendors', auth, getVendors)

vendorsroute.get('/getVendors/:id', auth, getVendorsById)

vendorsroute.put('/updateVendors/:id', auth, updateVendors)
    
vendorsroute.put('/deleteVendors/:id', auth, deleteVendors)

vendorsroute.post('/deleteAllVendorsData', /*auth*/ deleteAllVendorsData)

//programmesRoute.post('/delete_mst_AdvertisersData' ,/* auth */ deleteData)
    
module.exports =  vendorsroute;