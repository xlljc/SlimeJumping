import { Test } from "./index";

type EventMap = {
    aaa: string;
    bbb: void;
}

class a implements Runtime.IEvent<EventMap> {
    addListener<T extends keyof EventMap, V extends EventMap[T]>(event: T, cb: (v: V) => void): boolean {
        throw new Error("Method not implemented.");
    }
    dispatchEvent<T extends keyof EventMap, V extends EventMap[T]>(event: T, value: V): void {
        throw new Error("Method not implemented.");
    }
    removeListener<T extends keyof EventMap, V extends EventMap[T]>(event: T, cb: (v: V) => void): boolean {
        throw new Error("Method not implemented.");
    }
    clearListener<T extends keyof EventMap>(event: T): boolean {
        throw new Error("Method not implemented.");
    }
    clearAllListener(): boolean {
        throw new Error("Method not implemented.");
    }

}

export class TestColor {

    //@Test()
    public static Test1() {
        let color = new Runtime.Color(0.7, 0.1, 1);
        color = color.add(new Runtime.Color(0.5, 0.5, 0.5, 0.5));
        console.log(color, color.toHexadecimal());
        let color2 = new Runtime.Color(0.2, 0.3, 0.5);
        color2 = color2.lightened(0.5);
        console.log(color2, color2.toHexadecimal());
        let color3 = new Runtime.Color(0.2, 0.3, 0.5);
        color3 = color3.linearInterpolate(new Runtime.Color(0.5, 0.5, 0.2), 0.5);
        console.log(color3, color3.toHexadecimal());
    }

    //@Test()
    public static Test2() {
        // color : {r : 0, g : 0, b : 0.00392156862745098, a : 0.07058823529411765}
        let color = new Runtime.Color(0, 0, 0.00392156862745098, 0.07058823529411765);
        console.log(new Runtime.Color(color));
        let color1 = color.toDecimalism();
        let color2 = color.toHexadecimal();
        console.log(color1);
        console.log(color2);
        console.log(new Runtime.Color(color1));
        console.log(new Runtime.Color(color2));
        console.log(new Runtime.Color(274));
    }

    //@Test()
    public static TestSHV() {
        let color = Runtime.Color.blue;
        console.log(color.h);
        console.log(color.s);
        console.log(color.v);
        color.h = 0.2;
        console.log(color.h);
        console.log(color);
        //Runtime.Color.FromHsv();
    }

    @Test()
    public static Test3() {
        let color = Runtime.Color.white;
        let color2 = Runtime.Color.black;
        console.log(color2.linearInterpolate(color, 0.3));
        console.log(color2.linearInterpolate(color, new Runtime.Color(0.1, 0.2, 0.3)));
        console.log(color2.transition(color, 0.3));
        console.log(color.equals(Runtime.Color.white));
    }
}
