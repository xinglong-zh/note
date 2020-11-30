# spring 官网学习

-----

## Design Philosophy

When you learn about a framework, it’s important to know not only what it does but what principles it follows. Here are the guiding principles of the Spring Framework:

1. Provide choice at every level. Spring lets you defer design decisions as late as possible. For example, you can **switch persistence providers through configuration** without changing your code. The same is true for many other infrastructure concerns and integration with third-party APIs.

2. Accommodate diverse perspectives. Spring embraces **flexibility** and is **not opinionated about how things should be done**. It supports a wide range of application needs with different perspectives.

3. **Maintain strong backward compatibility**. Spring’s evolution has been carefully managed to force few breaking changes between versions. Spring supports a carefully chosen range of JDK versions and third-party libraries to facilitate maintenance of applications and libraries that depend on Spring.

4. Care about API design. The Spring team puts a lot of thought and time into making APIs that are intuitive and that hold up across many versions and many years.

5. Set high standards for code quality. The Spring Framework puts a strong emphasis on meaningful, current, and accurate javadoc. It is one of very few projects that can claim clean code structure with no circular dependencies between packages.

### IOC 控制翻转-->依赖注入(DI)

IOC 容器抽象概念 ,  用户提供模型 , 配置数据 , spring 容器产生对象
![ioc](../images/ioc.png);

Configuration Metadata:This configuration metadata represents how you, as an application developer, tell the Spring container to instantiate, configure, and assemble the objects in your application.
告诉spring容器 该如何实例化 装配对象

传统的做法是**xml配置文件** ,  现在可以使用  **注解配置** 和基于**java代码**的配置.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="..." class="...">  
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <bean id="..." class="...">
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <!-- more bean definitions go here -->

</beans>
```

1. xml 配置demo如下

```java
@Service
@Data
public class StoreServiceImpl implements StoreService {

    @Autowired
    private  Animal animal;


    @Override
    public void eat() {
        this.animal.eat();
    }
}
```

```java
@Data
public class Cat implements Animal{
   private String name;
   private String color;

   public Cat(){
      System.out.println("cat 无参方法被调用");
   }

   public Cat(String name,String color){
      this.name = name;
      this.color = color;
      System.out.println("cat name , color 被访问");
   }

   public Cat(String name){
      this.name = name;
      System.out.println("cat name 被访问");
   }

   @Override
   public void eat() {
      System.out.printf("%s,%s,在吃",this.color,this.name);
   }
}
```

测试:

```java
public class StoreServiceImplTest {
    public static void main(String[] args) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        StoreService service = applicationContext.getBean(StoreService.class);
        service.eat();
        /** 泛型application , 可以加载 xml groovy*/

        GenericApplicationContext context = new GenericApplicationContext();
        new XmlBeanDefinitionReader(context).loadBeanDefinitions("beans.xml");
        //  new GroovyBeanDefinitionReader(context).loadBeanDefinitions("beans.groovy");
        context.refresh();
        StoreService contextBean = context.getBean(StoreService.class);
        contextBean.eat();
    }
}

```

配置:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="storeServiceImpl" class="com.example.spring.service.StoreServiceImpl">
        <property name="animal" ref="cat" />
    </bean>
    <!-- 支持p-namepace 需要添加  xmlns:p="http://www.springframework.org/schema/p"-->
    <!-- <bean name="p-namespace" class="com.example.spring.service.StoreServiceImpl"  p:animal-ref="cat" /> -->

    <!-- setter 注入  先调用无参函数, 然后调用setter 的方法注入依赖 -->
    <bean id="cat" class="com.example.spring.pojo.Cat">
        <property name="color" value="红色" />
        <property name="name" value="小猫" />
    </bean>
    <!-- 构造器注入 调用有参构造器进行注入  -->
    <!-- classA 构造器注入 classB  , classB 构造器注入 classA 会造成循环依赖 , 这时候只能使用 etter注入 方法进行解决  -->
    <bean id="cat" class="com.example.spring.pojo.Cat">
        <constructor-arg name="color" value="红色" />
        <constructor-arg name="name" value="小猫" />
    </bean>

</beans>
```

使用名称空间 简化书写

```xml  
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:c="http://www.springframework.org/schema/c"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

<!--    <bean id="storeServiceImpl" class="com.example.spring.service.StoreServiceImpl">-->
<!--        <property name="animal" ref="cat" />-->
<!--    </bean>-->

<!--    用p-namespace 重写   xmlns:p="http://www.springframework.org/schema/p"-->
    <bean name="p-namespace" class="com.example.spring.service.StoreServiceImpl"  p:animal-ref="cat" />

<!--    <bean id="cat" class="com.example.spring.pojo.Cat">-->
<!--        <constructor-arg name="color" value="红色" />-->
<!--        <constructor-arg name="name" value="小猫" />-->
<!--    </bean>-->
<!--    使用 c-namespace 重写 xmlns:c="http://www.springframework.org/schema/c"-->
    <bean id="cat" name="c-namespace" class="com.example.spring.pojo.Cat" c:color="红色" c:name="小猫"></bean>

</beans>
```

过程:**调用了无参构造方法 创建了对象 , 然后通过setter 方法将属性赋值**

### Dependency Injection

1. DI exists in two major variants: **Constructor-based dependency injection** and **Setter-based dependency injection**.
    use **constructors for mandatory dependencies** and **setter methods or configuration methods for optional dependencies**_(solution for circle dependencies)_

#### Dependency Resolution Process

The container performs bean dependency resolution as follows:

1. The ApplicationContext is created and initialized with configuration metadata that describes all the beans. Configuration metadata can be specified by XML, Java code, or annotations.

2. For each bean, its dependencies are expressed in the form of properties, constructor arguments, or arguments to the static-factory method (if you use that instead of a normal constructor). These dependencies are provided to the bean, when the bean is actually created.

3. Each property or constructor argument is an actual definition of the value to set, or a reference to another bean in the container.

4. Each property or constructor argument that is a value is converted from its specified format to the actual type of that property or constructor argument. By default, Spring can convert a value supplied in string format to all built-in types, such as int, long, String, boolean, and so forth.

xml , java code ,annotation -- 形成Metadata
使用 Metadata 创建和初始化 ApplicationContext
bean的依赖 在创建之后给提供

### Circular dependencies

classA 需要classB 通过构造器注入 , classB 需要classA通过构造器注入 , 产生了循环依赖 , 解决方法 , 使用setter 注入 , setter 注入会先创建无参实例, 不会造成循环依赖 ,但是不推荐

-----

If no circular dependencies exist, when one or more collaborating beans are being injected into a dependent bean, each collaborating bean is totally configured prior to being injected into the dependent bean. This means that, if bean A has a dependency on bean B, the Spring IoC container completely configures bean B prior to invoking the setter method on bean A.

### bean scopes

默认 Singleton Scope , reuse
可以指定 Prototype Scope ,每次请求都会重新创建
其他四种在 ApplicationContext : request , session , applicaton , websockets
