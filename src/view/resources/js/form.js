var Form = {
  create: function(fields, root) {
    root.innerHTML = this.buildForm(fields);
    this.setupExtensionBridge(fields);
    this.wireDataElementButtons(fields);
  },

  buildForm: function(fields) {
    return '<div class="pure-form pure-form-aligned">' +
      '<fieldset>' +
        this.buildFields(fields) +
      '</fieldset>' +
    '</div>';
  },

  buildFields: function(fields) {
    var fieldsContent = '';

    Object.keys(fields).forEach(function(fieldName) {
      fieldsContent += this.buildField(fieldName, fields[fieldName])
    }, this);

    return fieldsContent;
  },

  buildField: function(fieldName, fieldData) {
    return '<div class="pure-control-group">' +
      '<label for="' + fieldName + '">' + fieldData.title + '</label>' +
      '<input id="' + fieldName + '" type="text">' +
      '<button class="data-element-button pure-button"><i class="fa fa-database"></i></button>' +
      this.buildFieldMessage(fieldData.required) +
    '</div>';
  },

  buildFieldMessage: function(required) {
    if (required) {
      return '<span class="pure-form-message-inline">This is a required field.</span>';
    }

    return '<span class="pure-form-message-inline"></span>';
  },

  setupExtensionBridge: function(fields) {
    var fieldNames = Object.keys(fields);

    window.extensionBridge.register({
      init: function(info) {
        fieldNames.forEach(function(fieldName) {
          document.getElementById(fieldName).value = (info.settings && info.settings[fieldName]) || '';
        }, this);
      },

      getSettings: function() {
        var settings = {};

        fieldNames.forEach(function(fieldName) {
          settings[fieldName] = document.getElementById(fieldName).value || '';
        }, this);

        return settings;
      },

      validate: function() {
        var result = true;

        fieldNames.forEach(function(fieldName) {
          if (fields[fieldName].required) {
            var fieldInput = document.getElementById(fieldName);
            if (!fieldInput.value) {
              fieldInput.parentNode.classList.add('error');
              result = false;
            } else {
              fieldInput.parentNode.classList.remove('error');
            }
          }
        }, this);

        return result;
      }
    });
  },

  wireDataElementButtons: function() {
    document.querySelectorAll('.data-element-button').forEach(function (b) {
      b.addEventListener('click', this.openDataElementSelector(b.previousSibling));
    }, this);
  },

  openDataElementSelector: function(field) {
    return function() {
      window.extensionBridge.openDataElementSelector(function(dataElement) {
        field.value += dataElement;
      });
    }
  }
};
