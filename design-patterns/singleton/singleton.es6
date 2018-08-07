const mySingleton = (() => {
    // Instance stores a reference to the Singleton
    let instance;

    const init = () => {
        //Singleton

        //Private methods and variables
        const privateMethod = () => console.log("I am private");
        const privateVariable = "I'm also private";
        const privateRandomNumber = Math.random();

        return {
            // Public methods and variables

            publicMethod: () => console.log("The public can see me!"),
            publicProperty: "I am also public",
            getRandomNumber: () => privateRandomNumber,
    }
    };

    return {
        //get Singleton instance if one exists, create a new one if not
        getInstance: () => {
            if (!instance) {
                instance = init();
            }
            return instance
        },
    getInstanceSnazzy: () => instance || init(),
    getInstanceDodgy: () => init(),
    }
})();
