var filter = {
    filterObjectArray: function (input, objectArray) {
        var output = [],
            reg = new RegExp(input.toLowerCase());
        for(var i = 0; i < objectArray.length; i++) {
            var obj = objectArray[i];

            for (var n = 0; n < Object.keys(obj).length; n++) {
                var key = Object.keys(obj)[n],
                    value = obj[key];

                if (value.toString().toLowerCase().match(reg)) {
                    output.push(obj);
                }
            }
        }
        return output;
    }
};