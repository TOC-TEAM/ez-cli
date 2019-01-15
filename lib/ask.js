const inquirer = require('inquirer')

module.exports = function ask() {
  return inquirer.prompt([
    {
      type: 'checkbox',
      name: 'modules',
      message: 'Your project contained modules',
      choices: ['account', 'position', 'resume', 'candidate'],
      default: 'account',
    },
    {
      type: 'list',
      name: 'jsAsset',
      message: 'Name of js asset directory',
      choices: ['js', 'javascript'],
      default: 'js',
    },
    {
      type: 'list',
      name: 'imgAsset',
      message: 'Name of image asset directory',
      choices: ['img', 'imgs', 'image', 'images'],
      default: 'img',
    },
    {
      type: 'list',
      name: 'fontAsset',
      message: 'Name of font asset directory',
      choices: ['font', 'fonts', 'iconfont', 'iconfonts'],
      default: 'font',
    },
  ])
}
