browser.devtools.panels.create('Snake Game 🐍', '/icons/star.png', '/devtools/game/index.html').then(newPanel => {
  newPanel.onShown.addListener(handleShown)
  newPanel.onHidden.addListener(handleHidden)
})
