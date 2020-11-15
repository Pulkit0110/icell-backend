const Sponsor = require('../../models/sponsors');

exports.addSponsors = (req,res,next) => {
    const name = req.body.name;
    const image = req.file;
    const imageUrl = '/' + image.path();

    const sponsor = new Sponsor({
        name: name,
        imageUrl: imageUrl
    });

    sponsor.save()
    .then(result => {
        res.status(201).json({
            sponsor: result,
            message: "Sponsor added successfully"
        });
    })
    .catch(err => {
        console.log(err);
    })
}