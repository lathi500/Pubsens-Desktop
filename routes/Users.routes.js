const express = require('express');
const usersroute = express.Router();
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

const {deleteUsersAllData,getUsersByID, addUsers, getUsers, updateUser, deleteUsers } = require('../controllers/user.controllers');



usersroute.post('/addUsers', upload.single('add_UsersFile'), addUsers) 

usersroute.get('/getUsers', auth, getUsers)
    
usersroute.get('/getUsers/:id', auth,  getUsersByID)

usersroute.put('/updateUsers/:id', auth, updateUser)
    
usersroute.put('/deleteUsers/:id', auth,  deleteUsers)

usersroute.post('/deleteAllUsersData' ,/*auth */ deleteUsersAllData)
    
module.exports =  usersroute;