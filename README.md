# 幼膳

## 介绍 / Why "幼膳"

> 幼膳是一款基于微信云开发的0-4岁婴幼儿膳食管理和推荐小程序


## 导入项目

1. 在微信开发工具中导入该项目文件夹。
2. **确保你开通了云开发功能**。
3. 在微信开发工具中将全部云函数上传并部署。
4. **在 `/miniprogram/config.js` 中输入你的云开发环境id。**
5. 在云开发数据库中创建 `users`、`recipe`  两个集合。
6. 在`recipe`集合中导入项目文件夹下的"recipeall_eng.json"

## 项目结构说明

```
├───cloudfunctions   //云函数存放目录
│   ├───addUser   //创建用户
│   ├───getrecipe  //获取云端推荐食谱数据
│   ├───login   //注册openid
│   ├───milkStorage  //管理云端母乳存放记录
│   ├───todoList //管理云端todo list记录
│   └───userinfoupdate //管理、更新用户数据

    ├───components   //组件存放目录
    ├───config   //静态配置
    ├───images   //图片资源
    ├───libs   //引用库
    │   └───ec-canvas
    ├───models
    ├───pages   //页面存放

    └───utils   //工具函数
```
