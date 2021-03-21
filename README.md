# link-saver

> Visit web app at [https://gp-linksaver.herokuapp.com](https://gp-linksaver.herokuapp.com)

> This is a back-end project with prebuilt front-end located in ```/dist``` , to know how i build its front-end visit [link-saver-client project](https://github.com/duchunter/link-saver-client)

Bookmark link with information. This app has:
* Authentication and authorization using Auth0
* Login using Facebook or Gmail account
* Facebook chatbot to save shared link from Messenger with Dialogflow SmallTalk feature (only support ```admin``` account :))
* [Mobile app](https://github.com/duchunter/linksaver-app) to save links offline
* [Chrome extension](https://github.com/duchunter/linksaver-extension) (working...)

### Before you build
- If you are not ```admin``` delete the route ```/api/webhook``` and anything related to it :)
- If you want to use your own Auth0 app, edit ```server/utils/auth0Config.js```
- Setup Postgresql database using content in ```db.sql	```

### Build Setup

``` bash
# install dependencies
npm install

# build files using babel
npm run build

# start server at port 3000
npm start

# start server using nodemon
npm run demon

# open localhost:3000 to see the result
```


### References

* https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/