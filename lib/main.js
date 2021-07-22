var provider = require('./provider.js')
var fs = require('fs');
var path = require('path');
var currentFilePath = require('./getCurrentPath')

module.exports = {
  provider: null,
  
  activate() {
    return provider.loadCompletions();
  },
  
  deactivate() {
    this.provider = null
  },
  
  provide() {
    var cwd = currentFilePath()
    if(!cwd) {
      // no path exit early
      return null
    }
    // look for `completions.json` in the current projects root directory
    var completionsPath = (cwd[0]) ? path.resolve(cwd[0], 'completions.json') : ''
    if (fs.existsSync(completionsPath)) {
      this.provider = provider
      return this.provider
    } else {
      return null
    }
  }
}
