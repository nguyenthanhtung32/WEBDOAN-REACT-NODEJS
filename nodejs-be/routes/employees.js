const passport = require("passport");
const express = require("express");

const { CONNECTION_STRING } = require("../constants/dbSettings");
const { default: mongoose } = require("mongoose");
const { Employee } = require("../models");
const { validateSchema, getEmployeeSchema } = require("../validation/employees");
const { getIdSchema } = require("../validation/getId");
const { loginSchema } = require("../validation/login");
const encodeToken = require("../helpers/jwtHelper");

// MONGOOSE
mongoose.set("strictQuery", false);
mongoose.connect(CONNECTION_STRING);

const router = express.Router()
router.post(
  "/login",
  validateSchema(loginSchema),
//   passport.authenticate("local", { session: false }),
    
  async (req, res, next) => {
    try {
      const { email , password } = req.body;

      console.log('req.body', req.body);

      const employee = await Employee.findOne({ email , password });

      if (!employee) return res.status(404).send({ message: "Not found" });

      const { _id, email: empEmail, firstName, lastName } = employee;

      const token = encodeToken(_id, empEmail, firstName, lastName);

      res.status(200).json({
        token,
        payload: employee,
      });
    } catch (err) {
      res.status(401).json({
        statusCode: 401,
        message: "Unauthorized",
      });
    }
  }
);
  
// router.post(
//     '/login',
//     validateSchema(loginSchema),
//     async (req, res) => {
//       const { email, password } = req.body;
  
//       try {
//         const employee = await Employee.findOne({ email });
//         if (!employee) {
//           return res.status(404).json({ message: 'User not found' });
//         }
  
//         const isMatch = await bcrypt.compare(password, employee.password);
  
//         if (!isMatch) {
//           return res.status(400).json({ message: 'Invalid password' });
//         }
  
//         const payload = { 
//           _id: employee._id, 
//           email: employee.email,
//           firstName: employee.firstName,
//           lastName: employee.lastName,
//           timestamp: new Date().getTime()
//         };
//         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
//         return res.status(200).json({ 
//           token,
//           payload
//         });
//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//       }
//     }
//   );

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      console.log("<<<<<< req.user >>>>>>", req.user);
      const employee = await Employee.findById(req.user._id);

      if (!employee) return res.status(404).send({ message: "Not found" });

      res.status(200).json(employee);
    } catch (err) {
      res.sendStatus(500);
    }
  }
);

//GET ALL
router.get("/", validateSchema(getEmployeeSchema), async (req, res, next) => {
  try {
    const { limit, skip } = req.query;

    const conditionFind = {};

    let results = await Employee.find(conditionFind).skip(skip).limit(limit).lean({ virtuals: true });

    const totalResults = await Employee.countDocuments(conditionFind);

    res.json({
      payload: results,
      total: totalResults,
    });

  } catch (error) {
    console.log("error", error);
    res.status(500).json({ ok: false, error });
  }
});

// GET:/id
router.get("/:id", validateSchema(getIdSchema), async (req, res, next) => {
  // Validate
  try {
    const { id } = req.params;

    let results = await Employee.findById(id).lean({ virtuals: true });

    if (results) {
      return res.send({ ok: true, result: results });
    }

    return res.send({ ok: false, message: "Object not found" });
  } catch (err) {
    return res.status(400).json({ type: err.name, errors: err.errors, message: err.message, provider: 'yup' });
  }
});

// POST
router.post("/", function (req, res, next) {
  try {
    const data = req.body;

    const newItem = new Employee(data);
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

// PATCH/:id
router.patch("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const patchData = req.body;
    await Employee.findByIdAndUpdate(id, patchData);

    res.send({ ok: true, message: "Updated" });
  } catch (error) {
    res.status(500).send({ ok: false, error });
  }
});


// DELETE
router.delete("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    Employee.findByIdAndDelete(id)
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

module.exports = router;