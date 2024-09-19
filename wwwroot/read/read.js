window.addEventListener('load', async () => {
    let data = await getThreadData();
    setTitle(data);
    setAuthor(data);
});

async function getThreadData() {
    let threadId = new URLSearchParams(window.location.search).get('threadId');
    return await fetchThreadData(threadId);
}

function setTitle(data){
    let titleElement = document.getElementById('thread-title');
    titleElement.innerHTML = data.title;
}

function setAuthor(data){

}

async function fetchThreadData(threadId){
    try{
        const res = await fetch(baseurl + 'thread/' + threadId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(!res.ok){
            throw new Error('Res is not ok!');
        }

        const data = await res.json();
        return data;
    }
    catch(err){
        throw new Error(err);
    }
}
