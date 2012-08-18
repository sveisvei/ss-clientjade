// Jade Client Template Engine wrapper for SocketStream 0.3
var jade = require('jade');
var pathlib = require('path');

exports.init = function(root, config) {

  // Set global/window variable used to access templates from the browser
  var namespace = config && config.namespace || 'JT';
  var self      = config && config.self      || false;

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
          client       : true,
          filename     : path,
          self         : self
      };
      var compiledTemplate = jade.compile(template, options);
      return '\nwindow.' + namespace + '[\'' + id + '\'] = (' + compiledTemplate + ');\n';    
    }
  };
};