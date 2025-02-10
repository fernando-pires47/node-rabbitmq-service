import * as amqp from 'amqplib';



export async function produce() {
  const RABBITMQ_URL = process.env.RABBITMQ_URL!; // Replace with your RabbitMQ server URL
  const QUEUE_NAME =  process.env.RABBITMQ_QUEUE!; // Name of the queue to consume from

  try {
    console.log("** Starting producer **");
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME);

      sendMessages(QUEUE_NAME, channel);
  } catch (error) {
    console.error('Error:', error);
  }
}

function sendMessages(queueName: string, channel: amqp.Channel) {
  const DELAY_MS =  process.env.PRODUCER_DELAY_MS!; // Delay to resend messages
  const MESSAGE_QTD =  process.env.PRODUCER_MESSAGE_QTD!; // Quantity message to send
  const PRODUCER_MESSAGE =  process.env.PRODUCER_MESSAGE!; // Producer message

  setTimeout(() => {
    console.log(`** Producing cicle **`);
    for (let i = 1; i <= Number(MESSAGE_QTD); i++) {
      const message = `Message ${i}: ${PRODUCER_MESSAGE}`;
      channel.sendToQueue(queueName, Buffer.from(message));
      console.log(`[x] Sent: ${message}`);
    }
    sendMessages(queueName, channel);
  }, Number(DELAY_MS));

}
