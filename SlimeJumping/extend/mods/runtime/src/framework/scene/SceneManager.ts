
class SceneManager {

    private constructor() { }
    private static _activeScene: Scene;

    public static get sceneCount(): number {
        return 1;
    }

    public static getSceneByIndex(index: number): Scene {
        return null;
    }

    public static getSceneByName(sceneName: string): Scene {
        return null;
    }

    public static get activeScene(): Scene {
        return this._activeScene;
    }

    public static setActiveScene(sceneName: string): void;
    public static setActiveScene(sceneIndex: number): void;
    public static setActiveScene(scene: Scene): void;
    public static setActiveScene(value: Scene | number | string): void {
        switch (typeof value) {
            case "object":
                this._activeScene =  value;
                break;
            case "string":

                break;
            case "number":

                break;
        }
    }
}