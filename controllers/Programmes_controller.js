let excelToJson = require('convert-excel-to-json');
let path = require('path');
const reader = require('xlsx');
let mst_Programmes = require('../model/Programmes');

exports.add_mst_Programmes = async (req, res, next) => 
{

    const file = path.join(__dirname, '../updatedFile/' + req.file.originalname)

    const result = excelToJson({
        sourceFile: path.join(__dirname, '../uploads/' + req.file.originalname),

        sheets:[{
            name: 'Sheet1',
            columnToKey: {
                A: 'ProgrammeID',
                B: 'SourceProgrammeName',
                C: 'ProgrammeName',
                D: 'IsActive',
                E: 'CreatedBy',
                F: 'CreatedDate',
                G: 'ModifiedBy',
                H: 'ModifiedDate',
                J: 'Rmark'

            }
        }]
    });
    result.Sheet1.shift();
    for(let i = 0;i < result.Sheet1.length;i++)
    {
        const { SourceProgrammeName,ProgrammeName } = result.Sheet1[i];
        const oldUser = await mst_Programmes.findOne({ SourceProgrammeName,ProgrammeName });

        if(oldUser)
        {
            mst_Programmes.updateOne(result.Sheet1[i], () => 
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
            mst_Programmes.create(result.Sheet1[i], () => 
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

exports.read_mst_Programmes = (req, res, next) =>
{
    mst_Programmes.find((error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    })
}

exports.read_mst_ProgrammesById = (req, res, next) =>
{
    mst_Programmes.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    })
}


exports.update_mst_Programmes = (req, res, next) =>
{
    mst_Programmes.findByIdAndUpdate(req.params.id,
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

exports.delete_mst_Programmes = (req, res, next) =>
{

    mst_Programmes.findByIdAndUpdate (req.params.id, {
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
exports.delete_mst_Programmes_Data = async (req, res) => {
    await mst_Programmes.deleteMany();
    res.json("Data deleted....")
  }