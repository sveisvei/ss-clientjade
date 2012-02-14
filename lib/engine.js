// Jade Client Template Engine wrapper for SocketStream 0.3

var jade = require('jade');

exports.init = function(root, config) {

  // Set global/window variable used to access templates from the browser
  var namespace = config && config.namespace || 'JT';

  return {

    name: 'Jade',

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
          compileDebug: config && config.debug !== undefined ? config.debug : false, 
          client: true,
          filename: path 
      };
      var compiledTemplate = jade.compile(template, options);
      return '/*'+ path +'*/\nwindow.' + namespace + '[\'' + id + '\'] = (' + compiledTemplate + ');\n';    
    }
  };
};