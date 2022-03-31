
let mst_Advertisers = require('../model/Advertisers');
const excelToJson = require('convert-excel-to-json');
const reader = require('xlsx');
let path = require('path');



exports.add_mst_Advertisers = async (req, res, next) => 
{
    const file = path.join(__dirname, '../updatedFile/' + req.file.originalname)

    const result = excelToJson({
        sourceFile: path.join(__dirname, '../uploads/' + req.file.originalname),
        sheets:[{
            name: 'Sheet1',
            columnToKey: {
                A: 'AdvertiserID',
                B: 'SourceAdvertiserName',
                C: 'AdvertiserName',
                D: 'IsActive',
                E: 'CreatedBy',
                F: 'CreatedDate',
                G: 'ModifiedBy',
                H: 'ModifiedDate',
                I: 'Rmark'
            }
        }]
    });
   

    result.Sheet1.shift();
    for(let i = 0;i < result.Sheet1.length;i++)
    {
        const { SourceAdvertiserName,AdvertiserName,ModifiedBy } = result.Sheet1[i];
        const oldUser = await mst_Advertisers.findOne({ SourceAdvertiserName,AdvertiserName,ModifiedBy });

        if(oldUser)
        {
            mst_Advertisers.updateOne(result.Sheet1[i], () => 
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
            mst_Advertisers.create(result.Sheet1[i], () => 
            {
                    const workBook = reader.utils.book_new()
                    result.Sheet1[i].Rmark = 'Isert'
                    const workShit = reader.utils.json_to_sheet(result.Sheet1);
                    reader.utils.book_append_sheet(workBook, workShit)
                    reader.writeFile(workBook,`./updatedFile/${req.file.originalname}`);
                  
            })
        }
    }
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

exports.read_mst_Advertisers = (req, res, next) =>
{
    mst_Advertisers.find((error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    })
}

exports.read_mst_AdvertisersById = (req, res, next) =>
{
    mst_Advertisers.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    })
}


exports.update_mst_Advertisers = (req, res, next) =>
{
    mst_Advertisers.findByIdAndUpdate(req.params.id,
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

exports.delete_mst_Advertisers = (req, res, next) =>
{

    mst_Advertisers.findByIdAndUpdate (req.params.id, {
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

exports.deleteData = async (req, res) =>
{
    await mst_Advertisers.deleteMany();
    res.json("Data deleted....")
}