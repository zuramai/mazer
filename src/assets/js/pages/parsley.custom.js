  Parsley.addValidator('restrictedCity', {
    requirementType: 'string',
    validateString: function(value, requirement)  {
      value = (value || "").trim();
      return value === "" || value.toLowerCase() === requirement.toLowerCase();
    },
    messages: {
      en: 'You have to live in <a href="https://www.google.com/maps/place/Jakarta">Jakarta</a>.'
    }
  });
