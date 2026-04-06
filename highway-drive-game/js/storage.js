// 存储系统
const Storage = {
    KEY: 'highway_drive_data_v2',

    save(gameState) {
        const data = {
            distance: gameState.distance,
            totalDistance: gameState.totalDistance,
            score: gameState.score,
            totalScore: gameState.totalScore,
            currentCity: gameState.currentCity,
            time: gameState.time,
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

    reset() {
        localStorage.removeItem(this.KEY);
    }
};