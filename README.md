一个最佳实践, 基于 typescirpt 的多模块,异构(同时编译 `esmodule`,`commonjs`)项目.

```

├── packages
│   ├── moduleA
│   │   ├── src
│   │   │   └── index.ts
│   │   └── package.json
│   ├── moduleB
│   │   ├── src
│   │   │   └── index.ts
│   │   └── package.json
│   └── web
│       ├── src
│       │   ├── index.html
│       │   └── index.ts
│       └── package.json
└── package.json
```

# 目标

**1. 编译两种结果**

 编译时,分别按cjs、esm两种模块标准,输出到`packages/*/lib/cjs` 、`packages/*/lib/esm`, 与之对应的,package.json当中的 main指向cjs,module指向esm.

**2. 静态分析**

 每个package可以被typescript静态分析, 以支持跨package的refactor. 如 moduleB 依赖 moduleA 导出的 function hello, 当hello重命名为hello2时,moduleB应该跟随改变.

**3. watch & debug**

能够统一build & watch每个package的变更.

# 实现

## 1. 编译两种结果

编译使用tsc,由于需要输出两种标准, 为了提取共享的配置,因此需要如下3个tscofig作为基础配置:

- tsconfig.base.json,用于存放cjs、esm共有的配置
- tsconfig.cjs.json,用于存放cjs独有的配置
- tsconfig.esm.json,用于存放esm独有的配置

对应的,每个package中也包含cjs、esm两个配置:

- tsconfig.cjs.json,继承base-cjs
- tsconfig.esm.json,继承base-esm

拥有上述结构后,有两种选择,

1. 在每个package的package.json中配置script,再借助于yarn workspaces或lerna实现按package的依赖关系拓扑执行构建

	```json
	"prebuild":"rimraf lib/",
	"build": "yarn build:esm && yarn build:cjs",
	"build:esm": "tsc -p tsconfig.esm.json",
	"build:cjs": "tsc -p tsconfig.cjs.json"
	```

2. 借助typescript 的build mode,references所有package,执行`tsc --build`统一构建所有package. 

	```json
	{
	"extends": "./tsconfig.base.json",
	"references": [
		{
			"path": "./packages/moduleA/tsconfig.json"
		},
		{
			"path": "./packages/moduleB/tsconfig.json"
		},
		{
			"path": "./packages/moduleA/tsconfig.esm.json"
		},
		{
			"path": "./packages/moduleB/tsconfig.esm.json"
		},
	]
	}
	```

## 2. 静态分析

如果moduleB依赖moduleA, 

```
import {hello} from "moduleA";
```

就在B的tsconfig中添加A的references,这样可帮助编译器,理解在B中的`import "moduleA"`的含义, 使得原本的模块引用映射为了文件引用,从而实现跨package的静态分析. 

B有两个配置(cjs和esm),我们只需要利用其中一个即可,这里我们选择将reference添加到B的`tsconfig.cjs.json`

```json
// packages/moduleB/tsconfig.cjs.json
{
	"path": "../moduleA/tsconfig.json"
}
```

但需要注意的是,typescript编译器在静态分析时只认识tsconfig.json,因此需要把tsconfig.cjs.json更名为tsconfig.json. 

## 3. watch & debug

如果你解决第一个问题时,使用的是方案2(typescript 的build mode), 那么只需要在根目录 `tsc --build --watch`即可.

watch只推荐这种方式, 当然你完全可以同时使用方案1, 因为这两个方案并不矛盾.

完成了watch后,debug只需对ide做一些配置,告诉ide sourceMap的配置. 注意这里我们设置`outFiles`为cjs(`packages/*/lib/cjs/*.js`) ,因为esm不便于直接运行.

```json
{
	"type": "node",
	"request": "launch",
	"name": "DEBUG-NODE",
	"program": "${file}",
	"args": [
	],
	"console": "integratedTerminal",
	"protocol": "inspector",
	"sourceMaps": true,
	"outFiles": ["${workspaceFolder}/packages/*/lib/cjs/*.js"]
}
```