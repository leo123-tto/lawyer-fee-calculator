// 题库数据
const QUESTIONS_DATA = {
    // 口算题（幼小衔接难度）
    math: [
        { q: '3 + 5 = ?', options: ['7', '8', '9', '6'], answer: 1 },
        { q: '10 - 4 = ?', options: ['5', '6', '7', '8'], answer: 1 },
        { q: '2 + 7 = ?', options: ['8', '9', '10', '11'], answer: 1 },
        { q: '15 - 3 = ?', options: ['11', '12', '13', '14'], answer: 2 },
        { q: '6 + 4 = ?', options: ['9', '10', '11', '12'], answer: 1 },
        { q: '8 - 5 = ?', options: ['2', '3', '4', '5'], answer: 1 },
        { q: '12 + 5 = ?', options: ['15', '16', '17', '18'], answer: 2 },
        { q: '20 - 8 = ?', options: ['10', '11', '12', '13'], answer: 2 },
        { q: '4 + 9 = ?', options: ['12', '13', '14', '15'], answer: 1 },
        { q: '18 - 6 = ?', options: ['10', '11', '12', '13'], answer: 2 },
        { q: '7 + 8 = ?', options: ['14', '15', '16', '17'], answer: 1 },
        { q: '16 - 9 = ?', options: ['5', '6', '7', '8'], answer: 2 },
        // 自驾场景口算
        { q: '我们开了 20 公里，又开了 15 公里，一共开了多少公里？', options: ['30公里', '35公里', '40公里', '45公里'], answer: 1 },
        { q: '油箱有 50 升油，用了 20 升，还剩多少升？', options: ['25升', '30升', '35升', '40升'], answer: 2 },
        { q: '服务区距离我们 30 公里，已经走了 10 公里，还有多少公里？', options: ['15公里', '20公里', '25公里', '30公里'], answer: 1 },
        { q: '爸爸开了 40 公里，妈妈开了 30 公里，两人一共开了多少公里？', options: ['60公里', '70公里', '80公里', '90公里'], answer: 1 },
        { q: '今天要开 100 公里，已经开了 60 公里，还剩多少公里？', options: ['30公里', '40公里', '50公里', '60公里'], answer: 1 },
        { q: '车上有 4 个人，到了服务区又有 2 个人上车，现在有多少人？', options: ['4人', '5人', '6人', '7人'], answer: 2 },
    ],

    // 拼音题
    pinyin: [
        { q: '"车"的拼音是什么？', options: ['cē', 'chē', 'cè', 'chè'], answer: 1 },
        { q: '"路"的拼音是什么？', options: ['lù', 'lǔ', 'lǘ', 'lú'], answer: 0 },
        { q: '"苏"（江苏省简称）的拼音是什么？', options: ['sū', 'shū', 'sǔ', 'sú'], answer: 0 },
        { q: '"京"（北京市简称）的拼音是什么？', options: ['jīng', 'jìng', 'jǐng', 'jóng'], answer: 0 },
        { q: '"辽"（辽宁省简称）的拼音是什么？', options: ['liáo', 'liāo', 'liǎo', 'lià'], answer: 0 },
        { q: '"琼"（海南省简称）的拼音是什么？', options: ['qióng', 'qīng', 'qióng', 'qóng'], answer: 0 },
        { q: '"沪"（上海市简称）的拼音是什么？', options: ['hù', 'hǔ', 'hú', 'hū'], answer: 0 },
        { q: '"粤"（广东省简称）的拼音是什么？', options: ['yùe', 'yuè', 'yuě', 'yuē'], answer: 1 },
        { q: '"湘"（湖南省简称）的拼音是什么？', options: ['xiāng', 'xiáng', 'xiǎng', 'xiàng'], answer: 0 },
        { q: '"川"（四川省简称）的拼音是什么？', options: ['cuān', 'chuān', 'chuán', 'cuán'], answer: 1 },
        { q: '"吉"（吉林省简称）的拼音是什么？', options: ['jí', 'jì', 'jǐ', 'jī'], answer: 0 },
        { q: '"浙"（浙江省简称）的拼音是什么？', options: ['zè', 'zhè', 'zhé', 'zé'], answer: 1 },
        { q: '"鲁"（山东省简称）的拼音是什么？', options: ['lǔ', 'lù', 'lu', 'lú'], answer: 0 },
        { q: '"闽"（福建省简称）的拼音是什么？', options: ['mǐn', 'mín', 'mìng', 'mīn'], answer: 0 },
    ],

    // 车牌知识题
    plate: [
        { q: '江苏省的车牌简称是什么？', options: ['苏', '江', '锡', '宁'], answer: 0 },
        { q: '辽宁省的车牌简称是什么？', options: ['辽', '沈', '东', '北'], answer: 0 },
        { q: '广西的车牌简称是什么？', options: ['桂', '广', '西', '南'], answer: 0 },
        { q: '海南省的车牌简称是什么？', options: ['琼', '海', '南', '岛'], answer: 0 },
        { q: '北京市的车牌简称是什么？', options: ['京', '北', '都', '首'], answer: 0 },
        { q: '上海的车牌简称是什么？', options: ['沪', '上', '申', '海'], answer: 0 },
        { q: '广东省的车牌简称是什么？', options: ['粤', '广', '东', '深'], answer: 0 },
        { q: '浙江省的车牌简称是什么？', options: ['浙', '杭', '温', '江'], answer: 0 },
        { q: '山东省的车牌简称是什么？', options: ['鲁', '济', '青', '山'], answer: 0 },
        { q: '四川省的车牌简称是什么？', options: ['川', '成', '蜀', '四'], answer: 0 },
        { q: '湖北省的车牌简称是什么？', options: ['鄂', '武', '汉', '楚'], answer: 0 },
        { q: '河南省的车牌简称是什么？', options: ['豫', '郑', '洛', '河'], answer: 0 },
        { q: '湖南省的车牌简称是什么？', options: ['湘', '长', '楚', '湘'], answer: 0 },
        { q: '福建省的车牌简称是什么？', options: ['闽', '福', '厦', '闽'], answer: 0 },
    ],

    // 高速知识题
    highway: [
        { q: 'G2京沪高速连接哪两个城市？', options: ['北京-上海', '北京-广州', '上海-杭州', '南京-上海'], answer: 0 },
        { q: 'G15沈海高速的终点是哪里？', options: ['海口', '广州', '深圳', '厦门'], answer: 0 },
        { q: 'G1京哈高速通往哪个省份？', options: ['黑龙江', '广东', '四川', '云南'], answer: 0 },
        { q: '哪条高速从北京通往昆明？', options: ['G5京昆高速', 'G4京港澳高速', 'G6京藏高速', 'G2京沪高速'], answer: 0 },
        { q: 'G30连霍高速经过哪个著名关口？', options: ['霍尔果斯', '山海关', '嘉峪关', '潼关'], answer: 0 },
        { q: '从无锡到沈阳主要走哪条高速？', options: ['G15沈海高速', 'G2京沪高速', 'G1京哈高速', 'G25长深高速'], answer: 1 },
        { q: '哪条高速被称为"丝绸之路高速"？', options: ['G30连霍高速', 'G65包茂高速', 'G75兰海高速', 'G56杭瑞高速'], answer: 0 },
        { q: 'G4京港澳高速经过哪个省会？', options: ['郑州', '济南', '合肥', '南京'], answer: 0 },
        { q: 'G是什么意思？', options: ['国家高速', '省级高速', '县级公路', '城市道路'], answer: 0 },
        { q: '高速路牌是什么颜色？', options: ['绿色', '红色', '蓝色', '黄色'], answer: 0 },
    ],

    // 地理知识题
    geography: [
        { q: '无锡位于哪个省？', options: ['江苏省', '浙江省', '安徽省', '山东省'], answer: 0 },
        { q: '沈阳是哪个省的省会？', options: ['辽宁省', '吉林省', '黑龙江省', '内蒙古自治区'], answer: 0 },
        { q: '桂林山水在哪个省？', options: ['广西', '贵州', '云南', '广东'], answer: 0 },
        { q: '海南岛隔什么海峡与大陆相望？', options: ['琼州海峡', '台湾海峡', '渤海海峡', '珠江口'], answer: 0 },
        { q: '长江经过哪个城市？', options: ['武汉', '郑州', '西安', '沈阳'], answer: 0 },
        { q: '黄山位于哪个省？', options: ['安徽省', '浙江省', '江西省', '福建省'], answer: 0 },
        { q: '泰山位于哪个省？', options: ['山东省', '河北省', '河南省', '山西省'], answer: 0 },
        { q: '中国有多少个省级行政区？', options: ['34个', '32个', '30个', '36个'], answer: 0 },
    ],

    // 交通常识题
    traffic: [
        { q: '高速公路最高限速一般是多少？', options: ['120公里/小时', '100公里/小时', '80公里/小时', '140公里/小时'], answer: 0 },
        { q: '红色圆形交通标志表示什么？', options: ['禁止', '警告', '指示', '提示'], answer: 0 },
        { q: '遇到雨天行车应该怎么做？', options: ['减速慢行', '加速通过', '不变速', '停车等待'], answer: 0 },
        { q: '高速公路上每隔多少公里有服务区？', options: ['约50公里', '约100公里', '约200公里', '约30公里'], answer: 0 },
        { q: '隧道内行驶要注意什么？', options: ['减速开灯', '加速通过', '不变速', '关闭车灯'], answer: 0 },
        { q: '在高速公路上可以倒车吗？', options: ['不可以', '可以', '紧急时可以', '看情况'], answer: 0 },
        { q: '遇到堵车应该怎么做？', options: ['耐心等待', '绕道行驶', '加速超车', '倒车离开'], answer: 0 },
    ],

    // 获取随机题目
    getRandomQuiz() {
        const categories = ['math', 'pinyin', 'plate', 'highway', 'geography', 'traffic'];
        const cat = categories[Math.floor(Math.random() * categories.length)];
        const questions = this[cat];
        const idx = Math.floor(Math.random() * questions.length);
        const categoryNames = {
            math: '口算题',
            pinyin: '拼音题',
            plate: '车牌知识',
            highway: '高速知识',
            geography: '地理知识',
            traffic: '交通常识'
        };
        return {
            category: cat,
            categoryName: categoryNames[cat],
            ...questions[idx]
        };
    }
};