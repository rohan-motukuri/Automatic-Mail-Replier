const { runApplication } = require('./src');

let batchNumber = 0;

async function process_runApplication () {
    const currentBatch = batchNumber;
    console.log("Started Batch: " + currentBatch);

    const startTime = Date.now();

    await runApplication();

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    console.log(`Ended Batch: ${currentBatch}. Elapsed Time: ${elapsedTime / 1000} s`);

    batchNumber++;
}

async function repeatSequence() {
    await process_runApplication();
    let idleTime = Date.now();

    setInterval(async ()=>{
        const idlePeriod = Date.now() - idleTime;
        idleTime = Date.now();

        console.log(`Idle Period: ${idlePeriod / 1000} s`);

        await process_runApplication();        
        
    }, Math.floor(Math.random() * (120000 - 45000 + 1)) + 45000);
}

// Initial execution
repeatSequence();


