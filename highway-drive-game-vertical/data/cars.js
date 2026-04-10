// 车辆配置数据 - 真实车主车型 + 特殊车辆
const CARS_DATA = {
    '灰色五菱之光': {
        tank: 50,        // 油箱容量(升)
        consumption: 12, // 油耗(公里/升)，面包车油耗稍高
        color: '#808080',
        windowColor: '#4A90D9',
        unlockScore: 0,
        desc: '老款面包车，创业神车',
        asset: 'car_wuling.png',
        type: 'normal'
    },
    '蓝色奔驰GLC': {
        tank: 70,
        consumption: 9,
        color: '#3498DB',
        windowColor: '#2980B9',
        unlockScore: 100,
        desc: '豪华SUV，舒适出行',
        asset: 'car_mercedes_glc.png',
        type: 'normal'
    },
    '黑色蔚来ET5T': {
        tank: 75,
        consumption: 15, // 电动车续航换算
        color: '#2C3E50',
        windowColor: '#34495E',
        unlockScore: 300,
        desc: '智能电动旅行车，带车顶箱',
        asset: 'car_nio_et5t.png',
        type: 'normal'
    },
    '小象灰理想L6': {
        tank: 80,
        consumption: 14, // 增程式电动车
        color: '#808080',
        windowColor: '#A0A0A0',
        unlockScore: 500,
        desc: '家庭智能SUV',
        asset: 'car_lixiang_l6.png',
        type: 'normal'
    },
    '白色特斯拉Model X': {
        tank: 100,
        consumption: 16, // 电动车高效
        color: '#FFFFFF',
        windowColor: '#E0E0E0',
        unlockScore: 800,
        desc: '科技旗舰SUV',
        asset: 'car_tesla_modelx.png',
        type: 'normal'
    },
    // 特殊车辆
    '黄色校车': {
        tank: 80,
        consumption: 10,
        color: '#FFD700',
        windowColor: '#87CEEB',
        unlockScore: 200,
        desc: '安全校车，接送孩子',
        asset: 'car_schoolbus.png',
        type: 'special'
    },
    '红色消防车': {
        tank: 90,
        consumption: 15,
        color: '#E74C3C',
        windowColor: '#87CEEB',
        unlockScore: 400,
        desc: '勇敢的消防车',
        asset: 'car_firetruck.png',
        type: 'special'
    },
    '白色救护车': {
        tank: 70,
        consumption: 12,
        color: '#FFFFFF',
        windowColor: '#87CEEB',
        unlockScore: 600,
        desc: '生命守护者',
        asset: 'car_ambulance.png',
        type: 'special'
    },
    '绿色工程车': {
        tank: 100,
        consumption: 20,
        color: '#27AE60',
        windowColor: '#87CEEB',
        unlockScore: 700,
        desc: '道路施工车',
        asset: 'car_construction.png',
        type: 'special'
    },
    '蓝色公交车': {
        tank: 120,
        consumption: 8,
        color: '#3498DB',
        windowColor: '#E8F4FD',
        unlockScore: 1000,
        desc: '城市公交，容量大',
        asset: 'car_bus.png',
        type: 'special'
    },
};