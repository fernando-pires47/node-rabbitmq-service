import * as amqp from 'amqplib';

export async function consume() {
  const RABBITMQ_URL = process.env.RABBITMQ_URL!; // Replace with your RabbitMQ server URL
  const QUEUE_NAME =  process.env.RABBITMQ_QUEUE!; // Name of the queue to consume from
  const PREFETCH = process.env.CONSUMER_PREFETCH!; // quantity message will consume peer connection.
  const CONSUMER_DELAY = process.env.CONSUMER_DELAY_MS!; // delay to consumer in milliseconds.

  try {
    console.log("** Starting consumer **");
    // Connect to RabbitMQ server
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Ensure the queue exists before consuming messages
    await channel.assertQueue(QUEUE_NAME);

    channel.prefetch(Number(PREFETCH));

    console.log(`[*] Waiting for messages in queue: ${QUEUE_NAME}`);

    // Consume messages
    channel.consume(QUEUE_NAME, (msg) => {
      if (msg !== null) {
        setTimeout(() => {
          console.log(`[✔️] Message Processed: ${JSON.stringify(msg)}`);
          channel.ack(msg); // Acknowledge message
        }, Number(CONSUMER_DELAY));
      }else{
        channel.nack(msg); // Unacknowledged message
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}