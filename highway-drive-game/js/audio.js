// 音效管理模块
const AudioManager = {
    // 音效文件
    sounds: {
        engine: null,
        laneChange: null,
        correct: null,
        wrong: null,
        refuel: null,
        collision: null,
        gameOver: null
    },

    // 音量设置 (0-1)
    volumes: {
        engine: 0.15,
        laneChange: 0.3,
        correct: 0.5,
        wrong: 0.4,
        refuel: 0.35,
        collision: 0.6,
        gameOver: 0.4
    },

    // 是否静音
    muted: false,

    // 初始化
    init() {
        const basePath = 'assets/audio/';

        // 创建音频对象
        this.sounds.engine = new Audio(basePath + 'engine.wav');
        this.sounds.engine.loop = true;
        this.sounds.engine.volume = this.volumes.engine;

        this.sounds.laneChange = new Audio(basePath + 'lane_change.wav');
        this.sounds.laneChange.volume = this.volumes.laneChange;

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

    // 播放引擎声（循环背景音）
    startEngine() {
        if (this.muted) return;
        this.sounds.engine.currentTime = 0;
        this.sounds.engine.play().catch(() => {});
    },

    // 停止引擎声
    stopEngine() {
        this.sounds.engine.pause();
        this.sounds.engine.currentTime = 0;
    },

    // 播放车道切换音效
    playLaneChange() {
        if (this.muted) return;
        this.sounds.laneChange.currentTime = 0;
        this.sounds.laneChange.play().catch(() => {});
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
        this.stopEngine();
        this.sounds.gameOver.currentTime = 0;
        this.sounds.gameOver.play().catch(() => {});
    },

    // 切换静音
    toggleMute() {
        this.muted = !this.muted;
        if (this.muted) {
            this.stopEngine();
        }
        return this.muted;
    },

    // 设置音量
    setVolume(soundName, volume) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].volume = Math.max(0, Math.min(1, volume));
        }
    }
};