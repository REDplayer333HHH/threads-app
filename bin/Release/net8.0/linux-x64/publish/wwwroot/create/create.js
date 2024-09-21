let createFormButton;
let createFormTitle;
let createFormAuthor;
let createFormMessage;

window.addEventListener('load', function() {

    createFormButton = document.getElementById("submit-button");
    createFormTitle = document.getElementById("input-title");
    createFormAuthor = document.getElementById("input-author");
    createFormMessage = document.getElementById("input-message");

    createFormButton.addEventListener('click', async () => {
        await onSubmit();
    });
});

async function onSubmit(){
    try{
        const res = await fetch(baseurl + 'thread', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: createFormTitle.value,
                author: createFormAuthor.value,
                message: createFormMessage.value
            })
        });

        if(!res.ok){
            throw new Error('Res not ok!');
        }

        window.location.href = baseurl + 'explore/explore.html'
    }
    catch(err){
        console.log(err);
    }
}
