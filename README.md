# ez-cli

> A cli to create an MPA egg project easily

[![Build Status](https://img.shields.io/travis/TOC-TEAM/ez-cli/master.svg)](https://travis-ci.org/TOC-TEAM/ez-cli)
[![Codecov branch](https://img.shields.io/codecov/c/github/TOC-TEAM/ez-cli/master.svg)](https://codecov.io/gh/TOC-TEAM/ez-cli)
[![NPM](https://img.shields.io/npm/v/ez-cli.svg)](https://www.npmjs.com/package/ez-cli)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)

## Motivation

- 我们希望代码的组织结构可以按照下面的树状图来组织：每次通过`ez add`增加一个入口 js，那么在会对应的在当前目录下生成同名的`html`和`scss`(具体取决你使用的 css 预处理器)，并且在`assets/js`下生成对应的目录（入口 js 文件的父目录+入口文件 js 文件名组成）。那么对应入口的相关 js 文件都放在那个目录下，然后结合[auto-import-loader](https://github.com/TOC-TEAM/auto-import-loader)，可以做到在入口 js 中自动导入该目录下的所有资源，省去每次增加一个入口需要手动在入口文件中引入对应的资源。
- 我们希望每个页面对应的 js 不要过大（在 200 行以内），那么就可以按照功能进行拆分成多个模块，每个模块做好一件事情。所以按照这样的目录结构去组织代码。
- 考虑到这样文件的目录相对有点深，所以配合该命令行工具可以每次增加一个入口 js，会自动帮你生成对应的资源目录。

```
├── src
│   ├── assets
│   │   ├── font
│   │   ├── img
│   │   └── js
│   │       ├── account
│   │       │   ├── index
│   │       │   │   ├── button.js
│   │       │   │   └── modal.js
│   │       │   └── index-test
│   │       ├── position
│   │       │   ├── detail
│   │       │   │   └── show.js
│   │       │   └── index
│   │       │       └── animation.js
│   ├── pages
│   │   ├── account
│   │   │   ├── index.html
│   │   │   ├── index.js
│   │   │   └── index.scss
│   │   ├── position
│   │   │   ├── detail.html
│   │   │   ├── detail.js
│   │   │   ├── detail.scss
```

## Install

```bash
# 作为项目依赖
npm install ez-cli -D
# 全局使用
# npm install ez-cli -g
```

## Usage

> 以下所有命令相关的选项都可以通过`ez [command] --help`来查看具体用法。

### ez

> 在 egg 脚手架生成的项目骨架基础上初始化 web 目录结构。

### ez add

> 添加一个入口文件。

```bash
# 每添加一个入口js，会对应的生成同名的html和css文件。比如以下命令，会生成这样的文件结构：
# src
#│   └── pages
#│       ├── account
#│       │   ├── index.html
#│       │   ├── index.js
#│       │   ├── index.scss
$ ez add account/index.js

# 可以一次性添加多个入口。
$ ez add account/login.js position/index.js

# -o(--only)只生成入口文件，不生成入口文件对应的资源文件目录。
# 默认情况下，每添加一个入口文件，都会生成对一个的资源文件目录。
# 比如下面的命令，会生成对应的资源目录(src/assets/js/account/index/)。
# 建议不要开启--only选项，因为按照约定配合webpack loader会自动加载每个入口页面对应的资源文件。
# 而且自己手动创建多级目录结构有些繁琐还容易出错。
$ ez add account/index.js -o

# 默认情况下，css预处理器使用scss，通过该选项可以指定使用特定的预处理器。
# 也可以通过--css less这种形式指定。
$ ez add account/logout.js --styl
```

### ez rm

> 移除一个入口文件。

```bash
# 移除一个入口文件，也会自动移除同名的html和css
$ ez rm account/index.js

# 默认情况下，每当移除一个入口js，只会自动移除同名的html和js，
# 并不会自动移除该入口文件对应的资源目录极其下面的资源文件。
# 通过-a选项，可以将其对应的资源文件也移除掉。
$ ez rm account/index.js -a
```

### ez rename

> 修改一个文件。

```bash
$ ez rename [oldname] [newname]

# 将accout下的old.js重命名为accout下的new.js，也会自动修改对应的html和css
$ ez rename account/old.js new.js

# 修改当前工作目录下的所有文件的命名
# 驼峰：camel 下划线：underscore 连字符：hyphen 帕斯卡：pascal
$ ez rename -s camel

# 指定修改哪些目录下的文件
# 将src/pages下的所有目录极其子目录中的所有js文件修改为驼峰的形式
$ ez rename -s camel -f src/pages/**/*.js

# 支持一次性传入多个通配符
$ ez rename -s camel -f src/pages/** app/middleware/*.js
```

Note: 以上的路径`src/pages`, `app/middleware`等，全部是相对于当前的工作目录。

关于支持的通配符，可以[参看这里](https://github.com/isaacs/minimatch#usage)

### ez tree

> 为了方便查看文件目录结构，提供了 tree 命令。

```bash
# 具体的选项可以使用tree --help查看
$ ez tree -I node_modules -L 5
```

## License

MIT © [xxxxxMiss](https://github.com/xxxxxMiss)
