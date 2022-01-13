# Snake game in Firefox devtools panel 🦊🔬🐍

Play snake game in devtools panel

The game is based on [kubowania/Nokia3310-Snake](https://github.com/kubowania/Nokia3310-Snake) but has other features and modifications:

- Add pineapple to speed 50% up of the snake 🍍
- Re-generate map tiles based on screen size (offsetWidth) 🗺
- Integrate game into Firefox extension (devtools panel) 🦊
- Use TailwindCSS

screenshot:

<img src="./screenshots/screenshot1.png" width="75%" alt="screenshot">


## Usage
### install dependencies
```
npm i
```

### dev

dev and preview in Firefox browser
```
npm run dev
```
or
```
npx web-ext -s ./src run
```

dev with TailwindCSS
```
npm run dev:css
```

# Ref

* [kubowania/Nokia3310-Snake: A vanilla JavaScript game with tutorial](https://github.com/kubowania/Nokia3310-Snake "kubowania/Nokia3310-Snake: A vanilla JavaScript game with tutorial")
* [webextensions-examples/devtools-panels at master · mdn/webextensions-examples](https://github.com/mdn/webextensions-examples/tree/master/devtools-panels "webextensions-examples/devtools-panels at master · mdn/webextensions-examples")
