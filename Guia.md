
# Guia Completa CI/CD en AWS con ECS

PARTE1: INSTALACION Y CONFIGURACION INICIAL

# 1.1 Instalar Git para Windows
1. Abrir Powershell como Administrador
2. Ejecutar el siguiente comando
En Powershell
winget install --id Git.Git -e --source winget

Verificar versión:
git --version

# 1.2 Instalar AWS CLI en Windows
En Powershell
Descargar Instalador
Invoke-WebRequest -Uri "https://awscli.amazonaws.com/AWSCLIV2.msi" -OutFile "$env:TEMP\AWSCLIV2.msi"

Instalar:
Start-Process msiexec.exe -Wait -ArgumentList "/i $env:TEMP\AWSCLIV2.msi /quiet"

Cerrar y reabrir PowerShell
Verificar instalación

aws --version

# 1.3 Instalar Docker Desktop para Windows
En Powershell
1. Habilitar WSL 2 (Windows Subsystem for Linux)
wsl --install

Reiniciar el equipo
2. Descargar Docker Desktop desde:
https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe

3. Ejecutar el instalador
- Marcar "Use WSL 2 instead of Hyper-V"
- Reiniciar cuando lo pida

4. Abrir Docker Desktop y completar configuración inicial

#Verificar instalación (PowerShell normal)
docker --version
docker ps

# 1.4 Instalar Terraform en Windows

Opción 1: Con Chocolatey (recomendado)
Instalar Chocolatey primero (PowerShell como Administrador):
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

Instalar Terraform
choco install terraform -y

Opción 2: Manual
Descargar desde: https://www.terraform.io/downloads
1. Descargar archivo ZIP
2. Extraer terraform.exe
3. Mover a C:\Program Files\Terraform\
4. Agregar a PATH:
  - Buscar "variables de entorno" en Windows
  - Editar "Path" en Variables del sistema
  - Agregar: C:\Program Files\Terraform

Verificar (cerrar y reabrir PowerShell)
terraform --version

# 1.5 Instalar Node.js
powershell# Descargar desde: https://nodejs.org/

Descargar versión LTS (Long Term Support)
Ejecutar instalador con opciones por defecto

Si ya tienes Chocolatey instalado ejecutar en powershell.
choco install nodejs-lts -y

# Verificar instalación
node --version
npm --version

1.6 Instalar Visual Studio Code (opcional pero recomendado)
# Descargar desde: https://code.visualstudio.com/
# Ejecutar instalador

# Extensiones recomendadas:
# - Docker
# - HashiCorp Terraform
# - AWS Toolkit
# - GitLens

PARTE2: INSTALACION Y CONFIGURACION INICIAL

# 2.1 Crear cuenta de AWS

Ir a: https://aws.amazon.com/
Crear cuenta (necesitas tarjeta de crédito)
Verificar email y teléfono

# 2.2 Crear usuario IAM con permisos

 1. Ir a consola AWS: https://console.aws.amazon.com/
 2. Buscar "IAM" en el buscador
 3. Click en "Users" → "Add users"

 Configuración del usuario:
 - Username: cicd-deploy-user
 - Access type: ☑ Programmatic access
 - Next: Permissions

 Permisos (opción fácil - ambiente de desarrollo):
 - ☑ Attach existing policies directly
 - Buscar y seleccionar:
   ☑ AmazonECS_FullAccess
   ☑ AmazonEC2ContainerRegistryFullAccess
   ☑ AmazonVPCFullAccess
   ☑ IAMFullAccess
   ☑ AmazonEC2FullAccess
   ☑ ElasticLoadBalancingFullAccess
   ☑ CloudWatchFullAccess

 Next → Next → Create user

IMPORTANTE: Guardar las credenciales
# Access Key ID: AKIAXXXXXXXXXXXXXXXX
# Secret Access Key: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# 2.3 Configurar AWS CLI

Abrir PowerShell y ejecutar:

aws configure

 Ingresar:
 AWS Access Key ID [None]: AKIAXXXXXXXXXXXXXXXX
 AWS Secret Access Key [None]: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 Default region name [None]: us-east-1
 Default output format [None]: json

# Verificar configuración
aws sts get-caller-identity

PARTE3: CREAR ESTRUCTURA DEL PROYECTO

3.1 Crear carpeta del proyecto

En Powershell

# Crear en tu carpeta de proyectos
cd C:\Users\$env:USERNAME\Documents
mkdir proyecto-cicd-aws
cd proyecto-cicd-aws

# Crear estructura completa
New-Item -ItemType Directory -Force -Path app
New-Item -ItemType Directory -Force -Path terraform
New-Item -ItemType Directory -Force -Path .github\workflows
New-Item -ItemType Directory -Force -Path docs
New-Item -ItemType Directory -Force -Path scripts

# Abrir en VS Code
code .

3.2 Crear aplicación Node.js
app/package.json
app/server.js
app/Dockerfile

3.3. Probar aplicación localmente

En Powershell :

# Instalar dependencias
cd app
npm install

# Probar aplicación
npm start

# En otro terminal, probar:
curl http://localhost:3000
curl http://localhost:3000/health
curl http://localhost:3000/api/info

# Detener con Ctrl+C

3.4 Probar Docker localmente

En Powershell

# Asegurarse que Docker Desktop está corriendo

cd app

# Construir imagen
docker build -t app-cicd-test .

# Ejecutar contenedor
docker run -d -p 3000:3000 --name app-test app-cicd-test

# Probar
curl http://localhost:3000

# Ver logs
docker logs app-test

# Detener y eliminar
docker stop app-test
docker rm app-test

PARTE 4: INFRAESTRUCTURA TERRAFORM COMPLETA

4.1. Configuración principal de Terraform

terraform/variables.tf
terraform/main.tf
terraform/vpc.tf
terraform/security-groups.tf
terraform/ecr.tf
terraform/iam.tf
terraform/alb.tf
terraform/ecs.tf
terraform/cloudwatch.tf
terraform/outputs.tf

Verificar que todos los archivos existen
Get-ChildItem *.tf

1. Inicializar Terraform
En Powershell
terraform init

Esto descarga los providers de AWS

2. Validar sintaxis
En Powershell
terraform validate

3. Ver el plan(sin aplicar cambios)
En Powershell
terraform plan

Verificar que los siguientes permisos se encuentren agregados en AWS IAM:

AmazonEC2ReadOnlyAccess
CloudWatchFullAccess

AmazonECS_FullAccess
AmazonEC2ContainerRegistryFullAccess
AmazonVPCFullAccess
IAMFullAccess
AmazonEC2FullAccess
ElasticLoadBalancingFullAccess
CloudWatchFullAccess
CloudWatchLogsFullAccess

ApplicationAutoScalingFullAccess


# Verificar
aws iam list-user-policies --user-name cicd-deploy-user


4. Aplicar infraestructura
En Powershell
terraform apply

Validar politicas de usuarios:
aws iam list-attached-user-policies --user-name cicd-deploy-user

Recursos desplegados:
VPC con networking completo
ECS Cluster
ECR Repository
Application Load Balancer
Security Groups
IAM Roles
CloudWatch Logs y Dashboard


PARTE 5: CI/CD CON GITHUB ACTIONS

.github/workflows/ci-cd.yml

terraform-plan.yml


PARTE 6: DESPLIEGUE PASO A PASO

6.1. Preparar repositorio Git

En PowerShell

# Navegar a la carpeta del proyecto
cd C:\proyecto-cicd-aws

# Crear .gitignore
@"
# Node
node_modules/
npm-debug.log*
package-lock.json

# Terraform
**/.terraform/*
*.tfstate
*.tfstate.*
.terraform.lock.hcl

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Env
.env
.env.local

# Logs
*.log
logs/
"@ | Out-File -FilePath .gitignore -Encoding utf8

# Inicializar Git
git init
git add .
git commit -m "Initial commit: Proyecto CI/CD AWS ECS"

6.2 Crear repositorio en GitHub

En Powershell

# Opción 1: Desde la web
# 1. Ir a https://github.com/new
# 2. Nombre: proyecto-cicd-aws
# 3. Private o Public
# 4. No agregar README, .gitignore ni licencia
# 5. Click "Create repository"

# Conectar repositorio local con GitHub
git remote add origin https://github.com/TU-USUARIO/proyecto-cicd-aws.git
git branch -M main
git push -u origin main

# Opción 2: Con GitHub CLI (si lo tienes instalado)
# gh repo create proyecto-cicd-aws --private --source=. --remote=origin --push

6.3. Configurar secretos en GitHub

Ve a tu repositorio en GitHub
Click en Settings
En el menú izquierdo: Secrets and variables → Actions
Click New repository secret
Agrega estos secretos:

Name: AWS_ACCESS_KEY_ID
Value: [tu access key de AWS]
Name: AWS_SECRET_ACCESS_KEY
Value: [tu secret key de AWS]

6.4. Desplegar infraestructura con Terraform
powershell# Navegar a carpeta de Terraform
cd terraform

# Inicializar Terraform (descargar providers)
terraform init

# Validar sintaxis
terraform validate

# Ver plan de ejecución (sin aplicar cambios)
terraform plan

# Aplicar infraestructura
terraform apply

# Terraform preguntará: "Do you want to perform these actions?"
# Escribe: yes

# Espera aproximadamente 5-10 minutos

# Guardar outputs importantes
terraform output > outputs.txt
notepad outputs.txt

6.5. Construir y subir imagen inicial a ECR
powershell# Obtener URL del ECR
$ECR_URL = terraform output -raw ecr_repository_url

# Login a ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_URL

# Navegar a la carpeta de la app
cd ..\app

# Construir imagen Docker
docker build -t ${ECR_URL}:latest .

# Verificar imagen
docker images

# Subir imagen a ECR
docker push ${ECR_URL}:latest

# Verificar en ECR
aws ecr describe-images --repository-name proyecto-cicd-dev-app
6.6. Forzar primer despliegue en ECS
powershell# Actualizar servicio ECS con la nueva imagen
aws ecs update-service `
  --cluster proyecto-cicd-dev-cluster `
  --service proyecto-cicd-dev-service `
  --force-new-deployment

# Ver estado del despliegue
aws ecs describe-services `
  --cluster proyecto-cicd-dev-cluster `
  --services proyecto-cicd-dev-service `
  --query 'services[0].deployments'

# Esperar hasta que el despliegue esté completo (5-10 minutos)
6.7. Obtener URL y probar aplicación
powershell# Volver a carpeta de Terraform
cd ..\terraform

# Obtener URL de la aplicación
$APP_URL = terraform output -raw alb_url
Write-Host "URL de la aplicación: $APP_URL"

# Probar aplicación (esperar 2-3 minutos después del despliegue)
curl $APP_URL
curl "$APP_URL/health"
curl "$APP_URL/api/info"

# Abrir en navegador
Start-Process $APP_URL

PARTE 7: MONITOREO Y VERIFICACIÓN

7.1. Ver logs en CloudWatch

# Ver logs en tiempo real
aws logs tail /ecs/proyecto-cicd-dev --follow

# Ver logs de las últimas 2 horas
aws logs tail /ecs/proyecto-cicd-dev --since 2h

# Buscar en logs
aws logs filter-log-events `
  --log-group-name /ecs/proyecto-cicd-dev `
  --filter-pattern "ERROR"

  7.2. Ver métricas del servicio

  # Estado del cluster
aws ecs describe-clusters --clusters proyecto-cicd-dev-cluster

# Estado del servicio
aws ecs describe-services `
  --cluster proyecto-cicd-dev-cluster `
  --services proyecto-cicd-dev-service

# Listar tasks en ejecución
aws ecs list-tasks --cluster proyecto-cicd-dev-cluster

# Detalles de una task específica
$TASK_ARN = (aws ecs list-tasks --cluster proyecto-cicd-dev-cluster --query 'taskArns[0]' --output text)
aws ecs describe-tasks --cluster proyecto-cicd-dev-cluster --tasks $TASK_ARN

7.3. Acceder al dashboard de CloudWatch

En Powershell

# Obtener URL del dashboard
cd terraform
$DASHBOARD_URL = terraform output -raw cloudwatch_dashboard_url
Write-Host "Dashboard: $DASHBOARD_URL"

# Abrir dashboard
Start-Process $DASHBOARD_URL

 PARTE 8: WORKFLOW COMPLETO DE CI/CD
8.1. Hacer cambios en la aplicación
app/server.js (modificar)
javascript// Agregar una nueva ruta
app.get('/api/version', (req, res) => {
  res.json({
    version: '2.0.0',
    updated: new Date().toISOString(),
    features: ['CI/CD', 'Auto-scaling', 'Monitoring']
  });
});
8.2. Commit y push para activar CI/CD
powershell# Ver cambios
git status

# Agregar cambios
git add .

# Commit
git commit -m "feat: agregar endpoint /api/version"

# Push a main (esto activará el pipeline)
git push origin main
8.3. Monitorear el pipeline en GitHub

Ve a tu repositorio en GitHub
Click en Actions
Verás el workflow ejecutándose
Click en el workflow para ver detalles

8.4. Verificar nuevo despliegue
powershell# Esperar a que el pipeline termine (~5-10 minutos)

# Verificar nuevo endpoint
curl "$APP_URL/api/version"

# Ver logs del nuevo despliegue
aws logs tail /ecs/proyecto-cicd-dev --follow







