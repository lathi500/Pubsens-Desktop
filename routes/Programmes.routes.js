const express = require('express')
const app = new express();
const auth = require('../auth');
const mst_ProgrammesRoutes = express.Router();
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

// let mst_Programmes = require('../model/mst_Programmes');

const { delete_mst_Programmes_Data,add_mst_Programmes, read_mst_Programmes, read_mst_ProgrammesById, update_mst_Programmes,delete_mst_Programmes } = require('../controllers/Programmes_controller');

mst_ProgrammesRoutes.post('/add_mst_Programmes',upload.single('add_Programmes'), /*auth*/ add_mst_Programmes) 
    
mst_ProgrammesRoutes.get('/read_mst_Programmes', auth, read_mst_Programmes)

mst_ProgrammesRoutes.get('/read_mst_ProgrammesById/:id', auth, read_mst_ProgrammesById)

mst_ProgrammesRoutes.put('/update_mst_Programmes', auth, update_mst_Programmes)
    
mst_ProgrammesRoutes.delete('/delete_mst_Programmes/:id' ,auth, delete_mst_Programmes)

mst_ProgrammesRoutes.post('/delete_mst_Programmes_Data' ,/*auth */ delete_mst_Programmes_Data)

module.exports = mst_ProgrammesRoutes;