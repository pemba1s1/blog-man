const mongoose = require("mongoose");

let gfs;
const conn = mongoose.createConnection(process.env.MONGO_URI);
conn.once("open", function () {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos',
      });
});

const uploadFile =async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgId = req.file.id;
    return res.send(imgId);
}

const getFile = ({ params: { id } }, res) => {
    try {
        if (!id || id === 'undefined') return res.status(400).send('no image id');
        const _id = new mongoose.Types.ObjectId(id);
        gfs.find({ _id }).toArray((err, files) => {
            if (!files || files.length === 0)
              return res.status(400).send('no files exist');
            // if a file exists, send the data
            gfs.openDownloadStream(_id).pipe(res);
          });
    } catch (error) {
        console.log(error)
        res.send("not found");
    }
}

const deleteFile = ({ params: { id } }, res) => {
    try {
        if (!id || id === 'undefined') return res.status(400).send('no image id');
        const _id = new mongoose.Types.ObjectId(id);
        gfs.delete(_id, (err) => {
            if (err) return res.status(500).send('image deletion error');
        });
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
}

module.exports = {getFile,deleteFile,uploadFile}