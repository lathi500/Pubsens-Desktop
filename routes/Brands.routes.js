const express = require('express')
const app = new express();
const auth = require('../auth');
const multer  = require('multer');
const mst_BrandsRoute = express.Router();

const storage = {
    storage: multer.diskStorage({
        destination: './uploads',
        filename: function(req, file, callback) {
            callback(null, file.originalname)
        },
    })
}

const upload = multer(storage);

const { delete_mst_Brands_Data, add_mst_Brands, read_mst_Brands, read_mst_BrandsById,update_mst_Brands, delete_mst_Brands } = require('../controllers/Brands.contraller');

mst_BrandsRoute.post('/add_mst_Brands',  upload.single('add_BrandFile'),/*auth*/ add_mst_Brands) 
    
mst_BrandsRoute.get('/read_mst_Brands', auth, read_mst_Brands)

mst_BrandsRoute.get('/read_mst_Brands/:id', auth, read_mst_BrandsById)

mst_BrandsRoute.put('/update_mst_Brands/:id', auth, update_mst_Brands)
    
mst_BrandsRoute.delete('/delete_mst_Brands/:id' ,auth, delete_mst_Brands)

mst_BrandsRoute.post('/delete_mst_Brands_Data' ,/*auth*/ delete_mst_Brands_Data)
    
module.exports = mst_BrandsRoute;