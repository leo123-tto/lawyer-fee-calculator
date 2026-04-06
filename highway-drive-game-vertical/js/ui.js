// UI渲染模块 - 竖屏版
const UI = {
    // 更新积分榜
    updateLeaderboard() {
        const highScore = Storage.getHighScore();
        document.getElementById('high-score-value').textContent = highScore;
    },

    // 更新状态栏
    updateStatus(state) {
        document.getElementById('distance').textContent = Math.floor(state.distance);
        document.getElementById('score').textContent = state.score;
        document.getElementById('fuel').textContent = Math.floor(state.fuel);
        document.getElementById('tank-capacity').textContent = state.maxFuel;

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
        document.getElementById('env-city').textContent = env.region;
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
            } else {
                option.classList.add('locked');
            }

            // 图片预览框
            const previewBox = document.createElement('div');
            previewBox.className = 'car-preview-box';

            if (carData.asset) {
                const img = document.createElement('img');
                img.src = 'assets/' + carData.asset;
                img.alt = carName;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'contain';
                previewBox.appendChild(img);

                if (!unlocked) {
                    const lockOverlay = document.createElement('div');
                    lockOverlay.className = 'car-lock-overlay';
                    lockOverlay.innerHTML = '🔒';
                    previewBox.appendChild(lockOverlay);
                }
            }

            // 车辆信息
            const infoDiv = document.createElement('div');
            infoDiv.className = 'car-info';

            if (unlocked) {
                infoDiv.innerHTML = `
                    <div class="car-name">${carName}</div>
                    <div class="car-stats">油箱:${carData.tank}L | 油耗:1升跑${carData.consumption}公里</div>
                    <div class="car-desc">${carData.desc}</div>
                `;
                option.onclick = () => Game.selectCar(carName);
            } else {
                infoDiv.innerHTML = `
                    <div class="car-name">${carName}</div>
                    <div class="car-unlock">需要 ${carData.unlockScore} 积分解锁</div>
                `;
            }

            option.appendChild(previewBox);
            option.appendChild(infoDiv);
            carList.appendChild(option);
        });
    }
};