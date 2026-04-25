# ArgoCD Sample — ApplicationSet Hello World

## Cấu trúc

```
argocd-sample/
├── .github/workflows/build.yaml   # CI build Docker image lên GHCR
├── apps/
│   └── hello-world/               # Thêm folder mới ở đây → app tự tạo
│       ├── app.js
│       ├── Dockerfile
│       ├── package.json
│       ├── Chart.yaml
│       ├── values.yaml
│       └── templates/
│           ├── deployment.yaml
│           ├── service.yaml
│           └── ingress.yaml
└── applicationset/
    └── appset.yaml                # Apply 1 lần duy nhất
```

## Setup (5 bước)

### 1. Fork / clone repo này, đổi YOUR_USERNAME

```bash
# Trong appset.yaml và values.yaml, replace:
# YOUR_USERNAME → GitHub username của bạn
```

### 2. Push lên GitHub

```bash
git init
git add .
git commit -m "init"
git remote add origin https://github.com/YOUR_USERNAME/argocd-sample.git
git push -u origin main
```

### 3. Apply ApplicationSet vào cluster

```bash
kubectl apply -f applicationset/appset.yaml
```

### 4. Kiểm tra app

```bash
# Xem ArgoCD tự tạo Application
kubectl get applications -n argocd

# Port-forward để test
kubectl port-forward svc/hello-world 8080:80 -n hello-world
curl http://localhost:8080
# → Hello from hello-world! 🚀
```

### 5. Thêm app mới (không cần đụng ArgoCD)

```bash
# Copy folder hello-world thành service-b
cp -r apps/hello-world apps/service-b
# Sửa values.yaml cho service-b
git add apps/service-b
git commit -m "add service-b"
git push
# ArgoCD tự detect và deploy service-b 🎉
```

## Test local (không cần K8s)

```bash
cd apps/hello-world
node app.js &
curl http://localhost:3000        # Hello from hello-world! 🚀
curl http://localhost:3000/health # {"status":"ok"}
```
