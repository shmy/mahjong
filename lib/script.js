;(function () {
  var _ = {
    scrollTop: function() {
      $('#content').prop('scrollTop', 0);
    },
    toast: function (message) {
      var toast = $('<span class="toast">' + message + '</span>');
      $(document.body).append(toast);
      setTimeout(() => {
        toast.remove();
      }, 3000);
    },
    createForm: function (options) {
      var events = {};

      function createSelect(field, value) {
        var select = $('<select class="form-item-control" id="' + field.name + '" name="' + field.name + '" />');
        field.extra.options.forEach(function (option) {
          var selected = option.value === value ? 'selected' : '';
          select.append($('<option ' + selected + ' value="' + option.value + '">' + option.label + '</option>>'))
        });
        return select;
      }

      function render(decidedValues) {
        var form = $('<form></form>');
        var fieldset = $('<fieldset></fieldset>')
        fieldset.append($('<legend>' + options.title + '</legend>'))
        options.fields.forEach(function (field) {
          var formItem = $('<div class="form-item"></div>');
          formItem.append($('<label class="form-item-label" for="' + field.name + '">' + field.label + '：</label>'));
          var value = decidedValues[field.name] || '';
          switch (field.type) {
            case 'input':
              formItem.append($('<input value="' + value + '" class="form-item-control" id="' + field.name + '" name="' + field.name + '" />'));
              break;
            case 'select':
              formItem.append(createSelect(field, value));
              break;
            case 'textarea':
              formItem.append($('<textarea rows="3" class="form-item-control" id="' + field.name + '" name="' + field.name + '">' + value + '</textarea>'));
              break;
            default:
              break;
          }
          fieldset.append(formItem);
        });
        var button = $('<button class="primary fluid">' + options.submitTitle + '</button>');
        button.on('click', function (evt) {
          evt.preventDefault();
          events.submit && events.submit(Qs.parse(form.serialize()));
        });
        fieldset.append(button);
        form.append(fieldset);
        options.container.html('');
        options.container.append(form);
      }

      render(options.defaultValues);
      return {
        on: function (eventName, handler) {
          events[eventName] = handler;
        },
        destroy: function () {
          events = {};
          options.container.html('');
        },
        reset: function () {
          render(options.defaultValues);
        },
        updateValues: function (values) {
          render(values);
        }
      };
    }
  };
  window._ = _;
})(document, window);
