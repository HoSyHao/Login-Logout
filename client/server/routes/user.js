import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({status: false, message: "User already existed" });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });

  await newUser.save();
  return res.json({ status: true, message: "User registered successfully" });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({status: false, message: "User is not registered" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({status: false, message: "Password is incorrect" });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { maxAge: 360000, httpOnly: true, secure: process.env.NODE_ENV === "production" });
  return res.json({ status: true, message: "login successfully" });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({status: false, message: "user not registered" });
    }

    const token = jwt.sign({id: user._id}, process.env.KEY, {expiresIn: '5m'})

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bloodarmour1@gmail.com',
        pass: 'fwso qkxw sfds joxp',
      },
    });

    var mailOptions = {
      from: 'bloodarmour1@gmail.com',
      to: email,
      subject: 'Reset Password',
      text: `http://localhost:5173/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        return res.json({status: false,message:"error sending email"})
      } else {
        return res.json({status: true, message:"email sent"})
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/reset-password/:token', async (req, res) =>{
    const {token} = req.params;
    const {password} = req.body
    try {
        const decoded = await jwt.verify(token, process.env.KEY);
        const id = decoded.id;
        const hashpassword = await bcrypt.hash(password, 10)
        await User.findByIdAndUpdate({_id: id}, {password: hashpassword})
        return res.json({status: true, message: "updated password"})
    } catch (error) {
        return res.json("invalid token")
    }
})

const verifyUser = async (req, res, next) => {
  try {
      const token = req.cookies.token;
      if (!token) {
          return res.json({ status: false, message: "no token" });
      }
      const decoded = await jwt.verify(token, process.env.KEY);
      req.user = decoded;  //lưu thông tin người dùng trong req
      next();
  } catch (error) {
      return res.json({ status: false, message: "invalid token" });
  }
}


router.get('/verify', verifyUser, (req, res) => {
  return res.json({ status: true, message: "authorized" });
});

router.get('/logout', async (req, res) => {
  res.clearCookie('token');
  return res.json({ status: true });
});


export { router as UserRouter };
