const PrototypeUpdates = function() {
  String.prototype.capitalizeFirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  String.prototype.capitalizeComplete = function() {
    return this.split(' ')
      .map(str => str.charAt(0).toUpperCase() + str.slice(1))
      .join(' ');
  };

  String.prototype.format = function() {
    var args = arguments;
    var sprintfRegex = /\{(\d+)\}/g;
    var sprintf = function(match, number) {
      return number in args ? args[number] : match;
    };
    return this.replace(sprintfRegex, sprintf);
  };
};

PrototypeUpdates();
