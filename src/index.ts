import "./style/index.less"
function test<T>(a:T):T{
    return a;
}
console.log( test(123) )

const obj = {name: "孙悟空" ,age: 19}
console.log( obj )
obj.age = 18;
console.log( obj )
console.log( Promise )
const tests = (a:number,b:number) => a+b;
console.log(tests(1,2))