let threadData: Thread;

window.addEventListener('load', async () => {
    threadData = await getThreadData();
    setTitle(threadData);
    setAuthor(threadData);
    setMessage(threadData);
    await setComments(threadData);
});

async function getThreadData(): Thread {
    let threadId = new URLSearchParams(window.location.search).get('threadId');
    let data: Thread = await fetchThreadData(threadId);
    return data;
}

async function setComments(data) {
    commentData = await fetchCommentData(data.id);
    commentData.forEach(comment => {
        displayComment(comment.content);
    });
}

// post comment
async function submitComment(e) {
    if(e.key == 'Enter'){
        let textareaElement = document.getElementById('comment-textarea');
        // don't send empty comments or comments that begin with newline to API
        if(textareaElement.value != '' && textareaElement.value.substring(0, 1) != '\n'){
            await postComment(threadData.id, textareaElement.value);
            displayComment(textareaElement.value);
            textareaElement.value = '';
        }
    }
}

async function fetchThreadData(threadId): Promise<Thread>{
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

async function fetchCommentData(threadId) {
    try{
        const res = await fetch(baseurl + 'thread/getbythreadid/' + threadId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
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

function displayComment(content){
    let commentParentElement = document.getElementById('comment-box');
    let commentDiv = document.createElement('div');
    commentDiv.className = 'bg-danger mt-3 rounded mx-5'; // css

    let commentParagraph = document.createElement('p');
    commentParagraph.className = 'text-white fs-3 fw-bold px-3'; // css
    commentParagraph.innerHTML = content;
    commentDiv.appendChild(commentParagraph);

    commentParentElement.appendChild(commentDiv);
}
