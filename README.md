# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run React Project

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

Default configurations are provided, so no need to make any changes to run the demo project.

Go to `App.js` file:

```js
const snippyly = await Snippyly.init({
      apiKey: "TA66fUfxZVtGBqGxSTCz", // Add your Api Key here
      featureAllowList: [], // To allow specific features only
      // userIdAllowList: ['abcd'], // To allow specific users only
      urlAllowList: [], // To allow snippyly in specific screens only
      user: selectedUser // Pass user with unique userId
    });
```

Replace apiKey with your apiKey and re-run the code to make it work in your website.

NOTE: Before implementing Snippyly into your website code, you will have to contact our team to get your apiKey and will have to provide list of domains to whitelist. Snippyly will only work in whitelisted domains provided by a client.

## Presence feature

There are 2 ways to implement presence feature.

1. Use default presence feature provided in Snippyly:

```html
<snippyly-presence></snippyly-presence>
```

Add this custom html tag at root level to make default presence feature work.

2. Get presence data through Snippyly and implement your own custom UI on top of that.

Create react component called `Presence.js`, watch on changes in `SnippylyContext`. Once Snippyly is available, call `getOnlineUsers()` to get users data.

```js
const getOnlineUsers = () => {
        const presenceElement = snippyly.getPresenceElement();
        presenceElement.getOnlineUsersOnCurrentDocument().subscribe((users) => {
            console.log('users', users);
        });
    }
```

As provided in above code, user can get presence element and subscribe to `getOnlineUsersOnCurrentDocument()` method to receive updates. Result data contains list of user currently available in that document page.

## Cursor feature

There are 2 ways to implement cursor feature.

1. Use default cursor feature provided in Snippyly:

```html
<snippyly-cursor></snippyly-cursor>
```

Add this custom html tag at root level to make default cursor feature work.

2. Get presence data through Snippyly and implement your own custom UI on top of that.

Similar to presence component, create react component called `Cursor.js`, watch on changes in `SnippylyContext`. Once Snippyly is available, call `getUserCursors()` to get users data.

```js
getUserCursors(): void {
    const cursorElement = snippyly.getCursorElement();
    cursorElement.getLiveCursorsOnCurrentDocument().subscribe((cursors) => {
      console.log('cursors', cursors);
    });
  }
```

As provided in above code, user can get cursor element and subscribe to `getLiveCursorsOnCurrentDocument()` method to receive updates. Result data contains list of cursors currently online users in that document page.