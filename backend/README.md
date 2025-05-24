# Backend Edge Computing - ESP32 + MQTT + Docker

Este proyecto es el backend de un sistema de Edge Computing que recibe datos desde una ESP32 por MQTT y los gestiona en una red local a través de un servidor Orange Pi.

## Características

- Recibe mensajes MQTT por el puerto 1883
- Usa Mosquitto como broker MQTT
- Backend en Node.js corriendo en Docker
- Compatible con arquitectura ARM64 (Orange Pi) y AMD64 (PC)

## Requisitos

- Docker y Docker Compose instalados
- Mosquitto corriendo en contenedor o local

## Cómo levantar el servidor

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/proyecto-backend.git
   cd proyecto-backend
