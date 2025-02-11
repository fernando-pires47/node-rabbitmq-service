# K8S simple RabbitMQ behavior test with KEDA scaled object 
This project is a super simple KEDA scaled object test.

## Dependencies

* Docker
* Kind
* Kubectl
* Helm

# Behaviors

## Application 

### Consumer behavior

With these defaults configurations, the consumer application behavior will consume 1 message every 5 seconds.

```bash
CONSUMER_DELAY_MS=5000
CONSUMER_PREFETCH=1
```

### Producer behavior

With these defaults configurations, the producer application behavior will produce 5 message every 5 seconds.

```bash
PRODUCER_MESSAGE_QTD=5
PRODUCER_DELAY_MS=5000
```

## KEDA 

### KEDA setting

Setting this property in scaledObject, if exceed the limit, a new pod will be created. 

```bash
queueLength=20
```

### KEDA scale up or down policies

KEDA will check the queue length (or any metric) every 30 seconds (default polling interval). If the queue length is below 20, KEDA will scale down, but it will wait for the cooldown period of 5 minutes before checking again to avoid rapid scaling actions.

#### KEDA will scale up or down following these behaviors:

* Polling Interval (default: 30 seconds): This is the frequency at which KEDA will check the metric (e.g., queue length) to determine if it needs to scale up or down.
* Cooldown Period (default: 300 seconds, or 5 minutes): This is the amount of time that KEDA will wait after scaling down before it checks again to ensure the scaling action was effective.

To override these default values in order to test the provisioning, access the file `scaled-object.yml` and set the properties:

```bash
pollingInterval="30"
cooldownPeriod="300"
```

### Conclusion

With the default configuration, supposing that the application keeps alive for 1 minute, the amount of message available to be consumed will be 48, and the HPA behavior is to create more instances to consume these messages, respecting these behaviors above.

When reducing the amount of messages on the queue to less than the limit, pods will be scaled down.

# Install resources

### Create cluster

```bash

# Create cluster
kind create cluster --name keda-demo --config k8s/cluster.yml

# Check clusters
kind get clusters

# Check cluster it's running
kubectl cluster-info --context kind-keda-demo

```

### Install KEDA via HELM

```bash

# Install KEDA
helm repo add kedacore https://kedacore.github.io/charts
helm repo update
kubectl create namespace keda
helm install keda kedacore/keda --namespace keda

# Check pods running
kubectl get pods -n keda

```

### Install RabbitMQ resources

```bash

# Install
kubectl apply -f k8s/rabbitmq.yml

# Check pods it's running
kubectl get pod -l app=rabbitmq

# Port foward to access rabbitMQ
kubectl port-forward service/rabbitmq-service 15672:15672

# Access
http://localhost:15672

```

#### Wait for RabbitMQ to Deploy

⚠️Be sure to wait until the deployment has completed before continuing.⚠️

### Install application resources

```bash

# Application
kubectl apply -f k8s/application.yaml

# Check pods it's running 
kubectl get pods -l app=app

# Check logs 
kubectl logs -f <pod-name>

```

### Install Scaled Object resources

```bash

# KEDA Scaled Object 
kubectl apply -f k8s/scaled-object.yml

# Check Scaled Object
kubectl get scaledobjects -n default

# Info Scaled Object
kubectl describe scaledobjects app-consumer-scaledobject -n default

# Check HPA object created
 kubectl get hpa -n default
```

# Additional scaler, cron triggers 

Instead of keeping pods always running, KEDA's cron scaler can bring up pods only when required, reducing resource consumption and costs.

Let's break the Cron type, how you can provide in the KEDA ScaledObject configuration.

### Cron trigger for scaling between 19 PM and 21 PM, Monday to Friday
---
to configure, necessary to access the `scaled-object.yml`.

```bash
- type: cron
  metadata:
    timezone: "America/Sao_Paulo" # Optional, depends on your requirement
    start: 0 19 * * 1-5           # At 19:00 PM (Monday to Friday)
    end: 0 21 * * 1-5             # At 21:00 PM (Monday to Friday)
    desiredReplicas: "5"          # Desired replicas during this time
```

#### Behavior 

* `Scaling Up`: During the specified period of time (Monday through Friday, from 19:00 PM to 21:00 PM, São Paulo time), the deployment will scale up to 5 replicas.
* `Scaling Down`: Outside of this time range, the deployment will scale down to the minReplicaCount (which is not specified in your snippet, so it would default to 1 if not configured).

# Uninstall resources

```bash

# Resources
kubectl delete -f k8s/scaled-object.yml
kubectl delete -f k8s/application.yml
kubectl delete -f k8s/rabbitmq.yml

# KEDA
helm uninstall keda -n keda

# Cluster
kind delete cluster --name keda-demo

```

## References

#### KEDA Cron
https://keda.sh/docs/2.16/scalers/cron/

#### KEDA RabbitMQ
https://keda.sh/docs/2.16/scalers/rabbitmq-queue/

#### RabbitMQ publisher and consumer project 
https://github.com/fernando-pires47/node-rabbitmq-service

## License

This application is available under the
[MIT license](https://opensource.org/licenses/MIT).
