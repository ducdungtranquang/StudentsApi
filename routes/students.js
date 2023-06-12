const express = require('express');
const router = express.Router();
const Student = require('../model/student');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new student
router.post('/', async (req, res) => {
  const student = new Student(req.body);
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get student per class

router.get('/:id', async(req,res) =>{
  const id = req.params.id
  try {
    const students = await Student.find({ class: id }).populate('class');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
module.exports = router;
