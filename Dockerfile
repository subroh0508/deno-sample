FROM denoland/deno:latest

WORKDIR /app

# 依存関係のキャッシュ用にdeno.jsonとdeno.lockを先にコピー
COPY deno.json deno.lock ./

# ソースコードをコピー
COPY . .

# 依存関係をキャッシュ
RUN deno install --entrypoint main.ts

CMD ["deno", "run", "main.ts"]
