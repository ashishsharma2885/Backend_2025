// objects -> hancle binary data
// file system operations, cryptography , image processing


const buffOne = Buffer.alloc(10);
console.log(buffOne);


// how to create buffer in string
const bufferString = Buffer.from('Hello')
console.log(bufferString)


const bufferArrayInteger = Buffer.from([1, 2, 3, 4,, 5])
console.log(bufferArrayInteger)

buffOne.write("Node js")
console.log('After writinfg Node js to bufferOne buffOne', buffOne.toString())

console.log(bufferString[0])

console.log(bufferString.slice(0, 3))


const cancatBuffs = Buffer.concat([buffOne, bufferString])
console.log(cancatBuffs)

console.log(cancatBuffs.toJSON())