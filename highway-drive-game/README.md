# 中国高速自驾游游戏

一个面向儿童的横版驾驶游戏，结合了中国高速公路路网知识、车牌知识、地理知识和口算练习。

## 快速开始

直接用浏览器打开 `index.html` 即可运行游戏。

```bash
open index.html
```

## 操作说明

| 操作 | 按键 |
|------|------|
| 切换到上车道 | ↑ 或 W |
| 切换到下车道 | ↓ 或 S |

## 项目结构

```
highway-drive-game/
├── index.html              # 主入口
├── README.md               # 项目说明
├── PROJECT_STATUS.md       # 当前状态和待办事项
├── css/
│   └── style.css           # 样式文件
├── js/
│   ├── game.js             # 游戏核心逻辑（约750行）
│   ├── ui.js               # UI渲染模块
│   ├── car.js              # 车辆绘制模块
│   └── storage.js          # localStorage存储
├── data/
│   ├── cars.js             # 5辆车配置数据
│   ├── questions.js        # 题库数据
│   └── roadNetwork.js      # 路网和服务区数据
└── assets/
    ├── background_main.png # 游戏背景
    └── car_*.png           # 车辆图片
```

## 核心功能

- **三车道系统**：键盘控制车辆在三条车道间平滑切换
- **NPC障碍车**：随机生成其他车辆，需要躲避避免碰撞
- **服务区答题**：每40-50公里触发答题，答对可加油
- **岔路选择**：基于真实中国高速路网数据
- **车库系统**：5辆可解锁车辆，各有不同属性
- **天气/时间**：动态变化的游戏环境

## 技术栈

- 纯原生开发，无外部依赖
- Canvas 2D 渲染
- localStorage 本地存储

## 如何修改内容

### 添加新题目
编辑 `data/questions.js`

### 添加新车辆
编辑 `data/cars.js`

### 添加新城市/服务区
编辑 `data/roadNetwork.js`

## 目标用户

面向 5-8 岁儿童，结合幼小衔接知识学习。