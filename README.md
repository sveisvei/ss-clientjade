# Usage

Include Jades runtime.js in your page. https://raw.github.com/visionmedia/jade/master/runtime.js

Include this line in your app.js;
ss.client.templateEngine.use(require('ss-clientjade'));

Templates are available in the JT global namespace, var templateString = JT['templateName'](locals);