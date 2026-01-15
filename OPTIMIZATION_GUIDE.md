# Руководство по оптимизации производительности

## Применённые оптимизации

### 1. Оптимизация сборки (Vite)
- ✅ Минификация JavaScript с помощью Terser
- ✅ Удаление console.log и debugger в production
- ✅ Code splitting для Bootstrap
- ✅ Оптимизация CSS (минификация, code splitting)
- ✅ Оптимизация имён файлов с хешами для кеширования

### 2. Оптимизация загрузки ресурсов
- ✅ Preconnect для внешних доменов (Google Fonts, Font Awesome, CDN)
- ✅ DNS prefetch для дополнительной оптимизации
- ✅ Defer для всех внешних скриптов (неблокирующая загрузка)
- ✅ Preload для критического изображения header-bg.jpg
- ✅ Оптимизация Google Fonts (display=swap)

### 3. Оптимизация изображений
- ✅ Lazy loading для всех изображений ниже fold (portfolio, team, about)
- ✅ Eager loading для критических изображений (logo, иконки)
- ✅ Fetchpriority для критических ресурсов

## Рекомендации по дальнейшей оптимизации

### 1. Оптимизация изображений (требует ручной работы)

#### Конвертация в WebP
```bash
# Установите инструменты для конвертации
npm install --save-dev sharp-cli

# Конвертация изображений в WebP
npx sharp-cli -i public/img/header-bg.jpg -o public/img/header-bg.webp
npx sharp-cli -i public/img/map-image.png -o public/img/map-image.webp
```

**Приоритетные изображения для оптимизации:**
- `header-bg.jpg` (233K) - конвертировать в WebP, уменьшить качество до 80-85%
- `map-image.png` (356K) - конвертировать в WebP или оптимизировать PNG
- Изображения портфолио (17-32K каждое) - можно оптимизировать
- Изображения команды (39-60K каждое) - можно оптимизировать

#### Использование srcset для адаптивных изображений
Добавьте в Pug шаблон:
```pug
img(
    src='/img/header-bg.jpg',
    srcset='/img/header-bg-small.jpg 768w, /img/header-bg.jpg 1920w',
    sizes='100vw',
    alt='...',
    loading='eager',
    fetchpriority='high'
)
```

### 2. Критический CSS
Выделите критический CSS для above-the-fold контента и вставьте его inline в `<head>`.

### 3. Service Worker для кеширования
Добавьте Service Worker для кеширования статических ресурсов:
```bash
npm install --save-dev workbox-webpack-plugin
```

### 4. Gzip/Brotli сжатие
Настройте на сервере сжатие для:
- HTML
- CSS
- JavaScript
- JSON

### 5. CDN для статических ресурсов
Используйте CDN для:
- Bootstrap (уже используется)
- Font Awesome (можно перевести на npm пакет)
- Google Fonts (уже оптимизировано)

### 6. Оптимизация шрифтов
- Используйте только необходимые веса шрифтов
- Рассмотрите использование `font-display: swap` (уже добавлено)
- Предзагрузка шрифтов через `<link rel="preload">`

### 7. Мониторинг производительности
Используйте инструменты:
- Lighthouse (встроен в Chrome DevTools)
- WebPageTest
- PageSpeed Insights

### 8. Дополнительные оптимизации Vite
Можно добавить в `vite.config.ts`:
```typescript
import { compression } from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    vitePugPlugin({}),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
});
```

## Метрики для отслеживания

После применения оптимизаций проверьте:
- **First Contentful Paint (FCP)** - должен быть < 1.8s
- **Largest Contentful Paint (LCP)** - должен быть < 2.5s
- **Time to Interactive (TTI)** - должен быть < 3.8s
- **Total Blocking Time (TBT)** - должен быть < 200ms
- **Cumulative Layout Shift (CLS)** - должен быть < 0.1

## Команды для проверки

```bash
# Сборка проекта
npm run build

# Предпросмотр production сборки
npm run preview

# Анализ размера bundle
npm install --save-dev vite-bundle-visualizer
# Добавьте в vite.config.ts плагин для визуализации
```

