// 中国高速路网数据 - 扩展版
const ROAD_NETWORK_DATA = {
    // 节点（城市/服务区/岔道点）
    nodes: {
        // ===== 起点 =====
        '无锡': { x: 0, y: 0, region: '华东', desc: '江南水乡', type: 'city', highways: ['G42', 'G2', 'S48'] },

        // ===== 沪宁高速沿线 (G42/G2) =====
        '梅村服务区': { x: 15, y: 0, region: '华东', desc: '无锡梅村', type: 'service', distance: 15 },
        '苏州': { x: 40, y: 5, region: '华东', desc: '园林之城', type: 'city', highways: ['G42', 'G2', 'G15W'] },
        '阳澄湖服务区': { x: 55, y: 5, region: '华东', desc: '阳澄湖畔', type: 'service', distance: 15 },
        '昆山': { x: 75, y: 8, region: '华东', desc: '昆山', type: 'junction', highways: ['G42', 'G2'] },
        '花桥服务区': { x: 90, y: 10, region: '华东', desc: '苏沪交界', type: 'service', distance: 15 },
        '上海': { x: 130, y: 0, region: '华东', desc: '东方明珠', type: 'city', highways: ['G42', 'G2', 'G40', 'G15'] },

        // ===== 往南京方向 =====
        '堰桥枢纽': { x: -20, y: -10, region: '华东', desc: '无锡北', type: 'junction', highways: ['G42', 'S48'] },
        '江阴服务区': { x: -35, y: -25, region: '华东', desc: '江阴大桥南', type: 'service', distance: 35 },
        '江阴': { x: -40, y: -30, region: '华东', desc: '江阴', type: 'city', highways: ['G2', 'S38'] },
        '江阴大桥': { x: -45, y: -35, region: '华东', desc: '长江大桥', type: 'landmark' },
        '靖江服务区': { x: -55, y: -50, region: '华东', desc: '靖江南', type: 'service', distance: 20 },
        '靖江': { x: -60, y: -55, region: '华东', desc: '靖江', type: 'city', highways: ['G2'] },
        '泰兴服务区': { x: -80, y: -70, region: '华东', desc: '泰兴', type: 'service', distance: 25 },
        '泰州': { x: -95, y: -80, region: '华东', desc: '凤城泰州', type: 'city', highways: ['G2', 'G1515'] },
        '广陵枢纽': { x: -110, y: -90, region: '华东', desc: '广陵枢纽', type: 'junction', highways: ['G2', 'G1515'] },

        // ===== 往徐州/济南/北京方向 =====
        '扬州': { x: -70, y: 20, region: '华东', desc: '瘦西湖', type: 'city', highways: ['G40', 'S28'] },
        '扬州服务区': { x: -85, y: 25, region: '华东', desc: '扬州西', type: 'service', distance: 20 },
        '淮安': { x: -100, y: 50, region: '华东', desc: '周恩来故乡', type: 'city', highways: ['G2', 'G25'] },
        '淮安服务区': { x: -115, y: 55, region: '华东', desc: '淮安南', type: 'service', distance: 25 },
        '涟水服务区': { x: -130, y: 65, region: '华东', desc: '涟水', type: 'service', distance: 20 },
        '徐州': { x: -150, y: 100, region: '华东', desc: '淮海枢纽', type: 'city', highways: ['G2', 'G3', 'G30'] },
        '徐州服务区': { x: -165, y: 105, region: '华东', desc: '徐州东', type: 'service', distance: 20 },
        '枣庄服务区': { x: -185, y: 120, region: '华北', desc: '枣庄', type: 'service', distance: 25 },
        '枣庄': { x: -200, y: 125, region: '华北', desc: '铁道游击队', type: 'city', highways: ['G3'] },
        '泰安服务区': { x: -220, y: 145, region: '华北', desc: '泰山脚下', type: 'service', distance: 30 },
        '泰安': { x: -235, y: 150, region: '华北', desc: '泰山', type: 'city', highways: ['G3', 'G22'] },
        '济南': { x: -250, y: 160, region: '华北', desc: '泉城济南', type: 'city', highways: ['G2', 'G3', 'G20', 'G35'] },
        '济南服务区': { x: -265, y: 165, region: '华北', desc: '济南北', type: 'service', distance: 20 },
        '德州服务区': { x: -290, y: 180, region: '华北', desc: '德州', type: 'service', distance: 30 },
        '德州': { x: -310, y: 185, region: '华北', desc: '德州扒鸡', type: 'city', highways: ['G3'] },
        '沧州服务区': { x: -340, y: 210, region: '华北', desc: '沧州', type: 'service', distance: 35 },
        '沧州': { x: -360, y: 215, region: '华北', desc: '狮城沧州', type: 'city', highways: ['G3'] },
        '天津': { x: -390, y: 240, region: '华北', desc: '津门天津', type: 'city', highways: ['G2', 'G3', 'S30'] },
        '天津服务区': { x: -400, y: 245, region: '华北', desc: '天津南', type: 'service', distance: 15 },
        '廊坊服务区': { x: -420, y: 260, region: '华北', desc: '廊坊', type: 'service', distance: 25 },
        '北京': { x: -450, y: 280, region: '华北', desc: '首都北京', type: 'city', highways: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6'] },

        // ===== 往杭州方向 =====
        '宜兴': { x: 25, y: -30, region: '华东', desc: '陶都宜兴', type: 'city', highways: ['G25', 'S48'] },
        '长兴服务区': { x: 45, y: -45, region: '华东', desc: '长兴', type: 'service', distance: 30 },
        '湖州': { x: 60, y: -55, region: '华东', desc: '太湖明珠', type: 'city', highways: ['G50', 'S12'] },
        '湖州服务区': { x: 75, y: -60, region: '华东', desc: '湖州南', type: 'service', distance: 20 },
        '德清服务区': { x: 95, y: -70, region: '华东', desc: '德清', type: 'service', distance: 25 },
        '杭州': { x: 120, y: -80, region: '华东', desc: '西湖美景', type: 'city', highways: ['G25', 'G56', 'G60', 'G92'] },
        '杭州服务区': { x: 135, y: -85, region: '华东', desc: '杭州南', type: 'service', distance: 20 },

        // ===== 往合肥/武汉/成都方向 =====
        '常州': { x: -30, y: 15, region: '华东', desc: '龙城常州', type: 'city', highways: ['G42', 'S38'] },
        '常州服务区': { x: -45, y: 18, region: '华东', desc: '常州西', type: 'service', distance: 20 },
        '丹阳服务区': { x: -60, y: 25, region: '华东', desc: '丹阳', type: 'service', distance: 20 },
        '镇江': { x: -75, y: 30, region: '华东', desc: '醋都镇江', type: 'city', highways: ['G42', 'G4011'] },
        '镇江服务区': { x: -90, y: 32, region: '华东', desc: '镇江西', type: 'service', distance: 20 },
        '南京': { x: -110, y: 40, region: '华东', desc: '六朝古都', type: 'city', highways: ['G42', 'G2', 'G25', 'G36', 'G40'] },
        '南京服务区': { x: -125, y: 42, region: '华东', desc: '南京南', type: 'service', distance: 20 },
        '滁州服务区': { x: -150, y: 50, region: '华东', desc: '滁州', type: 'service', distance: 30 },
        '合肥': { x: -180, y: 60, region: '华东', desc: '庐州古城', type: 'city', highways: ['G3', 'G40', 'G42', 'S1'] },
        '合肥服务区': { x: -195, y: 62, region: '华东', desc: '合肥西', type: 'service', distance: 20 },
        '六安服务区': { x: -220, y: 70, region: '华东', desc: '六安', type: 'service', distance: 30 },
        '金寨服务区': { x: -250, y: 80, region: '华东', desc: '大别山', type: 'service', distance: 35 },
        '麻城服务区': { x: -280, y: 90, region: '华中', desc: '麻城', type: 'service', distance: 35 },
        '武汉': { x: -320, y: 100, region: '华中', desc: '江城武汉', type: 'city', highways: ['G4', 'G42', 'G50', 'G70'] },
        '武汉服务区': { x: -335, y: 102, region: '华中', desc: '武汉西', type: 'service', distance: 20 },
        '仙桃服务区': { x: -360, y: 110, region: '华中', desc: '仙桃', type: 'service', distance: 30 },
        '荆州服务区': { x: -400, y: 120, region: '华中', desc: '荆州', type: 'service', distance: 40 },
        '荆州': { x: -420, y: 125, region: '华中', desc: '古城荆州', type: 'city', highways: ['G50', 'G55'] },
        '宜昌服务区': { x: -450, y: 135, region: '华中', desc: '三峡门户', type: 'service', distance: 35 },
        '宜昌': { x: -470, y: 140, region: '华中', desc: '三峡宜昌', type: 'city', highways: ['G50', 'G42'] },
        '恩施服务区': { x: -510, y: 150, region: '西南', desc: '恩施', type: 'service', distance: 50 },
        '万州服务区': { x: -550, y: 160, region: '西南', desc: '万州', type: 'service', distance: 50 },
        '重庆': { x: -590, y: 170, region: '西南', desc: '山城重庆', type: 'city', highways: ['G5', 'G50', 'G65', 'G75'] },
        '内江服务区': { x: -630, y: 180, region: '西南', desc: '内江', type: 'service', distance: 50 },
        '成都': { x: -670, y: 190, region: '西南', desc: '天府成都', type: 'city', highways: ['G5', 'G42', 'G76'] },

        // ===== 往广州/深圳方向 =====
        '嘉兴服务区': { x: 100, y: -30, region: '华东', desc: '嘉兴', type: 'service', distance: 35 },
        '嘉兴': { x: 115, y: -35, region: '华东', desc: '南湖红船', type: 'city', highways: ['G60', 'S12'] },
        '杭州湾跨海大桥': { x: 130, y: -45, region: '华东', desc: '跨海大桥', type: 'landmark' },
        '宁波服务区': { x: 150, y: -55, region: '华东', desc: '宁波', type: 'service', distance: 30 },
        '宁波': { x: 165, y: -60, region: '华东', desc: '港口宁波', type: 'city', highways: ['G15', 'G92'] },
        '台州服务区': { x: 190, y: -75, region: '华东', desc: '台州', type: 'service', distance: 35 },
        '温州服务区': { x: 220, y: -95, region: '华东', desc: '温州', type: 'service', distance: 40 },
        '温州': { x: 240, y: -105, region: '华东', desc: '鹿城温州', type: 'city', highways: ['G15', 'G1513'] },
        '宁德服务区': { x: 280, y: -130, region: '华东', desc: '宁德', type: 'service', distance: 45 },
        '福州': { x: 320, y: -150, region: '华东', desc: '榕城福州', type: 'city', highways: ['G3', 'G15'] },
        '厦门': { x: 360, y: -180, region: '华东', desc: '鹭岛厦门', type: 'city', highways: ['G15', 'G76'] },
        '深圳': { x: 400, y: -220, region: '华南', desc: '鹏城深圳', type: 'city', highways: ['G4', 'G15', 'S3'] },
        '广州': { x: 380, y: -240, region: '华南', desc: '羊城广州', type: 'city', highways: ['G4', 'G15', 'G35', 'G45'] },

        // ===== 往东北方向 =====
        '沈阳': { x: -400, y: 350, region: '东北', desc: '盛京沈阳', type: 'city', highways: ['G1', 'G11', 'G15'] },
        '长春': { x: -420, y: 400, region: '东北', desc: '北国春城', type: 'city', highways: ['G1', 'G12'] },
        '哈尔滨': { x: -440, y: 450, region: '东北', desc: '冰城哈尔滨', type: 'city', highways: ['G1', 'G10', 'G1011'] },

        // ===== 往西南方向 =====
        '贵阳': { x: -400, y: 80, region: '西南', desc: '林城贵阳', type: 'city', highways: ['G60', 'G75', 'G76'] },
        '昆明': { x: -480, y: 100, region: '西南', desc: '春城昆明', type: 'city', highways: ['G5', 'G56', 'G60', 'G78'] },
    },

    // 高速公路数据
    highways: {
        'G1': { name: '京哈高速', start: '北京', end: '哈尔滨', via: ['沈阳', '长春'] },
        'G2': { name: '京沪高速', start: '北京', end: '上海', via: ['天津', '济南', '徐州', '淮安', '扬州', '无锡', '苏州'] },
        'G3': { name: '京台高速', start: '北京', end: '福州', via: ['天津', '济南', '徐州', '合肥'] },
        'G4': { name: '京港澳高速', start: '北京', end: '广州', via: ['石家庄', '郑州', '武汉'] },
        'G5': { name: '京昆高速', start: '北京', end: '昆明', via: ['太原', '西安', '成都'] },
        'G6': { name: '京藏高速', start: '北京', end: '拉萨', via: ['张家口', '呼和浩特'] },
        'G15': { name: '沈海高速', start: '沈阳', end: '海口', via: ['大连', '青岛', '上海', '宁波', '福州', '厦门', '广州', '深圳'] },
        'G25': { name: '长深高速', start: '长春', end: '深圳', via: ['沈阳', '淮安', '南京', '杭州'] },
        'G35': { name: '济广高速', start: '济南', end: '广州', via: ['合肥'] },
        'G40': { name: '沪陕高速', start: '上海', end: '西安', via: ['南京', '合肥'] },
        'G42': { name: '沪蓉高速', start: '上海', end: '成都', via: ['苏州', '无锡', '南京', '合肥', '武汉', '重庆'] },
        'G50': { name: '沪渝高速', start: '上海', end: '重庆', via: ['湖州', '武汉', '宜昌'] },
        'G56': { name: '杭瑞高速', start: '杭州', end: '瑞丽', via: ['南昌', '昆明'] },
        'G60': { name: '沪昆高速', start: '上海', end: '昆明', via: ['杭州', '南昌', '长沙', '贵阳'] },
        'G65': { name: '包茂高速', start: '包头', end: '茂名', via: ['西安', '重庆'] },
        'G75': { name: '兰海高速', start: '兰州', end: '海口', via: ['重庆', '贵阳', '南宁'] },
        'G76': { name: '厦蓉高速', start: '厦门', end: '成都', via: ['长沙'] },
        'G1515': { name: '盐靖高速', start: '盐城', end: '靖江', via: ['泰州'] },
        'S48': { name: '锡宜高速', start: '无锡', end: '宜兴', via: [] },
        'S38': { name: '常合高速', start: '常州', end: '合肥', via: ['江阴'] },
    },

    // 服务区列表 - 按路线组织
    serviceAreas: {
        'G42_东': ['梅村服务区', '阳澄湖服务区', '花桥服务区'],
        'G42_西': ['常州服务区', '丹阳服务区', '镇江服务区', '南京服务区', '滁州服务区', '合肥服务区', '六安服务区', '金寨服务区', '麻城服务区', '武汉服务区', '仙桃服务区', '荆州服务区', '宜昌服务区', '恩施服务区', '万州服务区', '内江服务区'],
        'G2_北': ['江阴服务区', '靖江服务区', '泰兴服务区', '淮安服务区', '涟水服务区', '徐州服务区', '枣庄服务区', '泰安服务区', '济南服务区', '德州服务区', '沧州服务区', '天津服务区', '廊坊服务区'],
        'G25_南': ['长兴服务区', '湖州服务区', '德清服务区', '杭州服务区'],
    },

    // 获取下一个服务区
    getNextServiceArea(currentLocation, direction) {
        const allAreas = [
            ...this.serviceAreas['G42_东'],
            ...this.serviceAreas['G42_西'],
            ...this.serviceAreas['G2_北'],
            ...this.serviceAreas['G25_南']
        ];

        const currentIdx = allAreas.indexOf(currentLocation);
        if (currentIdx >= 0 && currentIdx < allAreas.length - 1) {
            return allAreas[currentIdx + 1];
        }

        // 随机返回一个服务区
        return allAreas[Math.floor(Math.random() * allAreas.length)];
    },

    // 从某节点出发的可选路径
    getRoutesFrom(nodeKey) {
        const node = this.nodes[nodeKey];
        if (!node) return [];

        const routes = [];
        node.highways.forEach(hwKey => {
            const hw = this.highways[hwKey];
            if (!hw) return;

            const allNodes = [hw.start, ...hw.via, hw.end];
            const idx = allNodes.indexOf(nodeKey);

            if (idx >= 0) {
                // 向起点方向
                if (idx > 0) {
                    const prevNodes = allNodes.slice(0, idx);
                    const target = prevNodes[prevNodes.length - 1];
                    const targetNode = this.nodes[target];
                    routes.push({
                        highway: hwKey,
                        name: hw.name,
                        direction: hw.start + '方向',
                        target: target,
                        targetName: targetNode ? targetNode.desc : target,
                        distance: Math.abs((targetNode?.x || 0) - (node.x || 0)) * 2
                    });
                }
                // 向终点方向
                if (idx < allNodes.length - 1) {
                    const nextNodes = allNodes.slice(idx + 1);
                    const target = nextNodes[0];
                    const targetNode = this.nodes[target];
                    routes.push({
                        highway: hwKey,
                        name: hw.name,
                        direction: hw.end + '方向',
                        target: target,
                        targetName: targetNode ? targetNode.desc : target,
                        distance: Math.abs((targetNode?.x || 0) - (node.x || 0)) * 2
                    });
                }
            }
        });

        // 添加服务区选项（随机）
        const serviceAreas = Object.values(this.serviceAreas).flat();
        const randomServices = serviceAreas
            .filter(s => s !== nodeKey)
            .sort(() => Math.random() - 0.5)
            .slice(0, 1);

        randomServices.forEach(service => {
            const serviceNode = this.nodes[service];
            if (serviceNode && !routes.find(r => r.target === service)) {
                routes.push({
                    highway: '休息',
                    name: '前往服务区',
                    direction: '休息补给',
                    target: service,
                    targetName: serviceNode.desc,
                    distance: Math.abs((serviceNode.x || 0) - (node.x || 0)) * 2
                });
            }
        });

        return routes;
    },

    // 获取随机服务区
    getRandomServiceArea() {
        const allAreas = Object.values(this.serviceAreas).flat();
        return allAreas[Math.floor(Math.random() * allAreas.length)];
    }
};