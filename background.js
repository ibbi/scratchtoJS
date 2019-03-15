// chrome.runtime.onInstalled.addListener(function () {
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//         chrome.declarativeContent.onPageChanged.addRules([{
//             conditions: [new chrome.declarativeContent.PageStateMatcher({
//                 pageUrl: { hostEquals: 'repl.it' },
//             })
//             ],
//             actions: [new chrome.declarativeContent.ShowPageAction()]
//         }]);
//     });
// });
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.windows.create({
        url: chrome.runtime.getURL("index.html"),
        type: "popup",
        width: 570,
        height: 670,
    });
});
