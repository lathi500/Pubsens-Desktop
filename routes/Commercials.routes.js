const express = require('express')
const app = new express();
const auth  = require('../auth');
const multer  = require('multer');
const mst_CommercialsRoute = express.Router();

const storage = {
    storage: multer.diskStorage({
        destination: './uploads',
        filename: function(req, file, callback) {
            callback(null, file.originalname)
        },
    })
}

// let mst_Commercials = require('../model/mst_Commercials');

const upload = multer(storage);

const { delete_mst_Commercials_Data, add_mst_Commercials, read_mst_Commercials, read_mst_CommercialsById, update_mst_Commercials,delete_mst_Commercials } = require('../controllers/Commercials.controller');

mst_CommercialsRoute.post('/add_mst_Commercials', upload.single('add_CommercialsFile'), /*auth */ add_mst_Commercials) 
    
mst_CommercialsRoute.get('/read_mst_Commercials', auth, read_mst_Commercials)

mst_CommercialsRoute.get('/read_mst_CommercialsById/:id', auth, read_mst_CommercialsById)

mst_CommercialsRoute.put('/update_mst_Commercials/:id', auth, update_mst_Commercials)
    
mst_CommercialsRoute.delete('/delete_mst_Commercials/:id' ,auth, delete_mst_Commercials)

mst_CommercialsRoute.post('/delete_mst_Commercials_Data' ,/*auth*/ delete_mst_Commercials_Data)

module.exports = mst_CommercialsRoute;