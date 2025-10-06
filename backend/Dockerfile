# --- ETAPA 1: BUILDER (Compilación) ---
FROM node:20-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json ./

# Instala todas las dependencias
RUN npm ci

# Copia el resto del código fuente
COPY . .

# Compila la aplicación NestJS
RUN npm run build


# --------------------------------------------------------------------------


# --- ETAPA 2: PRODUCTION (Ambiente de Ejecución) ---
FROM node:20-alpine AS production

# Crea un usuario no-root por seguridad
RUN adduser -D nestuser
USER nestuser

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia SÓLO los archivos de definición de dependencias
COPY package.json package-lock.json ./

# Instala SÓLO las dependencias de producción
RUN npm ci --only=production

# Copia los artefactos compilados (la carpeta 'dist') de la etapa 'builder'
COPY --from=builder /app/dist ./dist

# Expone el puerto por defecto de NestJS
EXPOSE 3000

# Comando para iniciar la aplicación compilada
CMD ["node", "dist/main"]