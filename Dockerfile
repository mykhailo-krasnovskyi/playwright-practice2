FROM mcr.microsoft.com/playwright:v1.47.1-jammy

WORKDIR /pw-tests

COPY package.json .

RUN npm install

COPY . .

CMD ["npx", "playwright", "test", "--project=smoke"]