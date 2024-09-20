let threadData;

window.addEventListener('load', async () => {
    threadData = await getThreadData();
    setTitle(threadData);
    setAuthor(threadData);
    setMessage(threadData);
});

async function getThreadData() {
    let threadId = new URLSearchParams(window.location.search).get('threadId');
    return await fetchThreadData(threadId);
}

// post comment
async function submitComment(e) {
    if(e.key == 'Enter'){
        let textareaElement = document.getElementById('comment-textarea');
        await postComment(threadData.id, textareaElement.value);
        textareaElement.value = '';
    }
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

async function postComment(threadId, commentContent) {
    try{
        const res = await fetch(baseurl + 'thread/comment/' + threadId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: commentContent
            })
        });
        // let data = await res.json();
        // console.log(data);
    }
    catch(err){
        throw new Error(err);
    }
}

function setTitle(data){
    let titleElement = document.getElementById('thread-title');
    titleElement.innerHTML = data.title;
}

function setAuthor(data){
    let authorElement = document.getElementById('read-author');
    authorElement.innerHTML = 'By: ' + data.author;
}

function setMessage(data){
    let messageElement = document.getElementById('read-message');
    messageElement.innerHTML = data.message;
}
