let { JSDOM } = require("jsdom");
let mst_Brands = require('../model/Brands');
const excelToJson = require('convert-excel-to-json');
const reader = require('xlsx');
let path = require('path');

const { window }  = new JSDOM();

exports.add_mst_Brands = async (req, res, next) => 
{

    const file = path.join(__dirname, '../updatedFile/' + req.file.originalname)

    const result = excelToJson({
        sourceFile: path.join(__dirname, '../uploads/' + req.file.originalname),

        sheets:[{
            name: 'Sheet1',
            columnToKey: {
                A: 'ChannelID',
                B: 'SourceChannelName',
                C: 'ChannelName',
                D: 'VendorID',
                E: 'IsActive',
                F: 'CreatedBy',
                G: 'CreatedDate',
                H: 'ModifiedBy',
                I: 'ModifiedDate',
                J: 'Rmark'
            }
        }]
    });
    const start = window.performance.now(); 
    result.Sheet1.shift();
    for(let i = 0;i < result.Sheet1.length;i++)
    {
        const start = window.performance.now(); 
        const { SourceChannelName,ChannelName } = result.Sheet1[i];
        const oldUser = await mst_Brands.findOne({ SourceChannelName,ChannelName });

        if(oldUser)
        {
            mst_Brands.updateOne(result.Sheet1[i], () => 
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
            mst_Brands.create(result.Sheet1[i], () => 
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

exports.read_mst_Brands = (req, res, next) =>
{
    mst_Brands.find((error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    })
}

exports.read_mst_BrandsById = (req, res, next) =>
{
    mst_Brands.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    })
}


exports.update_mst_Brands = (req, res, next) =>
{
    mst_Brands.findByIdAndUpdate(req.params.id,
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

exports.delete_mst_Brands = (req, res, next) =>
{

    mst_Brands.findByIdAndUpdate (req.params.id, {
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

exports.delete_mst_Brands_Data = async (req, res) => {
    
        await mst_Brands.deleteMany();
        res.json("Data deleted....")
    
}