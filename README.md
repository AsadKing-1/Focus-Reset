# Focus Reset

> Focus Reset — одна осознанная пауза между хаосом и фокусом.

Focus Reset — это приложение для дыхательных практик на Next.js (App Router).
Оно помогает выбрать текущее состояние и доступное время, а затем запускает подходящую сессию дыхания.

## Что делает приложение

- На главной странице:
  - выбор состояния (`Fatigued`, `Overwhelmed`, `Mind Wandering`, `Sleepy`)
  - выбор длительности (`2`, `5`, `10` минут)
  - открытие окна с рекомендациями
- Подбор рекомендаций:
  - поиск дыхательного набора по связке `feeling + time`
  - показ подходящих техник
  - переход в сессию через query-параметры
- Сценарий сессии (`/sessions`):
  - экран перед стартом
  - активная сессия с таймером и фазами дыхания
  - экран завершения
- Хранение состояния:
  - тема в `localStorage` (`theme`)
  - статус сессии по технике в `localStorage` (`breathing-session:<techId>`)

## Маршруты

- `/` — главная страница с выбором состояния и времени
- `/sessions?tech=<technique-id>&time=<2|5|10>` — экран сессии
- `/history` — страница истории (пока заглушка)

## Технологии

- Next.js 16 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS 4
- ESLint 9 + `eslint-config-next`

## Структура проекта

```text
app/
  layout.tsx
  page.tsx
  sessions/
    page.tsx
    SessionClient.tsx
  history/
    page.tsx

entities/
  breathing/
    model/types.ts
    data/breathingSets.ts

features/
  intake/ui/
    FeelingSection.tsx
    TimeSection.tsx
    FindBreathingSystemDialog.tsx
    DialogContent.tsx
    ResultView.tsx
    LoadingView.tsx
    SuccessView.tsx
  session/
    ui/
      BeforeBreathingSessionStart.tsx
      BreathingSessionActive.tsx
      BreathingSessionFinished.tsx
      FeelingAfterSession.tsx
      InputFeelings.tsx
    model/
      getPhaseAt.ts
      lib/formatPhase.ts

hooks/
  useSessionPersistence.ts
  useTimerSession.ts

shared/ui/
  Navbar.tsx
```

## Основные типы данных

Определены в `entities/breathing/model/types.ts`.

- `TimeOption`: `2 | 5 | 10`
- `SessionStatus`: `"Not Started" | "Active" | "Finished"`
- `PhaseType`: `"inhale" | "hold" | "exhale" | "hold_empty"`
- `BreathingSet`:
  - цель, подходящие состояния и время
  - список техник `BreathingTechnique`

Наборы дыхательных техник находятся в `entities/breathing/data/breathingSets.ts`.

## Контракт URL для сессии

Страница сессии читает:

- `tech`: id техники
- `time`: минуты (`2 | 5 | 10`)

`useSessionPersistence` парсит `time` и использует `2`, если значение невалидно.

Пример:

```text
/sessions?tech=box-4&time=5
```

## Локальный запуск

### Требования

- Node.js 20+
- npm

### Установка зависимостей

```bash
npm install
```

### Запуск dev-сервера

```bash
npm run dev
```

Открой в браузере: `http://localhost:3000`

## Скрипты

- `npm run dev` — запуск dev-сервера
- `npm run build` — production-сборка
- `npm run start` — запуск production-сервера
- `npm run lint` — проверка ESLint

Проверка TypeScript:

```bash
npx tsc --noEmit
```

## Текущие ограничения

- `history` пока не подключена к реальным данным.
- Кнопка `Save and Finish` на финальном экране пока без полной бизнес-логики.
- Часть TODO-задач по рефакторингу и полировке UI еще в работе.

