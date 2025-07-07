-- ========================================
-- Extensión TimescaleDB
-- ========================================
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- ========================================
-- Tabla: roles
-- ========================================
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- ========================================
-- Tabla: users
-- ========================================
CREATE TABLE IF NOT EXISTS users (
    identification_id BIGINT PRIMARY KEY,
    type_document VARCHAR(50) NOT NULL,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    cellphone BIGINT,
    role_id INTEGER NOT NULL REFERENCES roles(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    drive_link VARCHAR(255),
    backup_email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50)
);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

-- ========================================
-- Tabla: devices
-- ========================================
CREATE TABLE IF NOT EXISTS devices (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    owner_id INTEGER REFERENCES users(identification_id),
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT now()
);

-- ========================================
-- Tabla: categories
-- ========================================
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- ========================================
-- Tabla: sensors
-- ========================================
CREATE TABLE IF NOT EXISTS sensors (
  id SERIAL PRIMARY KEY,
  device_id INTEGER REFERENCES devices(id),
  category_id INTEGER REFERENCES categories(id),
  namevariable VARCHAR(50) NOT NULL,
  sensortype VARCHAR(50) NOT NULL,
  unit VARCHAR(50) NOT NULL
);

-- ========================================
-- Tabla: sensor_rangers
-- ========================================
CREATE TABLE IF NOT EXISTS sensor_rangers (
    id SERIAL PRIMARY KEY,
    sensor_id INTEGER REFERENCES sensors(id),
    min_value DOUBLE PRECISION NOT NULL,
    max_value DOUBLE PRECISION NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by INTEGER REFERENCES users(identification_id)
);

-- ========================================
-- Tabla: device_status (Hypertable)
-- ========================================
CREATE TABLE IF NOT EXISTS device_status (
    id SERIAL,
    device_id INTEGER REFERENCES devices(id),
    battery_voltage DOUBLE PRECISION NOT NULL,
    wifi_signal_quality INTEGER NOT NULL,
    sensor_health JSONB NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id, created_at)
);

SELECT create_hypertable('device_status', 'created_at', if_not_exists => TRUE);
CREATE INDEX IF NOT EXISTS device_status_created_at_idx ON device_status (created_at DESC);

-- ========================================
-- Tabla: sensor_data (Hypertable)
-- ========================================
CREATE TABLE IF NOT EXISTS sensor_data (
    time TIMESTAMPTZ NOT NULL,
    sensor_id INTEGER NOT NULL REFERENCES sensors(id),
    value DOUBLE PRECISION NOT NULL
);

SELECT create_hypertable('sensor_data', 'time', if_not_exists => TRUE);
CREATE INDEX IF NOT EXISTS sensor_data_time_idx ON sensor_data ("time" DESC);

-- ========================================
-- Tabla: alerts
-- ========================================
CREATE TABLE IF NOT EXISTS alerts (
  id SERIAL PRIMARY KEY,
  sensor_id INTEGER REFERENCES sensors(id),
  value DOUBLE PRECISION NOT NULL,
  alert_type VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- Tabla: backups
-- ========================================
CREATE TABLE IF NOT EXISTS backups (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(identification_id),
    backup_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    file_link VARCHAR(100),
    status VARCHAR(30)
);

-- Configurar zona horaria local
ALTER DATABASE virtex_db SET timezone TO 'America/Bogota';