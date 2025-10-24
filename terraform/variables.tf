variable "aws_region" {
  description = "Región de AWS"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Nombre del proyecto"
  type        = string
  default     = "proyecto-cicd"
}

variable "environment" {
  description = "Ambiente (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "app_port" {
  description = "Puerto de la aplicación"
  type        = number
  default     = 3000
}

variable "app_count" {
  description = "Número de instancias de la aplicación"
  type        = number
  default     = 2
}

variable "fargate_cpu" {
  description = "CPU para Fargate task"
  type        = string
  default     = "256"
}

variable "fargate_memory" {
  description = "Memoria para Fargate task"
  type        = string
  default     = "512"
}

variable "health_check_path" {
  description = "Path para health check"
  type        = string
  default     = "/health"
}