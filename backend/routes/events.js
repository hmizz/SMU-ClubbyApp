const express = require("express");
const multer = require("multer");
const Event = require("../models/event");

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
    const event = new Event({
        title: req.body.title,
        organizer: req.body.organizer,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        description: req.body.description,
        topic: req.body.topic,
        imagePath: url + "/images/" + req.file.filename
    });
    event.save().then(createdEvent=>{
        res.status(201).json({
            message: 'event added successfully',
            eventId: createdEvent._id
        });
    });
});

router.put("/:id",(req,res,next)=>{
  const event = new Event({
    title: req.body.title,
    organizer: req.body.organizer,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    description: req.body.description,
    topic: req.body.topic,
    _id : req.body.id
});
  Event.update({_id: req.params.id},event).then(result=>{
    console.log(result);
    res.status(200).json({message: "Update successful"});
  });
});
router.put("/approve/:id",(req,res,next)=>{

    Event.updateOne({_id: req.params.id},{approved : true}).then(result=>{
      console.log(result);
      res.status(200).json({message: "Update successful"});
    });
  
  });
  
router.get("/:id",(req,res,next)=>{
    Event.findById(req.params.id).then(event=>{
      if (event){
        res.status(200).json(event);
  
      } else {
        res.status(404).json({message: 'Event not found!'});
      }
    })
  });
  
router.delete("/:id",(req, res, next)=>{
    Event.deleteOne({_id: req.params.id}).then(result=>{
      console.log(result);
    })
    res.status(200).json({ message: "Event deleted!"});
  });

router.get("", (req, res, next) => {
    Event.find({approved: true}).then(documents => {
        res.status(200).json({
            message: 'events sent succefully',
            events: documents
        });
    });
});

router.patch("/eventstoapprove", (req, res, next) => {
  Event.find({approved: false}).then(documents => {
      res.status(200).json({
          message: 'events to approve sent succefully',
          events: documents
      });
  });
});

module.exports = router;