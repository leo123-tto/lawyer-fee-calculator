// UI渲染模块
const UI = {
    // 更新状态栏
    updateStatus(state) {
        document.getElementById('distance').textContent = Math.floor(state.distance);
        document.getElementById('score').textContent = state.score;
        document.getElementById('fuel').textContent = Math.floor(state.fuel);
        document.getElementById('tank-capacity').textContent = state.maxFuel;
        document.getElementById('current-car').textContent = state.currentCar;

        const fuelPercent = (state.fuel / state.maxFuel) * 100;
        const fuelBar = document.getElementById('fuel-bar');
        fuelBar.style.width = fuelPercent + '%';

        fuelBar.classList.remove('low', 'critical');
        if (fuelPercent < 30) fuelBar.classList.add('low');
        if (fuelPercent < 15) fuelBar.classList.add('critical');
    },

    // 更新环境信息
    updateEnvInfo(env) {
        const weatherIcons = { '晴': '☀️', '阴': '☁️', '雨': '🌧️', '雪': '❄️' };
        const weatherNames = { '晴': '晴天', '阴': '阴天', '雨': '雨天', '雪': '雪天' };

        document.getElementById('env-time').textContent = env.timeOfDay;
        document.getElementById('env-weather').textContent = weatherIcons[env.weather] + ' ' + weatherNames[env.weather];

        const node = ROAD_NETWORK_DATA.nodes[Game.state.currentCity];
        document.getElementById('env-city').textContent = node ? node.desc : '江南水乡';
    },

    // 打开车库
    openGarage() {
        this.renderCarList();
        document.getElementById('garage-panel').style.display = 'block';
    },

    // 关闭车库
    closeGarage() {
        document.getElementById('garage-panel').style.display = 'none';
    },

    // 渲染车辆列表
    renderCarList() {
        const carList = document.getElementById('car-list');
        carList.innerHTML = '';

        Object.keys(CARS_DATA).forEach(carName => {
            const carData = CARS_DATA[carName];
            const unlocked = Game.state.totalScore >= carData.unlockScore;

            const option = document.createElement('div');
            option.className = 'car-option';

            if (unlocked) {
                if (carName === Game.state.currentCar) {
                    option.classList.add('selected');
                }

                const previewBox = document.createElement('div');
                previewBox.className = 'car-preview-box';

                // 显示车辆名称和描述
                const infoDiv = document.createElement('div');
                infoDiv.className = 'car-info';
                infoDiv.innerHTML = `
                    <div class="car-name">${carName}</div>
                    <div class="car-stats">油箱:${carData.tank}L | 油耗:1升跑${carData.consumption}公里</div>
                    <div class="car-desc">${carData.desc}</div>
                `;

                option.appendChild(previewBox);
                option.appendChild(infoDiv);
                option.onclick = () => Game.selectCar(carName);
            } else {
                option.classList.add('locked');
                option.innerHTML = `
                    <div class="car-preview" style="background:#666">
                        <div style="color:#999;font-size:20px;">🔒</div>
                    </div>
                    <div class="car-info">
                        <div class="car-name">${carName}</div>
                        <div class="car-unlock">需要 ${carData.unlockScore} 积分解锁（当前: ${Game.state.totalScore}）</div>
                    </div>
                `;
            }

            carList.appendChild(option);
        });
    }
};