const multer = require('multer');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/../images-uploaded`);
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.'
            + file.originalname.split('.')[file.originalname.split('.').length
            - 1]);
    }
});

var upload = multer({
    storage: storage
}).single('file');

module.exports = {
    upload
}