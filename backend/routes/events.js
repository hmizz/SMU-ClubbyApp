const express = require("express");

const Event = require("../models/event");

const router = express.Router();

router.post("", (req, res, next) => {
    const event = new Event({
        title: req.body.title,
        organizer: req.body.organizer,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        description: req.body.description,
        topic: req.body.topic
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