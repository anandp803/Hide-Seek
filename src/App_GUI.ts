import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import { AvatarLoader } from "./AvatarLoader";


export class App_GUI {    

    private avatarLoader: AvatarLoader;
    constructor(_avatarLoader:AvatarLoader){       
        this.avatarLoader=_avatarLoader
    }

    public createAnimationButtons(): void {
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    
        const animations = ['Idle', 'Wave', 'Jump']; // Replace with actual animation names
        animations.forEach((animation, index) => {
            const button = GUI.Button.CreateSimpleButton(`button_${animation}`, animation);
            button.width = "150px";
            button.height = "40px";
            button.color = "white";
            button.background = "green";
            button.top = `${-100 + index * 50}px`; // Position buttons vertically
            button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            button.left = "10px"; // Adjust this to move the button further left or right
            button.top = `${-60 - index * 50}px`; // Stack buttons vertically, add margin
    
            button.onPointerClickObservable.add(() => {
                this.avatarLoader.stopAllAnimations();
                this.avatarLoader.playAnimation(animation);
            });
    
            advancedTexture.addControl(button);
        });
    
        const stopButton = GUI.Button.CreateSimpleButton("stopButton", "Stop All");
        stopButton.width = "150px";
        stopButton.height = "40px";
        stopButton.color = "white";
        stopButton.background = "red";
        stopButton.top = "50px"; // Position below the other buttons
        stopButton.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        stopButton.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        stopButton.left = "10px";
        stopButton.top = `${-60 - animations.length * 50}px`; // Position below the other buttons
    
        stopButton.onPointerClickObservable.add(() => {
            this.avatarLoader.stopAllAnimations();
        });
    
        advancedTexture.addControl(stopButton);
    }
}
