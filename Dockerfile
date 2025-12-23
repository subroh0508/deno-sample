FROM denoland/deno:latest

WORKDIR /app

# 依存関係のキャッシュ用にdeno.jsonとdeno.lockを先にコピー
COPY deno.json deno.lock ./

# ソースコードをコピー
COPY . .

# 依存関係をキャッシュ
RUN deno install --entrypoint server.ts

# Prismaクライアントを生成
RUN deno run -A --allow-script=npm:@prisma/client,npm:prisma,npm:@prisma/engines npm:prisma generate

# 非rootユーザーで実行
USER deno

EXPOSE 8000

CMD ["deno", "task", "dev"]
