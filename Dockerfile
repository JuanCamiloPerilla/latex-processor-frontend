FROM node:20

WORKDIR /app
COPY . .

ARG VITE_RAILS_API_URL
ENV VITE_RAILS_API_URL=$VITE_RAILS_API_URL

RUN rm -rf node_modules package-lock.json

# Instalamos Vite y creamos el proyecto
# RUN npm create vite@latest ./ -- --template react

RUN npm install

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
