// 中国高速路网数据 - 真实路线版（服务区按实际顺序排列）
const ROAD_NETWORK_DATA = {
    // 路线定义 - 每条路线包含服务区按顺序排列
    // 方向：从路线起点的视角，"上行"指远离起点，"下行"指向起点
    routes: {
        // ===== G42 沪蓉高速 =====
        // 上海 → 成都（西行/上行）
        'G42_上海_成都': {
            highway: 'G42',
            name: '沪蓉高速',
            direction: '成都方向',
            cities: ['上海', '苏州', '无锡', '常州', '镇江', '南京', '合肥', '武汉', '重庆', '成都'],
            serviceAreas: [
                { name: '昆山服务区', city: '苏州', distance: 20 },
                { name: '阳澄湖服务区', city: '苏州', distance: 20 },
                { name: '梅村服务区', city: '无锡', distance: 40 },
                { name: '滆湖服务区', city: '常州', distance: 40 },
                { name: '芳茂山服务区', city: '常州', distance: 20 },
                { name: '窦庄服务区', city: '镇江', distance: 20 },
                { name: '仙人山服务区', city: '镇江', distance: 25 },
                { name: '黄栗墅服务区', city: '南京', distance: 35 },
                // 安徽段
                { name: '大墅服务区', city: '滁州', distance: 50 },
                { name: '合肥服务区', city: '合肥', distance: 60 },
                { name: '六安服务区', city: '六安', distance: 40 },
                // 湖北段
                { name: '木子店服务区', city: '麻城', distance: 100 },
                { name: '武汉服务区', city: '武汉', distance: 80 },
                // 重庆/四川段
                { name: '龙溪河服务区', city: '重庆', distance: 300 },
                { name: '大石停车区', city: '遂宁', distance: 100 },
            ]
        },
        // 成都 → 上海（东行/下行）
        'G42_成都_上海': {
            highway: 'G42',
            name: '沪蓉高速',
            direction: '上海方向',
            cities: ['成都', '重庆', '武汉', '合肥', '南京', '镇江', '常州', '无锡', '苏州', '上海'],
            serviceAreas: [
                { name: '大石停车区', city: '遂宁', distance: 100 },
                { name: '龙溪河服务区', city: '重庆', distance: 300 },
                { name: '武汉服务区', city: '武汉', distance: 80 },
                { name: '木子店服务区', city: '麻城', distance: 100 },
                { name: '六安服务区', city: '六安', distance: 40 },
                { name: '合肥服务区', city: '合肥', distance: 60 },
                { name: '大墅服务区', city: '滁州', distance: 50 },
                { name: '黄栗墅服务区', city: '南京', distance: 35 },
                { name: '仙人山服务区', city: '镇江', distance: 25 },
                { name: '窦庄服务区', city: '镇江', distance: 20 },
                { name: '芳茂山服务区', city: '常州', distance: 20 },
                { name: '滆湖服务区', city: '常州', distance: 40 },
                { name: '梅村服务区', city: '无锡', distance: 40 },
                { name: '阳澄湖服务区', city: '苏州', distance: 20 },
                { name: '昆山服务区', city: '苏州', distance: 20 },
            ]
        },

        // ===== G2 京沪高速 =====
        // 北京 → 上海（南行/上行）
        'G2_北京_上海': {
            highway: 'G2',
            name: '京沪高速',
            direction: '上海方向',
            cities: ['北京', '天津', '沧州', '德州', '济南', '泰安', '临沂', '淮安', '扬州', '泰州', '无锡', '苏州', '上海'],
            serviceAreas: [
                // 北京段
                { name: '大羊坊服务区', city: '北京', distance: 20 },
                // 天津段
                { name: '津蓟服务区', city: '天津', distance: 30 },
                { name: '天津服务区', city: '天津', distance: 20 },
                // 河北段
                { name: '青县服务区', city: '沧州', distance: 50 },
                { name: '东光服务区', city: '沧州', distance: 40 },
                { name: '吴桥服务区', city: '德州', distance: 30 },
                // 山东段
                { name: '乐陵服务区', city: '德州', distance: 30 },
                { name: '济南服务区', city: '济南', distance: 80 },
                { name: '泰安服务区', city: '泰安', distance: 40 },
                { name: '新泰服务区', city: '泰安', distance: 50 },
                { name: '临沂服务区', city: '临沂', distance: 60 },
                { name: '郯城服务区', city: '临沂', distance: 40 },
                // 江苏段
                { name: '新沂服务区', city: '徐州', distance: 30 },
                { name: '沭阳服务区', city: '宿迁', distance: 46 },
                { name: '刘老庄服务区', city: '淮安', distance: 31 },
                { name: '平桥服务区', city: '淮安', distance: 46 },
                { name: '宝应服务区', city: '扬州', distance: 40 },
                { name: '高邮服务区', city: '扬州', distance: 39 },
                { name: '江都服务区', city: '扬州', distance: 44 },
                { name: '宣堡服务区', city: '泰州', distance: 34 },
                { name: '广陵服务区', city: '泰州', distance: 32 },
                { name: '堰桥服务区', city: '无锡', distance: 49 },
                { name: '梅村服务区', city: '无锡', distance: 21 },
                { name: '阳澄湖服务区', city: '苏州', distance: 43 },
            ]
        },
        // 上海 → 北京（北行/下行）
        'G2_上海_北京': {
            highway: 'G2',
            name: '京沪高速',
            direction: '北京方向',
            cities: ['上海', '苏州', '无锡', '泰州', '扬州', '淮安', '临沂', '泰安', '济南', '德州', '沧州', '天津', '北京'],
            serviceAreas: [
                { name: '阳澄湖服务区', city: '苏州', distance: 43 },
                { name: '梅村服务区', city: '无锡', distance: 21 },
                { name: '堰桥服务区', city: '无锡', distance: 49 },
                { name: '广陵服务区', city: '泰州', distance: 32 },
                { name: '宣堡服务区', city: '泰州', distance: 34 },
                { name: '江都服务区', city: '扬州', distance: 44 },
                { name: '高邮服务区', city: '扬州', distance: 39 },
                { name: '宝应服务区', city: '扬州', distance: 40 },
                { name: '平桥服务区', city: '淮安', distance: 46 },
                { name: '刘老庄服务区', city: '淮安', distance: 31 },
                { name: '沭阳服务区', city: '宿迁', distance: 46 },
                { name: '新沂服务区', city: '徐州', distance: 30 },
                { name: '郯城服务区', city: '临沂', distance: 40 },
                { name: '临沂服务区', city: '临沂', distance: 60 },
                { name: '新泰服务区', city: '泰安', distance: 50 },
                { name: '泰安服务区', city: '泰安', distance: 40 },
                { name: '济南服务区', city: '济南', distance: 80 },
                { name: '乐陵服务区', city: '德州', distance: 30 },
                { name: '吴桥服务区', city: '德州', distance: 30 },
                { name: '东光服务区', city: '沧州', distance: 40 },
                { name: '青县服务区', city: '沧州', distance: 50 },
                { name: '天津服务区', city: '天津', distance: 20 },
                { name: '津蓟服务区', city: '天津', distance: 30 },
                { name: '大羊坊服务区', city: '北京', distance: 20 },
            ]
        },

        // ===== G25 长深高速（宁杭段）=====
        // 南京 → 杭州（南行）
        'G25_南京_杭州': {
            highway: 'G25',
            name: '长深高速',
            direction: '杭州方向',
            cities: ['南京', '溧水', '溧阳', '宜兴', '湖州', '杭州'],
            serviceAreas: [
                { name: '江宁服务区', city: '南京', distance: 20 },
                { name: '东庐山服务区', city: '南京', distance: 30 },
                { name: '溧阳天目湖服务区', city: '常州', distance: 50 },
                { name: '宜兴太湖服务区', city: '无锡', distance: 40 },
                { name: '长兴服务区', city: '湖州', distance: 30 },
                { name: '德清服务区', city: '湖州', distance: 30 },
                { name: '杭州服务区', city: '杭州', distance: 40 },
            ]
        },
        // 杭州 → 南京（北行）
        'G25_杭州_南京': {
            highway: 'G25',
            name: '长深高速',
            direction: '南京方向',
            cities: ['杭州', '湖州', '宜兴', '溧阳', '溧水', '南京'],
            serviceAreas: [
                { name: '杭州服务区', city: '杭州', distance: 40 },
                { name: '德清服务区', city: '湖州', distance: 30 },
                { name: '长兴服务区', city: '湖州', distance: 30 },
                { name: '宜兴太湖服务区', city: '无锡', distance: 40 },
                { name: '溧阳天目湖服务区', city: '常州', distance: 50 },
                { name: '东庐山服务区', city: '南京', distance: 30 },
                { name: '江宁服务区', city: '南京', distance: 20 },
            ]
        },

        // ===== S48 锡宜高速 =====
        // 无锡 → 宜兴（西行）
        'S48_无锡_宜兴': {
            highway: 'S48',
            name: '锡宜高速',
            direction: '宜兴方向',
            cities: ['无锡', '宜兴'],
            serviceAreas: [
                { name: '梅村服务区', city: '无锡', distance: 15 },
                { name: '宜兴服务区', city: '宜兴', distance: 50 },
            ]
        },
        // 宜兴 → 无锡（东行）
        'S48_宜兴_无锡': {
            highway: 'S48',
            name: '锡宜高速',
            direction: '无锡方向',
            cities: ['宜兴', '无锡'],
            serviceAreas: [
                { name: '宜兴服务区', city: '宜兴', distance: 50 },
                { name: '梅村服务区', city: '无锡', distance: 15 },
            ]
        },
    },

    // 城市节点信息
    cities: {
        '上海': { region: '华东', desc: '东方明珠·上海', highways: ['G42', 'G2', 'G15', 'G40', 'G60'] },
        '苏州': { region: '华东', desc: '园林之城·苏州', highways: ['G42', 'G2'] },
        '无锡': { region: '华东', desc: '太湖明珠·无锡', highways: ['G42', 'G2', 'S48'] },
        '常州': { region: '华东', desc: '龙城·常州', highways: ['G42'] },
        '镇江': { region: '华东', desc: '醋都·镇江', highways: ['G42'] },
        '南京': { region: '华东', desc: '六朝古都·南京', highways: ['G42', 'G2', 'G25', 'G40'] },
        '合肥': { region: '华东', desc: '庐州·合肥', highways: ['G42', 'G3', 'G40'] },
        '武汉': { region: '华中', desc: '江城·武汉', highways: ['G42', 'G4', 'G50'] },
        '重庆': { region: '西南', desc: '山城·重庆', highways: ['G42', 'G50', 'G65'] },
        '成都': { region: '西南', desc: '天府之国·成都', highways: ['G42', 'G5', 'G76'] },
        '北京': { region: '华北', desc: '首都·北京', highways: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6'] },
        '天津': { region: '华北', desc: '津门·天津', highways: ['G2', 'G3'] },
        '济南': { region: '华北', desc: '泉城·济南', highways: ['G2', 'G3'] },
        '泰安': { region: '华北', desc: '五岳独尊·泰山', highways: ['G2', 'G3'] },
        '徐州': { region: '华东', desc: '淮海枢纽·徐州', highways: ['G2', 'G3', 'G30'] },
        '淮安': { region: '华东', desc: '周恩来故乡·淮安', highways: ['G2', 'G25'] },
        '扬州': { region: '华东', desc: '烟花三月·扬州', highways: ['G2', 'G40'] },
        '泰州': { region: '华东', desc: '凤城·泰州', highways: ['G2'] },
        '宜兴': { region: '华东', desc: '陶都·宜兴', highways: ['G25', 'S48'] },
        '杭州': { region: '华东', desc: '人间天堂·杭州', highways: ['G25', 'G56', 'G60'] },
        '湖州': { region: '华东', desc: '太湖明珠·湖州', highways: ['G25', 'G50'] },
    },

    // 高速公路基本信息
    highways: {
        'G1': { name: '京哈高速', start: '北京', end: '哈尔滨' },
        'G2': { name: '京沪高速', start: '北京', end: '上海' },
        'G3': { name: '京台高速', start: '北京', end: '福州' },
        'G4': { name: '京港澳高速', start: '北京', end: '广州' },
        'G5': { name: '京昆高速', start: '北京', end: '昆明' },
        'G6': { name: '京藏高速', start: '北京', end: '拉萨' },
        'G15': { name: '沈海高速', start: '沈阳', end: '海口' },
        'G25': { name: '长深高速', start: '长春', end: '深圳' },
        'G42': { name: '沪蓉高速', start: '上海', end: '成都' },
        'G50': { name: '沪渝高速', start: '上海', end: '重庆' },
        'G60': { name: '沪昆高速', start: '上海', end: '昆明' },
        'S48': { name: '锡宜高速', start: '无锡', end: '宜兴' },
    },

    // 当前游戏状态
    currentRoute: null,      // 当前路线 key
    currentServiceIndex: 0,  // 当前服务区索引

    // 初始化路线（根据起点城市）
    initRoute(startCity) {
        // 根据起点城市找到合适的路线
        for (const [routeKey, route] of Object.entries(this.routes)) {
            if (route.cities[0] === startCity) {
                this.currentRoute = routeKey;
                this.currentServiceIndex = 0;
                return route;
            }
        }
        // 默认从无锡出发，走 G42 往成都方向
        this.currentRoute = 'G42_上海_成都';
        this.currentServiceIndex = 3; // 无锡在索引3
        return this.routes[this.currentRoute];
    },

    // 获取下一个服务区（按真实顺序）
    getNextServiceArea() {
        if (!this.currentRoute) {
            this.initRoute('无锡');
        }
        const route = this.routes[this.currentRoute];
        if (this.currentServiceIndex < route.serviceAreas.length - 1) {
            this.currentServiceIndex++;
            return route.serviceAreas[this.currentServiceIndex];
        }
        // 如果到达路线终点，返回最后一个服务区
        return route.serviceAreas[route.serviceAreas.length - 1];
    },

    // 获取当前服务区
    getCurrentServiceArea() {
        if (!this.currentRoute) {
            this.initRoute('无锡');
        }
        const route = this.routes[this.currentRoute];
        return route.serviceAreas[this.currentServiceIndex];
    },

    // 切换路线（在岔道选择时）
    switchRoute(newRouteKey, currentCity) {
        if (this.routes[newRouteKey]) {
            this.currentRoute = newRouteKey;
            // 找到当前城市在新路线中的位置
            const route = this.routes[newRouteKey];
            const cityIndex = route.cities.indexOf(currentCity);
            // 找到对应的服务区索引
            for (let i = 0; i < route.serviceAreas.length; i++) {
                if (route.serviceAreas[i].city === currentCity || i >= cityIndex * 2) {
                    this.currentServiceIndex = i;
                    break;
                }
            }
        }
    },

    // 从某节点出发的可选路径
    getRoutesFrom(cityKey) {
        const routes = [];
        const city = this.cities[cityKey];
        if (!city) return routes;

        city.highways.forEach(hwKey => {
            const hw = this.highways[hwKey];
            if (!hw) return;

            // 查找经过该城市的路线
            for (const [routeKey, route] of Object.entries(this.routes)) {
                if (route.highway === hwKey && route.cities.includes(cityKey)) {
                    const idx = route.cities.indexOf(cityKey);
                    if (idx < route.cities.length - 1) {
                        const target = route.cities[route.cities.length - 1];
                        const targetCity = this.cities[target];
                        routes.push({
                            highway: hwKey,
                            name: hw.name,
                            direction: route.direction,
                            target: target,
                            targetName: targetCity ? targetCity.desc : target,
                            routeKey: routeKey
                        });
                    }
                }
            }
        });

        return routes.slice(0, 2);
    },

    // 获取随机服务区（兼容旧代码，但现在返回当前路线的服务区）
    getRandomServiceArea() {
        return this.getNextServiceArea()?.name || '梅村服务区';
    }
};