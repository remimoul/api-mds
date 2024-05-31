const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
require('dotenv').config();



exports.userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      return;
    }

    const userData = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(userData, process.env.JWT_KEY, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la connexion" });
  }
};

exports.createAUser = async (req, res) => {
  try {
      // Vérifier si l'email existe déjà
      let useruse = await User.findOne({ email: req.body.email });
      if (useruse) {
        return res.status(400).json({ message: 'Un utilisateur avec cette adresse e-mail existe déjà' });
      }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      lastName: req.body.lastName,
      firstName: req.body.firstName,

      email: req.body.email,
      password: hashedPassword,
      admin: req.body.admin,
      role: req.body.role,
    });
    let user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'requete invalide' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updates = {};
    //Si l'email est renseigné, on vérifie qu'il est valide
    if (req.body.email) {
      const isValidEmail = validator.isEmail(req.body.email);
      if (!isValidEmail) {
        return res.status(400).json({ message: 'Adresse email invalide' });
      }
      //quand est valide on met à jour
      updates.email = req.body.email;
    }
    //Si le mot de passe est renseigné, on le hash et on met à jour
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updates.password = hashedPassword;
    }
    //Si aucun des deux n'est renseigné, on renvoie une erreur
    if (!req.body.email && !req.body.password) {
      return res.status(400).json({ message: 'Pas de mise a jour trouvée' });
    }
    //On met à jour l'utilisateur quand email ou mot de passe est renseigné dans la variable updates
    const user = await User.findByIdAndUpdate(req.params.id_user, updates, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    } else {
      return res.status(200).json({ message: `Utilisateur modifié : ${user.email}` });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).res.json({ message: 'Erreur serveur' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.body.email });
    if (user) {
      res.status(200).json({ message: `Utilisateur supprimé : ${user.email}` });
    } else {
      res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la suppression de l'utilisateur",
    });
  }
};
