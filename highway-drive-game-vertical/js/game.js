// 竖屏版游戏核心逻辑 - Canvas绘制背景、自由移动、真实服务区/岔道
const Game = {
    // 游戏状态
    state: {
        running: false,
        paused: false,
        currentCity: '无锡',
        currentHighway: 'G42',  // 当前高速公路编号
        cityWelcomeTimer: 0,  // 城市欢迎提示计时器
        lastCity: '无锡',     // 上一个城市（用于判断是否变化）
        distance: 0,
        totalDistance: 0,
        score: 0,
        totalScore: 0,
        speed: 3,  // 基础速度
        scrollSpeed: 2, // 背景滚动速度
        timeOfDay: '清晨',  // 当前时段
        weather: '晴',
        lastWeatherDistance: 0,  // 上次天气变换时的里程
        junctionCooldown: 0,
        serviceAreaCooldown: 0,
        currentRoutes: [],
        backgroundOffset: 0,
        currentCar: '灰色五菱之光',
        fuel: 60,
        maxFuel: 60,
        consumption: 8,
        correctAnswers: 0,
        totalQuestions: 0,
        waitingForRefuel: false,
        lastQuiz: null,
        lastAnswerCorrect: false,
        // 玩家位置 - 自由移动
        playerX: 0,
        playerY: 0,
        targetX: 0,
        targetY: 0,
        moveSpeed: 8,
        // 车道边界
        lanes: { left: 0, right: 0, positions: [] },
        // NPC小车
        npcCars: [],
        npcSpawnTimer: 0,
        // 服务区
        serviceArea: null,
        serviceAreaTimer: 0,
        // 岔道
        junction: null,
        junctionTimer: 0,
    },

    // 道路参数
    road: {
        widthRatio: 0.6,  // 道路宽度占屏幕比例
        laneCount: 3,
        laneWidth: 0,
        roadLeft: 0,
        roadRight: 0,
    },

    // Canvas
    canvas: null,
    ctx: null,

    // 初始化
    init() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.loadSavedData();
        this.bindEvents();
        AudioManager.init();
        UI.updateLeaderboard();  // 更新积分榜显示
    },

    // 调整画布
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // 计算道路参数 - 道路靠左，右边留空给服务区
        const roadWidth = this.canvas.width * 0.55;  // 道路宽度
        this.road.laneWidth = roadWidth / this.road.laneCount;
        this.road.roadLeft = 20;  // 道路左边距20px
        this.road.roadRight = this.road.roadLeft + roadWidth;

        // 车道中心位置
        this.state.lanes.positions = [];
        for (let i = 0; i < this.road.laneCount; i++) {
            this.state.lanes.positions.push(
                this.road.roadLeft + this.road.laneWidth * i + this.road.laneWidth / 2
            );
        }
        this.state.lanes.left = this.road.roadLeft + 25;
        this.state.lanes.right = this.road.roadRight - 25;

        // 初始玩家位置
        this.state.playerX = this.state.lanes.positions[1];
        this.state.playerY = this.canvas.height * 0.75;
        this.state.targetX = this.state.playerX;
        this.state.targetY = this.state.playerY;
    },

    // 加载存档
    loadSavedData() {
        const saved = Storage.load();
        if (saved) {
            this.state.totalDistance = saved.totalDistance || 0;
            this.state.totalScore = saved.totalScore || 0;
            this.state.currentCar = saved.currentCar || '灰色五菱之光';
            this.state.correctAnswers = saved.correctAnswers || 0;
            this.state.totalQuestions = saved.totalQuestions || 0;
            this.applyCarStats();
        }
    },

    // 应用车辆属性
    applyCarStats() {
        const carData = CARS_DATA[this.state.currentCar];
        if (carData) {
            this.state.maxFuel = carData.tank;
            this.state.consumption = carData.consumption;
        }
    },

    // 绑定事件
    bindEvents() {
        document.getElementById('start-btn').addEventListener('click', () => this.showGuide());
        document.getElementById('garage-btn').addEventListener('click', () => UI.openGarage());
        document.getElementById('close-garage').addEventListener('click', () => UI.closeGarage());
        document.getElementById('back-btn').addEventListener('click', () => UI.closeGarage());
        document.getElementById('restart-btn').addEventListener('click', () => this.restart());
        document.getElementById('home-btn').addEventListener('click', () => this.goHome());
        document.getElementById('refuel-btn').addEventListener('click', () => this.refuel());
        document.getElementById('continue-btn').addEventListener('click', () => this.continueDriving());
        document.getElementById('exit-btn').addEventListener('click', () => this.goHome());

        // 音量
        document.getElementById('sound-toggle').addEventListener('click', () => {
            const muted = AudioManager.toggleMute();
            document.getElementById('sound-toggle').textContent = muted ? '🔇' : '🔊';
        });

        // 引导页
        document.getElementById('guide-start-btn').addEventListener('click', () => this.closeGuideAndStart());

        // 键盘
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // 滑动控制
        let touchStartX = 0, touchStartY = 0;
        let isSwiping = false;

        this.canvas.addEventListener('touchstart', (e) => {
            if (!this.state.running || this.state.paused) return;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isSwiping = true;
        }, { passive: true });

        this.canvas.addEventListener('touchmove', (e) => {
            if (!this.state.running || this.state.paused || !isSwiping) return;
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const deltaX = touchX - touchStartX;
            const deltaY = touchY - touchStartY;

            // 更新目标位置
            this.state.targetX = this.state.playerX + deltaX * 0.5;
            this.state.targetY = this.state.playerY + deltaY * 0.5;

            // 限制在道路范围内
            this.state.targetX = Math.max(this.state.lanes.left, Math.min(this.state.lanes.right, this.state.targetX));
            this.state.targetY = Math.max(this.canvas.height * 0.3, Math.min(this.canvas.height * 0.85, this.state.targetY));
        }, { passive: true });

        this.canvas.addEventListener('touchend', (e) => {
            isSwiping = false;
        }, { passive: true });
    },

    // 持续移动状态
    moveState: { up: false, down: false, left: false, right: false },

    startMove(dir) {
        if (!this.state.running || this.state.paused) return;
        this.moveState[dir] = true;
    },

    stopMove(dir) {
        this.moveState[dir] = false;
    },

    // 显示引导
    showGuide() {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('guide-panel').style.display = 'flex';
    },

    closeGuideAndStart() {
        document.getElementById('guide-panel').style.display = 'none';
        this.start();
    },

    // 键盘控制
    handleKeyDown(e) {
        if (!this.state.running || this.state.paused) return;
        const key = e.key.toLowerCase();
        if (key === 'arrowup' || key === 'w') this.moveState.up = true;
        if (key === 'arrowdown' || key === 's') this.moveState.down = true;
        if (key === 'arrowleft' || key === 'a') this.moveState.left = true;
        if (key === 'arrowright' || key === 'd') this.moveState.right = true;
    },

    // 返回首页
    goHome() {
        AudioManager.stopEngine();
        this.hideAllPanels();
        document.getElementById('start-screen').style.display = 'flex';
        this.state.running = false;
        this.state.paused = false;
        UI.updateLeaderboard();  // 更新积分榜显示
    },

    hideAllPanels() {
        ['game-over-panel', 'quiz-panel', 'junction-panel', 'service-area-alert',
         'refuel-success', 'in-game-exit', 'sound-control'].forEach(id => {
            document.getElementById(id).style.display = 'none';
        });
    },

    // 开始游戏
    start() {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('in-game-exit').style.display = 'block';
        document.getElementById('sound-control').style.display = 'block';
        // 不显示方向按钮，改用滑动控制

        this.state.running = true;
        this.state.paused = false;
        this.state.distance = 0;
        this.state.score = 0;
        this.state.fuel = this.state.maxFuel;
        this.state.timeOfDay = '清晨';
        this.state.weather = '晴';
        this.state.lastWeatherDistance = 0;
        this.state.junctionCooldown = 300;
        this.state.serviceAreaCooldown = 400;
        this.state.playerX = this.state.lanes.positions[1];
        this.state.playerY = this.canvas.height * 0.7;
        this.state.targetX = this.state.playerX;
        this.state.targetY = this.state.playerY;
        this.state.npcCars = [];
        this.state.npcSpawnTimer = 0;
        this.state.serviceArea = null;
        this.state.junction = null;
        this.state.backgroundOffset = 0;

        // 设置初始高速公路（根据当前城市）
        const cityNode = ROAD_NETWORK_DATA.nodes[this.state.currentCity];
        if (cityNode && cityNode.highways && cityNode.highways.length > 0) {
            this.state.currentHighway = cityNode.highways[0];
        }

        this.applyCarStats();
        AudioManager.startEngine();
        this.gameLoop();
    },

    restart() {
        document.getElementById('game-over-panel').style.display = 'none';
        this.start();
    },

    // 游戏循环
    gameLoop() {
        if (!this.state.running) return;
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    },

    // 更新状态
    update() {
        if (!this.state.running || this.state.paused) return;

        // 检查油量
        if (this.state.fuel <= 0) {
            this.gameOver('fuel');
            return;
        }

        // 处理移动输入
        this.handleMovement();

        // 更新背景滚动
        this.state.backgroundOffset += this.state.scrollSpeed;

        // 更新城市欢迎提示计时器
        if (this.state.cityWelcomeTimer > 0) {
            this.state.cityWelcomeTimer--;
        }

        // 更NPC小车
        this.updateNPCCars();

        // 更新服务区
        this.updateServiceArea();

        // 更新岔道
        this.updateJunction();

        // 碰撞检测
        this.checkCollisions();

        // 更新冷却时间
        if (this.state.junctionCooldown > 0) this.state.junctionCooldown--;
        if (this.state.serviceAreaCooldown > 0) this.state.serviceAreaCooldown--;

        // 尝试生成服务区
        if (!this.state.serviceArea && this.state.serviceAreaCooldown <= 0 && Math.random() < 0.002) {
            this.spawnServiceArea();
            this.state.serviceAreaCooldown = 300;
        }

        // 尝试生成岔道
        if (!this.state.junction && this.state.junctionCooldown <= 0 && Math.random() < 0.001) {
            this.spawnJunction();
            this.state.junctionCooldown = 400;
        }

        // 更新距离和油量
        this.state.distance += this.state.speed * 0.02;
        const fuelUsed = this.state.speed * 0.04 / this.state.consumption;  // 油耗加快4倍
        this.state.fuel = Math.max(0, this.state.fuel - fuelUsed);

        // 时间变换系统：每200公里变换一次时段
        const distanceKm = Math.floor(this.state.distance);
        const timeCycle = Math.floor(distanceKm / 200);
        const timeSlots = ['清晨', '上午', '中午', '下午', '黄昏', '夜晚'];
        const newTimeOfDay = timeSlots[timeCycle % timeSlots.length];
        if (this.state.timeOfDay !== newTimeOfDay) {
            this.state.timeOfDay = newTimeOfDay;
        }

        // 天气变换系统：每300公里变换一次天气，频率较慢
        if (distanceKm > 0 && distanceKm % 300 === 0 && this.state.lastWeatherDistance !== distanceKm) {
            this.state.lastWeatherDistance = distanceKm;
            this.updateWeather();
        }

        UI.updateStatus(this.state);
        UI.updateEnvInfo(this.getEnvironment());
    },

    // 处理移动
    handleMovement() {
        const moveDelta = this.state.moveSpeed;

        if (this.moveState.up) this.state.targetY -= moveDelta;
        if (this.moveState.down) this.state.targetY += moveDelta;
        if (this.moveState.left) this.state.targetX -= moveDelta;
        if (this.moveState.right) this.state.targetX += moveDelta;

        // 限制范围
        this.state.targetX = Math.max(this.state.lanes.left, Math.min(this.state.lanes.right, this.state.targetX));
        this.state.targetY = Math.max(this.canvas.height * 0.25, Math.min(this.canvas.height * 0.85, this.state.targetY));

        // 平滑移动
        const dx = this.state.targetX - this.state.playerX;
        const dy = this.state.targetY - this.state.playerY;
        this.state.playerX += dx * 0.15;
        this.state.playerY += dy * 0.15;
    },

    // 更新NPC小车 - 只从上方出现
    updateNPCCars() {
        // 生成NPC - 每个车道最多1辆车
        this.state.npcSpawnTimer++;
        if (this.state.npcSpawnTimer > 90 && this.state.npcCars.length < 3 && Math.random() < 0.02) {
            this.spawnNPCCar();
            this.state.npcSpawnTimer = 0;
        }

        // 更新位置 - NPC从上往下移动
        for (let i = this.state.npcCars.length - 1; i >= 0; i--) {
            const npc = this.state.npcCars[i];

            // 检测前方是否有其他NPC
            let shouldSlowDown = false;
            for (let j = 0; j < this.state.npcCars.length; j++) {
                if (i === j) continue;
                const other = this.state.npcCars[j];
                // 如果前方有车（同一车道，且在前方一定距离内）
                if (Math.abs(npc.x - other.x) < 30 && other.y > npc.y && other.y - npc.y < 120) {
                    shouldSlowDown = true;
                    break;
                }
            }

            // 根据情况调整速度
            if (shouldSlowDown) {
                npc.y += Math.max(1, npc.speed * 0.3);  // 大幅减速
            } else {
                npc.y += npc.speed;
            }

            // 移出屏幕下方删除
            if (npc.y > this.canvas.height + 100) {
                this.state.npcCars.splice(i, 1);
            }
        }
    },

    // 生成NPC - 每个车道最多1辆车
    spawnNPCCar() {
        // 找出哪些车道没有车
        const occupiedLanes = this.state.npcCars.map(npc => npc.lane);
        const availableLanes = [0, 1, 2].filter(l => !occupiedLanes.includes(l));

        if (availableLanes.length === 0) return;  // 所有车道都有车

        const lane = availableLanes[Math.floor(Math.random() * availableLanes.length)];
        const x = this.state.lanes.positions[lane];
        const colors = ['#E74C3C', '#3498DB', '#2ECC71', '#F39C12', '#9B59B6', '#E67E22', '#16A085', '#D35400'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // 速度比背景滚动稍快一点
        const speed = this.state.scrollSpeed + 0.5 + Math.random() * 1.5;

        this.state.npcCars.push({
            x: x,
            y: -100,
            width: 50,
            height: 80,
            color: color,
            speed: speed,
            lane: lane
        });
    },

    // 生成服务区 - 使用真实名称
    spawnServiceArea() {
        // 从路网获取一个真实服务区名称
        const serviceAreaName = ROAD_NETWORK_DATA.getRandomServiceArea();
        const serviceAreaNode = ROAD_NETWORK_DATA.nodes[serviceAreaName];

        this.state.serviceArea = {
            y: -250,
            triggered: false,
            name: serviceAreaName,
            desc: serviceAreaNode ? serviceAreaNode.desc : serviceAreaName
        };
    },

    // 更新服务区
    updateServiceArea() {
        if (!this.state.serviceArea) return;

        // 服务区随背景往下移动
        this.state.serviceArea.y += this.state.scrollSpeed;

        // 只有玩家在右侧车道且服务区在触发区域时才触发
        if (!this.state.serviceArea.triggered &&
            this.state.serviceArea.y > this.canvas.height * 0.35 &&
            this.state.serviceArea.y < this.canvas.height * 0.55) {

            // 检查玩家是否在右侧车道
            const rightLaneX = this.state.lanes.positions[2] || (this.road.roadRight - 40);
            const inRightLane = this.state.playerX > (this.road.roadLeft + this.road.roadRight) / 2;

            if (inRightLane) {
                this.state.serviceArea.triggered = true;
                this.triggerServiceArea();
            }
        }

        // 移出屏幕删除（不是答题完就消失）
        if (this.state.serviceArea.y > this.canvas.height + 250) {
            this.state.serviceArea = null;
        }
    },

    // 触发服务区
    triggerServiceArea() {
        document.getElementById('service-area-alert').style.display = 'block';
        this.state.paused = true;

        setTimeout(() => {
            document.getElementById('service-area-alert').style.display = 'none';
            this.showQuiz();
        }, 1500);
    },

    // 生成岔道
    spawnJunction() {
        const routes = ROAD_NETWORK_DATA.getRoutesFrom(this.state.currentCity);
        if (routes.length < 2) return;

        this.state.junction = {
            y: -300,
            routes: routes.slice(0, 2),
            triggered: false
        };
        this.state.currentRoutes = routes.slice(0, 2);
    },

    // 更新岔道
    updateJunction() {
        if (!this.state.junction) return;

        this.state.junction.y += this.state.scrollSpeed;

        // 到达触发区域（岔道已经露出大部分时触发）
        if (!this.state.junction.triggered &&
            this.state.junction.y > this.canvas.height * 0.35 &&
            this.state.junction.y < this.canvas.height * 0.55) {

            this.state.junction.triggered = true;
            this.triggerJunction();
        }

        // 移出屏幕下方
        if (this.state.junction.y > this.canvas.height + 300) {
            this.state.junction = null;
        }
    },

    // 触发岔道
    triggerJunction() {
        this.state.paused = true;
        const panel = document.getElementById('junction-panel');
        const optionsContainer = document.getElementById('route-options');

        document.getElementById('junction-location').textContent = '当前位置: ' + this.state.currentCity;
        optionsContainer.innerHTML = '';

        this.state.currentRoutes.forEach((route, idx) => {
            const option = document.createElement('div');
            option.className = 'route-option';
            option.innerHTML = `
                <div class="road-sign">${route.highway}</div>
                <div class="route-info">
                    <div class="route-name">${route.name}</div>
                    <div class="route-direction">${route.direction} → ${route.target}</div>
                </div>
            `;
            option.onclick = () => this.selectRoute(idx);
            optionsContainer.appendChild(option);
        });

        panel.style.display = 'block';
    },

    // 选择路线
    selectRoute(idx) {
        const route = this.state.currentRoutes[idx];
        const newCity = route.target;

        // 如果城市变化，显示欢迎提示并更新高速公路
        if (newCity !== this.state.currentCity) {
            this.state.lastCity = this.state.currentCity;
            this.state.currentCity = newCity;
            this.state.currentHighway = route.highway;  // 更新当前高速公路
            this.state.cityWelcomeTimer = 180;  // 显示3秒（60帧/秒）
        }

        this.state.score += 10;
        this.state.totalScore += 10;
        this.state.junctionCooldown = 400;

        document.getElementById('junction-panel').style.display = 'none';
        this.state.currentRoutes = [];
        this.state.junction = null;
        this.state.paused = false;

        Storage.save(this.state);
    },

    // 碰撞检测
    checkCollisions() {
        const pw = 50, ph = 80; // 玀家车尺寸
        const px = this.state.playerX - pw/2;
        const py = this.state.playerY - ph/2;

        for (const npc of this.state.npcCars) {
            const nx = npc.x - npc.width/2;
            const ny = npc.y - npc.height/2;

            // 简单矩形碰撞
            if (px < nx + npc.width && px + pw > nx &&
                py < ny + npc.height && py + ph > ny) {
                this.gameOver('collision');
                return;
            }
        }
    },

    // 更新天气
    updateWeather() {
        const weathers = ['晴', '阴', '雨', '雪'];
        const weights = [0.5, 0.25, 0.2, 0.05];
        let rand = Math.random(), sum = 0;
        for (let i = 0; i < weathers.length; i++) {
            sum += weights[i];
            if (rand < sum) {
                this.state.weather = weathers[i];
                break;
            }
        }
    },

    // 获取环境
    getEnvironment() {
        const timeOfDay = this.state.timeOfDay;
        let skyColor;

        // 根据时段设置天空颜色和光线效果
        if (timeOfDay === '清晨') { skyColor = '#FFE4B5'; }
        else if (timeOfDay === '上午') { skyColor = '#87CEEB'; }
        else if (timeOfDay === '中午') { skyColor = '#ADD8E6'; }
        else if (timeOfDay === '下午') { skyColor = '#87CEEB'; }
        else if (timeOfDay === '黄昏') { skyColor = '#FF6347'; }
        else if (timeOfDay === '夜晚') { skyColor = '#191970'; }

        const node = ROAD_NETWORK_DATA.nodes[this.state.currentCity];
        const region = node ? node.desc : '江南水乡';

        return { timeOfDay, weather: this.state.weather, region, skyColor };
    },

    // 渲染
    render() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawBackground();
        this.drawServiceArea();
        this.drawJunction();
        this.drawNPCCars();
        this.drawPlayerCar();
        this.drawWeatherEffect();
        this.drawCityWelcome();
        this.drawHighwayInfo();  // 绘制高速公路信息
    },

    // 绘制背景 - Canvas绘制
    drawBackground() {
        const ctx = this.ctx;
        const env = this.getEnvironment();

        // 天空颜色
        ctx.fillStyle = env.skyColor;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 根据时段添加光线效果
        if (env.timeOfDay === '清晨') {
            // 清晨 - 淡橙色渐变
            const gradient = ctx.createLinearGradient(0, 0, 0, this.canvas.height);
            gradient.addColorStop(0, 'rgba(255, 200, 100, 0.3)');
            gradient.addColorStop(0.3, 'rgba(255, 180, 80, 0.1)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else if (env.timeOfDay === '黄昏') {
            // 黄昏 - 橙红色渐变
            const gradient = ctx.createLinearGradient(0, 0, 0, this.canvas.height);
            gradient.addColorStop(0, 'rgba(255, 100, 50, 0.4)');
            gradient.addColorStop(0.4, 'rgba(200, 50, 30, 0.2)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else if (env.timeOfDay === '夜晚') {
            // 夜晚 - 深蓝色覆盖
            ctx.fillStyle = 'rgba(0, 0, 50, 0.5)';
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // 星星
            ctx.fillStyle = '#FFF';
            for (let i = 0; i < 20; i++) {
                const sx = (i * 97 + this.state.backgroundOffset * 0.05) % this.canvas.width;
                const sy = (i * 53) % (this.canvas.height * 0.3);
                ctx.fillRect(sx, sy, 2, 2);
            }

            // 月亮
            ctx.fillStyle = '#FFFF99';
            ctx.beginPath();
            ctx.arc(this.canvas.width - 60, 80, 25, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#FFFFCC';
            ctx.beginPath();
            ctx.arc(this.canvas.width - 65, 75, 20, 0, Math.PI * 2);
            ctx.fill();
        } else if (env.timeOfDay === '中午') {
            // 中午 - 阳光较强，轻微高亮
            ctx.fillStyle = 'rgba(255, 255, 200, 0.15)';
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        // 草地（两侧）
        ctx.fillStyle = '#228B22';
        ctx.fillRect(0, 0, this.road.roadLeft, this.canvas.height);
        ctx.fillRect(this.road.roadRight, 0, this.canvas.width - this.road.roadRight, this.canvas.height);

        // 道路
        ctx.fillStyle = '#333333';
        ctx.fillRect(this.road.roadLeft, 0, this.road.roadRight - this.road.roadLeft, this.canvas.height);

        // 车道分隔线（白色虚线，从上往下滚动，模拟往前开）
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.setLineDash([40, 30]);

        const lineOffset = this.state.backgroundOffset % 70;
        for (let i = 1; i < this.road.laneCount; i++) {
            const x = this.road.roadLeft + this.road.laneWidth * i;
            ctx.beginPath();
            ctx.moveTo(x, lineOffset - 70);
            ctx.lineTo(x, this.canvas.height + 70);
            ctx.stroke();
        }
        ctx.setLineDash([]);

        // 道路边缘线（黄色实线）
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(this.road.roadLeft, 0);
        ctx.lineTo(this.road.roadLeft, this.canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.road.roadRight, 0);
        ctx.lineTo(this.road.roadRight, this.canvas.height);
        ctx.stroke();
    },

    // 绘制服务区 - 精美设计
    drawServiceArea() {
        if (!this.state.serviceArea) return;

        const ctx = this.ctx;
        const sa = this.state.serviceArea;

        // 服务区位置在道路右侧
        const serviceX = this.road.roadRight + 25;
        const serviceWidth = this.canvas.width - serviceX - 15;
        const baseY = sa.y;

        // === 停车场区域 ===
        ctx.fillStyle = '#4a4a4a';
        ctx.fillRect(serviceX, baseY + 150, serviceWidth, 80);

        // 停车位线
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            const px = serviceX + 15 + i * (serviceWidth / 3);
            ctx.beginPath();
            ctx.moveTo(px, baseY + 155);
            ctx.lineTo(px, baseY + 225);
            ctx.stroke();
        }

        // === 服务区主建筑 ===
        const buildingWidth = serviceWidth - 20;
        const buildingX = serviceX + 10;
        const buildingY = baseY + 20;
        const buildingHeight = 120;

        // 建筑主体
        ctx.fillStyle = '#f5f5dc';  // 米白色
        ctx.fillRect(buildingX, buildingY, buildingWidth, buildingHeight);

        // 屋顶（三角形）
        ctx.fillStyle = '#8B0000';  // 深红色屋顶
        ctx.beginPath();
        ctx.moveTo(buildingX - 5, buildingY);
        ctx.lineTo(buildingX + buildingWidth / 2, buildingY - 25);
        ctx.lineTo(buildingX + buildingWidth + 5, buildingY);
        ctx.closePath();
        ctx.fill();

        // 窗户
        ctx.fillStyle = '#87CEEB';
        const windowWidth = 25;
        const windowHeight = 30;
        for (let i = 0; i < 3; i++) {
            const wx = buildingX + 15 + i * (buildingWidth / 3);
            ctx.fillRect(wx, buildingY + 15, windowWidth, windowHeight);
            // 窗框
            ctx.strokeStyle = '#8B4513';
            ctx.lineWidth = 2;
            ctx.strokeRect(wx, buildingY + 15, windowWidth, windowHeight);
        }

        // 门
        ctx.fillStyle = '#8B4513';
        const doorWidth = 30;
        const doorHeight = 50;
        ctx.fillRect(buildingX + buildingWidth / 2 - doorWidth / 2, buildingY + buildingHeight - doorHeight, doorWidth, doorHeight);

        // === 服务区招牌 ===
        const signWidth = serviceWidth - 30;
        const signHeight = 35;
        const signX = serviceX + 15;
        const signY = baseY - 15;

        // 招牌背景
        ctx.fillStyle = '#006400';
        ctx.fillRect(signX, signY, signWidth, signHeight);

        // 招牌边框
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.strokeRect(signX, signY, signWidth, signHeight);

        // 招牌文字 - 显示真实服务区名称
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 16px Microsoft YaHei';
        ctx.textAlign = 'center';
        ctx.fillText(this.state.serviceArea.desc, signX + signWidth / 2, signY + 24);

        // 加油图标
        ctx.font = '20px Arial';
        ctx.fillText('⛽', signX + signWidth / 2, buildingY + buildingHeight + 20);

        // 提示文字
        ctx.font = '12px Microsoft YaHei';
        ctx.fillStyle = '#FFD700';
        ctx.fillText('右车道答题加油', signX + signWidth / 2, buildingY + buildingHeight + 40);

        ctx.textAlign = 'left';

        // === 入口道路 ===
        ctx.fillStyle = '#555555';
        ctx.beginPath();
        ctx.moveTo(this.road.roadRight, baseY + 160);
        ctx.lineTo(serviceX, baseY + 170);
        ctx.lineTo(serviceX, baseY + 190);
        ctx.lineTo(this.road.roadRight, baseY + 180);
        ctx.closePath();
        ctx.fill();

        // 入口箭头
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.moveTo(this.road.roadRight - 5, baseY + 170);
        ctx.lineTo(this.road.roadRight - 20, baseY + 165);
        ctx.lineTo(this.road.roadRight - 20, baseY + 175);
        ctx.closePath();
        ctx.fill();
    },

    // 绘制岔道 - 简化版，不绘制岔道路面，只触发选择面板
    drawJunction() {
        // 不绘制岔道图形，选择面板会自动弹出
    },

    // 绘制玩家车辆（俯视图）
    drawPlayerCar() {
        const ctx = this.ctx;
        const carData = CARS_DATA[this.state.currentCar];
        const color = carData ? carData.color : '#808080';

        const w = 50, h = 80;
        const x = this.state.playerX - w/2;
        const y = this.state.playerY - h/2;

        // 车身
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);

        // 车顶（稍小）
        ctx.fillStyle = this.darkenColor(color, 20);
        ctx.fillRect(x + 8, y + 15, w - 16, h - 30);

        // 车窗
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(x + 10, y + 5, w - 20, 20);
        ctx.fillRect(x + 10, y + h - 25, w - 20, 20);

        // 车灯（前）
        ctx.fillStyle = '#FFFF00';
        ctx.fillRect(x + 5, y, 8, 5);
        ctx.fillRect(x + w - 13, y, 8, 5);

        // 车灯（后）
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(x + 5, y + h - 5, 8, 5);
        ctx.fillRect(x + w - 13, y + h - 5, 8, 5);

        // 轮胎
        ctx.fillStyle = '#333333';
        ctx.fillRect(x - 5, y + 10, 8, 15);
        ctx.fillRect(x + w - 3, y + 10, 8, 15);
        ctx.fillRect(x - 5, y + h - 25, 8, 15);
        ctx.fillRect(x + w - 3, y + h - 25, 8, 15);
    },

    // 绘制NPC车辆（俯视图）
    drawNPCCars() {
        const ctx = this.ctx;

        this.state.npcCars.forEach(npc => {
            const w = npc.width;
            const h = npc.height;
            const x = npc.x - w/2;
            const y = npc.y - h/2;

            // 车身
            ctx.fillStyle = npc.color;
            ctx.fillRect(x, y, w, h);

            // 车顶
            ctx.fillStyle = this.darkenColor(npc.color, 20);
            ctx.fillRect(x + 6, y + 12, w - 12, h - 24);

            // 车窗
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(x + 8, y + 4, w - 16, 16);
            ctx.fillRect(x + 8, y + h - 20, w - 16, 16);

            // 后车灯（红色，朝向玩家）
            ctx.fillStyle = '#FF0000';
            ctx.fillRect(x + 4, y + h - 4, 6, 4);
            ctx.fillRect(x + w - 10, y + h - 4, 6, 4);
        });
    },

    // 颜色变暗
    darkenColor(color, amount) {
        const hex = color.replace('#', '');
        const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - amount);
        const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - amount);
        const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - amount);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    },

    // 绘制天气效果
    drawWeatherEffect() {
        const ctx = this.ctx;

        if (this.state.weather === '雨') {
            ctx.fillStyle = 'rgba(100, 100, 120, 0.3)';
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            ctx.strokeStyle = '#AAA';
            ctx.lineWidth = 1;
            for (let i = 0; i < 30; i++) {
                const rx = Math.random() * this.canvas.width;
                const ry = Math.random() * this.canvas.height;
                ctx.beginPath();
                ctx.moveTo(rx, ry);
                ctx.lineTo(rx + 3, ry + 12);
                ctx.stroke();
            }
        } else if (this.state.weather === '雪') {
            ctx.fillStyle = '#FFF';
            for (let i = 0; i < 20; i++) {
                const sx = Math.random() * this.canvas.width;
                const sy = Math.random() * this.canvas.height;
                ctx.fillRect(sx, sy, 3, 3);
            }
        }
    },

    // 绘制城市欢迎提示
    drawCityWelcome() {
        if (this.state.cityWelcomeTimer <= 0) return;

        const ctx = this.ctx;
        const cityNode = ROAD_NETWORK_DATA.nodes[this.state.currentCity];
        const cityName = cityNode ? cityNode.desc : this.state.currentCity;

        // 计算淡入淡出效果
        const timer = this.state.cityWelcomeTimer;
        const maxTimer = 180;
        let alpha = 1;
        if (timer > maxTimer - 30) {
            alpha = (maxTimer - timer) / 30;  // 淡入
        } else if (timer < 30) {
            alpha = timer / 30;  // 淡出
        }

        // 横幅背景 - 放在油量条下方，避免重叠
        const bannerWidth = this.canvas.width * 0.85;
        const bannerHeight = 70;
        const bannerX = (this.canvas.width - bannerWidth) / 2;
        const bannerY = 150;  // 放在油量条下方

        ctx.fillStyle = `rgba(0, 100, 0, ${alpha * 0.9})`;
        ctx.fillRect(bannerX, bannerY, bannerWidth, bannerHeight);

        // 边框
        ctx.strokeStyle = `rgba(255, 215, 0, ${alpha})`;
        ctx.lineWidth = 3;
        ctx.strokeRect(bannerX, bannerY, bannerWidth, bannerHeight);

        // 文字
        ctx.textAlign = 'center';
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.font = 'bold 20px Microsoft YaHei';
        ctx.fillText('🎉 欢迎来到', this.canvas.width / 2, bannerY + 25);
        ctx.font = 'bold 24px Microsoft YaHei';
        ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
        ctx.fillText(cityName, this.canvas.width / 2, bannerY + 55);
        ctx.textAlign = 'left';
    },

    // 绘制高速公路信息（右下角）
    drawHighwayInfo() {
        const ctx = this.ctx;
        const highwayCode = this.state.currentHighway;
        const highwayData = ROAD_NETWORK_DATA.highways[highwayCode];

        if (!highwayData) return;

        // 右下角位置
        const boxWidth = 120;
        const boxHeight = 50;
        const boxX = this.canvas.width - boxWidth - 15;
        const boxY = this.canvas.height - boxHeight - 15;

        // 背景
        ctx.fillStyle = 'rgba(0, 51, 102, 0.8)';
        ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

        // 边框
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

        // 高速编号
        ctx.textAlign = 'center';
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 18px Arial';
        ctx.fillText(highwayCode, boxX + boxWidth / 2, boxY + 20);

        // 高速名称
        ctx.font = '12px Microsoft YaHei';
        ctx.fillStyle = '#4ecca3';
        ctx.fillText(highwayData.name, boxX + boxWidth / 2, boxY + 38);

        ctx.textAlign = 'left';
    },

    // 显示答题
    showQuiz() {
        const quiz = QUESTIONS_DATA.getRandomQuiz();
        this.state.lastQuiz = quiz;

        const panel = document.getElementById('quiz-panel');
        document.getElementById('quiz-category').textContent = '【' + quiz.categoryName + '】';
        document.getElementById('quiz-question').textContent = quiz.q;
        document.getElementById('quiz-result').style.display = 'none';
        document.getElementById('refuel-btn').style.display = 'none';
        document.getElementById('continue-btn').style.display = 'none';

        const optionsContainer = document.getElementById('quiz-options');
        optionsContainer.innerHTML = '';

        this.state.waitingForRefuel = false;
        this.state.lastAnswerCorrect = false;

        quiz.options.forEach((opt, idx) => {
            const option = document.createElement('button');
            option.className = 'quiz-option';
            option.textContent = opt;
            option.onclick = () => this.answerQuiz(idx, quiz.answer, option);
            optionsContainer.appendChild(option);
        });

        panel.style.display = 'block';
    },

    // 回答题目
    answerQuiz(selected, correct, element) {
        const options = document.querySelectorAll('.quiz-option');
        this.state.totalQuestions++;

        if (selected === correct) {
            element.classList.add('correct');
            this.state.score += 20;
            this.state.totalScore += 20;
            this.state.correctAnswers++;
            this.state.lastAnswerCorrect = true;

            AudioManager.playCorrect();
            document.getElementById('quiz-result').innerHTML = '回答正确！可以加油补给';
            document.getElementById('quiz-result').style.color = '#4CAF50';
            document.getElementById('refuel-btn').style.display = 'inline-block';
            document.getElementById('continue-btn').style.display = 'inline-block';
            this.state.waitingForRefuel = true;
        } else {
            element.classList.add('wrong');
            options[correct].classList.add('correct');
            this.state.lastAnswerCorrect = false;

            AudioManager.playWrong();
            const correctAnswer = this.state.lastQuiz.options[correct];
            document.getElementById('quiz-result').innerHTML = `回答错误！正确答案是：${correctAnswer}`;
            document.getElementById('quiz-result').style.color = '#F44336';
            document.getElementById('continue-btn').style.display = 'inline-block';
        }

        document.getElementById('quiz-result').style.display = 'block';
        options.forEach(opt => opt.onclick = null);
    },

    // 加油 - 只加20升
    refuel() {
        this.state.fuel = Math.min(this.state.maxFuel, this.state.fuel + 20);
        this.state.waitingForRefuel = false;

        AudioManager.playRefuel();
        document.getElementById('refuel-success').style.display = 'block';
        setTimeout(() => {
            document.getElementById('refuel-success').style.display = 'none';
        }, 1500);

        this.closeQuizPanel();
    },

    // 继续行驶
    continueDriving() {
        this.state.waitingForRefuel = false;
        this.closeQuizPanel();
    },

    // 关闭答题面板
    closeQuizPanel() {
        document.getElementById('quiz-panel').style.display = 'none';
        this.state.paused = false;
        // 不删除服务区，让它继续往下移动直到离开屏幕
        this.state.serviceAreaCooldown = 300;
        Storage.save(this.state);
    },

    // 游戏结束
    gameOver(reason = 'fuel') {
        this.state.running = false;
        this.state.totalDistance += this.state.distance;

        // 检查是否破纪录
        const isNewRecord = Storage.saveHighScore(this.state.score);

        let title;
        if (reason === 'collision') {
            title = '发生碰撞！';
            AudioManager.playCollision();
        } else {
            title = '油量耗尽！';
            AudioManager.playGameOver();
        }

        AudioManager.stopEngine();
        document.getElementById('game-over-title').textContent = title;
        document.getElementById('final-distance').textContent = Math.floor(this.state.distance);
        document.getElementById('final-score').textContent = this.state.score;
        document.getElementById('total-score').textContent = this.state.totalScore;

        // 如果破纪录，显示提示
        const statsDiv = document.getElementById('game-over-stats');
        if (isNewRecord) {
            statsDiv.innerHTML = `
                本次里程: <span id="final-distance">${Math.floor(this.state.distance)}</span> km<br>
                本次积分: <span id="final-score">${this.state.score}</span> <span style="color: gold;">🎉 新纪录！</span><br>
                累计总积分: <span id="total-score">${this.state.totalScore}</span>
            `;
        } else {
            statsDiv.innerHTML = `
                本次里程: <span id="final-distance">${Math.floor(this.state.distance)}</span> km<br>
                本次积分: <span id="final-score">${this.state.score}</span><br>
                累计总积分: <span id="total-score">${this.state.totalScore}</span>
            `;
        }

        document.getElementById('game-over-panel').style.display = 'block';

        Storage.save(this.state);
    },

    // 选择车辆
    selectCar(carName) {
        this.state.currentCar = carName;
        this.applyCarStats();
        this.state.fuel = this.state.maxFuel;

        document.querySelectorAll('.car-option').forEach(opt => opt.classList.remove('selected'));
        event.currentTarget.classList.add('selected');

        Storage.save(this.state);
    },
};