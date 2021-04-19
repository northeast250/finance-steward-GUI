# 基于electron、react、redux、typescript、webpack构建的桌面智能财务软件

## TODO
- [ ] 增加对其他类型，例如图片等文件的导入支持（暂无需求）
- [x] 解决`react`的热更新问题（已基于`webpack serve`实现）
- [x] 解决`electron`的热更新问题（已基于`electron-reloader`实现）
- [x] 增加对`css`、`less`等文件的导入支持（已基于`style-loader`、`css-loader`、`les-loader`在`webpack`中实现）
- [ ] 修复由于`redux-thunk`导致的`redux`在`createStore`时出现`typescript`警告的问题（这个问题最令我惊奇的是使用`//@ts-ignore`都无法屏蔽……不过本质上是因为`combinedReducers`用到了一个特有`Symbol`叫`$CombinedState`，反正挺蛋疼，我暂时先在`tsconfig.json`配置里把`declaration`和`declarationMap`关了，就没问题了，这个`ts`选项我暂时也用不到。）
- [x] 基于以上对`redux-thunk`的修复，进一步寻找一个优秀的`typescipt`+`redux`的编码约定（目前我把所有的`actionTypes`写在一个文件里，然后在`actions`文件里写同步（直接返回`Action`）或者异步（`thunk`）代码，其中`thunk`不走`reducer`，同时还要把`thunk`中间件放在`logger`中间件的前面。另外，我不再考虑既声明`ActionType`又声明`Action`的问题了，对于`Action`直接使用`AnyAction`（默认自带`type`属性），对于`ActionType`直接使用`switch(action.type as XXActionType)`代码约定，我觉得挺好的。日后再研究其他大佬的代码吧~）

## 注意事项
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

## 框架相关 - 开发经验
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
