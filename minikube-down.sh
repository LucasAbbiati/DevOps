#!/bin/bash

################################################
# Removendo a configuração da aplicação
################################################

kubectl delete -f k8s/ingress.yaml

kubectl delete -f k8s/frontend-deployment.yaml
kubectl delete -f k8s/frontend-service.yaml 
kubectl delete -f k8s/backend-deployment.yaml 
kubectl delete -f k8s/backend-service.yaml


