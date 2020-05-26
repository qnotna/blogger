# awfu-sose20 Angular Blogger

## Table of Contents

- [App Setup](#app-setup)
    - [Credentials](#credentials)
- [Angular](#angular)
    - [Code Scaffolding](#code-scaffolding)
    - [Build](#build)
    - [Unit Tests](#unit-tests)
    - [Further Help](#further-help)
- [Material](#material)
    - [Setup Custom Theme](#setup-custom-theme)
    - [Use Material in Project](#use-material-in-Project)
- [Introduction to Blogger-API](#introduction-to-blogger-api)

## App Setup

Clone the repository and run `npm i`.
Run `npm run start` which will be run on port 4200 on default*. 

*Note: if you want to run this on `another port`, you need to put your port into the `javascript origin domains` in the `OAuth-Client` in the Credentials page and use `port flag in package.json` when executing npm run start

### Credentials
In order to `retrieve remote blogger data` from blogger-api, you need to sign in the following `google account` on the blogger-app `after running it in your browser`:

email: bobby.brown.baker@gmail.com

pw: angular20

For this google account are two credentials given
- `API-key`: AIzaSyD0YDZhEmlsFZ62Z8BwEcWakH4oX--W0nI
- `OAuth-Client-Id`: 938430199904-pd8up38blda9839p5h6er0n2dk4afhi5.apps.googleusercontent.com

`They are already used in our blogger-app, so no concern to do anything from here.`

## Angular
### Code scaffolding

Run `ng generate component component-name` or `ng g c name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Material
### Setup Custom Theme
In order to use Material Design you need to setup a [custom theme palette in angular](https://material.angular.io/guide/theming#defining-a-custom-theme) or use a preset of a design theme.

In angular.json is a path to the custom material design theme specified.

```json
"styles": [
    "src/styles.scss",
    "src/material/blogger-app-theme.scss"
],
```
blogger-app-theme.scss:
```scss
@import '~@angular/material/theming';
@import 'blogger-color-palette.scss';
// Plus imports for other components in your app.

// Include the common styles for Angular Material. We include this here so that you only
// have to load a single css file for Angular Material in your app.
// Be sure that you only ever include this mixin once!
@include mat-core();

// Define the palettes for your theme using the Material Design palettes available in palette.scss
// (imported above). For each palette, you can optionally specify a default, lighter, and darker
// hue. Available color palettes: https://material.io/design/color/
$blogger-app-primary: mat-palette($mat-blogger);
$blogger-app-accent:  mat-palette($mat-blogger-accent);

// The warn palette is optional (defaults to red).
$blogger-app-warn:    mat-palette($mat-red);

// Create the theme object (a Sass map containing all of the palettes).
$blogger-app-theme: mat-light-theme($blogger-app-primary, $blogger-app-accent, $blogger-app-warn);

// Include theme styles for core and each component used in your app.
// Alternatively, you can import and @include the theme mixins for each component
// that you are using.
@include angular-material-theme($blogger-app-theme);

$mat-typography: mat-typography-config($font-family: "Lato");
@include angular-material-typography($mat-typography);
```
This file uses a `mat-palette` to set a primary and accent color-palette for the general theme. `Each color-palette` contains `one base color` but in `slightly darker/lighter format`, being imported from `blogger-color-palette.scss`.

You can visit [this color generator](http://mcg.mbitson.com/#!?mcgpalette0=%233f51b5) to generate color palettes like below.

And visit [this website](https://material.io/resources/color/#!/?view.left=0&view.right=0) to have a physical `look on wireframes with color palettes`.

blogger-color-palette.scss:

```scss
...
$mat-blogger: (
    50: #ECEFF1,
    100: #cfd8dc,
    200: #B0BEC5,
    300: #90A4AE,
    400: #78909C,
    500: #607D8B,
    600: #546E7A,
    700: #455A64,
    800: #37474F,
    900: #263238,
    contrast: (
        50: #000000,
        100: #000000,
        200: #000000,
        300: #000000,
        400: #000000,
        500: #ffffff,
        600: #ffffff,
        700: #ffffff,
        800: #ffffff,
        900: #ffffff,
        A100: #000000,
        A200: #000000,
        A400: #000000,
        A700: #000000,
    )
);
...
```
This shows a `scss-map` in scss, meaning `key(brightness): value(color)`. `Brightness` and `related color` which is slightly darker/lighter. `contrast` is also a map containing the `key and color` to be used `for the text to the corresponding brightness` in the map above.

### Use Material in Project
If you want to use Material Components you need to import the Angular Module from `@angular/material/...` in the project in the app.module like:
```ts
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [ ... ],
    imports: [ MatButtonModule, ... ]
    providers: [ ... ]
})
export class AppModule { }
```
`BUT` -  Lets put every Material Module in `one Material Module - material.module.ts` for readability like this in the project and import it in the `app.module.ts`:

```ts
// src/material/material.module.ts
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
...

@NgModule({
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    ...
  ],
  exports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    ...
  ]
})
export class MaterialModule { }
```
```ts
// src/app/app.module.ts
import { MaterialModule } from 'src/material/material.module';
...

@NgModule({
    declarations: [ ... ],
    imports: [ MaterialModule, ... ]
    providers: [ ... ]
})
export class AppModule { }
```

Now you can use the all the related Material stuff like directives, pipes, templates, ... in your components, e.g.:
```html
<!-- some.component.html -->
<div>
    <button mat-flat-button color="warn">I'm a material button</button>
    <!-- or -->
    <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
</div>
```
`But you need to read the related docs of the material modules on how to use it - there's many of it and some setups are pretty complex, some not.`

## Introduction to Blogger-API
For working with blogs, posts, comments, ...  from blogger-api read doc [here](https://developers.google.com/blogger/docs/3.0/using#WorkingWithBlogs).
