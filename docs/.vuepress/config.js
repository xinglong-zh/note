module.exports = {
    title: 'note demo',
    description: 'a note space base on vue press',
    base: '/note/', // github访问路径，
    home: true,
    themeConfig: {
        // 导航栏配置
        nav: [
            { text: 'home', link: '/' },
            {
                text: 'demo',
                items: [
                    { text: 'todo', link: '/todo/' },
                    { text: 'server', link: '/server/' },
                    { text: 'fed', link: '/fed/' },

                ]
            }
        ],
        // 侧边栏配置
        sidebar: {
            '/todo/': [
                '',
                'flex',
                'sass'
            ],
            '/deploy/':[],
            '/server/':[],
            '/fed/':[],
            '/': [''],
        },
        smoothScroll: true,
    }
}