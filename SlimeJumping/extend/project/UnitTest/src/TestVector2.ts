import { Test, TestUstTime } from "./index";


export class TestVector2 {

    //@Test()
    public Test1() {
        let v1 = new Vector2(1, 10);
        let v2 = new Vector2(2, 20);
        let v3 = v1.add(v2);
        console.log(v3);
    }

    //@Test()
    public Test2() {
        let v1 = Vector2.one;
        let v2 = Vector2.zero;
        v2 = v2.add(1);
        console.log(v1, v2);
        console.log(v1 === v2);
        console.log(v1 == v2);
        console.log(v1.equals(v2));
    }

}
