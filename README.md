# IPTV Portal Demo

Многостраничный статический IPTV-проект для тестовой публикации через GitHub Pages.

## Страницы

- `index.html` — главная
- `channels.html` — каталог каналов
- `player.html` — IPTV/HLS-плеер
- `favorites.html` — избранные каналы
- `playlist.html` — импорт и экспорт M3U
- `about.html` — информация о проекте

## Технологии

- HTML5
- CSS3
- JavaScript
- localStorage
- Hls.js

## Публикация через GitHub Pages

1. Создайте новый репозиторий на GitHub.
2. Загрузите в корень репозитория все файлы и папки этого проекта.
3. Откройте `Settings` → `Pages`.
4. В разделе `Build and deployment` выберите `Deploy from a branch`.
5. Выберите ветку `main` и папку `/ (root)`.
6. Сохраните настройки.
7. GitHub выдаст адрес вида:
   `https://USERNAME.github.io/REPOSITORY/`

## Важно

В проекте используются только публичные тестовые HLS-потоки.
Реальные IPTV-адреса добавляйте только если у вас есть право на их использование.

Некоторые IPTV-потоки могут не воспроизводиться в браузере из-за CORS,
HTTPS/mixed-content или ограничений самого провайдера.
