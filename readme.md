# 基于electron、react、redux、typescript、webpack构建的桌面智能财务软件

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

## 开发经验
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

基于此，`electron`就可以顺利跑起来了，至于`electron`如何做到热更新，待续！

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

### TODO： `electron`如何热更新
- 即使是`electron-react-boilerplate`也不支持`electron`的热更新，hh，得找其他库看看实现原理，估计都用到了`electron-reload`吧，不过这个也不重要，重要的还是`renderer`部分的热更新。

