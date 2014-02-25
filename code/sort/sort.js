var sort = {

    /*
     Sort an object array based on the config provided
     @inputArray the array of objects to be sorted
     @fields an array of configuration objects in the format:
      {field: 'fieldName', direction: 'direction to sort (ASC or DESC)'}
     returns a new sorted array
     */

    sortObjectArray: function (inputArray, fields) {
        var me = this,
            sortedArray = inputArray;
        if (fields.length > 0) {
            sortedArray = sortedArray.sort(function (a, b) {
                var value = 0,
                    i = 0;
                while (value == 0 && i < fields.length) {
                    value = me.getSortValue(a,b,fields[i]);
                    i++;
                }
                return value;
            });
        }
        return sortedArray;
    },

    /*
     Function to return the value used by the sort method
     @a the first object to compare
     @b the second object to compare
     @config the configuration object containing:
      {field: 'fieldName', direction: 'direction to sort (ASC or DESC)'}
     returns 0 if the same, 1 if the object needs to be moved down,
     and -1 if the object needs to be moved up
     */

    getSortValue: function(a,b,config) {
        if (a[config.field] < b[config.field]) {
            return config.direction == 'ASC' ? -1 : 1;
        } else if (a[config.field] > b[config.field]) {
            return config.direction == 'ASC' ? 1 : -1;
        } else {
            return 0
        }
    }
}