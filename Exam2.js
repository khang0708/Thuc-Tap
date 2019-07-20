function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function starttask(item) {
  await delay(2000);
  console.log('Task ' + item + ' Done in ' + item*2 +'s');

}
var startedAt=0;
async function donetask(item){
  await delay(2000);
  console.log('Task ' + item + ' Done');
}
async function startarray(array) {
   startedAt = Date.now();
  for (const item of array) {
    await starttask(item);
  }

}
async function donearray(array) {
  for (const item of array) {
    await donetask(item);
  }
 let totaltime =Date.now() - startedAt;
  console.log('Done after '+ totaltime + ' ms')
}
async function main(){

  startarray([1, 2, 3,4,5,6,7,8,9,10])
  await delay(6000)
  donearray([1,2,3,4,5,6,7,8,9,10])
}

main();
