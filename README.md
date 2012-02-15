# Usage

Include Jades runtime.js in your page. https://raw.github.com/visionmedia/jade/master/runtime.js

Include this line in your app.js;
ss.client.templateEngine.use(require('ss-clientjade'));


Dont name your templates .jade, use e.g. .html instead, or socketstream will compile before this plugin does its work.
Templates are available in the JT global namespace, var templateString = JT['templateName'](locals);