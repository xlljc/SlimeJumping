
export class TestUpdate {

    @Update()
    public static Test1(delta: number) {
        if (Input.isKeyPressed(KeyList.A)) {
            console.log("按下了A");
        }
        //Math.moveToward();
    }

    @PhysicsUpdate()
    public static Test2(delta: number) {
        Vector2.one;
    }
}