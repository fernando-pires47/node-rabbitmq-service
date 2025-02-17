# RabbitMQ publisher and consumer service
This service is a super simple configurable RabbitMQ publisher and consumer, created to perform tests on this tool.

### Dependencies
* Docker
* Docker Compose
* NPM
* Node(locally)

### Project dependencies
* amqplib
* dotenv

### Project DEV dependencies
* nodemon
* ts-node

### Concepts implemented

##### Consumer

* `AssertQueue`: Create queue if not exist
* `Prefetch`: Quantity message consume peer connection 
* `Ack`: Acknowledge message, remove message from queue
* `Nack`: Unacknowledged message, come back message from queue to be consumed again.

##### Producer

* Send message

##### Environment properties

* Dotenv configuration

## Variables configurable to test with default values

 ```bash
  RABBITMQ_URL=amqp://admin:admin@rabbitmq:5672
  RABBITMQ_QUEUE=queue-teste

  CONSUMER_DISABLE=false
  CONSUMER_DELAY_MS=2000
  CONSUMER_PREFETCH=1

  PRODUCER_DISABLE=false
  PRODUCER_MESSAGE=teste
  PRODUCER_MESSAGE_QTD=5
  PRODUCER_DELAY_MS=5000
```

## Run project

First of all, install dependencies:

```bash
  npm install
```

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

## Push image

To push the image to a image repository, access the file `pushDocker.js` and set the property `dockerImage`. After, run the script:

```bash
  npm run push:docker
```

## Hands on

![](https://github.com/fernando-pires47/node-rabbitmq-service/blob/main/images/log.png)

## Implementation

#### KEDA RabbitMQ Scale
https://github.com/fernando-pires47/k8s-keda-rabbitmq-scale

## License

This application is available under the
[MIT license](https://opensource.org/licenses/MIT).







  
