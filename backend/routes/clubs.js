const express = require("express");

const Club = require("../models/club");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.post("",(req, res, next) => {
    const club = new Club({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        event: []
    });
    club.save().then(createdClub => {
        res.status(201).json({
            message: 'club added successfully',
            clubId:  createdClub._id
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