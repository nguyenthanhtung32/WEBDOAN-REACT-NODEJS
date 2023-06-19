const passport = require("passport");
const express = require("express");

const { CONNECTION_STRING } = require("../constants/dbSettings");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const { Bank } = require("../models");

const encodeToken = require("../helpers/jwtHelper");

// Methods: POST / PATCH / GET / DELETE / PUT
// Get all

router.get("/:id", async (req, res, next) => {
    // Validate
    try {
        const { id } = req.params;

        let results = await Bank.findById(id).lean({ virtuals: true });

        if (results) {
            return res.send({ ok: true, result: results });
        }

        return res.send({ ok: false, message: "Object not found" });
    } catch (err) {
        return res.status(400).json({
            type: err.name,
            errors: err.errors,
            message: err.message,
            provider: "yup",
        });
    }
});

// Create new data
router.post("/", async function (req, res, next) {
    try {
        const data = req.body;

        const newItem = new Bank(data);
        newItem
            .save()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send({ message: err.message });
            });
    } catch (err) {
        res.sendStatus(500);
    }
});

// ------------------------------------------------------------------------------------------------
// Delete data
router.delete("/:id", function (req, res, next) {
    try {
        const { id } = req.params;
        Bank.findByIdAndDelete(id)
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.status(400).send({ message: err.message });
            });
    } catch (err) {
        res.sendStatus(500);
    }
});

router.patch("/:id", async function (req, res, next) {
    try {
        const id = req.params.id;
        const patchData = req.body;
        await Bank.findByIdAndUpdate(id, patchData);

        res.send({ ok: true, message: "Updated" });
    } catch (error) {
        res.status(500).send({ ok: false, error });
    }
});

module.exports = router;