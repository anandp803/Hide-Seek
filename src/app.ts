import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";
import { AvatarLoader } from "./AvatarLoader"; // Import the AvatarLoader class
import { App_GUI } from "./App_GUI";


class App {
    private avatarLoader: AvatarLoader;
    private App_Gui:App_GUI;    
    private adjustedAvatarPositionforCam;

    constructor() {
        this.initializeScene().then(() => {
            console.log("Scene initialized and avatar loaded");
        }).catch((error) => {
            console.error("Error initializing scene:", error);
        });
    }

    private async initializeScene() {
        // Create the canvas HTML element and attach it to the webpage
        const canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        // Prevent page scrolling when the canvas is scrolled
        canvas.addEventListener("wheel", (event) => {
            event.preventDefault(); // Prevent the default scroll behavior
        }, { passive: false }); // Use passive: false to allow preventDefault

        // Initialize Babylon scene and engine
        const engine = new Engine(canvas, true);
        const scene = new Scene(engine);
        scene.debugLayer.show({ embedMode: true });

        // Create AvatarLoader and load avatar
        this.avatarLoader = new AvatarLoader(scene);
        const avatarUrl = 'https://models.readyplayer.me/66859971f1541e2fe828e4c9.glb'; // Replace with your avatar URL
        await this.avatarLoader.loadAvatar(avatarUrl); // Wait for the avatar to load

        if (this.avatarLoader.avatar) {
            // Get the current position and adjust the y value
            this.adjustedAvatarPositionforCam = this.avatarLoader.avatar.position.clone(); // Clone the original position
            this.adjustedAvatarPositionforCam.y += 0.5; // Add 0.5 to the y axis
        }

        // Now that the avatar is loaded, create the camera
        const camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 5, this.adjustedAvatarPositionforCam, scene);
        camera.attachControl(canvas, true);
        camera.wheelPrecision = 100;

        // Add a hemispheric light
        const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

        // Create a ground
        MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

        // Add buttons for animation controls
        this.App_Gui=new App_GUI(this.avatarLoader);
        this.App_Gui.createAnimationButtons();

        // Hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === 'i') {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        // Run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
    }  
}

new App();
