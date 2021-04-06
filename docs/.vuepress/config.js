module.exports ={
    title:'note demo',
    description:'a note space base on vue press',
    base:'/note/', // github访问路径，
    home:true,
    themeConfig:{
        // 导航栏配置
        nav:[
            {text:'home',link:'/'},
            {text:'guide',link:'/guide'},
            {text:'demo',link:'/www.baidu.com'}
        ],
        // 侧边栏配置
        sidebar:[
            ['/','资料'],
            ['/ts/','TS+JS'],
            ['/vite/','VITE+VUE'],
            ['/golang/','Golang'],
            ['/java/','JAVA'],
            ['/nginx/','Nginx'],
            ['/k8s/','K8s'],
            ['/todo/','todos'],
        ],
        smoothScroll:true,
    }
}