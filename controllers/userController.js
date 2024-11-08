const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
require('dotenv').config();

exports.userLogin = async (req, res) => {
  try {
    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({ message: "Format d'email invalide" });
    }
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      return;
    }

    const userData = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(userData, process.env.JWT_KEY, {
      expiresIn: '24h',
    });

    res.status(200).json({ token, id: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la connexion" });
  }
};

exports.createAUser = async (req, res) => {
  try {
    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({ message: "Format d'email invalide" });
    }
    // Vérifier si l'email existe déjà
    let useruse = await User.findOne({ where: { email: req.body.email } });
    if (useruse) {
      return res.status(400).json({ message: 'Un utilisateur avec cette adresse e-mail existe déjà' });
    }

    // Vérifier la longueur du mot de passe
    if (req.body.password.length < 8) {
      return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères' });
    }

    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({ message: 'Adresse email invalide' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      password: hashedPassword,
      admin: req.body.admin,
      role: req.body.role,
      company_name: req.body.company_name,
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
    // Check if user exists
    const existingUser = await User.findOne({ where: { id: req.params.id } });
    if (!existingUser) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }

    const updates = {};
    let updateMessages = [];
    //Si l'email est renseigné, on vérifie qu'il est valide
    if (req.body.email) {
      const isValidEmail = validator.isEmail(req.body.email);

      // Vérifier si l'email existe déjà
      let useruse = await User.findOne({ where: { email: req.body.email } });
      if (useruse) {
        return res.status(400).json({ message: 'Un utilisateur avec cette adresse e-mail existe déjà' });
      }

      if (!isValidEmail) {
        return res.status(400).json({ message: 'Adresse email invalide' });
      }
      //quand est valide on met à jour
      updates.email = req.body.email;
      updateMessages.push('Email mis à jour');
    }
    //Si le mot de passe est renseigné, on le hash et on met à jour
    if (req.body.password) {
      // Vérifier la longueur du mot de passe
      if (req.body.password.length < 8) {
        return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères' });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updates.password = hashedPassword;
      updateMessages.push('Mot de passe mis à jour');
    }

    // Si le prénom est renseigné, on met à jour
    if (req.body.firstName) {
      updates.firstName = req.body.firstName;
      updateMessages.push('Prénom mis à jour');
    }
    // Si le nom de famille est renseigné, on met à jour
    if (req.body.lastName) {
      updates.lastName = req.body.lastName;
      updateMessages.push('Nom de famille mis à jour');
    }

    // Si aucun des deux n'est renseigné, on renvoie une erreur
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'Pas de mise à jour trouvée' });
    }
    // On met à jour l'utilisateur quand email ou mot de passe est renseigné dans la variable updates
    const [affectedRows] = await User.update(updates, {
      where: { id: req.params.id },
      returning: true,
      plain: true,
    });

    if (affectedRows === 0) {
      return res.status(500).json({ message: 'Erreur lors de la mise à jour' });
    }
    res.status(200).json({ message: updateMessages.join(', ') });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur: ' + error });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur: ' + error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.destroy({ where: { id: req.params.id } });
    if (user) {
      res.status(200).json({ message: `Utilisateur supprimé` });
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
