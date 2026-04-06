// 车辆配置数据 - 真实车主车型
const CARS_DATA = {
    '灰色五菱之光': {
        tank: 50,        // 油箱容量(升)
        consumption: 12, // 油耗(公里/升)，面包车油耗稍高
        color: '#808080',
        windowColor: '#4A90D9',
        unlockScore: 0,
        desc: '老款面包车，创业神车',
        asset: 'car_wuling.png'
    },
    '蓝色奔驰GLC': {
        tank: 70,
        consumption: 9,
        color: '#3498DB',
        windowColor: '#2980B9',
        unlockScore: 100,
        desc: '豪华SUV，舒适出行',
        asset: 'car_mercedes_glc.png'
    },
    '黑色蔚来ET5T': {
        tank: 75,
        consumption: 15, // 电动车续航换算
        color: '#2C3E50',
        windowColor: '#34495E',
        unlockScore: 300,
        desc: '智能电动旅行车，带车顶箱',
        asset: 'car_nio_et5t.png'
    },
    '小象灰理想L6': {
        tank: 80,
        consumption: 14, // 增程式电动车
        color: '#808080',
        windowColor: '#A0A0A0',
        unlockScore: 500,
        desc: '家庭智能SUV',
        asset: 'car_lixiang_l6.png'
    },
    '白色特斯拉Model X': {
        tank: 100,
        consumption: 16, // 电动车高效
        color: '#FFFFFF',
        windowColor: '#E0E0E0',
        unlockScore: 800,
        desc: '科技旗舰SUV',
        asset: 'car_tesla_modelx.png'
    },
};