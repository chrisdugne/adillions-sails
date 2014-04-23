# CSS / Styling

## Summary

- [Don't use IDs in selectors](#dont-use-ids-in-selectors)
- [Use `em`](#use-em-for-css-lengths)
- [Use different HTML classes for CSS and JS](#use-different-html-classes-for-your-css-and-your-javascript)
- [Creating sprite](#creating-spritesheets)

## Don't use units for CSS length at 0

In CSS, length values equal to 0 don't need an unit. We shouldn't write them. Example:
```css
padding: 0;
```

## Don't use IDs in selectors

When writing CSS selectors, don't use IDs. This doesn't mean IDs are not useful. You should keep using IDs in the HTML, and in the JavaScript. But they should be avoided by any mean in the stylesheets.

The [specificity](http://www.w3.org/TR/selectors/#specificity) of IDs is one of the strongest. This makes overiding the styles of a declaration with an ID in its selector, much more difficult than it should be.

Our CSS needs to be highly reusable and for this, easily overidable. That's why we prefer classes.

## Use `em` for CSS lengths

We use `em` units when defining CSS lengths. `em` is a [font-relative length](https://developer.mozilla.org/en-US/docs/Web/CSS/length#Font-relative_lengths) based on the current size of a capital M. It has many accessiblity benefits and can help to create [resizable web components](https://medium.com/front-end-development/8f433689736f). But it can also make CSS harder to read or write. To limit this drawback, we use the [`em()` Bourbon function](http://bourbon.io/docs/#px-to-em).

**You should keep using [Bootstrap helpers classes](http://getbootstrap.com/css/#less-mixins-utility), for margin, padding, etc. when possible.**

This SCSS code…
```scss
.home-header {
  padding-top: em(65px);

}
```
… will output …
```css
.home-header {
  padding-top: 5.41667em;

}
```

Calculations are done by using a default font size of 12px. (This is our current font size on the `<body>`). If you change the font size on the element, you need to provide this new size as a second parameter of the `em()` function. (for all the lengths in the element, *but also its children*)

This SCSS code…
```scss
.btn-position-cat {
  font-size: em(17px);
  width: em(450px, 17px);

}
```
… will output …
```css
.btn-position-cat {
  font-size: 1.41667em;
  width: 26.4706em;

}
```

Even if the unit `px` for the parameters of `em()` is optional, you should add it for greater readibility.

### When not to use `em` units?

There are some situations where you can't use `em` units:

- For a `border-width` length.
- When the element uses a Sprite.

In these situations, you should use pixels.

### How to debug `em` lengths

Web Browsers translate the `em` size in pixels. You can check the rendered value with the browser's developers tools. Look at the "computed values" in the CSS tools.


## Use different HTML classes for your CSS and your JavaScript

Refactoring CSS or JavaScript becomes a very dangerous work when styles and scripts use the same HTML classes.

If you update a code you don't know and change the classname, you might break the design or the client interactions. That's why we need to use on an element with styles and scripts, two differents HTML classes, one for each job.

[Check JS client-side documentation to know how to name your JavaScript HTML classes](https://github.com/viadeo/viadeo-webapp/blob/develop/docs/client-side-js.md#how-to-name-html-classes-used-for-javascript)

## Creating spritesheets

Grunt task for converting a set of images into a spritesheet and corresponding CSS variables.

This task requires [Ruby, Sass, and Compass](https://github.com/gruntjs/grunt-contrib-compass)

**Add an image to the main sprite**
  * Copy/paste it into *"assets/images/sprites/main/"*
  * Run `grunt sprites && grunt`

**Create a new sprite**
  * Create a folder into *"assets/images/sprites/"*
  * Copy/paste images into it
  * Edit *"assets/style/sprites/package.scss"* and add your **own sprite configuration**
  * run `grunt sprites && grunt`

Results are a spritesheet and CSS : "*assets/styles/_partials/_sprites.scss*"
The partial _sprite is imported by main.scss.

Architectur:
```
├── assets/
├──── images/
├────── sprites/
├──────── main/
│         ├── icon-android.png
│         └── icon-android_hover.png
├──────── global-sc66518e1ca.png
├── styles/
├────── _partials/
│       └── _sprites.scss

```

Result:
```css
.global-icon-android {
  background-position: -76px -122px;
  height: 32px;
  width: 29px;
}
.global-icon-android:hover, .global-icon-android.icon-android_hover, .global-icon-android.icon-android-hover {
  background-position: -80px -90px;
}
...
```
