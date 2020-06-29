require("./sidekick");

const tick = () => {
    require("./sidekick");
    setTimeout(()=>{
        process.exit(Math.floor(20*Math.random()))
    }, 500)
}

tick()