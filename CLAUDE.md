# 开发指南

## 项目概述

这是一个静态网站项目，展示收藏的工具和资源，包含：
- 主页：展示收藏网站的导航页面
- 计算器子应用：功能完整的计算器应用
- Stable Diffusion 速查表：艺术风格参考工具

## 技术栈

- **前端框架**: 纯 HTML/CSS/JavaScript
- **构建工具**: 无构建工具，直接运行
- **部署方式**: GitHub Pages
- **样式系统**: 纯 CSS，使用 Google Fonts
- **数据存储**: JSON 文件

## 项目结构

```
kntism.github.io/
├── index.html              # 主页入口
├── src/
│   └── main.js            # 主页 JavaScript 逻辑
├── style/
│   └── main.css           # 主页样式
├── content/
│   └── sites.json         # 网站数据
├── calculator/            # 计算器应用
│   ├── index.html         # 计算器导航页
│   ├── basic-calculator.html  # 计算器主页面
│   ├── src/               # 计算器 JS 模块
│   ├── style/             # 计算器样式
│   └── pic/               # 计算器图标
└── StableDiffusion-CheatSheet/  # SD 速查表
```

## 开发规范

### 代码风格
- 使用 2 空格缩进
- 使用语义化的 HTML 标签
- CSS 采用 BEM 命名规范
- JavaScript 使用 ES6+ 语法

### 数据管理
- 网站数据存储在 `content/sites.json`
- 每个网站条目包含：id、slug、toolName、toolUrl、emoji、description
- 使用异步方式加载数据

### 样式指南
- 响应式设计，支持移动端
- 支持暗色模式
- 使用 CSS 动画提升用户体验
- 统一的配色方案和字体

## 开发流程

### 添加新网站
1. 更新 `content/sites.json` 添加新条目
2. 确保所有必需字段都已填写
3. 在主页预览效果

### 修改计算器功能
1. 定位相关模块在 `calculator/src/` 目录
2. 修改对应的 JS 文件
3. 更新样式文件 `calculator/style/`
4. 测试功能是否正常

### 部署更新
1. 提交所有更改到 git
2. 推送到 main 分支
3. GitHub Pages 会自动部署

## 注意事项

- 保持代码简洁，避免过度工程化
- 确保跨浏览器兼容性
- 图片资源需要优化
- 重要更改需要更新文档
- 保持良好的 commit 消息格式

## 常见问题

### Q: 如何添加新的工具页面？
A: 在根目录创建新的文件夹，添加 HTML 文件，然后在主页的 sites.json 中添加对应条目。

### Q: 计算器如何更新？
A: 主要逻辑在 `calculator/src/` 目录，按模块化方式组织代码，修改后需要测试各项功能。

### Q: 如何自定义样式？
A: 修改 `style/main.css` 或对应应用的样式文件，注意保持设计一致性。