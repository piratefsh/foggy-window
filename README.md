# Foggy Window

You know when you're behind a window on a cold day and it fogs up? Yeah, we're replicating that in your browser. So you can have a foggy window in your window.

# [Try it here](http://piratefsh.github.io/foggy-window/public/)

![Demo screenshot of foggy window](http://i.imgur.com/6KZyRiI.png)

Works on mobile for touch.   

## Technologies

* ES6 Javascript
* Webpack
* Sass

## Development 

### Install

``` 
npm install
npm install webpack webpack-dev-server -g
```

### Serve

This project runs on Webpack. To serve at http://localhost:8080/:

```
webpack-dev-server --inline  --content-base public/ 
```

### Build

To compile for production:

```
webpack --config webpack.config.js
```

## Todo
* Video instead of static image
* Fog up by parts instead of all