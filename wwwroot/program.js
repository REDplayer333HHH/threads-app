// HTML
let button;
let title;
let author;
let message;
let thread;

window.addEventListener('load', function() {
    button = document.getElementById("submti-button");
    title = document.getElementById("input-title");
    author = document.getElementById("input-author");
    message = document.getElementById("input-message");
    thread = document.getElementById("thread-title");
});


async function onButtonPress(){
    try{
        const res = await fetch('thread', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title.value,
                author: author.value,
                message: message.value
            })
        });

        if(!res.ok){
            throw new Error('Res not ok!');
        }

        const data = await res.json();
        console.log(data.id);
        console.log(data.title);
        console.log(data.author);
        console.log(data.message);
    }
    catch(err){
        console.log(err);
    }
}
