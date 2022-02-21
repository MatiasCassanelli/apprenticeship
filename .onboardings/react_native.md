# React Native

React Native onboarding

## 1. Setup

Setup your computer before you start

- [ ] Install [Homebrew](https://brew.sh/)
- [ ] Use homebrew to install [Git](https://git-scm.com/downloads),
[Nvm](https://github.com/creationix/nvm) ,
[Watchman](https://formulae.brew.sh/formula/watchman) 
- [ ] Choose a code editor, VS Code is always a great choice since it has debugging capabilities specifically for React Native. Nevertheless, it’s up to you with which you find yourself more comfortable. [VSCode](https://code.visualstudio.com/), [Atom](https://atom.io/), [Sublime](https://www.sublimetext.com/). If you choose VSCode install the following packages [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [React Native tools](https://marketplace.visualstudio.com/items?itemName=vsmobile.vscode-react-native)
- [ ] Install [iTerm](https://www.iterm2.com/) or [Oh my ZSH](https://github.com/robbyrussell/oh-my-zsh)
- [ ] Install XCode from AppStore and [Android Studio](https://developer.android.com/studio/)

## 2. React

React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. It can be used as a base in the development of single-page or mobile applications. 

It’s important to define that React is just a UI library. It’s a fantastic tool that lets you define your UI, but nothing else. React doesn’t even define an architecture, so that’s something that has to be defined by the developers.

- [ ] Complete [React practical tutorial](https://reactjs.org/tutorial/tutorial.html) and/or [React technical tutorial](https://reactjs.org/docs/hello-world.html), some people like to start coding from the beginning, other like the step by step technical tutorial, choose the one that fits you.

## 3. React Lifecycle

Lifecycle methods are methods that we can implement that are ran at a specific point in the usage of a component. As their name implies, it’s related to the “life” of the component. Think about it as if the component has a life. It’s born, then it changes (updated) and lastly, it dies. You can execute code at any of this moments 

- [ ] Read [Official docs](https://reactjs.org/docs/react-component.html#the-component-lifecycle)
- [ ] Look at [Lifecycle diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/), a really useful diagram to see each method and when it’s executed.  
- [ ] (Optional Read) [Deep dive into lifecycle methods](https://programmingwithmosh.com/javascript/react-lifecycle-methods/)

## 4. Hooks

Since their announcement, hooks have redefined the way we develop react components and behaviours, so it’s key for you to understand how they work before going deeper into react-native.

- [ ] Read [Official docs](https://reactjs.org/docs/hooks-overview.html) 
- [ ] Look to [resources](https://docs.google.com/document/d/1-q7JwK9kB_WXdTKtKNsDH40KjjAigirQTyAuOBQengI/edit?usp=sharing)
- [ ] Update React tutorial (Tic Tac Toe) to use hooks

## 5. Getting started with React Native

- [ ] Read [Explanation](https://docs.google.com/document/d/1UjgP1UjYBTVRuPpHnp1Sbg1tbd2cWMaE1kKSkL_F75U/edit?usp=sharing)
- [ ] Read everything from [The Basics](https://facebook.github.io/react-native/docs/getting-started)
- [ ] Read [Images](https://facebook.github.io/react-native/docs/images)

## 6. Debugging & Developer tools

In order to open the developer menu, you have to follow these instructions. It’s important to clarify that this works both for the simulators and for a real device:

iOS:

Do one of the following:
Command + D
Using the Shake Gesture

Android:

Do one of the following:
Command + M (Ctrl + M on Windows)
Run the following command: run adb shell input keyevent 82

- [ ] Read [Debugging React Native Applications](https://medium.com/reactnativeacademy/debugging-react-native-applications-6bff3f28c375)
- [ ] Read [Debugging - official docs](https://facebook.github.io/react-native/docs/debugging)

## 7. Coding Challenge Movie App

- [ ] Build Movie App with Moove it React-Native [template](https://github.com/moove-it/react-native-template)

#### Resources:
- [API Docs](https://developers.themoviedb.org/3)
- Design [here](https://www.figma.com/file/gNP12kQqjDzSCyYmMiLu8F/Movy-Mobile)

## 7.1 Movies List

- [ ] List all movies coming from the API

#### Resources:

- Networking 
- [ ] Read [Axios documentation](https://github.com/axios/axios)

## 7.2. Movie Detail

Navigation is one of the most important things of an app.

- [ ] Read [Navigation](https://facebook.github.io/react-native/docs/navigation)
- [ ] Read [Explanation](https://docs.google.com/document/d/1X81D2yj_eLPUqc5GlQPwcbvL4BkP0kzddv6kwcdYk9Y/edit?usp=sharing)
- [ ] Show Movies detail with appropriate navigation

## 7.3. Handling state

One of the key parts of your application is how you handle state. Here at moove it, we use redux both on react and react-native.

- [ ] Read [Docs](https://redux.js.org/)

After you have a clear understanding of how redux works, you should take a look at how async actions and middleware work

- [ ] Read [article](https://medium.freecodecamp.org/how-to-create-your-first-redux-middleware-with-ease-a75e6b1384db)
- [ ] Read [redux-thunk](https://github.com/reduxjs/redux-thunk)
- [ ] Update current code to use redux

## 7.4. Testing

- [ ] Read [documentation](https://docs.google.com/document/d/17QUiD_HE2OYSVxC_vKikyhEIA7QS28f8NmQLat_z1hk/edit?usp=sharing)
- [ ] Add tests to the app

## 7.5. Persistence

There are a lot of solutions to persist your store on the device, redux-persist is our first choice, it’s a pretty simple library, so just read the docs and you are good to go.

- [ ] Read [redux-persist](https://github.com/rt2zz/redux-persist)
- [ ] Allow the user to mark movies as favourites
- [ ] Display users's favourites on home view
- [ ] These selections should be kept across consequent app launches

## 7.6. Offline Mode

The app should be usable offline. 

Whenever there's no internet, the app should show the latest data that was recieved. Nevertheless, data should have an expiration date. If the latest data was fetched more than a day ago, it shouldn't be used and no data should be shown. This expiration date should be easily changeable, in order to be able to test it/update it.
