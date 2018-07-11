import Phaser from 'phaser';
import signalR from '@aspnet/signalr';

const setHeight = 720;
const setWidth = 1280;

const Scenes = [];

// 定義Home場景
const Home = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize() {
        Phaser.Scene.call(this, { key: 'Home' });
    },
    preload() {
        this.load.image('logo', './assets/images/logo.png');
    },
    create() {
        this.add.image(640, 360, 'logo');

        const GameHubConnection = new signalR.HubConnectionBuilder()
            .withUrl('http://10.10.0.20/GameServer/signalr')
            .build();

        GameHubConnection.start().catch(err => console.error(err.toString()));

        const GameHubProxy = GameHubConnection.createHubProxy('gameHub');

        GameHubProxy.on('receiveData', (msg) => {
            const cmd = msg.substring(0, msg.indexOf('@'));
            const data = msg.substring(msg.indexOf('@') + 1);

            switch (cmd) {
                case 'ln':
                    this.scene.start('Play');
                    break;
                case 'ssdis': {
                    GameHubConnection.stop();
                    console.warn(`登入失敗：${data}`);

                    break;
                }
                case 'weberror':
                    console.warn(`傳送命令失敗：${data}`);

                    break;
                default:
            }
        });
    },
});

// 定義Play場景
const Play = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize() {
        Phaser.Scene.call(this, { key: 'Play' });
    },
    preload() {},
    create() {
        // prettier-ignore
        this.make.text({
            x: 200,
            y: 140,
            text: '連線成功！',
            style: {
                align: 'center',
                color: '#ffffff',
                fontSize: '48px',
                metrics: {
                    ascent: 45,
                    descent: 0,
                    fontSize: 55,
                },
            },
        }).setOrigin(0.5, 0.5);
    },
});

Scenes.push(Home);
Scenes.push(Play);

const Config = {
    type: Phaser.AUTO,
    height: setHeight,
    width: setWidth,
    scene: Scenes,
    title: 'Holdem',
    disableContextMenu: true, // 防止滑鼠右鍵操作
};

/* eslint-disable */
const game = new Phaser.Game(Config);
/* eslint-enable */

function resizeScreen() {
    const canvas = document.querySelector('canvas');
    // const width = window.innerWidth;
    const width = document.documentElement.clientWidth;
    // const height = window.innerHeight;
    const height = document.documentElement.clientHeight;
    const screenRatio = width / height;
    const canvasRatio = canvas.width / canvas.height;

    if (width < 1280) {
        if (screenRatio < canvasRatio) {
            canvas.style.width = `${width}px`;
            canvas.style.height = `${width / canvasRatio}px`;
        } else {
            canvas.style.width = `${height * canvasRatio}px`;
            canvas.style.height = `${height}px`;
        }
    }
}

window.onload = () => {
    resizeScreen();

    // window.addEventListener('resize', resizeScreen);
};
