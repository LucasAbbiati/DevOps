################################################
# Inicializando o Minikube
################################################

minikube start

################################################
# Habilitando o Ingress
################################################

minikube image load k8s.gcr.io/ingress-nginx/controller:v1.9.4

minikube addons enable ingress


cd k8s
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml

kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml

kubectl wait --for=jsonpath='{.status.phase}'=Running $(kubectl get pods -o=name)
kubectl apply -f ingress.yaml
