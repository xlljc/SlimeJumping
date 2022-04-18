
var arr = TestIntArray();
var i1 = arr.GetValue(1);
console.log(i1);

var jsArr = Array.toJsArray(arr);
arr.Length
for (const item of jsArr) {
    console.log(item);
}

var csArr = CsArray.toCsArray("System.Double", jsArr);
for (let i = 0; i < csArr.Length; i++) {
    const item = csArr.GetValue(i);
    console.log(item);
}

export function Process(delta: float) {
    
}

export function PhysicsProcess(delta: float) {

}