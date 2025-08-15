# Internationalization (i18n) Setup

This project uses `react-i18next` for internationalization support.

## Supported Languages

- **English (en)** - Default language
- **Russian (ru)** - Русский
- **Uzbek (uz)** - O'zbek

## Usage

### Basic Translation

```tsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("common.home")}</h1>
      <p>{t("grammar.title")}</p>
    </div>
  );
}
```

### Language Switching

Use the `LanguageSwitcher` component:

```tsx
import LanguageSwitcher from "@/shared/ui/LanguageSwitcher";

function Header() {
  return (
    <header>
      <LanguageSwitcher />
    </header>
  );
}
```

### Custom Hook

Use the custom hook for additional functionality:

```tsx
import { useTranslation } from "@/shared/hooks/useTranslation";

function MyComponent() {
  const { t, currentLanguage, changeLanguage, isLoading } = useTranslation();

  if (isLoading) return <div>Loading translations...</div>;

  return (
    <div>
      <p>Current language: {currentLanguage}</p>
      <button onClick={() => changeLanguage("ru")}>Switch to Russian</button>
    </div>
  );
}
```

## Translation Keys Structure

```json
{
  "common": {
    "home": "Home",
    "loading": "Loading...",
    "error": "Error"
  },
  "navigation": {
    "home": "Home",
    "grammar": "Grammar"
  },
  "grammar": {
    "title": "Grammar",
    "browseGrammar": "Browse the English Grammar"
  }
}
```

## Adding New Translations

1. Add the key-value pair to all language files:

   - `src/shared/i18n/locales/en.json`
   - `src/shared/i18n/locales/ru.json`
   - `src/shared/i18n/locales/uz.json`

2. Use the translation in your component:
   ```tsx
   const { t } = useTranslation();
   return <span>{t("your.new.key")}</span>;
   ```

## Language Persistence

The selected language is automatically saved to `localStorage` and restored on page reload.

## Configuration

The i18n configuration is located in `src/shared/i18n/index.ts`. You can modify:

- Default language
- Fallback language
- Debug mode
- Detection settings
