import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/shortGuideToUIUXDesign/',
    title: 'Краткое руководство по\u00A0UI и UX дизайну',
    description:
        'Сборник практических советов по дизайну пользовательских интерфейсов. Кратко, конкретно и без "делай как чувствуешь"',
    lang: 'ru-RU',

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config

        sidebar: [
            {
                items: [{ text: 'О чем эта книга', link: '/' }],
            },
            {
                text: 'Цвет',
                base: '/color',
                items: [
                    { text: 'Насыщенность', link: '/chroma' },
                    { text: 'Эмоциональное восприятие цвета', link: '/emotions' },
                    { text: 'Проблемы OKLCH', link: '/oklch-problems' },
                ],
            },
            {
                text: 'Текст',
                base: '/text',
                items: [
                    { text: 'Выравнивание текста', link: '/align' },
                    { text: 'С засечками или без', link: '/serif-vs-sans' },
                    {
                        text: 'Как понять, шрифт хороший или плохой',
                        link: '/is-font-good-or-bad',
                    },
                ],
            },
            {
                items: [
                    {
                        text: 'Самые частые заблуждения дизайнеров',
                        link: '/common-mistakes',
                    },
                    {
                        text: 'Почему отступы - это важно',
                        link: '/why-paddings-margins-gaps-are-important',
                    },
                    { text: 'Иконки', link: '/icons' },
                    { text: 'Глассморфизм', link: '/glassmorphism' },
                    { text: 'Адаптивность', link: '/adaptivity' },
                    { text: 'Сетка', link: '/grid' },
                ],
            },
        ],

        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/Milena42/shortGuideToUIUXDesign',
            },
        ],

        docFooter: {
            prev: 'Предыдущая',
            next: 'Дальше',
        },

        outline: {
            label: 'На этой странице',
            level: 'deep',
        },

        returnToTopLabel: 'Наверх',

        sidebarMenuLabel: 'Содержание',

        notFound: {
            title: 'Страница не найдена',
            quote: '',
            linkText: 'на главную',
            link: '/',
        },
    },
});
