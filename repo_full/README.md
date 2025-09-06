# Domeo No‑Code Calculators (Doors pilot)

Монорепозиторий: фронтенд + бэкенд + конфиги + docker + CI/CD.

## Быстрый старт (dev)

```bash
# API
cd server && npm i && npm run dev
# Frontend
cd ../frontend && npm i && npm run dev
```

Vite проксирует `/categories`, `/catalog`, `/price`, `/admin` на API :8080.

## Прод (локально)

```bash
docker compose up -d
```

API: http://localhost:8080/categories

## Деплой (GitHub Actions → Yandex VM)

1. Создай репозиторий `domeo-calculators` в GitHub под пользователем `domeo3dmodeler-art` и запушь содержимое.
2. Добавь Secrets в репозиторий:
   - `YC_HOST` = `89.169.189.66`
   - `YC_USER` = `ubuntu` (или ваш пользователь)
   - `YC_SSH_KEY` = приватный SSH ключ (PEM)
3. Любой коммит в `main` триггерит workflow, который:
   - собирает образ `ghcr.io/${{ github.repository_owner }}/domeo-api:latest`,
   - пушит его в GHCR,
   - по SSH поднимает стек на ВМ (порты 80→API, 5432→DB).

Проверка после деплоя:

```bash
curl http://89.169.189.66/categories
curl http://89.169.189.66/static/doors/category.json
```

## Структура

- `config/doors/*` — конфиги категории «Двери».
- `server/` — Express + TypeScript, роуты `/categories`, `/catalog/:cat/options`, `/price/:cat`, `/admin`.
- `frontend/` — React + Vite, рендер по `ui.flow`.
- `templates/doors/*` — шаблоны экспорта КП/CSV.
- `docs/OPENAPI.yaml` — контракт API.
- `docker-compose.yml`, `Dockerfile.api` — контейнеры.
- `.github/workflows/deploy.yml` — CI/CD.

## Лицензия

MIT (по умолчанию).
