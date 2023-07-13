const { empModel } = require("../model/dashboardmodel");
const express = require("express");
const empRouter = express.Router();
const { auth } = require("../middleware/auth");

empRouter.post('/employees', auth, async (req, res) => {
    const { firstName, lastName, email, department, salary } = req.body;

    try {
        const employee = new empModel({
            firstName,
            lastName,
            email,
            department,
            salary,
        });

        await employee.save();

        res.send("Employee added successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
});

empRouter.get('/employees', auth, async (req, res) => {
    try {
        const employees = await empModel.find();

        res.json(employees);

    } catch (error) {
        console.error(error);
        res.status(500).json("Something went wrong");
    }
});

empRouter.put('/employees/:id', auth, async (req, res) => {
    const { firstName, lastName, email, department, salary } = req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, email, department, salary }
        );

        res.json(updatedEmployee);

    } catch (error) {

        console.error(error);
        res.status(500).json("Something went wrong");
    }
});

empRouter.delete('/employees/:id', auth, async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.send("Deleted");

    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong ");
    }
});

module.exports = {empRouter};