
const run = async (numConcurrentTasks, getTask) => {
 
    let listConcurrentasks=[];
    for(let i=0;i<numConcurrentTasks;i++){
      let a = getTask();
      listConcurrentasks.push(a());
   }
   await Promise.all(listConcurrentasks.map(item =>{
     return item.then(async () =>{
       for(let i = 0 ;i<numConcurrentTasks;i++)
       {
         let a = getTask();
         if(a !== undefined)
         {
         await a();
         numConcurrentTasks = numConcurrentTasks -1;
         if(numConcurrentTasks <3){
             numConcurrentTasks = numConcurrentTasks +1;
           }
         }
         else{
           break;
         }          
       }
     });
   }))  
}

/**
* This function is used to stimulate task processing time
*/
const waitFor = ms => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
};

/**
* Main
*/
const main = async () => {
  const startedAt = Date.now();

  // Define 10 tasks, task i_th would take i*2 seconds to finish
  const tasks = [];
  for (let i = 1; i <= 10; i++) {
    const task = async () => {
      console.log(`Task ${i} started, done in ${i*2}s`);
      await waitFor(i * 2000);
      console.log(`Task ${i} DONE!`);
    };
    tasks.push(task);
  }

  console.log('Processing 3 tasks concurrently');
  // Run 3 tasks concurrently
  await run(3, () => {
    // Shift one task from the list, this task should be queued up for processing
    const task = tasks.shift();

    if (!task) return;

    // return the task for queueing

    return task;
    
  });
  
   console.log(`DONE after ${Date.now() - startedAt}ms`)
};

main().catch(e => console.log(e.stack));


