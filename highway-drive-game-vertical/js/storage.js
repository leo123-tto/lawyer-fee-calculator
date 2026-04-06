// 存储系统
const Storage = {
    KEY: 'highway_drive_data_v2',
    HIGH_SCORE_KEY: 'highway_drive_high_score',

    save(gameState) {
        const data = {
            distance: gameState.distance,
            totalDistance: gameState.totalDistance,
            score: gameState.score,
            totalScore: gameState.totalScore,
            currentCity: gameState.currentCity,
            currentHighway: gameState.currentHighway,
            timeOfDay: gameState.timeOfDay,
            weather: gameState.weather,
            currentCar: gameState.currentCar,
            fuel: gameState.fuel,
            correctAnswers: gameState.correctAnswers,
            totalQuestions: gameState.totalQuestions,
        };
        localStorage.setItem(this.KEY, JSON.stringify(data));
    },

    load() {
        const saved = localStorage.getItem(this.KEY);
        if (saved) {
            return JSON.parse(saved);
        }
        return null;
    },

    // 保存最高单次积分
    saveHighScore(score) {
        const currentHigh = this.getHighScore();
        if (score > currentHigh) {
            localStorage.setItem(this.HIGH_SCORE_KEY, score.toString());
            return true;  // 破纪录了
        }
        return false;
    },

    // 获取最高单次积分
    getHighScore() {
        const saved = localStorage.getItem(this.HIGH_SCORE_KEY);
        return saved ? parseInt(saved, 10) : 0;
    },

    reset() {
        localStorage.removeItem(this.KEY);
    }
};