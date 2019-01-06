# ez-cli

> A cli to create an MPA egg project easily

[![Build Status](https://img.shields.io/travis/xxxxxMiss/ez-cli/master.svg)](https://travis-ci.org/xxxxxMiss/ez-cli)
[![Codecov branch](https://img.shields.io/codecov/c/github/xxxxxMiss/ez-cli/master.svg)](https://codecov.io/gh/xxxxxMiss/ez-cli)
[![NPM](https://img.shields.io/npm/v/ez-cli.svg)](https://www.npmjs.com/package/ez-cli)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)

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
# 默认情况下，每添加一个入口文件，都会生成对一个的资源文件目录。比如下面的命令，会生成对应的资源目录(src/assets/js/account/index/)。
# 建议不要开启--only选项，因为按照约定配合webpack loader会自动加载每个入口页面对应的资源文件。而且自己手动创建多级目录结构有些繁琐还容易出错。
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

# 默认情况下，每当移除一个入口js，只会自动移除同名的html和js，并不会自动移除该入口文件对应的资源目录极其下面的资源文件。通过-a选项，可以将其对应的资源文件也移除掉。
$ ez rm account/index.js -a
```

### ez rename

> 修改一个文件。

```bash
$ ez rename [oldname] [newname]

# 将accout下的old.js重命名为accout下的new.js，也会自动修改对应的html和css
$ ez rename account/old.js new.js

# 将所有的文件名修改为(驼峰|下划线|连字符|帕斯卡)风格
$ ez rename -s camecase
```

### ez tree

> 为了方便查看文件目录结构，提供了 tree 命令。

```bash
# 具体的选项可以使用tree --help查看
$ ez tree -I node_modules -L 5
```

## License

MIT © [xxxxxMiss](https://github.com/xxxxxMiss)
