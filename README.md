# kntism.github.io

展示我个人收藏的网站、工具和资源。

## 功能特性

### 主页导航
- 精选工具网站导航
- 响应式设计，支持多端访问
- 暗色模式支持
- 优雅的动画效果

### 计算器应用
功能完整的网页计算器，支持：
- 基础数学运算
- 函数计算
- 角度/弧度切换
- 自定义设置

### Stable Diffusion 速查表
艺术风格参考工具，包含：
- 常用艺术风格示例
- 快速查找和参考
- 直观的展示界面

## 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **字体**: Google Fonts (Space Grotesk, Roboto)
- **部署**: GitHub Pages
- **版本控制**: Git

## 项目结构

```
├── index.html              # 主页
├── src/main.js            # 主页逻辑
├── style/main.css         # 主页样式
├── content/sites.json     # 网站数据
├── calculator/            # 计算器应用
└── StableDiffusion-CheatSheet/  # SD 速查表
```

## 快速开始

1. 克隆仓库
   ```bash
   git clone https://github.com/kntism/kntism.github.io.git
   ```

2. 本地预览（需要启动本地服务器）
   ```bash
   # 使用 Python
   python -m http.server 8000

   # 或使用 Node.js
   npx serve .
   ```

3. 访问 http://localhost:8000

## 添加新工具

在 `content/sites.json` 中添加新条目：

```json
{
  "id": 6,
  "slug": "tool-name",
  "toolName": "Tool Display Name",
  "toolUrl": "https://example.com",
  "emoji": "🔧",
  "updatedDate": "2025-01-20",
  "description": "Tool description",
  "chineseDescription": "工具描述"
}
```

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 访问链接

- **在线访问**: [kntism.github.io](https://kntism.github.io)
- **备用链接**: [site.luling.xyz](https://site.luling.xyz)
