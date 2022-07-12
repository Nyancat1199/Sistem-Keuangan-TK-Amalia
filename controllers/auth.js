const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.getLogin = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.redirect("/admin");
  }
  res.render("login", { errorMessage: null, typeError: null });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("login", {
      errorMessage: "Masukan Input dengan benar",
      typeError: "danger",
    });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(422).render("login", {
        errorMessage: "Email atau Password Salah",
        typeError: "danger",
      });
    }
    const hasPassword = await bcrypt.compare(password, user.password);
    if (!hasPassword) {
      return res.status(422).render("login", {
        errorMessage: "Email atau Password Salah",
        typeError: "danger",
      });
    }
    req.session.isLoggedIn = true;
    req.session.user = user;
    res.redirect("/admin");
  } catch (e) {
    console.log(e);
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
