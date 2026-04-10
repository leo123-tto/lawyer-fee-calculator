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

        // ===== G15 沈海高速 =====
        // 沈阳 → 上海（南行）
        'G15_沈阳_上海': {
            highway: 'G15',
            name: '沈海高速',
            direction: '上海方向',
            cities: ['沈阳', '鞍山', '大连', '烟台', '青岛', '日照', '连云港', '盐城', '南通', '上海'],
            serviceAreas: [
                // 辽宁段
                { name: '井泉服务区', city: '沈阳', distance: 30 },
                { name: '甘泉服务区', city: '鞍山', distance: 80 },
                { name: '大连服务区', city: '大连', distance: 40 },
                // 烟台-青岛轮渡后
                { name: '莱阳服务区', city: '烟台', distance: 60 },
                { name: '莱西服务区', city: '青岛', distance: 50 },
                { name: '胶州服务区', city: '青岛', distance: 30 },
                { name: '日照服务区', city: '日照', distance: 50 },
                // 江苏段
                { name: '赣榆服务区', city: '连云港', distance: 60 },
                { name: '灌云服务区', city: '连云港', distance: 40 },
                { name: '响水服务区', city: '盐城', distance: 50 },
                { name: '盐城服务区', city: '盐城', distance: 40 },
                { name: '东台服务区', city: '盐城', distance: 60 },
                { name: '海安服务区', city: '南通', distance: 40 },
                { name: '如皋服务区', city: '南通', distance: 30 },
                { name: '苏通大桥服务区', city: '苏州', distance: 50 },
            ]
        },
        // 上海 → 沈阳（北行）
        'G15_上海_沈阳': {
            highway: 'G15',
            name: '沈海高速',
            direction: '沈阳方向',
            cities: ['上海', '南通', '盐城', '连云港', '日照', '青岛', '烟台', '大连', '鞍山', '沈阳'],
            serviceAreas: [
                { name: '苏通大桥服务区', city: '苏州', distance: 50 },
                { name: '如皋服务区', city: '南通', distance: 30 },
                { name: '海安服务区', city: '南通', distance: 40 },
                { name: '东台服务区', city: '盐城', distance: 60 },
                { name: '盐城服务区', city: '盐城', distance: 40 },
                { name: '响水服务区', city: '盐城', distance: 50 },
                { name: '灌云服务区', city: '连云港', distance: 40 },
                { name: '赣榆服务区', city: '连云港', distance: 60 },
                { name: '日照服务区', city: '日照', distance: 50 },
                { name: '胶州服务区', city: '青岛', distance: 30 },
                { name: '莱西服务区', city: '青岛', distance: 50 },
                { name: '莱阳服务区', city: '烟台', distance: 60 },
                { name: '大连服务区', city: '大连', distance: 40 },
                { name: '甘泉服务区', city: '鞍山', distance: 80 },
                { name: '井泉服务区', city: '沈阳', distance: 30 },
            ]
        },

        // ===== G4 京港澳高速 =====
        // 北京 → 广州（南行）
        'G4_北京_广州': {
            highway: 'G4',
            name: '京港澳高速',
            direction: '广州方向',
            cities: ['北京', '保定', '石家庄', '郑州', '武汉', '长沙', '广州'],
            serviceAreas: [
                // 河北段
                { name: '涿州服务区', city: '保定', distance: 60 },
                { name: '保定服务区', city: '保定', distance: 40 },
                { name: '定州服务区', city: '保定', distance: 50 },
                { name: '石家庄服务区', city: '石家庄', distance: 60 },
                // 河南段
                { name: '安阳服务区', city: '安阳', distance: 80 },
                { name: '郑州服务区', city: '郑州', distance: 70 },
                { name: '许昌服务区', city: '许昌', distance: 50 },
                { name: '漯河服务区', city: '漯河', distance: 40 },
                { name: '驻马店服务区', city: '驻马店', distance: 60 },
                // 湖北段
                { name: '孝感服务区', city: '孝感', distance: 80 },
                { name: '武汉服务区', city: '武汉', distance: 50 },
                { name: '咸宁服务区', city: '咸宁', distance: 60 },
                // 湖南段
                { name: '岳阳服务区', city: '岳阳', distance: 70 },
                { name: '长沙服务区', city: '长沙', distance: 80 },
                { name: '衡阳服务区', city: '衡阳', distance: 70 },
                { name: '郴州服务区', city: '郴州', distance: 60 },
                // 广东段
                { name: '韶关服务区', city: '韶关', distance: 70 },
                { name: '广州服务区', city: '广州', distance: 80 },
            ]
        },
        // 广州 → 北京（北行）
        'G4_广州_北京': {
            highway: 'G4',
            name: '京港澳高速',
            direction: '北京方向',
            cities: ['广州', '长沙', '武汉', '郑州', '石家庄', '保定', '北京'],
            serviceAreas: [
                { name: '广州服务区', city: '广州', distance: 80 },
                { name: '韶关服务区', city: '韶关', distance: 70 },
                { name: '郴州服务区', city: '郴州', distance: 60 },
                { name: '衡阳服务区', city: '衡阳', distance: 70 },
                { name: '长沙服务区', city: '长沙', distance: 80 },
                { name: '岳阳服务区', city: '岳阳', distance: 70 },
                { name: '咸宁服务区', city: '咸宁', distance: 60 },
                { name: '武汉服务区', city: '武汉', distance: 50 },
                { name: '孝感服务区', city: '孝感', distance: 80 },
                { name: '驻马店服务区', city: '驻马店', distance: 60 },
                { name: '漯河服务区', city: '漯河', distance: 40 },
                { name: '许昌服务区', city: '许昌', distance: 50 },
                { name: '郑州服务区', city: '郑州', distance: 70 },
                { name: '安阳服务区', city: '安阳', distance: 80 },
                { name: '石家庄服务区', city: '石家庄', distance: 60 },
                { name: '定州服务区', city: '保定', distance: 50 },
                { name: '保定服务区', city: '保定', distance: 40 },
                { name: '涿州服务区', city: '保定', distance: 60 },
            ]
        },

        // ===== G40 沪陕高速 =====
        // 上海 → 西安（西行）
        'G40_上海_西安': {
            highway: 'G40',
            name: '沪陕高速',
            direction: '西安方向',
            cities: ['上海', '南通', '扬州', '南京', '合肥', '信阳', '南阳', '西安'],
            serviceAreas: [
                // 江苏段
                { name: '苏通大桥服务区', city: '苏州', distance: 40 },
                { name: '大丰服务区', city: '盐城', distance: 60 },
                { name: '东台服务区', city: '盐城', distance: 50 },
                { name: '扬州服务区', city: '扬州', distance: 80 },
                { name: '仪征服务区', city: '扬州', distance: 40 },
                { name: '南京服务区', city: '南京', distance: 50 },
                // 安徽段
                { name: '合肥服务区', city: '合肥', distance: 60 },
                { name: '六安服务区', city: '六安', distance: 50 },
                { name: '叶集服务区', city: '六安', distance: 40 },
                // 河南段
                { name: '信阳服务区', city: '信阳', distance: 90 },
                { name: '南阳服务区', city: '南阳', distance: 80 },
                // 陕西段
                { name: '商洛服务区', city: '商洛', distance: 70 },
                { name: '西安服务区', city: '西安', distance: 60 },
            ]
        },
        // 西安 → 上海（东行）
        'G40_西安_上海': {
            highway: 'G40',
            name: '沪陕高速',
            direction: '上海方向',
            cities: ['西安', '南阳', '信阳', '合肥', '南京', '扬州', '南通', '上海'],
            serviceAreas: [
                { name: '西安服务区', city: '西安', distance: 60 },
                { name: '商洛服务区', city: '商洛', distance: 70 },
                { name: '南阳服务区', city: '南阳', distance: 80 },
                { name: '信阳服务区', city: '信阳', distance: 90 },
                { name: '六安服务区', city: '六安', distance: 50 },
                { name: '合肥服务区', city: '合肥', distance: 60 },
                { name: '南京服务区', city: '南京', distance: 50 },
                { name: '仪征服务区', city: '扬州', distance: 40 },
                { name: '扬州服务区', city: '扬州', distance: 80 },
                { name: '东台服务区', city: '盐城', distance: 50 },
                { name: '大丰服务区', city: '盐城', distance: 60 },
                { name: '苏通大桥服务区', city: '苏州', distance: 40 },
            ]
        },
    },

    // 城市节点信息
    cities: {
        '上海': { region: '华东', desc: '东方明珠·上海', highways: ['G42', 'G2', 'G15', 'G40', 'G60'] },
        '苏州': { region: '华东', desc: '园林之城·苏州', highways: ['G42', 'G2', 'G15'] },
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
        // 新增城市
        '沈阳': { region: '东北', desc: '重工业基地·沈阳', highways: ['G1', 'G15'] },
        '鞍山': { region: '东北', desc: '钢都·鞍山', highways: ['G15'] },
        '大连': { region: '东北', desc: '浪漫之都·大连', highways: ['G15'] },
        '烟台': { region: '华东', desc: '海滨城市·烟台', highways: ['G15', 'G18'] },
        '青岛': { region: '华东', desc: '啤酒之城·青岛', highways: ['G15', 'G20'] },
        '日照': { region: '华东', desc: '阳光海岸·日照', highways: ['G15'] },
        '连云港': { region: '华东', desc: '亚欧桥头堡·连云港', highways: ['G15', 'G30'] },
        '盐城': { region: '华东', desc: '湿地之都·盐城', highways: ['G15'] },
        '南通': { region: '华东', desc: '江海之城·南通', highways: ['G15'] },
        '保定': { region: '华北', desc: '首都南大门·保定', highways: ['G4'] },
        '石家庄': { region: '华北', desc: '火车拉来的城市·石家庄', highways: ['G4', 'G5'] },
        '郑州': { region: '华中', desc: '中原之城·郑州', highways: ['G4', 'G30'] },
        '长沙': { region: '华中', desc: '星城·长沙', highways: ['G4', 'G60'] },
        '广州': { region: '华南', desc: '花城·广州', highways: ['G4', 'G15', 'G80'] },
        '信阳': { region: '华中', desc: '北国江南·信阳', highways: ['G4', 'G40'] },
        '南阳': { region: '华中', desc: '诸葛亮故里·南阳', highways: ['G4', 'G55'] },
        '西安': { region: '西北', desc: '历史古都·西安', highways: ['G5', 'G30', 'G40', 'G65'] },
        '商洛': { region: '西北', desc: '戏剧之乡·商洛', highways: ['G40'] },
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
        'G40': { name: '沪陕高速', start: '上海', end: '西安' },
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