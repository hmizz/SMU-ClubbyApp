const express = require("express");
const multer = require("multer");

const Club = require("../models/club");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime tpe");
    if (isValid) {
      error= null;
    }
    cb(null, "backend/images");
  },
  filename: (req , file, cb)=>{
    const name= file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post("",multer({storage: storage}).single("image"),(req, res, next) => {
    const url = req.protocol+ '://' + req.get("host");
    const club = new Club({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        event: [],
        imagePath: url + "/images/" + req.file.filename
    });
    club.save().then(createdClub => {
        res.status(201).json({
            message: 'club added successfully',
            club: {
              ...createdClub,
              id:createdClub._id

            }
        });
    });
});

router.get("", (req, res, next) => {
    Club.find({approved: true}).then(documents => {
        res.status(200).json({
            message: 'clubs sent succefully',
            clubs: documents
        });
    });
});

router.get("/clubstoapprove", (req, res, next) => {
    Club.find({approved: false}).then(documents => {
        res.status(200).json({
            message: 'clubsto approve sent succefully',
            clubs: documents
        });
    });
});

router.get("/:id",(req,res,next)=>{
    Club.findById(req.params.id).then(club=>{
      if (club){
        res.status(200).json(club);
  
      } else {
        res.status(404).json({message: 'Club not found!'});
      }
    })
  });

router.put("/:id",(req,res,next)=>{
    Club.updateOne({_id: req.params.id},{approved: true}).then(result=>{
      res.status(200).json({message: "Update successful"});
    });
  });

  router.delete("/:id",(req, res, next)=>{
    Club.deleteOne({_id: req.params.id}).then(result=>{
      console.log(result);
    })
    res.status(200).json({ message: "Event deleted!"});
  });

module.exports = router;