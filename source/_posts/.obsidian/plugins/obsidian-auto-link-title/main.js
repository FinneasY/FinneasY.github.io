/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/

'use strict';

var obsidian = require('obsidian');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const DEFAULT_SETTINGS = {
    regex: /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/i,
    lineRegex: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
    linkRegex: /^\[([^\[\]]*)\]\((https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})\)$/i,
    linkLineRegex: /\[([^\[\]]*)\]\((https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})\)/gi,
    imageRegex: /\.(gif|jpe?g|tiff?|png|webp|bmp|tga|psd|ai)$/i,
    enhanceDefaultPaste: true,
    shouldPreserveSelectionAsTitle: false,
    enhanceDropEvents: true,
    websiteBlacklist: "",
    maximumTitleLength: 0,
    useNewScraper: false,
};
class AutoLinkTitleSettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        let { containerEl } = this;
        containerEl.empty();
        new obsidian.Setting(containerEl)
            .setName("Enhance Default Paste")
            .setDesc("Fetch the link title when pasting a link in the editor with the default paste command")
            .addToggle((val) => val
            .setValue(this.plugin.settings.enhanceDefaultPaste)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            console.log(value);
            this.plugin.settings.enhanceDefaultPaste = value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName("Enhance Drop Events")
            .setDesc("Fetch the link title when drag and dropping a link from another program")
            .addToggle((val) => val
            .setValue(this.plugin.settings.enhanceDropEvents)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            console.log(value);
            this.plugin.settings.enhanceDropEvents = value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName("Maximum title length")
            .setDesc("Set the maximum length of the title. Set to 0 to disable.")
            .addText((val) => val
            .setValue(this.plugin.settings.maximumTitleLength.toString(10))
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            const titleLength = (Number(value));
            this.plugin.settings.maximumTitleLength = isNaN(titleLength) || titleLength < 0 ? 0 : titleLength;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName("Preserve selection as title")
            .setDesc("Whether to prefer selected text as title over fetched title when pasting")
            .addToggle((val) => val
            .setValue(this.plugin.settings.shouldPreserveSelectionAsTitle)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            console.log(value);
            this.plugin.settings.shouldPreserveSelectionAsTitle = value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName("Website Blacklist")
            .setDesc("List of strings (comma separated) that disable autocompleting website titles. Can be URLs or arbitrary text.")
            .addTextArea((val) => val
            .setValue(this.plugin.settings.websiteBlacklist)
            .setPlaceholder("localhost, tiktok.com")
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.websiteBlacklist = value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName("Use New Scraper")
            .setDesc("Use experimental new scraper, seems to work well on desktop but not mobile.")
            .addToggle((val) => val
            .setValue(this.plugin.settings.useNewScraper)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            console.log(value);
            this.plugin.settings.useNewScraper = value;
            yield this.plugin.saveSettings();
        })));
    }
}

class CheckIf {
    static isMarkdownLinkAlready(editor) {
        let cursor = editor.getCursor();
        // Check if the characters before the url are ]( to indicate a markdown link
        var titleEnd = editor.getRange({ ch: cursor.ch - 2, line: cursor.line }, { ch: cursor.ch, line: cursor.line });
        return titleEnd == "](";
    }
    static isAfterQuote(editor) {
        let cursor = editor.getCursor();
        // Check if the characters before the url are " or ' to indicate we want the url directly
        // This is common in elements like <a href="linkhere"></a>
        var beforeChar = editor.getRange({ ch: cursor.ch - 1, line: cursor.line }, { ch: cursor.ch, line: cursor.line });
        return beforeChar == "\"" || beforeChar == "'";
    }
    static isUrl(text) {
        let urlRegex = new RegExp(DEFAULT_SETTINGS.regex);
        return urlRegex.test(text);
    }
    static isImage(text) {
        let imageRegex = new RegExp(DEFAULT_SETTINGS.imageRegex);
        return imageRegex.test(text);
    }
    static isLinkedUrl(text) {
        let urlRegex = new RegExp(DEFAULT_SETTINGS.linkRegex);
        return urlRegex.test(text);
    }
}

class EditorExtensions {
    static getSelectedText(editor) {
        if (!editor.somethingSelected()) {
            let wordBoundaries = this.getWordBoundaries(editor);
            editor.setSelection(wordBoundaries.start, wordBoundaries.end);
        }
        return editor.getSelection();
    }
    static cursorWithinBoundaries(cursor, match) {
        let startIndex = match.index;
        let endIndex = match.index + match[0].length;
        return startIndex <= cursor.ch && cursor.ch <= endIndex;
    }
    static getWordBoundaries(editor) {
        let cursor = editor.getCursor();
        // If its a normal URL token this is not a markdown link
        // In this case we can simply overwrite the link boundaries as-is
        let lineText = editor.getLine(cursor.line);
        // First check if we're in a link
        let linksInLine = lineText.matchAll(DEFAULT_SETTINGS.linkLineRegex);
        for (let match of linksInLine) {
            if (this.cursorWithinBoundaries(cursor, match)) {
                return {
                    start: { line: cursor.line, ch: match.index },
                    end: { line: cursor.line, ch: match.index + match[0].length },
                };
            }
        }
        // If not, check if we're in just a standard ol' URL.
        let urlsInLine = lineText.matchAll(DEFAULT_SETTINGS.lineRegex);
        for (let match of urlsInLine) {
            if (this.cursorWithinBoundaries(cursor, match)) {
                return {
                    start: { line: cursor.line, ch: match.index },
                    end: { line: cursor.line, ch: match.index + match[0].length },
                };
            }
        }
        return {
            start: cursor,
            end: cursor,
        };
    }
    static getEditorPositionFromIndex(content, index) {
        let substr = content.substr(0, index);
        let l = 0;
        let offset = -1;
        let r = -1;
        for (; (r = substr.indexOf("\n", r + 1)) !== -1; l++, offset = r)
            ;
        offset += 1;
        let ch = content.substr(offset, index - offset).length;
        return { line: l, ch: ch };
    }
}

function blank$1(text) {
    return text === undefined || text === null || text === '';
}
function notBlank$1(text) {
    return !blank$1(text);
}
function scrape(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield obsidian.requestUrl(url);
            if (!response.headers['content-type'].includes('text/html'))
                return getUrlFinalSegment$1(url);
            const html = response.text;
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const title = doc.querySelector('title');
            if (blank$1(title === null || title === void 0 ? void 0 : title.innerText)) {
                // If site is javascript based and has a no-title attribute when unloaded, use it.
                var noTitle = title === null || title === void 0 ? void 0 : title.getAttr('no-title');
                if (notBlank$1(noTitle)) {
                    return noTitle;
                }
                // Otherwise if the site has no title/requires javascript simply return Title Unknown
                return url;
            }
            return title.innerText;
        }
        catch (ex) {
            console.error(ex);
            return 'Site Unreachable';
        }
    });
}
function getUrlFinalSegment$1(url) {
    try {
        const segments = new URL(url).pathname.split('/');
        const last = segments.pop() || segments.pop(); // Handle potential trailing slash
        return last;
    }
    catch (_) {
        return 'File';
    }
}
function getPageTitle$1(url) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(url.startsWith('http') || url.startsWith('https'))) {
            url = 'https://' + url;
        }
        return scrape(url);
    });
}

const electronPkg = require("electron");
function blank(text) {
    return text === undefined || text === null || text === "";
}
function notBlank(text) {
    return !blank(text);
}
// async wrapper to load a url and settle on load finish or fail
function load(window, url) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            window.webContents.on("did-finish-load", (event) => resolve(event));
            window.webContents.on("did-fail-load", (event) => reject(event));
            window.loadURL(url);
        });
    });
}
function electronGetPageTitle(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const { remote } = electronPkg;
        const { BrowserWindow } = remote;
        try {
            const window = new BrowserWindow({
                width: 1000,
                height: 600,
                webPreferences: {
                    webSecurity: false,
                    nodeIntegration: true,
                    images: false,
                },
                show: false,
            });
            window.webContents.setAudioMuted(true);
            yield load(window, url);
            try {
                const title = window.webContents.getTitle();
                window.destroy();
                if (notBlank(title)) {
                    return title;
                }
                else {
                    return url;
                }
            }
            catch (ex) {
                window.destroy();
                return url;
            }
        }
        catch (ex) {
            console.error(ex);
            return "Site Unreachable";
        }
    });
}
function nonElectronGetPageTitle(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const html = yield obsidian.request({ url });
            const doc = new DOMParser().parseFromString(html, "text/html");
            const title = doc.querySelectorAll("title")[0];
            if (title == null || blank(title === null || title === void 0 ? void 0 : title.innerText)) {
                // If site is javascript based and has a no-title attribute when unloaded, use it.
                var noTitle = title === null || title === void 0 ? void 0 : title.getAttr("no-title");
                if (notBlank(noTitle)) {
                    return noTitle;
                }
                // Otherwise if the site has no title/requires javascript simply return Title Unknown
                return url;
            }
            return title.innerText;
        }
        catch (ex) {
            console.error(ex);
            return "Site Unreachable";
        }
    });
}
function getUrlFinalSegment(url) {
    try {
        const segments = new URL(url).pathname.split('/');
        const last = segments.pop() || segments.pop(); // Handle potential trailing slash
        return last;
    }
    catch (_) {
        return "File";
    }
}
function tryGetFileType(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url, { method: "HEAD" });
            // Ensure site returns an ok status code before scraping
            if (!response.ok) {
                return "Site Unreachable";
            }
            // Ensure site is an actual HTML page and not a pdf or 3 gigabyte video file.
            let contentType = response.headers.get("content-type");
            if (!contentType.includes("text/html")) {
                return getUrlFinalSegment(url);
            }
            return null;
        }
        catch (err) {
            return null;
        }
    });
}
function getPageTitle(url) {
    return __awaiter(this, void 0, void 0, function* () {
        // If we're on Desktop use the Electron scraper
        if (!(url.startsWith("http") || url.startsWith("https"))) {
            url = "https://" + url;
        }
        // Try to do a HEAD request to see if the site is reachable and if it's an HTML page
        // If we error out due to CORS, we'll just try to scrape the page anyway.
        let fileType = yield tryGetFileType(url);
        if (fileType) {
            return fileType;
        }
        if (electronPkg != null) {
            return electronGetPageTitle(url);
        }
        else {
            return nonElectronGetPageTitle(url);
        }
    });
}

class AutoLinkTitle extends obsidian.Plugin {
    constructor() {
        super(...arguments);
        this.shortTitle = (title) => {
            if (this.settings.maximumTitleLength === 0) {
                return title;
            }
            if (title.length < this.settings.maximumTitleLength + 3) {
                return title;
            }
            const shortenedTitle = `${title.slice(0, this.settings.maximumTitleLength)}...`;
            return shortenedTitle;
        };
    }
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("loading obsidian-auto-link-title");
            yield this.loadSettings();
            this.blacklist = this.settings.websiteBlacklist.split(",").map(s => s.trim()).filter(s => s.length > 0);
            // Listen to paste event
            this.pasteFunction = this.pasteUrlWithTitle.bind(this);
            // Listen to drop event
            this.dropFunction = this.dropUrlWithTitle.bind(this);
            this.addCommand({
                id: "auto-link-title-paste",
                name: "Paste URL and auto fetch title",
                editorCallback: (editor) => this.manualPasteUrlWithTitle(editor),
                hotkeys: [],
            });
            this.addCommand({
                id: "auto-link-title-normal-paste",
                name: "Normal paste (no fetching behavior)",
                editorCallback: (editor) => this.normalPaste(editor),
                hotkeys: [
                    {
                        modifiers: ["Mod", "Shift"],
                        key: "v",
                    },
                ],
            });
            this.registerEvent(this.app.workspace.on("editor-paste", this.pasteFunction));
            this.registerEvent(this.app.workspace.on("editor-drop", this.dropFunction));
            this.addCommand({
                id: "enhance-url-with-title",
                name: "Enhance existing URL with link and title",
                editorCallback: (editor) => this.addTitleToLink(editor),
                hotkeys: [
                    {
                        modifiers: ["Mod", "Shift"],
                        key: "e",
                    },
                ],
            });
            this.addSettingTab(new AutoLinkTitleSettingTab(this.app, this));
        });
    }
    addTitleToLink(editor) {
        // Only attempt fetch if online
        if (!navigator.onLine)
            return;
        let selectedText = (EditorExtensions.getSelectedText(editor) || "").trim();
        // If the cursor is on a raw html link, convert to a markdown link and fetch title
        if (CheckIf.isUrl(selectedText)) {
            this.convertUrlToTitledLink(editor, selectedText);
        }
        // If the cursor is on the URL part of a markdown link, fetch title and replace existing link title
        else if (CheckIf.isLinkedUrl(selectedText)) {
            const link = this.getUrlFromLink(selectedText);
            this.convertUrlToTitledLink(editor, link);
        }
    }
    normalPaste(editor) {
        return __awaiter(this, void 0, void 0, function* () {
            let clipboardText = yield navigator.clipboard.readText();
            if (clipboardText === null || clipboardText === "")
                return;
            editor.replaceSelection(clipboardText);
        });
    }
    // Simulate standard paste but using editor.replaceSelection with clipboard text since we can't seem to dispatch a paste event.
    manualPasteUrlWithTitle(editor) {
        return __awaiter(this, void 0, void 0, function* () {
            const clipboardText = yield navigator.clipboard.readText();
            // Only attempt fetch if online
            if (!navigator.onLine) {
                editor.replaceSelection(clipboardText);
                return;
            }
            if (clipboardText == null || clipboardText == '')
                return;
            // If its not a URL, we return false to allow the default paste handler to take care of it.
            // Similarly, image urls don't have a meaningful <title> attribute so downloading it
            // to fetch the title is a waste of bandwidth.
            if (!CheckIf.isUrl(clipboardText) || CheckIf.isImage(clipboardText)) {
                editor.replaceSelection(clipboardText);
                return;
            }
            // If it looks like we're pasting the url into a markdown link already, don't fetch title
            // as the user has already probably put a meaningful title, also it would lead to the title
            // being inside the link.
            if (CheckIf.isMarkdownLinkAlready(editor) || CheckIf.isAfterQuote(editor)) {
                editor.replaceSelection(clipboardText);
                return;
            }
            // If url is pasted over selected text and setting is enabled, no need to fetch title, 
            // just insert a link
            let selectedText = (EditorExtensions.getSelectedText(editor) || "").trim();
            if (selectedText && this.settings.shouldPreserveSelectionAsTitle) {
                editor.replaceSelection(`[${selectedText}](${clipboardText})`);
                return;
            }
            // At this point we're just pasting a link in a normal fashion, fetch its title.
            this.convertUrlToTitledLink(editor, clipboardText);
            return;
        });
    }
    pasteUrlWithTitle(clipboard, editor) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.settings.enhanceDefaultPaste) {
                return;
            }
            if (clipboard.defaultPrevented)
                return;
            // Only attempt fetch if online
            if (!navigator.onLine)
                return;
            let clipboardText = clipboard.clipboardData.getData("text/plain");
            if (clipboardText === null || clipboardText === "")
                return;
            // If its not a URL, we return false to allow the default paste handler to take care of it.
            // Similarly, image urls don't have a meaningful <title> attribute so downloading it
            // to fetch the title is a waste of bandwidth.
            if (!CheckIf.isUrl(clipboardText) || CheckIf.isImage(clipboardText)) {
                return;
            }
            // We've decided to handle the paste, stop propagation to the default handler.
            clipboard.stopPropagation();
            clipboard.preventDefault();
            // If it looks like we're pasting the url into a markdown link already, don't fetch title
            // as the user has already probably put a meaningful title, also it would lead to the title
            // being inside the link.
            if (CheckIf.isMarkdownLinkAlready(editor) || CheckIf.isAfterQuote(editor)) {
                editor.replaceSelection(clipboardText);
                return;
            }
            // If url is pasted over selected text and setting is enabled, no need to fetch title, 
            // just insert a link
            let selectedText = (EditorExtensions.getSelectedText(editor) || "").trim();
            if (selectedText && this.settings.shouldPreserveSelectionAsTitle) {
                editor.replaceSelection(`[${selectedText}](${clipboardText})`);
                return;
            }
            // At this point we're just pasting a link in a normal fashion, fetch its title.
            this.convertUrlToTitledLink(editor, clipboardText);
            return;
        });
    }
    dropUrlWithTitle(dropEvent, editor) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.settings.enhanceDropEvents) {
                return;
            }
            if (dropEvent.defaultPrevented)
                return;
            // Only attempt fetch if online
            if (!navigator.onLine)
                return;
            let dropText = dropEvent.dataTransfer.getData('text/plain');
            if (dropText === null || dropText === "")
                return;
            // If its not a URL, we return false to allow the default paste handler to take care of it.
            // Similarly, image urls don't have a meaningful <title> attribute so downloading it
            // to fetch the title is a waste of bandwidth.
            if (!CheckIf.isUrl(dropText) || CheckIf.isImage(dropText)) {
                return;
            }
            // We've decided to handle the paste, stop propagation to the default handler.
            dropEvent.stopPropagation();
            dropEvent.preventDefault();
            // If it looks like we're pasting the url into a markdown link already, don't fetch title
            // as the user has already probably put a meaningful title, also it would lead to the title
            // being inside the link.
            if (CheckIf.isMarkdownLinkAlready(editor) || CheckIf.isAfterQuote(editor)) {
                editor.replaceSelection(dropText);
                return;
            }
            // If url is pasted over selected text and setting is enabled, no need to fetch title, 
            // just insert a link
            let selectedText = (EditorExtensions.getSelectedText(editor) || "").trim();
            if (selectedText && this.settings.shouldPreserveSelectionAsTitle) {
                editor.replaceSelection(`[${selectedText}](${dropText})`);
                return;
            }
            // At this point we're just pasting a link in a normal fashion, fetch its title.
            this.convertUrlToTitledLink(editor, dropText);
            return;
        });
    }
    isBlacklisted(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSettings();
            this.blacklist = this.settings.websiteBlacklist.split(/,|\n/).map(s => s.trim()).filter(s => s.length > 0);
            return this.blacklist.some(site => url.includes(site));
        });
    }
    convertUrlToTitledLink(editor, url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isBlacklisted(url)) {
                let domain = new URL(url).hostname;
                editor.replaceSelection(`[${domain}](${url})`);
                return;
            }
            // Generate a unique id for find/replace operations for the title.
            const pasteId = `Fetching Title#${this.createBlockHash()}`;
            // Instantly paste so you don't wonder if paste is broken
            editor.replaceSelection(`[${pasteId}](${url})`);
            // Fetch title from site, replace Fetching Title with actual title
            const title = yield this.fetchUrlTitle(url);
            const escapedTitle = this.escapeMarkdown(title);
            const shortenedTitle = this.shortTitle(escapedTitle);
            const text = editor.getValue();
            const start = text.indexOf(pasteId);
            if (start < 0) {
                console.log(`Unable to find text "${pasteId}" in current editor, bailing out; link ${url}`);
            }
            else {
                const end = start + pasteId.length;
                const startPos = EditorExtensions.getEditorPositionFromIndex(text, start);
                const endPos = EditorExtensions.getEditorPositionFromIndex(text, end);
                editor.replaceRange(shortenedTitle, startPos, endPos);
            }
        });
    }
    escapeMarkdown(text) {
        var unescaped = text.replace(/\\(\*|_|`|~|\\|\[|\])/g, '$1'); // unescape any "backslashed" character
        var escaped = unescaped.replace(/(\*|_|`|<|>|~|\\|\[|\])/g, '\\$1'); // escape *, _, `, ~, \, [, ], <, and >
        return escaped;
    }
    fetchUrlTitle(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let title = "";
                if (this.settings.useNewScraper) {
                    title = yield getPageTitle$1(url);
                }
                else {
                    title = yield getPageTitle(url);
                }
                return title.replace(/(\r\n|\n|\r)/gm, "").trim();
            }
            catch (error) {
                console.error(error);
                return 'Error fetching title';
            }
        });
    }
    getUrlFromLink(link) {
        let urlRegex = new RegExp(DEFAULT_SETTINGS.linkRegex);
        return urlRegex.exec(link)[2];
    }
    // Custom hashid by @shabegom
    createBlockHash() {
        let result = "";
        var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < 4; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    onunload() {
        console.log("unloading obsidian-auto-link-title");
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
}

module.exports = AutoLinkTitle;


/* nosourcemap */