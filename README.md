# Progressive Web Apps (PWA) derived from [bpmn-js](https://github.com/bpmn-io/bpmn-js)
I added the PWA functionalities (strategy offline first) to the great bpmn-js library to allow:

- offline BPMN editing
- self-updating web app when back online if a new version is published on the server side

So simple as that...but very useful.
All the best and enjoy!

## Using

### As a web app

Just copy/paste the public folder to your web server and call the corresponding URL from your favorite browser.
Then you can go offline whenever you want and continue to create BPMN diagrams.
[Demo available here](https://bpmn.bienpratique.fr)

### As a standalone web app

Just copy/paste the public folder to your workstation and open the index.html file within your favorite browser.

Caution: this way of using the wep app can be deprecated at any time because of web browser security concerns.


## Building

You need a [NodeJS](http://nodejs.org) development stack with [npm](https://npmjs.org) installed to build the project.

To install all project dependencies execute

```
npm install
```

Build the application via

```
npm run all
```

You may also spawn a development setup by executing

```
npm run dev
```

Both tasks generate the distribution ready client-side modeler application into the `public` folder.

Serve the application locally or via a web server (nginx, apache, embedded).

## Changelog

V0.1
First version based on V8.9.1 from bpmn-js


## Licensing

This project for a Progressive Web App is under GNU LESSER GENERAL PUBLIC LICENSE Version 3, 29 June 2007 

## 3rd parties copyrights

It embbeds the great library from [bpmn-js](https://github.com/bpmn-io/bpmn-js) which is under the following licence:

      
Copyright (c) 2014-present Camunda Services GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in the
Software without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

The source code responsible for displaying the bpmn.io project watermark that
links back to https://bpmn.io as part of rendered diagrams MUST NOT be
removed or changed. When this software is being used in a website or application,
the watermark must stay fully visible and not visually overlapped by other elements.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER DEALINGS IN THE SOFTWARE.
      
    

