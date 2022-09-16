$.extend(window.Parsley.options, {
  focus: "first",
  excluded:
    "input[type=button], input[type=submit], input[type=reset], .search, .ignore",
  triggerAfterFailure: "change blur",
  errorsContainer: function (element) {},
  trigger: "change",
  successClass: "is-valid",
  errorClass: "is-invalid",
  classHandler: function (el) {
    return el.$element.closest(".form-group")
  },
  errorsContainer: function (el) {
    return el.$element.closest(".form-group")
  },
  errorsWrapper: '<div class="parsley-error"></div>',
  errorTemplate: "<span></span>",
})

Parsley.on("field:validated", function (el) {
  var elNode = $(el)[0]
  if (elNode && !elNode.isValid()) {
    var rqeuiredValResult = elNode.validationResult.filter(function (vr) {
      return vr.assert.name === "required"
    })
    if (rqeuiredValResult.length > 0) {
      var fieldNode = $(elNode.element)
      var formGroupNode = fieldNode.closest(".form-group")
      var lblNode = formGroupNode.find(".form-label:first")
      if (lblNode.length > 0) {
        // change default error message to include field label
        var errorNode = formGroupNode.find(
          "div.parsley-error span[class*=parsley-]"
        )
        if (errorNode.length > 0) {
          var lblText = lblNode.text()
          if (lblText) {
            errorNode.html(lblText + " is required.")
          }
        }
      }
    }
  }
})

Parsley.addValidator("restrictedCity", {
  requirementType: "string",
  validateString: function (value, requirement) {
    value = (value || "").trim()
    return value === "" || value.toLowerCase() === requirement.toLowerCase()
  },
  messages: {
    en: 'You have to live in <a href="https://www.google.com/maps/place/Jakarta">Jakarta</a>.',
  },
})
