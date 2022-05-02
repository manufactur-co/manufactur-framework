
# Manufactur Framework

This is a css framework made by Manufactur

## Deployment

Install the npm modules first

```bash
  npm install
```

Then you can watch scss or js changes

```bash
  npm run watch
```

Or you can build all of the scss and js to /dist

```bash
  npm run watch
```
## Installation

Install Manufactur Framework via script and link tag. Manufactur js uses jQuery so make sure it is added also.

```bash
  <link rel="stylesheet" href="manufactur.css">
  
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="manufactur-min.js"></script>
```
## Usage/Examples
Components are easy to use.
### Accordion
Show/Hide contents using Accordion. This is useful for contents like FAQ wherein the title will be question and then the answer will be the accordion's content.
```javascript
<div class="accordion" data-multi-expand="false">
    <div class="accordion__item">
        <a href="#" class="accordion__title">Accordion 1</a>
        <div class="accordion__content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna 
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit 
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                occaecat cupidatat non proident, sunt in culpa qui officia 
                deserunt mollit anim id est laborum.</p>
        </div>
    </div>
    ...
</div>
```

