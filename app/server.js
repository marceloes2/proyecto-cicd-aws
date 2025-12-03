const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

// Middleware de seguridad
app.use(helmet());

// Logger
app.use(morgan('combined'));

// Parse JSON
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '¡Aplicación CI/CD en AWS funcionando correctamente!',
    data: {
      version: '1.0.0',
      environment: ENV,
      timestamp: new Date().toISOString(),
      hostname: require('os').hostname()
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    project: 'Proyecto Final CI/CD',
    technology: 'Node.js + Express',
    cloud: 'AWS ECS Fargate',
    cicd: 'GitHub Actions',
    infrastructure: 'Terraform'
  });
});

// Ruta de error para testing
app.get('/error', (req, res) => {
  throw new Error('Error de prueba');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    error: err.message
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

app.listen(PORT, () => {
  console.log(` Servidor corriendo en puerto ${PORT}`);
  console.log(` Ambiente: ${ENV}`);
  console.log(` Iniciado: ${new Date().toISOString()}`);
});

app.get('/api/version', (req, res) => {
  res.json({
    version: '2.0.0',
    updated: new Date().toISOString(),
    features: ['CI/CD', 'Auto-scaling', 'Monitoring']
  });
}); 