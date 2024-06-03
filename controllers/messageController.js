require('dotenv').config();
const StreamChat = require('stream-chat').StreamChat;
const serverClient = StreamChat.getInstance(process.env.STREAM_CHAT_API_KEY, process.env.STREAM_CHAT_API_SECRET);
const Sequelize = require('sequelize');
const Message = require('../models/messagesModel');
const userConversation = require('../models/userConversationModel');
const Conversation = require('../models/conversationModel');

async function saveMessage(message) {
  await Message.create(message);
}

exports.sendMessage = async (req, res) => {
  const { content, user_id, conversation_id } = req.body;

  // Vérifiez que la conversation existe
  const conversation = await userConversation.findOne({ where: { id: conversation_id } });
  if (!conversation) {
    return res.status(404).json({ error: 'Conversation non trouvé' });
  }

  try {
    const user = { id: user_id };
    const channel = serverClient.channel('messaging', conversation_id, { created_by: user, members: [user_id] });

    await channel.watch();
    const message = await channel.sendMessage({ text: content, user });

    await saveMessage({
      id: message.id,
      user_id,
      conversation_id,
      content,
      created_at: message.created_at,
    });

    res.status(200).json({ message: 'Message envoyé avec succès' });
  } catch (error) {
    console.error('Erreur envoi message', error);
    res.status(500).json({ error: 'Erreur envoi message' });
  }
};

exports.getConversation = async (req, res) => {
  try {
    // Validation de conversation_id
    if (!req.params.conversation_id) {
      return res.status(400).json({ error: 'conversation_id is required' });
    }
    // Récupérer tous les messages pour cette conversation
    const messages = await Message.findAll({
      where: { conversation_id: req.params.conversation_id },
      order: [['createdAt', 'ASC']],
      attributes: ['id', 'content', 'createdAt', 'updatedAt', 'user_id', 'conversation_id'],
    });

    if (messages.length === 0) {
      return res.status(404).json({ error: 'Aucun message trouver pour cette conversation' });
    }

    const messageContents = messages.map((message) => message.content);

    res.status(200).json({ messageContents });
  } catch (error) {
    console.error('Error getting conversation', error);
    let errorMessage;
    if (error instanceof Sequelize.ValidationError) {
      // Gestion spécifique des erreurs Sequelize
      errorMessage = 'Erreur de validation Sequelize';
    } else {
      errorMessage = 'Erreur de récupération de la conversation';
    }
    res.status(500).json({ error: errorMessage });
  }
};

exports.createConversation = async (req, res) => {
  try {
    // Vérification du rôle de l'utilisateur
    if (req.user.role !== 'Happiness Officer') {
      return res.status(403).json({ error: 'Seulement un Happiness Officer peut créer une conversation' });
    }
    // Création de la conversation avec l'ID de l'Happiness Officer
    const conversation = await Conversation.create({
      id: req.user.id,
    });
    res.status(200).json({ message: 'Conversation crée avec succès', conversation });
  } catch (error) {
    console.error('Erreur de création de la conversation', error);
    res.status(500).json({ error: 'Erreur de création de la conversation' });
  }
};
