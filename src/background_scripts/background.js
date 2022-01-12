
/**
When we receive the message, execute the given script in the given
tab.
*/
function handleMessage(request, sender, sendResponse) {

  if (sender.url != browser.runtime.getURL("/devtools/game/index.html")) {
    return;
  }

  browser.tabs.executeScript(
    request.tabId,
    {
      code: request.script
    });

}

/**
Listen for messages from our devtools panel.
*/
browser.runtime.onMessage.addListener(handleMessage);
