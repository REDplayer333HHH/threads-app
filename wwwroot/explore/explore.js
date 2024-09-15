let threads;
let allThreadsData;

window.addEventListener('load', async function() {
    
    threads = document.getElementById("threads-box");
    allThreadsData = await getAllThreads();
    for(let i = 0; i < allThreadsData.length; i++){
        displayThread(allThreadsData[i].title);
    }
});

async function getAllThreads() {
    try{
        const res = await fetch(baseurl + 'thread', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(!res.ok){
            throw new Error('Res not ok!');
        }

        const data = await res.json();
        return data;
    }
    catch(err){
        console.log(err);
    }
}

function displayThread(threadName){
    let thread = document.createElement('button');
    thread.className = 'listed-thread';

    let threadTitle = document.createElement('h2');
    threadTitle.className = 'thread-title';
    thread.appendChild(threadTitle);
    threadTitle.innerHTML = threadName;

    threads.appendChild(thread);
}
