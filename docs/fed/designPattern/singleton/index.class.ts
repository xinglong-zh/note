/**
 * 单例模式，总是返回相同的缓存对象
 * 1. 将构造函数设为私有，防止使用new 运算符
 * 2. 提供一个静态方法，返回实例
 */
class Singleton {

    private static instance: Singleton; // 缓存实例
    // 私有化构造函数
    private constructor() { }

    public static getInstance(): Singleton {
        if (Singleton.instance != null) {
            return new Singleton()
        }
        return Singleton.instance
    }
}


