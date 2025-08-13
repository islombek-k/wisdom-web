import { useTranslation as useI18nTranslation } from 'react-i18next';

// Custom hook that wraps react-i18next's useTranslation
// This allows us to add custom logic or typing in the future
export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();
  
  return {
    t,
    i18n,
    currentLanguage: i18n.language,
    changeLanguage: (lng: string) => i18n.changeLanguage(lng),
    isLoading: i18n.isInitialized === false
  };
};

export default useTranslation;