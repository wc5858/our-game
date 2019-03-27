#文档中可以提的一些点

1. js的对象本身就基于原型模式（ts是js的超集）
2. redux（react状态管理工具）更新状态时使用了Object.assign来深拷贝对象，可以说是利用了原型模式的理念，目的是保留状态的变更记录等
3. 整个项目接近MVC架构，react充当view层，redux充当modal，game作为controller，用户操作view向controller发起调用，controller更新modal状态，而react-redux会自动将modal的状态变化更新到view中（这种更新本质上是观察者模式）
4. 目前做成本地单机，考虑到可能的需求变更（如改成联机游戏），在game和redux直接用Proxy模式做了一层转发，用的js（es6+）提供的Proxy类
5. game做成了单例，并应用了外观（Facade）模式
6. 回合类Round应用状态模式
7. 技能和物品面板应用了命令模式
8. 装备掉落采用随机生成属性的设定，生成装备用了生成器模式，生成器的建造者用了模板方法和原型模式建造并返回拷贝对象（js中对象主要有class和字面量两种形式，ts的type类型可以对对象做属性检查，所以Equipment对象之间用字面量形式生成）
9. 物品使用采取策略模式