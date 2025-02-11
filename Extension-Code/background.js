chrome.runtime.onInstalled.addListener(() => {
    const url = "https://puppies.com/";

    // https://developer.chrome.com/docs/extensions/reference/api/tabs#event-onUpdated
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/sendMessage
        const onError = (error) => {
            console.log(`Error: ${error}`);
        }

        const sendMessageToTabs = (tab) => {
            chrome.tabs
            .sendMessage(tab.id, { tabInfo: tab })
            .then((response) => {
                console.log(response.response);
            })
            .catch(onError);
        }

        // Check if the URL starts with "https://puppies.com/":
        if (tab.url.startsWith(url)) {
            // Once loading is done, send the message to the content script:
            if (changeInfo.status === 'complete') {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    sendMessageToTabs(tab);
                });
            }
        }
    });
});
