interface Thread {
    id: number,
    title: string,
    author: string,
    message: string
}

var baseurl: string = 'http://localhost:8010/';

// POST Thread
async function postThread(title: string | undefined, author: string | undefined, message: string | undefined): Promise<void>{
    if(title && author && message){
        try{
            const res = await fetch(baseurl + 'thread', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    author: author,
                    message: message
                })
            });
    
            if(!res.ok){
                throw new Error('Res not ok!');
            }
        }
        catch(err: any){
            throw new Error(err);
        }
    }
    else{
        throw new Error("request made with undefined params")
    }
}

// GET Thread[]
async function getAllThreads(): Promise<Thread[] | undefined> {
    try{
        const res: Response = await fetch(baseurl + 'thread', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(!res.ok){
            throw new Error('Res not ok!');
        }

        const data: Thread[] = await res.json();
        return data;
    }
    catch(err){
        console.log(err);
        return undefined;
    }
}

// POST Comment
async function postComment(threadId: number, commentContent: string): Promise<void> {
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
    }
    catch(err: any){
        throw new Error(err);
    }
}
