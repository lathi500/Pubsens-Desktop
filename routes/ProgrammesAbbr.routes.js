const express = require('express');
const programmesRoute = express.Router();
const app = new express();
const multer  = require('multer');
const auth = require("../auth");


const storage = {
    storage: multer.diskStorage({
        destination: './uploads',
        filename: function(req, file, callback) {
            callback(null,file.originalname)
        },
    })
}


const upload = multer(storage);


const { addProgrammesAbbr,getProgrammesAbbrById,getProgrammesAbbr, updateProgrammesAbbr, deleteProgrammesAbbr,deleteAllProgrammesAbbrData } = require('../controllers/programmesAbbr.controller');



// let mst_Advertisers = require('../model/mst_Advertisers');
 
programmesRoute.post('/addprogrammesAbbr', upload.single('add_PrpgrmmesAbbrFile'), /*auth*/ addProgrammesAbbr);
    
//mst_AdvertisersRoute.get('/rea', read_mst_Advertisers)

programmesRoute.get('/getProgrammesAbbrById/:id', auth,  getProgrammesAbbrById)

programmesRoute.get('/getProgrammesAbbr/:id', auth,  getProgrammesAbbr)

programmesRoute.put('/updateProgrammesAbbr/:id', auth,  updateProgrammesAbbr)
    
programmesRoute.put('/deleteProgrammesAbbr/:id', auth, deleteProgrammesAbbr)

programmesRoute.post('/deleteAllProgrammesAbbrData', auth, deleteAllProgrammesAbbrData)

//programmesRoute.post('/delete_mst_AdvertisersData' ,/* auth */ deleteData)
    
module.exports =  programmesRoute;