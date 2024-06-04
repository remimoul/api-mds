const Journal = require('../models/journalModel');


exports.sendEmotion = async (req, res) => {
    try {
        const { user_id,emotion,thoughts } = req.body;
        const newEmotion = await Journal.create({
        user_id,
        emotion,
        thoughts
        });
        res.status(201).json(newEmotion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'envoi de l\'émotion' });
    }
    };

exports.getEmotion = async (req, res) => {
    try {
        const { user_id } = req.params;
        const emotions = await Journal.findAll({ where: { user_id }});
        if (emotions.lenght === 0) {
            return res.status(404).json({ message: 'Aucune émotion trouvée pour cet utilisateur' });
        }
        res.status(200).json(emotions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des émotions' });
    }
};

// Mettre à jour une émotion
exports.updateEmotion = async (req, res) => {
    try {
        const { user_id, emotion_id } = req.params;
        const { emotion, thoughts } = req.body;
        const updatedEmotion = await Journal.update({ emotion, thoughts }, { where: { id: emotion_id, user_id } });
        if (updatedEmotion[0] === 0) {
            return res.status(404).json({ message: 'Aucune émotion trouvée pour cet utilisateur avec cet ID' });
        }
        res.status(200).json({ message: 'Emotion mise à jour avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour de l\'émotion' });
    }
};

// Supprimer une émotion
exports.deleteEmotion = async (req, res) => {
    try {
        const { user_id, emotion_id } = req.params;
        const deletedEmotion = await Journal.destroy({ where: { id: emotion_id, user_id } });
        if (deletedEmotion === 0) {
            return res.status(404).json({ message: 'Aucune émotion trouvée pour cet utilisateur avec cet ID' });
        }
        res.status(200).json({ message: 'Emotion supprimée avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression de l\'émotion' });
    }
};