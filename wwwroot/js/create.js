"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let createFormButton;
let createFormTitle;
let createFormAuthor;
let createFormMessage;
window.addEventListener('load', function () {
    createFormButton = document.getElementById("submit-button");
    createFormTitle = document.getElementById("input-title");
    createFormAuthor = document.getElementById("input-author");
    createFormMessage = document.getElementById("input-message");
    createFormButton === null || createFormButton === void 0 ? void 0 : createFormButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        yield onSubmit();
    }));
});
function onSubmit() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(baseurl + 'thread', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: createFormTitle === null || createFormTitle === void 0 ? void 0 : createFormTitle.innerHTML,
                    author: createFormAuthor === null || createFormAuthor === void 0 ? void 0 : createFormAuthor.innerHTML,
                    message: createFormMessage === null || createFormMessage === void 0 ? void 0 : createFormMessage.innerHTML
                })
            });
            if (!res.ok) {
                throw new Error('Res not ok!');
            }
            window.location.href = baseurl + 'html/explore.html';
        }
        catch (err) {
            console.log(err);
        }
    });
}
