FROM node:19
ENV PORT=3000

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

WORKDIR /app/dist

EXPOSE 3000
CMD [ "node", "main.js" ]