var express = require('express');
var app = express.Router();
var bodyParser = require('body-parser');


app.use(bodyParser.json());

app.post('/getDocument', async(req, res)=> {
    if (req.body.document_name.length === 0 || req.body.id.length === 0) {
        res.status(404).send('document name or id is empty');
    }

    var fileType = req.body.document_name;
    console.log(`documentsGet -> ${fileType}`);

    var filePath = null;
    var contentType = null;
    var fileName = null;
    if (fileType === 'resume') {
        fileName = `${req.body.id}_resume.pdf`
        filePath = `${__dirname}/files/${fileName}`;
        contentType = "application/pdf";
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    }
    else {
        fileName = `${req.body.id}_profilePic.png`
        filePath = `${__dirname}/files/${fileName}`;
        contentType = "image/png";
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    }

    console.log(`documentsGet - filePath: ${filePath}, contentType: ${contentType}`);

    if (!fileExists(filePath)) {
        console.log(`documentsGet - filePath: ${filePath}, contentType: ${contentType} -> Does not Exist!`);
        res.status(404);
        res.send();
        return;
    }

    var stat = fileSystem.statSync(filePath);
    res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': stat.size
    });

    var stream = fileSystem.createReadStream(filePath);
    console.log(`documentsGet - readStream: returning file`);
    stream.pipe(res)
});