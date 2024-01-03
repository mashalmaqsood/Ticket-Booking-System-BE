const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendEmailConfiguration, verifyEmail } = require("../utils/email");

const createUser = async (req, res) => {
  const { name, phoneNumber, cnic, email, password, role } = req.body;

  if (!name && !phoneNumber && !cnic && !email && !password && !role) {
    return res.status(400).send({ message: "Required fields not found." });
  }

  try {
    const userEmail = await User.findOne({
      where: { email },
    });
    if (userEmail) {
      return res.json({ message: "This user already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const secretPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      phoneNumber,
      cnic,
      email,
      password: secretPassword,
      role,
    });

    let token;
    if (user.role === "customer") {
      token = jwt.sign({ id: user.id }, process.env.USER_JWT_SECRECT);
    } else {
      token = jwt.sign({ id: user.id }, process.env.ADMIN_JWT_SECRET);
    }
    const url = `${process.env.BASE_URL}/emailVerfication/${user.id}/verify/${token}`;
    const emailResponse = await verifyEmail(
      user.email,
      "Verify your Email",
      url
    );
    if (!emailResponse) {
      return res.status(500).json({ msg: "Something went wrong!" });
    }
    return res.status(200).send({
      message: "An email is sent successfully to your account, please verify!",
    });
  } catch (err) {
    console.log("Error", err);
    return res.status(500).send({ message: "Couldn't create new user" });
  }
};

const loginUser = async (req, res) => {
  const {
    body: { email, password },
  } = req;

  if (!email && !password) {
    return res.status(400).send({ message: "Required field not found." });
  }

  try {
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res
        .status(401)
        .send({ message: "Please enter valid credentials" });
    }
    if (!user.verified) {
      let token;
      if (user.role === "customer") {
        token = jwt.sign({ id: user.id }, process.env.USER_JWT_SECRECT);
      } else {
        token = jwt.sign({ id: user.id }, process.env.ADMIN_JWT_SECRET);
      }
      const url = `${process.env.BASE_URL}/emailVerfication/${user.id}/verify/${token}`;
      await verifyEmail(user.email, "Verify your Email", url);
      return res.status(201).send({
        message:
          "An email is sent successfully to your account, please verify first!",
      });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res
        .status(401)
        .send({ message: "Please enter valid credentials" });
    }
    const data = {
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
      },
    };
    if (user.role === "customer") {
      const authToken = jwt.sign(data, process.env.USER_JWT_SECRECT);
      return res.status(200).send({ authToken });
    } else {
      const authToken = jwt.sign(data, process.env.ADMIN_JWT_SECRET);
      return res.status(200).send({ authToken });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "User couldn't login" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ message: "Required field not found." });
  }

  try {
    const data = await User.findOne({
      where: { id },
    });
    const user = {
      name: data.name,
      phoneNumber: data.phoneNumber,
      cnic: data.cnic,
      email: data.email,
      role: data.role,
    };

    return res.json(user);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send({ message: "Couldn't retrieve the user data" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ message: "Required field not found." });
  }

  try {
    await User.update(req.body, {
      where: { id },
    });
    return res.json({ message: "User details updated successfully" });
  } catch (err) {
    console.log("Error", err);
    return res
      .status(500)
      .send({ message: "Couldn't update the user details" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ message: "Required field not found." });
  }

  try {
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    let token;
    if (user.role === "customer") {
      token = jwt.sign({ id: user.id }, process.env.USER_JWT_SECRECT, {
        expiresIn: "1m",
      });
    } else {
      token = jwt.sign({ id: user.id }, process.env.ADMIN_JWT_SECRET, {
        expiresIn: "1m",
      });
    }
    const url = `${process.env.BASE_URL}/resetPassword/${user.id}/${token}`;
    const emailResponse = sendEmailConfiguration(user.email, user, "Reset your password", url );
    if (!emailResponse) {
      return res.status(500).json({ msg: "Something went wrong!" });
    }
    return res.status(200).json({ Message: "Email Sent Successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "User couldn't login" });
  }
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  if (!id && !token && !password) {
    return res.status(400).send({ message: "Required fields not found." });
  }

  try {
    const user = await User.findOne({
      where: { id },
    });

    const salt = await bcrypt.genSalt(10);
    const secretPassword = await bcrypt.hash(password, salt);
    if (user.role === "customer") {
      jwt.verify(token, process.env.USER_JWT_SECRECT, async (err) => {
        if (err) {
          return res.status(401).send({ message: "invalid credentials" });
        } else {
          await User.update(
            { password: secretPassword },
            { where: { id: id } }
          );
          return res
            .status(200)
            .send({ message: "Password updated successfully" });
        }
      });
    } else {
      jwt.verify(token, process.env.ADMIN_JWT_SECRET, async (err) => {
        if (err) {
          return res.status(401).send({ message: "invalid credentials" });
        } else {
          await User.update(
            { password: secretPassword },
            { where: { id: id } }
          );
          return res
            .status(200)
            .send({ message: "Password updated successfully" });
        }
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Password couldn't be updated" });
  }
};

const emailVerification = async (req, res) => {
  const { id, token } = req.params;

  if (!id && !token) {
    return res.status(401).send({ message: "Required data not found." });
  }

  try {
    const user = await User.findOne({
      where: { id },
    });
    if (user.role === "customer") {
      jwt.verify(token, process.env.USER_JWT_SECRECT, async (err) => {
        if (err) {
          return res.status(401).send({ message: "invalid link." });
        } else {
          await User.update({ verified: true }, { where: { id: id } });
          return res
            .status(200)
            .send({ message: "Email verified successfully!" });
        }
      });
    } else {
      jwt.verify(token, process.env.ADMIN_JWT_SECRET, async (err) => {
        if (err) {
          return res.status(401).send({ message: "invalid link." });
        } else {
          await User.update({ verified: true }, { where: { id: id } });
          return res
            .status(200)
            .send({ message: "Email verified successfully!" });
        }
      });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUserById,
  updateUser,
  forgotPassword,
  resetPassword,
  emailVerification,
};
