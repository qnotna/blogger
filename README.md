# awfu-sose20 Angular Blogger

## Table of Contents

- [App Setup](#app-setup)
    - [Credentials](#credentials)
- [Angular](#angular)
    - [Code Scaffolding](#code-scaffolding)
    - [Routing](#routing)
        - [Routing Setup](#routing-setup)
        - [Trigger Navigation Event](#trigger-navigation-event)
        - [Retrieve Parameters](#retrieve-parameters)
    - [Observables](#observables)
        - [Usage](#usage)
        - [Change retrieved resources](#change-retrieved-resources)
        - [Use with Async Pipe](#use-with-async-pipe)
    - [Build](#build)
    - [Unit Tests](#unit-tests)
    - [Further Help](#further-help)
- [Material](#material)
    - [Setup Custom Theme](#setup-custom-theme)
    - [Use Material in Project](#use-material-in-Project)
- [Blogger-API](#blogger-api)
    - [License](#license)

## App Setup

Clone the repository and run `npm i`.
Run `npm run start` which will be run on port 4200 by default. 

### Credentials
In order to `retrieve remote blogger data` from blogger-api, you need to sign in the following `google account` on the blogger-app `after running it in your browser`:

email: bobby.brown.baker@gmail.com

pw: angular20

You can test it with your own google account, but you need to have already given blogger data which you can create at blogger.com.

## Angular
### Code scaffolding

Run `ng generate component component-name` or `ng g c name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

For `ng generate component` a `path for the component` can also be passed to the command.
Let's say we have this scaffold:
```
app
 └─ features
      └── header
      └── main
```
And you want to generate a new feature called post-overview. Then you can run `ng generate component featues/post-overview` whereas app is the rootDir.

### Routing
Read more about Angular Router Docs [here](https://angular.io/guide/router).
#### Routing Setup
In order to route between components in angular you need to setup:
- app-routing.module.ts
- route triggering (programmatically or in-template)

You need to `add your component` in the `routes object`, which will be passed to the `RouterModule`. The Module will tell Angular where to when the route changes in the app.

app-routing.module.ts:
```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YourComponent } from './path/to/component';
import { YourIdComponent } from './path/to/component';


const routes: Routes = [
    ...,
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
    ...
  {
    path: 'blogs/:id/posts',
    component: PostOverviewComponent
  },
  { path: '**', redirectTo: '' },
  ...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

Then you need to put the `<router-outlet></router-outlet>` html tag in an angular template. This tells Angular where to `display/show your component`, if the route is triggered. In our project `app.component.ts` contains this tag and the `main.component.ts`.

app.component.ts:
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor() {}
}
```
#### Trigger Navigation Event
In order to `trigger a navigate event` Angular has a `built-in router service` providing navigation and url-manipulation which can be injected in every component.
In our project `main.component.ts` is the container component and handles all `route navigations/events`.

main.component.ts:
```ts
import { Router } from '@angular/router';
...

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(private router: Router) {}
    ...

  onBlogChange(selectedBlogId: string) {
    this.router.navigate([`/blogs/${selectedBlogId}/posts`]);
  }
  ...
}
```

When blogChanged event is triggered, call onBlogChange(...).

main.component.html:
```html
<app-header
    ...
    (blogChanged)="onBlogChange($event)"
    ...
></app-header>
...
```

#### Retrieve Parameters

If you want to retrieve the blogId in the PostOverviewComponent (where it routes after navigation is triggered, look up in app-routing.module.ts) you need to inject the ActivatedRoute class to the component receiving the paramter(s).

post-overview.component.ts:
```ts
import { ActivatedRoute } from '@angular/router';
...

@Component({
    ...
})
PostOverviewComponent implements OnInit{

    constructor(private currentRoute: ActivatedRoute) {}

    ngOnInit() {
        this.currentRoute.params.subscribe((yourParams) => {
            //... do sth w/ yourParams
        })
    }
}
```

### Observables

#### Usage
Read more about RxJs Observalbes [here](https://rxjs-dev.firebaseapp.com/guide/overview).

Observables are essential in order to let the app `work asynchronous`.
As the name suggests, an observable can watch over a resource and will be `triggered if this resource is changing` - just as a newsletter.

For e.g.:
```ts
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
...

@Component({
    ...
})
export class TestObservablesComponent implements OnInit {
    // property observable wrapping a string value;
    obs$: Observable<string>;
    ...
    ngOnInit() {
        // of operator returns an observable containing a value (could be number, object, array, ...)
        this.obs$ = of('this is a string value');
        // subscribing to an observable will listen and trigger it when value changes.
        this.obs$.subscribe(
            // subscribe takes a callback, in which you can use the retrieved value
            (value: string) => {
                // resolves to 'this is a string value'
                console.log(value);
            }
        );
    }
}
```

Subscribe also takes `3 arguments`: `1st` - as seen above, a function to call when `value changes`, `2nd` - function, when `receiving error`, `3rd` - function, when observable is `completed` respectively the stream ends (So if the value changes and was emitted like above, the completed function will be called).
```ts
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';

...

@Component({
    ...
})
export class TestObservablesComponent implements OnInit {
    // property observable wrapping a string value;
    obs$: Observable<string>;
    ...
    ngOnInit() {
        // throwError operator return an error wrapped in observable
        this.obs$ = throwError(401);
        this.obs$
            .subscribe(
                // What to do when value changes
                (value: string) => console.log(value),
                // What to do on error, return type err depends on what you return as error
                (err: number) => console.log(err),
                // What to do if stream is over or value was emitted
                () => console.log('completed')
            );
    }

}
```

#### Change retrieved resources

You can `change and manipulate the values` of observables by using the `pipe function` on them which allows you to work with `operators` within the observable.

`.pipe()` acts like a `middleware` or like a layer where `every value` is gonna go through, `no matter if it's emitted or not`.

Read more about RxJs operators [here]().

RxJs provides many `operators` to `manipulate values`, handling errors, ... and the observable itself.

```ts
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
...

@Component({
    ...
})
export class TestObservablesComponent implements OnInit {
    obs$: Observable<string>;
    ...
    ngOnInit() {
        this.obs$ = of('this is a string value');
        this.obs$
            .pipe(
                // map operator opens up the observable stream and retrieves the current value in a callback function
                // the value resolves to 'this is a string value'
                // Of course it needs to return an observable which will be then subscribed later on to output the modified value
                map((val: string) => {
                    return of(val, 'which was modified')
                })
            )
            .subscribe(
                // prints 'this is a string value which was modified'
                (val: string) => console.log(val)
            );
    }
}
```

#### Use with Async Pipe

A cool thing to use is: Using observables w/ the async pipe in the template. The async pipe will handle the subscription and the unsubscription of the observable automatically.

main.component.html:
```html
<app-header
    ...
    [blogs]="blogs$ | async"
    ...
></app-header>
```
main.component.ts:
```ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blogs.model';
import { ApiWebService } from 'src/app/api/api.web.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  blogs$: Observable<Blog[]>;
  ...

  constructor(private api: ApiWebService) {}

  ngOnInit() {
      // the api call return an observable wrapping an array of blogs
    this.blogs$ = this.api.getBlogsByUser();
  }
  ...
```

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io/).

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
// Visit http://mcg.mbitson.com/#!?mcgpalette0=%233f51b5 to generate color palettes like below 
// Visit https://material.io/resources/color/#!/?view.left=0&view.right=0 to customize your own design themes

$mat-blogger: (
    50 : #e9e9e9,
    100 : #c7c9c8,
    200 : #a2a5a4,
    300 : #7d817f,
    400 : #616663,
    500 : #454b48,
    600 : #3e4441,
    700 : #363b38,
    800 : #2e3330,
    900 : #1f2321,
    A100 : #76f8b7,
    A200 : #45f59d,
    A400 : #08ff84,
    A700 : #00ee77,
    contrast: (
        50 : #000000,
        100 : #000000,
        200 : #000000,
        300 : #ffffff,
        400 : #ffffff,
        500 : #ffffff,
        600 : #ffffff,
        700 : #ffffff,
        800 : #ffffff,
        900 : #ffffff,
        A100 : #000000,
        A200 : #000000,
        A400 : #000000,
        A700 : #000000,
    )
);

$mat-blogger-accent: (
    50 : #f7eae2,
    100 : #ebcab8,
    200 : #dea788,
    300 : #d08458,
    400 : #c66935,
    500 : #bc4f11,
    600 : #b6480f,
    700 : #ad3f0c,
    800 : #a5360a,
    900 : #972605,
    A100 : #ffcdc3,
    A200 : #ffa290,
    A400 : #ff785d,
    A700 : #ff6343,
    contrast: (
        50 : #000000,
        100 : #000000,
        200 : #000000,
        300 : #000000,
        400 : #ffffff,
        500 : #ffffff,
        600 : #ffffff,
        700 : #ffffff,
        800 : #ffffff,
        900 : #ffffff,
        A100 : #000000,
        A200 : #000000,
        A400 : #000000,
        A700 : #000000,
    )
);

$mat-blogger-warn: (
    50 : #f7eae2,
    100 : #ebcab8,
    200 : #dea788,
    300 : #d08458,
    400 : #c66935,
    500 : #bc4f11,
    600 : #b6480f,
    700 : #ad3f0c,
    800 : #a5360a,
    900 : #972605,
    A100 : #ffcdc3,
    A200 : #ffa290,
    A400 : #ff785d,
    A700 : #ff6343,
    contrast: (
        50 : #000000,
        100 : #000000,
        200 : #000000,
        300 : #000000,
        400 : #ffffff,
        500 : #ffffff,
        600 : #ffffff,
        700 : #ffffff,
        800 : #ffffff,
        900 : #ffffff,
        A100 : #000000,
        A200 : #000000,
        A400 : #000000,
        A700 : #000000,
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

Now you can use the all the related Material stuff like `directives, pipes, templates, ...` in your components.

Use `color` attribute on mat-components and as value: `primary`, `accent` or `warn` to apply color theme on mat-components.
```html
<!-- some.component.html -->
<div>
    <button mat-flat-button color="warn">I'm a material button</button>
    <!-- or -->
    <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
</div>
```
`But you need to read the related docs of the material modules on how to use it - there's many of it and some setups are pretty complex, some not.`

### Blogger-API
For working with blogs, posts, comments, ...  from blogger-api read doc [here](https://developers.google.com/blogger/docs/3.0/using#WorkingWithBlogs).

## License
We are using [Blogger API v3](https://developers.google.com/blogger) from Google.