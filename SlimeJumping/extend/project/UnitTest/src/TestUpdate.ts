
export class TestUpdate {

    @Runtime.Update()
    public static Test1(delta: number) {
        if (Runtime.Input.isKeyPressed(Runtime.KeyList.A)) {
            console.log("按下了A");
        }
    }

    @Runtime.PhysicsUpdate()
    public static Test2(delta: number) {
        
    }
}
