# Proyecto Final CI/CD en AWS con ECS

##  Descripción
Proyecto de despliegue automatizado de una aplicación Node.js en AWS utilizando contenedores Docker, orquestación con ECS Fargate, y pipeline CI/CD con GitHub Actions.

##  Arquitectura

### Componentes Principales
- **Aplicación**: Node.js 18 con Express
- **Contenedor**: Docker (imagen multi-stage)
- **Orquestación**: AWS ECS Fargate
- **Networking**: VPC con subnets públicas y privadas
- **Load Balancer**: Application Load Balancer
- **Registro**: Amazon ECR
- **CI/CD**: GitHub Actions
- **IaC**: Terraform
- **Monitoreo**: CloudWatch (logs, métricas, alarmas)
- **Escalado**: Auto Scaling basado en CPU/Memoria

### Diagrama de Arquitectura
```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Application Load Balancer (ALB)   │
│         (Subnets Públicas)          │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│      ECS Service (Fargate)          │
│    (Subnets Privadas con NAT)       │
│  ┌────────┐        ┌────────┐       │
│  │ Task 1 │        │ Task 2 │       │
│  │Container│       │Container│       │
│  └────────┘        └────────┘       │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│    Amazon ECR (Container Registry)  │
└─────────────────────────────────────┘
```

##  Stack Tecnológico

### Infraestructura
- **AWS VPC**: Red virtual privada
- **AWS ECS**: Orquestación de contenedores
- **AWS Fargate**: Serverless compute para contenedores
- **AWS ECR**: Registro de imágenes Docker
- **Application Load Balancer**: Balanceador de carga
- **CloudWatch**: Monitoreo y logs

### Desarrollo
- **Node.js 18**: Runtime de JavaScript
- **Express**: Framework web
- **Docker**: Containerización
- **Terraform**: Infrastructure as Code
- **GitHub Actions**: CI/CD pipeline
- **Git**: Control de versiones

##  Estructura del Proyecto
```
proyecto-cicd-aws/
├── app/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   ├── vpc.tf
│   ├── security-groups.tf
│   ├── ecr.tf
│   ├── iam.tf
│   ├── alb.tf
│   ├── ecs.tf
│   └── cloudwatch.tf
├── .github/
│   └── workflows/
│       ├── ci-cd.yml
│       └── terraform-plan.yml
├── docs/
│   └── arquitectura.md
└── README.md
```

##  Despliegue

### Prerrequisitos
- AWS CLI configurado
- Terraform >= 1.0
- Docker Desktop
- Git
- Node.js 18+
- Cuenta de AWS

### Instalación

1. **Clonar repositorio**
```bash
git clone https://github.com/TU-USUARIO/proyecto-cicd-aws.git
cd proyecto-cicd-aws
```

2. **Desplegar infraestructura**
```bash
cd terraform
terraform init
terraform plan
terraform apply
```

3. **Construir y subir imagen inicial**
```bash
cd ../app
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $(terraform output -raw ecr_repository_url)
docker build -t $(terraform output -raw ecr_repository_url):latest .
docker push $(terraform output -raw ecr_repository_url):latest
```

4. **Forzar despliegue inicial**
```bash
aws ecs update-service --cluster proyecto-cicd-dev-cluster --service proyecto-cicd-dev-service --force-new-deployment
```

##  Pipeline CI/CD

### Flujo Automático
1. **Push a main** → Activa pipeline
2. **Test** → Ejecuta pruebas
3. **Security Scan** → Escaneo de vulnerabilidades
4. **Build** → Construye imagen Docker
5. **Push** → Sube a ECR con tags
6. **Deploy** → Despliega en ECS
7. **Verify** → Verifica salud del servicio

### Estrategia de Despliegue
- Rolling update con 0 downtime
- Health checks antes de aceptar tráfico
- Rollback automático en caso de fallo

##  Monitoreo

### CloudWatch Dashboard
- CPU Utilization
- Memory Utilization
- Request Count
- Response Time

### Logs
```bash
aws logs tail /ecs/proyecto-cicd-dev --follow
```

### Métricas
- Ver en: CloudWatch Console
- Dashboard personalizado incluido

##  Seguridad

### Implementaciones
-  Contenedores en subnets privadas
-  NAT Gateway para salida controlada
-  Security Groups restrictivos
-  IAM roles con mínimos privilegios
-  Escaneo de vulnerabilidades en imágenes
-  Secrets en GitHub Secrets
-  HTTPS ready (pendiente certificado)

##  Optimización de Costos

### Estrategias
- Fargate Spot para ambientes no-prod
- Auto-scaling basado en métricas
- Lifecycle policies para ECR
- Logs con retención de 7 días

### Costo Estimado (Dev)
- ECS Fargate: ~$30-50/mes
- ALB: ~$20/mes
- NAT Gateway: ~$30-45/mes
- ECR/CloudWatch: <$5/mes
- **Total aprox**: ~$85-120/mes

##  Auto-Scaling

### Configuración
- Mínimo: 2 tasks
- Máximo: 4 tasks
- Trigger CPU: >70%
- Trigger Memory: >80%

##  Enlaces

- **Aplicación**: http://[ALB-DNS-NAME]
- **Repositorio**: https://github.com/TU-USUARIO/proyecto-cicd-aws
- **CloudWatch**: [Dashboard URL]

##  Equipo
- [Nombre 1]
- [Nombre 2]
- [Nombre 3]

##  Licencia
MIT

##  Soporte
Para reportar problemas: [GitHub Issues](https://github.com/TU-USUARIO/proyecto-cicd-aws/issues)