
class Input {
    private constructor() { }

    private static key: Map<KeyList, number> = new Map<KeyList, number>();

    private static update(delta: number) {

    }

    public static isKeyPressed(key: KeyList): boolean {
        return Godot.Input.IsKeyPressed(key);
    }

    public static isKeyDown(key: KeyList): boolean {
        //Godot.Input.mouse
        return false;
        //Godot.Input.key
    }

    public static isKeyUp(key: KeyList): boolean {
        return false;
        //Godot.Input.key
    }
}