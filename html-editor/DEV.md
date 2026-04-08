# HTML 可视化编辑器 - 开发文档

## 概述

单文件 HTML 可视化编辑工具，用于快速修改已有的 HTML 汇报材料。无需任何构建工具或外部依赖，纯原生 HTML + CSS + JavaScript 实现。

## 在线地址

https://www.lawtools.top/html-editor/

## 文件结构

```
html-editor/
├── index.html    # 完整的单文件应用（HTML + CSS + JS）
└── DEV.md        # 本开发文档
```

## 功能清单

### 已实现

| 功能 | 说明 |
|------|------|
| 实时预览 | 左侧输入 HTML，右侧 iframe 实时渲染（600ms 防抖） |
| 文本直接编辑 | 预览区所有可见文本元素注入 `contenteditable`，点击即改 |
| 图片一键替换 | 点击图片弹出文件选择器，FileReader 转 Base64 替换 src |
| 进度条联动 | 编辑百分比文字（如 `85%`）自动同步父级 `style.width` |
| 源码定位联动 | hover 预览区元素 → 左侧源码高亮对应行并自动滚动 |
| 元素路径面包屑 | 预览区底部实时显示当前 hover 元素的 DOM 路径 |
| 右键样式编辑 | 右键任意元素弹出样式面板，可编辑 width/color/font-size 等 |
| 导入文件 | 工具栏按钮导入 + 拖拽 .html 文件到左侧区域导入 |
| 拖拽交互提示 | 拖入文件时显示蓝色虚线覆盖层 + 图标提示 |
| 导出网页 | 导出干净 HTML（清除 contenteditable、编辑器样式等） |
| 撤销操作 | 最多 50 步撤销，支持 Ctrl/Cmd+Z 快捷键 |
| 链接拦截 | 预览区 `<a>` 标签点击不跳转 |
| 深浅色自适应 | 跟随系统 `prefers-color-scheme` |
| 面板折叠 | 左侧代码面板可折叠/展开 |
| 快捷键 | Ctrl/Cmd+S 导出，Ctrl/Cmd+Z 撤销 |

### 待开发（规划中）

| 功能 | 优先级 | 说明 |
|------|--------|------|
| 表格编辑增强 | 高 | 增删行列、合并单元格 |
| 颜色选择器 | 中 | 样式编辑面板集成 color picker |
| 字体工具栏 | 中 | 选中文字后浮动工具栏（加粗/斜体/字号/颜色） |
| 拖拽排序 | 中 | 拖拽调整元素顺序 |
| 多文件标签页 | 低 | 同时编辑多个 HTML 文件 |
| 模板库 | 低 | 内置常用汇报模板 |
| 历史版本 | 低 | localStorage 保存编辑历史 |

## 技术架构

```
┌─────────────────────────────────────────────┐
│                  主页面                       │
│  ┌──────────┐  ┌──────────────────────────┐  │
│  │ 代码面板  │  │      预览面板             │  │
│  │          │  │  ┌────────────────────┐  │  │
│  │ textarea │  │  │  iframe (sandbox)  │  │  │
│  │    +     │  │  │  - contenteditable │  │  │
│  │ highlight│  │  │  - img click       │  │  │
│  │  layer   │  │  │  - contextmenu     │  │  │
│  │          │  │  │  - mousemove sync  │  │  │
│  │          │  │  └────────────────────┘  │  │
│  └──────────┘  │  breadcrumb bar          │  │
│                └──────────────────────────┘  │
│  toolbar: 导入 | 刷新 | 撤销 | 导出          │
│  style-popover (右键弹出)                    │
└─────────────────────────────────────────────┘
```

### 关键设计决策

1. **iframe 隔离渲染**：用户 HTML 在 `sandbox="allow-same-origin allow-scripts"` 的 iframe 中渲染，避免样式污染主编辑器
2. **源码高亮层**：textarea 上叠加一个 `pointer-events: none` 的 div，用于渲染行高亮，textarea 本身 `background: transparent`
3. **进度条联动**：监听 `input` 事件，检测文本是否匹配 `N%` 模式，向上查找 3 层父级寻找带 `width` 百分比样式的元素并同步
4. **导出清理**：clone DOM 后移除 `#__editor_style__`、所有 `contenteditable` 属性、注入的 `cursor`/`outline` 样式

### 源码定位算法

hover 预览区元素时，通过以下策略在源码中定位：
- 匹配标签名 `<tagName`
- id 匹配 +5 分，class 匹配 +3 分/个，文本内容匹配 +2 分
- 取最高分行，向下扫描 15 行寻找闭合标签，高亮整个范围

## 开发指南

### 修改方式

直接编辑 `index.html`，所有代码在一个文件中：
- CSS：`<style>` 标签内（约第 7-160 行）
- HTML：`<body>` 内（约第 161-210 行）
- JS：`<script>` 标签内（约第 212 行起）

### 测试

用浏览器直接打开 `index.html` 即可测试。建议用以下 HTML 片段测试进度条联动：

```html
<div class="progress-bar" style="width:100%;height:24px;background:#eee;border-radius:12px;">
  <div class="progress-fill" style="width:85%;height:100%;background:#4CAF50;border-radius:12px;text-align:center;color:#fff;line-height:24px;">85%</div>
</div>
```

### 部署

推送到 `main` 分支后，GitHub Actions 自动同步到阿里云 OSS → https://www.lawtools.top/html-editor/
