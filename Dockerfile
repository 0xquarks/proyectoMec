FROM node:24

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./ 

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 4000

CMD ["pnpm", "run", "dev"]
