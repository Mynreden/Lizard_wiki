import Message from "./models/MessageModel";

const onConnection = async (socket) => {
    const userId = socket.handshake.query.userId;
    console.log(`User connected with ID: ${userId}`);
    socket.join(userId); // assign room for socket io 
  
    socket.on("get chat", async (req) => {
        try {
            const {chatId} = req;
            const previousMessages = await Message.find({chatId}).sort({ timestamp: 1 })
        
            socket.emit('previous messages', previousMessages);
          } catch (error) {
            console.error('Error fetching previous messages:', error);
          }
    })
  
    socket.on('chat message', async (message) => {
      console.log(`Message: ${message}`);
  
      // Сохранение сообщения в базе данных
      try {
        const savedMessage = await new Message({
          user: 'SomeUser', // Замените на реального пользователя
          content: message,
        }).save();
  
        // Отправить сообщение всем подключенным клиентам
        io.emit('chat message', savedMessage);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  }