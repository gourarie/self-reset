const { fork, spawn } = require("child_process");

const sidekickProgram = () => {
    const [image,script,cwd,...args] = process.argv;
    console.log(`${process.pid} sidekick`)
    
    process.on("message",(code)=>{
        if (code) {
            process.on('disconnect', () => {
                spawn(
                    image,
                    args, 
                    {
                            detached: true,
                            cwd
                    }).unref()
                process.exit()
                
            })
        }
    })
}

const heroProgram = () => {
    console.log(`${process.pid} here here`);
    const [image,...args] = process.argv
    sidekick = fork(__filename, [process.cwd()].concat(args), {
        detached: true,
        stdio:[
            "inherit",
            "inherit",
            "inherit",
            "ipc"]
    })
    
    process.on("exit", (exitcode)=>{
        sidekick.send(exitcode)
    })
}

if (require.main === module) sidekickProgram()
else heroProgram()
