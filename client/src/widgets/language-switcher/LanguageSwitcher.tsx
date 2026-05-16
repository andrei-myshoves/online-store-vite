import { Button } from '@/shared/ui/button'
import styles from './LanguageSwitcher.module.css'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

const langs = ['ru', 'en'] as const

export const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation('common')

    const currentLang = i18n.language.split('-')[0]

    const handleChangeLanguage = (lang: 'ru' | 'en') => () => {
        i18n.changeLanguage(lang)
    }

    return (
        <div className={styles.languageSwitcher}>
            {langs.map(lang => (
                <Button
                    key={lang}
                    variant="wrapper"
                    className={clsx(styles.languageButton, {
                        [styles.languageButtonActive]: currentLang === lang,
                    })}
                    onClick={handleChangeLanguage(lang)}
                >
                    {t(lang)}
                </Button>
            ))}
        </div>
    )
}
