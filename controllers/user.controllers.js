
let users = require('../model/Users');
const excelToJson = require('convert-excel-to-json');
const reader = require('xlsx');
let path = require('path');

exports.addUsers = async (req, res, next) => {
    
    const file = path.join(__dirname, '../updatedFile/' + req.file.originalname)
    
    const result = excelToJson({
        sourceFile: path.join(__dirname, '../uploads/' + req.file.originalname),
        sheets:[{
            name: 'Sheet1',
            columnToKey: {
                A: 'UserID',
                B: 'RoleID',
                C: 'FullName',
                E: 'LLName',
                F: 'EmailId',
                G: 'IsActive',
                H: 'CreatedDate',
                I: 'ModifiedBy',
                J: 'ModifiedDate',
                K: 'password_reset_dt',
                L: 'RESET_DT'
            }
        }]
    });
   
    const start = window.performance.now(); 
    result.Sheet1.shift();
    for(let i = 0;i < result.Sheet1.length;i++)
    {
        const start = window.performance.now(); 
        const { FullName,LLName } = result.Sheet1[i];
        const oldUser = await  users.findOne({ FullName,LLName });

        if(oldUser)
        {
            users.updateOne(result.Sheet1[i], () => 
            {
                    const workBook = reader.utils.book_new()
                    result.Sheet1[i].Rmark = 'update'
                    const workShit = reader.utils.json_to_sheet(result.Sheet1);
                    reader.utils.book_append_sheet(workBook, workShit)
                    reader.writeFile(workBook,`./updatedFile/${req.file.originalname}`); 
            })
        }
        else
        {
            users.create(result.Sheet1[i], () => 
            {
                    const workBook = reader.utils.book_new()
                    result.Sheet1[i].Rmark = 'Isert'
                    const workShit = reader.utils.json_to_sheet(result.Sheet1);
                    reader.utils.book_append_sheet(workBook, workShit)
                    reader.writeFile(workBook,`./updatedFile/${req.file.originalname}`);
            })
        }
        const stop = window.performance.now();
        result.Sheet1[i].Time = `${(stop - start)/1000} seconds`;
    }
    const stop = window.performance.now();
    console.log(` Time Taken For Processing Data: ${(stop - start)/1000} seconds`);
    
    res.sendFile(file, (err) =>
    {
        if(err)
        {
            next(err);
        }
        else
        {
            console.log("Updated File Downloaded Successfully.")
        }
    })
}

exports.getUsers = (req, res, next) =>
{
    users.find((error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    })
}

exports.getUsersByID = (req, res, next) =>
{
    users.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    })
}


exports.updateUser = (req, res, next) =>
{
    users.findByIdAndUpdate(req.params.id,
        {
            $set: req.body
        }, { new: true }, (error, data) => {
            if (error) {
                return next(error);
                console.log(error);
            }
            else {
                //console.log(data);
                res.json(data);
                console.log("Data Updated..")
            }
        })
}

exports.deleteUsers = (req, res, next) =>
{

    users.findByIdAndUpdate (req.params.id, {
        $set: 
        {
            IsActive: 0
        }
    }, {new:  true}, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.status(200).json({
                msg: data
            })
        }
    })
}

exports.deleteUsersAllData = async (req, res) =>
{
   await users.deleteMany();
    res.json("Data deleted....")
}
