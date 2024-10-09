let createFormButton: HTMLButtonElement | null;
let titleInput: string | undefined;
let authorInput: string | undefined;
let messageInput: string | undefined;

window.addEventListener('load', function() {

    createFormButton = document.getElementById("submit-button") as HTMLButtonElement;
    titleInput = document.getElementById("input-title")?.innerHTML;
    authorInput = document.getElementById("input-author")?.innerHTML;
    messageInput = document.getElementById("input-message")?.innerHTML;

    createFormButton?.addEventListener('click', async () => {
        await postThread(titleInput, authorInput, messageInput);
        window.location.href = baseurl + 'html/explore.html'
    });
});
