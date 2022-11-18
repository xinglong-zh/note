import { defineConfig } from 'vitepress'

export default defineConfig({
    title: '笔记',
    themeConfig: {
        nav: nav(),
        sidebar: getSidebar()
    }
})

function nav() {
    return [
        { text: '前端', link: '/fed/' },
    ]
}

function getSidebar() {
    return {
        '/': [],
        '/fed/': [
            {
                text: '前端',
                items: [
                    { text: '知识点', link: '/fed/review/index' },
                    { text: '设计模式', link: '/fed/designPattern' },
                    { text: 'JS红宝书', link: '/fed/index' },
                ]
            }
        ]
    }
}