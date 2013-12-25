// Jade Client Template Engine wrapper for SocketStream 0.3
var jade = require('jade');
var pathlib = require('path');
var fs = require('fs');
var UglifyJS = require("uglify-js");

exports.init = function(root, config) {

  // Set global/window variable used to access templates from the browser
  var namespace = config && config.namespace || 'JT';
  var self      = config && config.self      || false;
  var debug     = config && config.debug ? config.debug : false;
  var globals   = config && config.globals   || [];
  
  var jadeRuntimePath = pathlib.join(pathlib.dirname(require.resolve('jade')), 'runtime.js');  
  var clientCode;

  if (debug) {
    var result = UglifyJS.minify(jadeRuntimePath);
    clientCode = result.code;  
  } else {
    clientCode = fs.readFileSync(jadeRuntimePath,'utf8');  
  }

  root.client.send('lib', 'clientjade-template', clientCode, {minified: debug});

  return {

    name: 'Jade',

    selectFormatter: function(path, formatters, defaultFormatter){
        if (pathlib.extname(path).toLowerCase() === '.jade') {
            return false;
        }
        return defaultFormatter;
    },

    // Opening code to use when a template is called for the first time
    prefix: function() {
      return '<script type="text/javascript">if(!window.' + namespace + '){window.' + namespace + ' = {};}';
    },

    // Closing code once all templates have been written into the <script> tag
    suffix: function() {
      return '</script>';
    },

    // Compile template into a function and attach to window.<windowVar>
    process: function(template, path, id) {
      var options = { 
          compileDebug : config && config.debug !== undefined ? config.debug : false, 
          filename     : path,
          self         : self,
          globals      : globals
      };
      var compiledTemplate = jade.compileClient(template, options);
      return '\nwindow.' + namespace + '[\'' + id + '\'] = (' + compiledTemplate + ');\n';    
    }
  };
};
