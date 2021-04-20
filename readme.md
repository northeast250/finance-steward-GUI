# 智能财务系统开发笔记

[TOC]

南川，2021年04月19日，V0.0.1

## 项目概况
### TODO

- [ ] **对分类结果与图片的本身标注做对比分析**
- [ ] 进一步解决只识别出部分条目的图片问题（打算先以识别出小于3条的流水类图片着手分析）
- [ ] 进一步解决未分类成功的问题
- [ ] 对详情类图片做进一步的检验（因为这个相较于流水类更难捕捉出错误）
- [ ] 对分类的所有结果进行统计分析
- [ ] 增加对其他类型，例如图片等文件的导入支持（暂无需求）
- [x] 解决`react`的热更新问题（已基于`webpack serve`实现）
- [x] 解决`electron`的热更新问题（已基于`electron-reloader`实现）
- [x] 增加对`css`、`less`等文件的导入支持（已基于`style-loader`、`css-loader`、`les-loader`在`webpack`中实现）
- [ ] 修复由于`redux-thunk`导致的`redux`在`createStore`时出现`typescript`警告的问题（这个问题最令我惊奇的是使用`//@ts-ignore`都无法屏蔽……不过本质上是因为`combinedReducers`用到了一个特有`Symbol`叫`$CombinedState`，反正挺蛋疼，我暂时先在`tsconfig.json`配置里把`declaration`和`declarationMap`关了，就没问题了，这个`ts`选项我暂时也用不到。）
- [x] 基于以上对`redux-thunk`的修复，进一步寻找一个优秀的`typescipt`+`redux`的编码约定（目前我把所有的`actionTypes`写在一个文件里，然后在`actions`文件里写同步（直接返回`Action`）或者异步（`thunk`）代码，其中`thunk`不走`reducer`，同时还要把`thunk`中间件放在`logger`中间件的前面。另外，我不再考虑既声明`ActionType`又声明`Action`的问题了，对于`Action`直接使用`AnyAction`（默认自带`type`属性），对于`ActionType`直接使用`switch(action.type as XXActionType)`代码约定，我觉得挺好的。日后再研究其他大佬的代码吧~）

### UI

![image-20210419222746653](https://mark-vue-oss.oss-cn-hangzhou.aliyuncs.com/20210419_222747_353645-image-20210419222746653.png)

### 链接：

- [MarkShawn2020/finance-steward-GUI: 基于electron、react、redux、webpack、typescript](https://github.com/MarkShawn2020/finance-steward-GUI)

### 框架

- Electron
- React
- Redux
- TypeScript
- Webpack


## V0.0.1 概况

按照准确度标准，目前成功分类情况如下，错误率在20%左右：

![image-20210418194124073](https://mark-vue-oss.oss-cn-hangzhou.aliyuncs.com/20210418_194743_147188-image-20210418194124073.png)



现一一进行错误修复。



### 场景1： 详情页的标题有两行导致序列化失败

![image-20210418194852184](https://mark-vue-oss.oss-cn-hangzhou.aliyuncs.com/20210418_194852_783611-image-20210418194852184.png)



根据程序识别，另一种有两行（讨论过）的情况，就是当logo里有字的时候，比如如下：

![image-20210418200717576](https://mark-vue-oss.oss-cn-hangzhou.aliyuncs.com/20210418_200718_218321-image-20210418200717576.png)



所以程序可以设置两条逻辑，即当金额与详情隔着两行的时候，通过判定两行的长度去分析属于哪一类，尤其对于第二类，考虑限制在字数五个以下。



经过如上处理后，已经只有10%左右错误率了。

![image-20210418201149302](https://mark-vue-oss.oss-cn-hangzhou.aliyuncs.com/20210418_201149_886306-image-20210418201149302.png)



### 场景2 最左边一栏有图标，导致序列化失败或者效果变差

![image-20210418201632617](https://mark-vue-oss.oss-cn-hangzhou.aliyuncs.com/20210418_201633_242170-image-20210418201632617.png)



根据位置计算：图标位170，图宽965，比例为0.176，以上下浮动2个点算，如果我们发现低于屏幕宽度15%的文字识别，则可以视为非流水解析部分。

![image-20210418202005652](https://mark-vue-oss.oss-cn-hangzhou.aliyuncs.com/20210418_202006_247303-image-20210418202005652.png)



目前来看，应该没此类问题了，不过错误更多了，应该是发现了之前没发现的错误。目前错误率在15%左右。

![image-20210418203421441](https://mark-vue-oss.oss-cn-hangzhou.aliyuncs.com/20210418_203422_005338-image-20210418203421441.png)



### 场景3 没截图截全的暂不处理

![image-20210418203400840](https://mark-vue-oss.oss-cn-hangzhou.aliyuncs.com/20210418_203401_466303-image-20210418203400840.png)



### 场景4 有浮窗的暂不处理（根据之前的讨论，后续没有浮窗问题了）

![image-20210418203605975](https://mark-vue-oss.oss-cn-hangzhou.aliyuncs.com/20210418_203606_597733-image-20210418203605975.png)



### 场景5 没有交易对象

![image-20210418203730759](https://mark-vue-oss.oss-cn-hangzhou.aliyuncs.com/20210418_203731_390663-image-20210418203730759.png)



### 场景6 截图不全，这个图其实已经识别出了数字，但是由于没有上面的标题，所以归为了场景5，但其实是用户自己的操作问题，所以这种也不考虑

![image-20210418204423851](https://mark-vue-oss.oss-cn-hangzhou.aliyuncs.com/20210418_204424_517044-image-20210418204423851.png)

### 场景7 带千分位金额未有效匹配

![image-20210419210009532](https://mark-vue-oss.oss-cn-hangzhou.aliyuncs.com/20210419_210010_253356-image-20210419210009532.png)



这张图至少暴露了两个问题，一个是有一些字没有匹配，比如“其他”。（下一个场景说明）

另一个就是带千分位金额没有匹配成功。

第二个问题较为简单，可以先处理一下。

第一种问题之后统一处理（比如用聚类）

### 场景8 支付宝的“其他”未成功匹配

![image-20210419210916197](https://mark-vue-oss.oss-cn-hangzhou.aliyuncs.com/20210419_210916_883573-image-20210419210916197.png)

尽管这个“其他”没有匹配出来让我们很头疼，但是仔细分析，依旧有转机。

可以看到，这张截图里，匹配出来4条，一共6，剩余2条就是“其他”，然后确信度为三分之二，正是4除以6。

造成这样的原因，主要是因为，我们支付宝的匹配依据是日期与金额相距为2，而微信是相距为1，当“其他”未匹配成功时，就被微信模式匹配上了，于是最终出来匹配出4个支付宝、2个微信的局面。

解决的办法也就呼之欲出了，我们对于没有达到百分之百确信度的流水匹配，将他们全部转成支付宝就好。

也许会有误判，但可能性不高，我们可以做如下判断，如果支付宝匹配数大于微信，则将微信部分全部转成支付宝，否则程序报错，我们检查一下。



### 场景9 标题过长，与金额连在了一起，导致识别失效

![image-20210419212328900](https://mark-vue-oss.oss-cn-hangzhou.aliyuncs.com/20210419_212329_582157-image-20210419212328900.png)



我们可以通过识别框的宽度（是否超过屏幕宽度的百分之80），并且有省略号、最后是数字，等综合确定，以进行分割预处理。

### V0.0.1 总结

经过对以上问题的分析与处理后，目前已经去除了以上类型的问题。

![image-20210419220729820](https://mark-vue-oss.oss-cn-hangzhou.aliyuncs.com/20210419_220730_269220-image-20210419220729820.png)

当然，这肯定不能表示已经没有错误了，事实上还有一些隐藏的错误，比如实际有多条，但只识别出一两条，并且还报对。这些留待下一版解决。

最后，再给出一下，经过标注系统处理后，剩余的一些未能进入分类算法的图片集合：



![image-20210419220718316](https://mark-vue-oss.oss-cn-hangzhou.aliyuncs.com/20210419_220719_048701-image-20210419220718316.png)



文字版如下，如有必要可以检验，大部分是由于截图不全，少部分是因为浮窗之类无需深入解决的问题：

```json
{
  "微信/商户消费/详情页无商户全称/美团点评&京东&拼多多平台商户、理财产品/有优惠/支出/交易名称：对方名称/当前状态：支付成功/xq1.jpg": "有浮窗（跳过）",
  "微信/商户消费/详情页内容齐全/付款码、乘车码、微信小程序、第三方APP、手机充值、公众号打赏/无优惠/退款/当前状态：已全额退款/ls1.jpg": "未分类成功（跳过）",
  "微信/商户消费/详情页内容齐全/付款码、乘车码、微信小程序、第三方APP、手机充值、公众号打赏/无优惠/退款/退款状态：已退款/ls3.jpg": "未分类成功（跳过）",
  "微信/商户消费/详情页内容齐全/付款码、乘车码、微信小程序、第三方APP、手机充值、公众号打赏/有优惠/支出/当前状态：支付成功/ls3.jpg": "未分类成功（跳过）",
  "支付宝/余利宝/转入/交易名称：商品说明/当前状态：交易成功/ls1.jpg": "未分类成功（跳过）",
  "支付宝/余利宝/转入/交易名称：转出说明/当前状态：交易成功/ls1.jpg": "未分类成功（跳过）",
  "支付宝/余利宝/转出/交易名称：转出说明/当前状态：交易成功/ls1.jpg": "未分类成功（跳过）",
  "支付宝/余利宝/转出/交易名称：转出说明/当前状态：交易成功/ls2.jpg": "未分类成功（跳过）",
  "支付宝/余额/充值/交易名称：余额充值/当前状态：交易成功/ls1.jpg": "未分类成功（跳过）",
  "支付宝/余额/提现/交易名称：余额提现/当前状态：交易成功/ls1.jpg": "未分类成功（跳过）",
  "支付宝/余额宝/收益/交易名称：商品说明主要部分/当前状态：交易成功/ls1.jpg": "未分类成功（跳过）",
  "支付宝/余额宝/转入/交易名称：商品说明/当前状态：交易关闭/ls1.jpg": "未分类成功（跳过）",
  "支付宝/余额宝/转入/交易名称：商品说明/当前状态：交易关闭/ls2.jpg": "未分类成功（跳过）",
  "支付宝/余额宝/转入/交易名称：商品说明/当前状态：交易成功/ls4.jpg": "未分类成功（跳过）",
  "支付宝/余额宝/转出/交易名称：商品说明/当前状态：交易成功/ls1.jpg": "未分类成功（跳过）",
  "支付宝/余额宝/转出/交易名称：转出说明/当前状态：交易成功/ls1.jpg": "未分类成功（跳过）",
  "支付宝/小钱袋/转入/交易名称：商品说明/当前状态：交易成功/ls1.jpg": "未分类成功（跳过）",
  "支付宝/小钱袋/转入/交易名称：商品说明/当前状态：等待付款/ls1.jpg": "未分类成功（跳过）",
  "支付宝/小钱袋/转出/交易名称：商品说明/当前状态：交易成功/ls1.jpg": "未分类成功（跳过）",
  "支付宝/线上交易/多出汇率（国外网站交易）/支出/交易名称：商品说明/当前状态：交易成功/ls1.jpg": "未分类成功（跳过）"
}
```



此外，目前系统预设的流程相关的图片标注分类如下，未来将继续补充完善：

```js
export const PRESET_MARK_TYPES = [
  "已完全识别",
  "未分类成功（跳过）",
  "截图不全（跳过）",
  "有浮窗（跳过）",
  "延后处理",
];
```





## 框架相关 - 开发经验

### 遇到需要确认安装`webpack-dev-server`

直接按`Y`确认即可，或者提前在本地全局安装好：

```bash
npm install -g webpack-dev-server
```

### 遇到安装过程中出错的问题

可能是因为网络原因，可以重新安装一遍，或者继续安装未安装成功的那个包

### 关于`document`、`window`等非关键依赖，WebStorm `cannot find name`的问题

重新配置WebStorm里typescript所使用的的位置与版本：

```text
WebStorm > Preference > Language & FrameWorks > Typescript > Typescript
```

选择自己本地全局安装的Typescript（注意先更新到最新版，目前是4.2.4+），不要选用项目初始化的内置Typescript



### 如何用`webpack`打包`css`、`less`等

`webpack`的交互对象是`js`文件，需要通过其他`loader`将特定格式的文件转成`js`文件处理。

对于`css`文件，可以先通过`css-loader`转成`css`信息的`js`数组格式，这个时候`css`其实已经导入了，但是尚未能够生效在目标网页上。

而实现后一步操作的，就是`style-loader`，它们将这些编译后的`js`格式的`css`信息进一步插入到网页的`style`标签内（这也就是`style-loader`取名之意）。

而对于其他格式，比如`less`、`sass`等，则可以先将它们转成`css`格式，要么直接用特定的`loader`，比如对于`less`文件可以使用`lees-loader`，要么可以用`postcss`处理（此项目只用了`less-loader`，[todo]: `postcss`有点复杂，日后再更）。

其配置如下：

```js
[
  {
    test: /\.css$/,
    use: [{ loader: "style-loader" }, { loader: "css-loader" }],
  },
  {
    test: /\.less$/,
    use: [
      { loader: "style-loader" },
      { loader: "css-loader" },
      { loader: "less-loader" },
    ],
  }
]
```

### 如何在`webpack.config.js`中使用`ESM`（即`import`和`export`）

在学习一个好项目：https://github.com/electron-react-boilerplate/electron-react-boilerplate 的时候，发现他里面的所有`webpack`配置文件都用了`ESM`，非常好奇他的实现，因为我把自己的`webpack`配置文件从`CMJ`改成`ESM`后就无法运行了。

后来经过大量测试，以及结合这篇QA：https://stackoverflow.com/questions/31903692/how-can-i-use-es6-in-webpack-config-js/67136670#67136670 ,终于找到了自己的解决方案，那就是 `echo '{"presets": ["@babel/preset-env"]}' > .babelrc`
g
此外，还得安装一下`babel`的相关依赖：
`yarn add -D @babel/core @babel/register @babel/preset-env`

最后，将`webpack.config.xx.js`改成`webpack.config.xx.babel.js`即可。

这是一项很有收获的经验。

### 如何顺利执行基于`typscript`的`electron`

结合一些资料，可以知道有两种办法。
第一种，是使用`tsc`进行预编译，然后再用`electron`运行。
其具体命令如下：
`tsc ./src/main/index.ts && electron ./src/main/index.js`

这里比较关键的是，`tsc`执行完成后会生成`.js`文件，然后`electron`运行这个`.js`文件即可。

但也存在问题，如果使用`tsc -w`命令监视`index.ts`文件，则当我们修改源代码时，虽然会实时地重新编译，但是由于我们`electron`已经加载了原来的`.js`文件，因此无法做到`electron`的热更新。

此外，有资料指出，这种先编译的开销较大。

第二种，也是本项目（参考的`electron-react-boilerplate`)所选用的方法，就是将`.ts`文件交给`babel`处理，`babel`只处理其中涉及到`ts`相关的部分，编译转换的开销较小。

在上一个章节，我介绍了如何在`webpack`配置中使用`ESM`的办法，具体就是使用`babel`，结合`.babelrc`文件。不过那次我们只需要处理`ESM`的`import`和`export`，因此只需要`@babel/preset-env`即可，但这次我们要处理`typscript`，因此还需加上`@babel/preset-typescript`（顺便还要安装一下）。

不过还没完，还得加上一个`babel_register`的脚本，在运行`renderer`中不需要加是因为有`webpack serve`帮我们搞定了，但运行`electron`我们是纯`babel`，所以需要自己预处理`.ts`相关文件。

另外有趣的一点是，基于`tsc`编译后的每个`.ts`文件都有一个对应的`.js`文件，而通过`babel`编译后的每个`.ts`文件都对应两个额外文件：`.d.ts`和`.d.ts.map`。

### 如何结合`main`和`renderer`进行打包渲染？

第一种方法，是将`main`和`renderer`独立开来。
先用`webpack serve`将`react`组件渲染到`localhost`，然后再用`electron`里的`loadUrl`函数渲染`main`。实践证明，由于编译、渲染需要耗时，以及`webpack serve`是一个堵塞操作，不方便在`script`里进行顺序控制，所以我需要在`loadUrl`函数里写一个轮询，直到渲染成功后才正常加载。

这个方法比较笨拙，但是容易理解。基于这个理解之后，再来看第二种方法，它的本质也是两个独立进行，但是基于`webpack`的一些默认参数，做到了更好的进程间通信（于是就不用轮询了，降低了对业务代码的入侵）。

核心就是直接启动`renderer`进行，但是在`renderer`的配置文件里，加上`devServer`选项，核心配置如下，在`before`参数里使用`spawn`开启了一个新的进程，实在awesome~：

```js
devServer: {
	before()
	{
		console.log('Starting Main Process...');
		spawn('npm', ['run', 'start:main'], {
			shell: true,
			env: process.env,
			stdio: 'inherit',
		})
		.on('close', (code) => process.exit(code))
		.on('error', (spawnError) => console.error(spawnError));
	}
}
```

另外，这里的`.on('close')`回调函数，也解决了如果独立运行两个进行，则关闭`electron`进程后`webpack serve`进程仍然会无意义进行的问题。

### 加载`index.html`的不同办法

`index.html`是必须要有的，至少有一个`id=app`之类的结点，问题是如何加载、编译与转换。

第一种方案，我们把`index.html`里要引用的`script`都写死，比如一般来说我们会将`bundle.js`打包到根目录下的`dist/`中，如果我们`index.html`在根目录下，则直接写死`<script src="./dist/bundle.js"></script>`即可。

这样，当`webpack`把`react`组件打包到`dist/`目录下后，这个`index.html`页面就可以展示`react`组件了（同时不要忘了引入`react`和`react-dom`的脚本文件）。最后，再由`electron`读取这个`index.html`文件，就能做到在`electron`中渲染。

但这种方案有个明显的缺点，那就是生成的`dist`文件中不含有`index.html`文件，这不适合项目的发布。所以，我个人还是推荐`index.html`得提前拷贝到目标路径吧`dist/`下，然后对`bundle.js`文件的引用就是`./bundle.js`了。

那么要实现这个拷贝，也至少有两个方法，第一种比较朴素，那就是每次运行`renderer`进程时将`index.html`用`cp`（linux、mac）或者`copy_file`（需要安装，全平台）拷贝到`dist/`目录下（同样要包含`react`、`react-dom`脚本）。

还有一种办法就比较智能，那就是使用`webpack`的`html-webpack-plugin`插件，它会自动将`index.html`拷贝到目标位置，并且还会自动加上其依赖（也就是说，不需要手动写引入`bundle.js`、`react.js`、`react-dom.js`等）。此外，它还需要热更新功能，可谓一举双得，不过这会覆盖`devServer`里的`hot`选项。

### `electron`如何热更新

- 即使是`electron-react-boilerplate`也不支持`electron`的热更新，hh，得找其他库看看实现原理，估计都用到了`electron-reload`吧，不过这个也不重要，重要的还是`renderer`部分的热更新。

然而很简单，只需要安装`electron-relaoder`后在`electron`的主程序里加三句话即可：

```js
try {
	require('electron-reloader')(module);
} catch {}
```

它的原理，就是会自动寻找入口文件的依赖图，然后对其进行文件修改监测，一旦有确认修改就重启。

不过副作用就出现在这里，我们之前配置`renderer`的`webpack`部分时，加了一句：

```js
on('close', (code) => process.exit(code))
```

这一句代码会导致，当我们的`electron`程序关闭后自动关闭渲染进程，所以我们要删掉这一行。

（理论上`renderer`进程是`electron`进程的子进程，但是我们的`webpack`配置结果就是`electron`进程是`renderer`进程的子进程，目前来看没有太大问题，我不确定如果我们反过来是否就是把`before`改成`after`就完事了，但好像改的意义也不是特别大）

关于`electron-reloader`可以参考：

- [sindresorhus/electron-reloader: Simple auto-reloading for Electron apps during development](https://github.com/sindresorhus/electron-reloader#readme)


## 业务相关 - 开发经验

### 如何将OCR的结果显示在图片上，并且支持缩放

第一种方法，也是一开始采取的方法，比较笨拙。

那就是先求出预定的缩放比率，然后将图片按比例放缩，再讲OCR的矩形坐标按照比率进行计算再叠加渲染。

我一直觉得这个方法很笨拙，但当时时间有限、技术有限，所以只好用了这个方案。

第二种方法，图形本身不做缩放，OCR结果直接叠加渲染到图片上，最后将这个整体使用以下`CSS`进行缩放：

```less
.img-with-ocr {
	transform: scale(SCALE);
	transform-origin: top left;
	height: IMG_HEIGHT * SCALE;
}
```

这里的`IMG_HEIGHT`就是图片的实际高度，而`SCALE`就是目标缩放比率，由于我需要的图片布局就是统一宽度，高度按比率缩放，所以`SCALE`这么设计。这里之所以还要对这个形状的高度本身做限制，是因为我这个容器就是顶层容器，但是缩放效果是不改变容器大小的，因此会出现缩放后的效果与容器不贴合的副作用，因此还需要重设容器大小。

这样，通过一个统一的缩放参数，就优化了第一种方案中需要计算`2 + 4 * N`遍的问题。此外，这种通过`CSS`里的`scale`参数去控制显示的缩放比率，还是非常有用的！（在此，感谢**威盛项目**，这个技巧便是在这个项目中摸索出来的。)


### 关于热开发读取文本导致重启的问题

很奇怪，当我把数据缓存到和`main`、`renderer`同级的`data`文件下时，会导致`renderer`重启，但当我把它放进`main`里面则不会，实在不清楚`webpack`热重启到底依赖了哪些，它是整个`src`文件夹都做了监控吗？

最后终于找到问题了，原来不是`webpack`的锅，而是`electron-reloader`，具体见：

```js
// 开发模式使用electron热重载，它会自动构建依赖图
// 一定要小心这里要监测的范围，由于我们修改electron主要是一些程序部分，所以千万不要把需要不断覆写的数据文件也加进来，不然会一直重载
// 这里的启示是要把数据文件独立出去，比如放在与`main`同级的`data`文件夹下，然后只监控`main`文件夹
try {
  require("electron-reloader")(__dirname);
} catch {}

```



### 关于相对路径、绝对路径、固定路径

从相对路径到绝对路径，我们已经很熟悉了，比如使用`path.resolve`之类的函数。

然而当我们的程序涉及到了打包、移动，那么问题就蹊跷起来了。

事实上，我通过这种方式将数据文件夹的相对路径指定成绝对路径之后，打包完直接到了`electron/dist`下的未知名路径，所以事实上产生了错误。

有趣的是，在`renderer`里会有这样的错误，但在`main`里没有，毕竟，其实只有`renderer`里的资源被打包了，`main`程序里的路径是不变的。

基于此，有两种方案，一种是所有的本地资源读取都在`main`里，另一种就是把路径写死这样两个进程里都可以使用了，毕竟，所谓的`web secruity`有时间再研究吧，我现在就是要在`renderer`里大用特用`node`！将业务效率`MAX MAX MAX`！



### 关于初始化对象并复用的问题

```js
export const _initTokenLS: TokenLS = {
  items: [],
  tokens: [],
  scenario: Scenario.unknown,
  cntWxTokens: 0,
  cntZfbTokens: 0,
  confidence: 0,
}
```

这是一个常量对象，用于初始化，然而，却隐藏着难以预估的bug。

问题就在于，虽然我们用`const`修饰符固定住了变量，所以不能用赋值语句修改`_initTokenLS`这个变量，然而，这并不能阻止我们尝试修改它子属性的行为（用`C++`术语理解，就是指针是常量，但是指针指向的变量不是常量）。

于是乎，当我用这个常量作为很多其他变量的初始值，并在其上做修改，例如如下：

```js
let tokenLS: TokenLS = _initTokenLS;
tokenLS.confidence = 1; // _initTokenLS.confidence = 1
```

这样，对`tokenLS`的修改实质上等价于对`_initTokenLS`的修改，问题就连锁式的、反复的产生了。

所以，要么，我们铭记，初始化的常量，不能直接赋值，比如可以用解构语法，写成这样（等价于`C++`中的复制构造）：

```js
let tokenLS: TokenLS = {..._initTokenLS}
```

但是我们也许当时记得，后续难免会疏忽，那有没有规避对对象的修改操作的办法呢？倒也不是没有，比如可以用`typscript`进行对象的键值限制：

![image-20210419202741257](https://mark-vue-oss.oss-cn-hangzhou.aliyuncs.com/20210419_202742_005682-image-20210419202741257.png)

然而，这样的问题有三：

1. 虽然对象里面的每个键`items`、`confidence`等不可以被修改（重新赋值）了，但是依旧可以使用一些原型操作（比如当键是一个对象的时候），所以这个解决方案并没有本质上解决问题
2. 尽管我们可以通过种种复杂的手段，限定初始化对象的修改操作，但是我们依旧会难免不甚使用赋值操作以初始化另一个变量，当我们主动或被动（IDE提醒）意识到这个对象不可以直接修改（而是需要解构赋值）后为时已晚
3. 为了这个初始化对象，我们还需要多写一个一次性的接口，简直浪费。



所以另一种绝佳的办法就是写成一个初始化的函数：

```ts
export const initTokenLS = (): TokenLS => ({
  items: [],
  tokens: [],
  scenario: Scenario.unknown,
  cntWxTokens: 0,
  cntZfbTokens: 0,
  confidence: 0,
});
```

这样，我们每次直接调用，赋值、修改都不会影响初始化的结果：

```ts
let tokenLS: TokenLS = initTokenLS();
tokenLS.confidence = 1; // next time, the initial tokenLS2.confidence = 0 still
```



写到此，使用函数的优越性就彰显出来了，这似乎，从另一个角度理解了，为什么在`redux`里把各种`action`写成函数要比写成对象方便的多了，或许，问题的关键就在此文中。