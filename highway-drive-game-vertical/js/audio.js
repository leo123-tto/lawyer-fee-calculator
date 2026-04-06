// 音效管理模块 - 简化版，只保留关键事件音效
const AudioManager = {
    // 音效文件
    sounds: {
        correct: null,
        wrong: null,
        refuel: null,
        collision: null,
        gameOver: null
    },

    // 音量设置 (0-1)
    volumes: {
        correct: 0.4,
        wrong: 0.3,
        refuel: 0.3,
        collision: 0.5,
        gameOver: 0.4
    },

    // 是否静音
    muted: false,

    // 初始化
    init() {
        const basePath = 'assets/audio/';

        this.sounds.correct = new Audio(basePath + 'correct.wav');
        this.sounds.correct.volume = this.volumes.correct;

        this.sounds.wrong = new Audio(basePath + 'wrong.wav');
        this.sounds.wrong.volume = this.volumes.wrong;

        this.sounds.refuel = new Audio(basePath + 'refuel.wav');
        this.sounds.refuel.volume = this.volumes.refuel;

        this.sounds.collision = new Audio(basePath + 'collision.wav');
        this.sounds.collision.volume = this.volumes.collision;

        this.sounds.gameOver = new Audio(basePath + 'game_over.wav');
        this.sounds.gameOver.volume = this.volumes.gameOver;
    },

    // 播放引擎声（已移除）
    startEngine() {
        // 不再播放引擎背景音
    },

    // 停止引擎声（已移除）
    stopEngine() {
        // 不需要停止
    },

    // 播放正确答案音效
    playCorrect() {
        if (this.muted) return;
        this.sounds.correct.currentTime = 0;
        this.sounds.correct.play().catch(() => {});
    },

    // 播放错误答案音效
    playWrong() {
        if (this.muted) return;
        this.sounds.wrong.currentTime = 0;
        this.sounds.wrong.play().catch(() => {});
    },

    // 播放加油音效
    playRefuel() {
        if (this.muted) return;
        this.sounds.refuel.currentTime = 0;
        this.sounds.refuel.play().catch(() => {});
    },

    // 播放碰撞音效
    playCollision() {
        if (this.muted) return;
        this.sounds.collision.currentTime = 0;
        this.sounds.collision.play().catch(() => {});
    },

    // 播放游戏结束音效
    playGameOver() {
        if (this.muted) return;
        this.sounds.gameOver.currentTime = 0;
        this.sounds.gameOver.play().catch(() => {});
    },

    // 切换静音
    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    },

    // 设置音量
    setVolume(soundName, volume) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].volume = Math.max(0, Math.min(1, volume));
        }
    }
};