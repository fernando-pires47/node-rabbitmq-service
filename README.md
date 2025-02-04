# RabbitMQ Publisher and Consumer Service
This service is a super simple configurable RabbitMQ publisher and consumer, created to perform tests on this tool.


### Dependencies
* Docker
* Docker Compose

### Project Dependencies
* amqplib
* dotenv

### Project Dev Dependencies
* nodemon
* ts-node

### Concepts implemented


##### Consumer
---

* AssertQueue - Create queue if not exist
* Prefetch - Quantity message consume peer connection 
* Consumer
* Ack - Acknowledge message, remove message from queue
* Nack - Unacknowledged message, come back message from queue to be consumed again.

##### Producer
---

* Send message

##### Environment
---

* Dotenv configuration

## Variables to configure to test with default values

 ```bash
  RABBITMQ_URL=amqp://admin:admin@rabbitmq:5672
  RABBITMQ_PREFETCH=1
  RABBITMQ_QUEUE=queue-teste

  CONSUMER_DISABLE=false
  CONSUMER_DELAY_MS=2000

  PRODUCER_DISABLE=false
  PRODUCER_MESSAGE_QTD=5
  PRODUCER_MESSAGE=teste
  PRODUCER_DELAY_MS=7000
```

## Run project

To run locally:

 ```bash
  npm run start:dev
```

To run via docker in dev environment:

 ```bash
  npm run start:docker
```

To run via docker in prod environment:

 ```bash
  npm run start:docker-prod
```

To run via docker in prod environment:

 ```bash
  npm run start:docker-prod
```

## License

This application is available under the
[MIT license](https://opensource.org/licenses/MIT).







  
