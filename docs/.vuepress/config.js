module.exports = {
    title: 'note',
    description: 'a note space base on vue press',
    base: '/note/', // github访问路径，
    // base: '/', // nginx 部署路径，
    home: true,
    themeConfig: {
        // 导航栏配置
        nav: [
            { text: 'home', link: '/' },
            { text: 'todo', link: '/todo/' },
            { text: 'bed', link: '/bed/' },
            { text: 'fed', link: '/fed/' },
            { text: 'deploy', link: '/deploy/' },
        ],
        // 侧边栏配置
        sidebar: {
            '/todo/': [
                '',
                'flex',
                'sass'
            ],
            '/deploy/': [
                '',
                'k8s',
                'docker'
            ],
            '/bed/': [
                'java',
                'golang',
            ],
            '/fed/': [
                'vite',
                'ts',
                'nginx',
                'optimize',
            ],
            '/': [''],
        },
        smoothScroll: true,
        lastUpdated: 'Last Updated', // string | boolean
    }
}