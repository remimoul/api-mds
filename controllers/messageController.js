require('dotenv').config();
const StreamChat = require('stream-chat').StreamChat;
const serverClient = StreamChat.getInstance(process.env.STREAM_CHAT_API_KEY, process.env.STREAM_CHAT_API_SECRET);

const Message = require('../models/messagesModel');
const userConversation = require('../models/userConversationModel');

async function saveMessage(message) {
  await Message.create(message);
}

exports.sendMessage = async (req, res) => {
  const { content, user_id, conversation_id } = req.body;

  // Vérifiez que la conversation existe
  const conversation = await userConversation.findOne({ where: { id: conversation_id } });
  if (!conversation) {
    return res.status(404).json({ error: 'Conversation not found' });
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

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message', error);
    res.status(500).json({ error: 'Error sending message' });
  }
};
