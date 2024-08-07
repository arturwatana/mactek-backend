FROM node:latest

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

RUN sudo chmod +x ./migrate-start.sh

CMD ["npm", "run", "script"]
