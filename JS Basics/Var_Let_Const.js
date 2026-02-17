// var - Function Scoped
        // var a = 10; // Global Scope
        // console.log(a);
        
        // // // Defination of the function
        // function printHello(){
        //         console.log("Hello TheTestingAcademy!");
        //         var a = 20; // Local Scope
        //         console.log(a);
        //         if(true){
        //             var a = 30;
        //             console.log(a); // 30
        //         }
        //         console.log("F ->",a);
        // }
        //     // // Calling of the function
        //     printHello();
 
 
// // var also allows re-declaration:
// var a = 10;
// var a = 20; // No error, re-declaration is allowed
// console.log(a); // 20
 
 
 
// let - Block Scoped
        let b =20; // Global Scope
        console.log(b);
        
        // Defination of the function
        function printHello(){
                console.log("Hello TheTestingAcademy!");
                let b = 30; // Local Scope
                console.log(b);
                if(true){
                    let b = 5;
                    console.log(b); // 5
                }
                console.log("let ->",b);   
        }
        // Calling of the function
        printHello();

  

