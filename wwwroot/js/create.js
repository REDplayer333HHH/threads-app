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
let titleInput;
let authorInput;
let messageInput;
window.addEventListener('load', function () {
    createFormButton = document.getElementById("submit-button");
    createFormButton === null || createFormButton === void 0 ? void 0 : createFormButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        titleInput = (_a = document.getElementById("input-title")) === null || _a === void 0 ? void 0 : _a.value;
        authorInput = (_b = document.getElementById("input-author")) === null || _b === void 0 ? void 0 : _b.value;
        messageInput = (_c = document.getElementById("input-message")) === null || _c === void 0 ? void 0 : _c.value;
        yield postThread(titleInput, authorInput, messageInput);
        window.location.href = baseurl + 'html/explore.html';
    }));
});
