// 车辆绘制模块 - 卡通像素风格
const CarRenderer = {
    pixelSize: 4,

    // 获取车辆颜色
    getCarColors(carName) {
        const colorMap = {
            '灰色五菱之光': {
                body: '#9E9E9E',
                bodyLight: '#BDBDBD',
                bodyDark: '#757575',
                window: '#81D4FA',
                wheel: '#424242',
                light: '#FFEB3B',
                stripe: null
            },
            '蓝色奔驰GLC': {
                body: '#42A5F5',
                bodyLight: '#64B5F6',
                bodyDark: '#1E88E5',
                window: '#B3E5FC',
                wheel: '#37474F',
                light: '#FFEB3B',
                stripe: '#CDDC39'
            },
            '黑色蔚来ET5T': {
                body: '#263238',
                bodyLight: '#37474F',
                bodyDark: '#1B2328',
                window: '#4FC3F7',
                wheel: '#212121',
                light: '#F44336',
                stripe: null,
                roofBox: '#1B2328'
            },
            '小象灰理想L6': {
                body: '#78909C',
                bodyLight: '#90A4AE',
                bodyDark: '#546E7A',
                window: '#B3E5FC',
                wheel: '#37474F',
                light: '#FFEB3B',
                stripe: '#4CAF50'
            },
            '白色特斯拉Model X': {
                body: '#FAFAFA',
                bodyLight: '#FFFFFF',
                bodyDark: '#E0E0E0',
                window: '#4FC3F7',
                wheel: '#37474F',
                light: '#F44336',
                stripe: null
            }
        };
        return colorMap[carName] || colorMap['灰色五菱之光'];
    },

    // 绘制车辆 - 带轮胎动画
    drawCar(ctx, x, y, width, height, carName, wheelRotation) {
        const colors = this.getCarColors(carName);
        const w = width;
        const h = height;

        // 根据车型绘制不同外形
        if (carName.includes('五菱')) {
            this.drawVan(ctx, x, y, w, h, colors, wheelRotation);
        } else if (carName.includes('蔚来')) {
            this.drawWagon(ctx, x, y, w, h, colors, wheelRotation);
        } else if (carName.includes('奔驰') || carName.includes('理想') || carName.includes('特斯拉')) {
            this.drawSUV(ctx, x, y, w, h, colors, wheelRotation);
        } else {
            this.drawSedan(ctx, x, y, w, h, colors, wheelRotation);
        }
    },

    // 面包车造型（五菱）
    drawVan(ctx, x, y, w, h, colors, wheelRotation) {
        // 阴影
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        this.roundRect(ctx, x + 5, y + h - 8, w - 10, 8, 4);
        ctx.fill();

        // 车身主体 - 高顶方正规
        ctx.fillStyle = colors.body;
        this.roundRect(ctx, x + 5, y + h * 0.25, w - 10, h * 0.65, 8);
        ctx.fill();

        // 车顶
        this.roundRect(ctx, x + w * 0.15, y + h * 0.1, w * 0.7, h * 0.2, 6);
        ctx.fill();

        // 高光
        ctx.fillStyle = colors.bodyLight;
        this.roundRect(ctx, x + 8, y + h * 0.25, w * 0.3, h * 0.2, 4);
        ctx.fill();

        // 暗部
        ctx.fillStyle = colors.bodyDark;
        ctx.fillRect(x + w - 20, y + h * 0.25, 12, h * 0.55);

        // 大车窗
        ctx.fillStyle = colors.window;
        this.roundRect(ctx, x + w * 0.18, y + h * 0.28, w * 0.22, h * 0.25, 3);
        ctx.fill();
        this.roundRect(ctx, x + w * 0.42, y + h * 0.28, w * 0.35, h * 0.25, 3);
        ctx.fill();

        // 后尾灯破损感
        ctx.fillStyle = '#B71C1C';
        ctx.fillRect(x + w - 18, y + h * 0.6, 8, 10);
        // 胶布
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fillRect(x + w - 20, y + h * 0.55, 12, 4);

        // 车头灯
        ctx.fillStyle = colors.light;
        this.roundRect(ctx, x + 5, y + h * 0.55, 10, 12, 3);
        ctx.fill();

        // 轮胎
        this.drawWheel(ctx, x + w * 0.18, y + h - 5, 14, wheelRotation);
        this.drawWheel(ctx, x + w * 0.72, y + h - 5, 14, wheelRotation);

        // 磨损痕迹
        ctx.fillStyle = 'rgba(100,100,100,0.3)';
        ctx.fillRect(x + w * 0.25, y + h * 0.5, w * 0.15, 2);
        ctx.fillRect(x + w * 0.5, y + h * 0.45, w * 0.2, 2);
    },

    // 旅行车造型（蔚来ET5T）
    drawWagon(ctx, x, y, w, h, colors, wheelRotation) {
        // 阴影
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        this.roundRect(ctx, x + 5, y + h - 8, w - 10, 8, 4);
        ctx.fill();

        // 车顶箱
        ctx.fillStyle = colors.roofBox || colors.bodyDark;
        this.roundRect(ctx, x + w * 0.2, y + 2, w * 0.5, h * 0.18, 4);
        ctx.fill();

        // 车身主体 - 流畅线条
        ctx.fillStyle = colors.body;
        this.roundRect(ctx, x + w * 0.08, y + h * 0.3, w * 0.84, h * 0.55, 10);
        ctx.fill();

        // 车顶线条
        ctx.beginPath();
        ctx.moveTo(x + w * 0.15, y + h * 0.22);
        ctx.lineTo(x + w * 0.75, y + h * 0.22);
        ctx.lineTo(x + w * 0.85, y + h * 0.35);
        ctx.lineTo(x + w * 0.1, y + h * 0.35);
        ctx.closePath();
        ctx.fill();

        // 高光
        ctx.fillStyle = colors.bodyLight;
        this.roundRect(ctx, x + 12, y + h * 0.32, w * 0.25, h * 0.15, 4);
        ctx.fill();

        // 暗部
        ctx.fillStyle = colors.bodyDark;
        ctx.fillRect(x + w - 25, y + h * 0.3, 15, h * 0.5);

        // 车窗
        ctx.fillStyle = colors.window;
        this.roundRect(ctx, x + w * 0.12, y + h * 0.22, w * 0.18, h * 0.22, 4);
        ctx.fill();
        this.roundRect(ctx, x + w * 0.32, y + h * 0.22, w * 0.35, h * 0.22, 4);
        ctx.fill();

        // 车灯
        ctx.fillStyle = colors.light;
        this.roundRect(ctx, x + 6, y + h * 0.5, 8, 10, 2);
        ctx.fill();

        // 轮胎
        this.drawWheel(ctx, x + w * 0.18, y + h - 5, 15, wheelRotation);
        this.drawWheel(ctx, x + w * 0.72, y + h - 5, 15, wheelRotation);

        // 银色卡钳
        ctx.fillStyle = '#C0C0C0';
        ctx.fillRect(x + w * 0.18 - 3, y + h - 8, 6, 4);
        ctx.fillRect(x + w * 0.72 - 3, y + h - 8, 6, 4);
    },

    // SUV造型
    drawSUV(ctx, x, y, w, h, colors, wheelRotation) {
        // 阴影
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        this.roundRect(ctx, x + 5, y + h - 8, w - 10, 8, 4);
        ctx.fill();

        // 车身主体 - 高大SUV
        ctx.fillStyle = colors.body;
        this.roundRect(ctx, x + w * 0.06, y + h * 0.25, w * 0.88, h * 0.6, 10);
        ctx.fill();

        // 车顶
        this.roundRect(ctx, x + w * 0.12, y + h * 0.1, w * 0.65, h * 0.2, 6);
        ctx.fill();

        // 高光
        ctx.fillStyle = colors.bodyLight;
        this.roundRect(ctx, x + 10, y + h * 0.27, w * 0.28, h * 0.15, 4);
        ctx.fill();

        // 暗部
        ctx.fillStyle = colors.bodyDark;
        ctx.fillRect(x + w - 22, y + h * 0.25, 14, h * 0.55);

        // 车窗
        ctx.fillStyle = colors.window;
        this.roundRect(ctx, x + w * 0.14, y + h * 0.12, w * 0.18, h * 0.22, 4);
        ctx.fill();
        this.roundRect(ctx, x + w * 0.35, y + h * 0.12, w * 0.28, h * 0.22, 4);
        ctx.fill();

        // 车灯
        ctx.fillStyle = colors.light;
        this.roundRect(ctx, x + 6, y + h * 0.5, 10, 12, 3);
        ctx.fill();

        // 装饰条
        if (colors.stripe) {
            ctx.fillStyle = colors.stripe;
            ctx.fillRect(x + w * 0.1, y + h * 0.4, w * 0.8, 3);
        }

        // 轮胎
        this.drawWheel(ctx, x + w * 0.18, y + h - 5, 15, wheelRotation);
        this.drawWheel(ctx, x + w * 0.72, y + h - 5, 15, wheelRotation);
    },

    // 轿车造型
    drawSedan(ctx, x, y, w, h, colors, wheelRotation) {
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        this.roundRect(ctx, x + 5, y + h - 8, w - 10, 8, 4);
        ctx.fill();

        ctx.fillStyle = colors.body;
        this.roundRect(ctx, x + w * 0.08, y + h * 0.35, w * 0.84, h * 0.5, 8);
        ctx.fill();

        this.roundRect(ctx, x + w * 0.18, y + h * 0.15, w * 0.45, h * 0.25, 6);
        ctx.fill();

        ctx.fillStyle = colors.window;
        this.roundRect(ctx, x + w * 0.2, y + h * 0.18, w * 0.15, h * 0.2, 3);
        ctx.fill();
        this.roundRect(ctx, x + w * 0.38, y + h * 0.18, w * 0.2, h * 0.2, 3);
        ctx.fill();

        this.drawWheel(ctx, x + w * 0.18, y + h - 5, 14, wheelRotation);
        this.drawWheel(ctx, x + w * 0.72, y + h - 5, 14, wheelRotation);
    },

    // 绘制轮胎 - 带滚动动画
    drawWheel(ctx, x, y, radius, rotation) {
        // 轮胎外圈
        ctx.fillStyle = '#2C2C2C';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        // 轮毂
        ctx.fillStyle = '#757575';
        ctx.beginPath();
        ctx.arc(x, y, radius * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // 轮辐动画
        ctx.strokeStyle = '#9E9E9E';
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
            const angle = (rotation * 0.1) + (i * Math.PI * 2 / 5);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(
                x + Math.cos(angle) * radius * 0.55,
                y + Math.sin(angle) * radius * 0.55
            );
            ctx.stroke();
        }

        // 中心
        ctx.fillStyle = '#424242';
        ctx.beginPath();
        ctx.arc(x, y, radius * 0.2, 0, Math.PI * 2);
        ctx.fill();
    },

    // 圆角矩形
    roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }
};