"use strict";
console.clear();
TweenMax.lagSmoothing(0);
let colors = {
    background: '#032C3F'
};
let getRandomFromArray = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};
class Stage {
    constructor() {
        // container
        this.onResize = function () {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        };
        this.render = function () {
            this.renderer.render(this.scene, this.camera);
        };
        this.add = function (elem) {
            this.scene.add(elem);
        };
        this.remove = function (elem) {
            this.scene.remove(elem);
        };
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
        // renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(colors.background, 1);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);
        // scene
        this.scene = new THREE.Scene();
        // camera
        let aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(30, aspect, 1, 1500);
        this.camera.position.z = 100;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        //light
        this.light = new THREE.DirectionalLight(0xffffff, 0.8);
        //this.light.castShadow = true;
        this.light.position.set(8, 10, 10);
        this.scene.add(this.light);
        this.softLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(this.softLight);
        // group
        this.group = new THREE.Group();
        this.scene.add(this.group);
        window.addEventListener('resize', () => { this.onResize(); }, false);
    }
}
class Sprinkle {
    constructor() {
        this.colors = ['#E54B4B', '#712F79', '#FF9770'];
        this.group = new THREE.Group();
        let scale = 0.8;
        this.group.scale.set(scale, scale, scale);
        var geometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 5);
        var material = new THREE.MeshToonMaterial({
            color: getRandomFromArray(this.colors)
        });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -0.1;
        mesh.position.x = -0.1;
        mesh.position.z = -1;
        // mesh.castShadow = true;
        // mesh.receiveShadow = true;
        this.group.add(mesh);
    }
}
class Gumball {
    constructor() {
        this.colors = ['#DDDDDD', '#FF70A6', '#519872'];
        this.group = new THREE.Group();
        let scale = 1;
        this.group.scale.set(scale, scale, scale);
        var geometry = new THREE.TetrahedronGeometry(0.5, 1);
        var material = new THREE.MeshToonMaterial({
            color: getRandomFromArray(this.colors)
        });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = Math.random() - 1;
        mesh.position.x = Math.random() - 1;
        mesh.position.z = Math.random() - 1;
        // this.mesh.castShadow = true;
        // this.mesh.receiveShadow = true;
        this.group.add(mesh);
    }
}
class ChocolateButton {
    constructor() {
        this.colors = ['#E9EB87', '#FF686B', '#C98BB9'];
        this.group = new THREE.Group();
        let scale = 0.5;
        this.group.scale.set(scale, scale, scale);
        var geometry = new THREE.CylinderGeometry(2, 1.5, 0.5, 10);
        var material = new THREE.MeshToonMaterial({
            color: '#594935'
        });
        var chocolate = new THREE.Mesh(geometry, material);
        this.group.add(chocolate);
    }
}
class Marshmallow {
    constructor() {
        this.group = new THREE.Group();
        let scale = 0.5;
        this.group.scale.set(scale, scale, scale);
        var geometry = new THREE.CylinderGeometry(1.5, 1.5, 3, 15);
        var material = new THREE.MeshToonMaterial({
            color: '#dddddd'
        });
        let mallow = new THREE.Mesh(geometry, material);
        this.group.add(mallow);
    }
}
class Lollipop {
    constructor() {
        this.colors = ['#E9EB87', '#FF686B', '#C98BB9'];
        this.group = new THREE.Group();
        let scale = 0.5;
        this.group.scale.set(scale, scale, scale);
        var geometry = new THREE.CylinderGeometry(0.3, 0.3, 4, 5);
        var material = new THREE.MeshToonMaterial({
            color: '#CCCCCC'
        });
        var stick = new THREE.Mesh(geometry, material);
        stick.position.y = -2.5;
        // this.stick.castShadow = true;
        // this.stick.receiveShadow = true;
        var geometry = new THREE.CylinderGeometry(2, 2, 0.7, 20);
        var material = new THREE.MeshToonMaterial({
            color: getRandomFromArray(this.colors)
        });
        var lolly = new THREE.Mesh(geometry, material);
        lolly.rotation.z = 1.5708;
        // this.lolly.castShadow = true;
        // this.lolly.receiveShadow = true;
        this.group.add(stick);
        this.group.add(lolly);
    }
}
class App {
    constructor() {
        this.candies = [
            ChocolateButton,
            Marshmallow,
            Sprinkle, Sprinkle, Sprinkle, Sprinkle, Sprinkle, Sprinkle,
            Gumball, Gumball, Gumball, Gumball, Gumball, Gumball,
            Lollipop
        ];
        this.count = 0;
        this.addCandy = function () {
            this.count++;
            var candy = new this.candies[Math.floor(Math.random() * this.candies.length)]();
            candy.group.position.z = (Math.random() * 80) - 40;
            this.stage.add(candy.group);
            this.animate(candy);
            if (this.count < 800)
                setTimeout(() => { this.addCandy(); }, 10 + (Math.random() * 10));
        };
        this.getTextPosition = function () {
            //get a position based on img pixels
            let position;
            let gotIt = false;
            let Z_SPREAD = 0;
            let IMAGE_SCALE = window.innerWidth / 9000;
            console.log(IMAGE_SCALE);
            if (IMAGE_SCALE > 0.1)
                IMAGE_SCALE = 0.1;
            while (gotIt == false) {
                //randomly select a pixel in image data
                var imgx = Math.round(this.textImage.width * Math.random());
                var imgy = Math.round(this.textImage.height * Math.random());
                var col = getPixel(this.textImage, imgx, imgy);
                //read color from image
                if (col.r > 0) {
                    //if not black - set it
                    position = new THREE.Vector3((imgx - this.textImage.width / 2) * IMAGE_SCALE, (imgy - this.textImage.height / 2) * IMAGE_SCALE, Math.random() * Z_SPREAD * 2 - Z_SPREAD);
                    gotIt = true;
                }
                else {
                    //if black - loop
                    gotIt = false;
                }
            }
            return position;
        };
        this.getRandomRotation = function () {
            return Math.random() * 20;
        };
        this.getRandomY = function () {
            var range = window.innerHeight / 20;
            return Math.random() * range - (range / 2);
        };
        this.animate = function (candy) {
            let speed = 1 + (Math.random() * 2);
            let vec3 = this.getTextPosition();
            TweenMax.fromTo(candy.group.position, speed, { y: 40, x: Math.random() * vec3.x, z: -50 }, { y: vec3.y - (vec3.y * 2), x: vec3.x, z: vec3.z, ease: Power4.easeOut });
            TweenMax.fromTo(candy.group.rotation, speed, { x: this.getRandomRotation(), y: this.getRandomRotation(), z: this.getRandomRotation() }, { x: this.getRandomRotation(), y: this.getRandomRotation(), z: this.getRandomRotation(), ease: Power4.easeOut });
        };
        this.tick = function () {
            this.stage.render();
            requestAnimationFrame(() => { this.tick(); });
        };
        this.stage = new Stage();
        var loader = new THREE.ImageLoader();
        loader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/557388/sugar.png', image => {
            this.textImage = getImageData(image);
            this.tick();
            this.addCandy();
        });
    }
}
let app = new App();
function getImageData(image) {
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, image.width, image.height);
}
function getPixel(imgData, x, y) {
    var r, g, b, a, offset = x * 4 + y * 4 * imgData.width;
    r = imgData.data[offset];
    g = imgData.data[offset + 1];
    b = imgData.data[offset + 2];
    a = imgData.data[offset + 3];
    //console( "rgba(" + r + "," + g + "," + b + "," + a + ")");
    var col = new THREE.Color(0xffffff);
    col.setRGB(r / 256, g / 256, b / 256);
    return col;
}