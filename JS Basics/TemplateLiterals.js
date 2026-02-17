    let Name="Anilkumar"
    let age=20;
    console.log("My name is "+Name +" I am " +age+" years old"); 
//it is Hard to read! Lots of + signs, 
// so instead of this Use template literals (modern way) by follow below rules
//1. Use backticks ` (not single quotes ')
//2. Put variables inside ${}
//3. Everything becomes a string
    
    let Name1="Ajay"
    let age1=25
    console.log(`My name is ${Name1} and I am ${age1} years old`);
//One more Example
    const testName = "Login Test";
    const Status = "Passed";
    const duration = 2.5;

    console.log(`Test: ${testName}`);
    console.log(`Status: ${Status}`);
    console.log(`Duration: ${duration} seconds`);
    console.log(`${testName} - ${Status} (${duration}s)`);

