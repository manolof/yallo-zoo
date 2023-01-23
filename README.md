# YalloZoo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.2.

## Interview Exercise Info

### Tailwind

I am using Tailwind which I read that the team is also using in the job description.

The design is implemented taking a pragmatic approach and using the grid system of Tailwind.

Color palette is coming from Tailwind.

### Http calls and caching

In the http interceptor I have implemented a rudimentary cache mechanism, so that we don't hit the endpoint many times unnecessarily.

In the `getAnimals` method of `HttpService`, I have the option to force refresh.

This is not perfect, but serves its purpose.

### Testing

Unit tests have been added, using Jest.

### Closing remarks

In a more ideal scenario, I would've worked more on:
Accessibility, responsive menus, responsive images, improving tests
