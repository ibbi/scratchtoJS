chrome.contextMenus.removeAll();
chrome.contextMenus.create({
    title: "first",
    contexts: ["browser_action"],
    onclick: function () {
        alert('first');
    }
});


chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'repl.it' },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
