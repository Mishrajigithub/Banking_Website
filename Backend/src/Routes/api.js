import express from 'express';
import UserModel from '../model/userSchema.js';
import { check, validationResult } from 'express-validator';
import TransactionModel from '../model/TtransactionSchema.js';

const router = express.Router();

// api to view all user
router.get("/allUsers", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});


//api to view single user
router.get("/user/:acc_no", async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.acc_no });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});




router.get("/history", async (req, res) => {
  try {
    const history = await TransactionModel.find()
      .populate('From', ['name'])
      .populate('To', ['name']);
    res.json(history);
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});




// api for transaction of money between two user
router.post("/transaction", [
  check("amount", "Enter amount for transfer").isNumeric(),
  check("From", "Enter source account number").not().isEmpty(),
  check("To", "Enter destination account number").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, From, To } = req.body;
    const amnt = parseInt(amount);

    try {
      const from_user = await UserModel.findOne({ _id: From });
      const to_user = await UserModel.findOne({ _id: To });

      if (!from_user || !to_user) {
        return res.status(404).send("One or both users do not exist");
      }

      if (amnt > from_user.acc_balance) {
        return res.status(400).send("Amount exceeds the account balance");
      }

      from_user.acc_balance -= amount;
      to_user.acc_balance += amnt;

      await from_user.save();
      await to_user.save();

      const transaction = new TransactionModel({ From: from_user._id, To: to_user._id, amount });
      await transaction.save();

      res.send("Transaction successful");
    } catch (e) {
      console.error(e);
      res.status(500).send("Server Error");
    }
  }
);

export default router;
