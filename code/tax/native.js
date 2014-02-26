var request = new XMLHttpRequest(),
    tax = {
        schedulesLoaded: false,
        schedules: [],
        loadSchedules: function () {
            var loaded = [];
            for (var i = 0; i < tax.schedules.length; i++) {
                var schedule = tax.schedules[i];
                if (loaded.indexOf(schedule.status) === -1) {

                    loaded.push(schedule.status);

                    var option = document.createElement('option');
                    option.setAttribute('value', schedule.status);
                    option.appendChild(document.createTextNode(schedule.status));

                    document.getElementById('scheduleDdl').appendChild(option);
                }
            }

        },
        selectSchedule: function() {
            var selectedSchedule = document.getElementById('scheduleDdl').value,
                income = document.getElementById('income').value;

            if (selectedSchedule && income) {
                income = parseInt(income, 10);
                for (var i = 0; i < tax.schedules.length; i++) {
                    var schedule = tax.schedules[i];
                    if (
                        schedule.status === selectedSchedule && (
                            (schedule.lowerBound < income && schedule.upperBound > income) ||
                                (schedule.lowerBound < income && schedule.upperBound === null)
                            )
                        ) {
                        if (document.getElementById('status').firstChild) { document.getElementById('status').removeChild(document.getElementById('status').firstChild); }
                        document.getElementById('status').appendChild(document.createTextNode(schedule.status));
                        if (document.getElementById('incomeRange').firstChild) { document.getElementById('incomeRange').removeChild(document.getElementById('incomeRange').firstChild); }
                        document.getElementById('incomeRange').appendChild(document.createTextNode(tax.formatCurrency(schedule.lowerBound) + ' - ' + tax.formatCurrency(schedule.upperBound)));
                        if (document.getElementById('taxRate').firstChild) { document.getElementById('taxRate').removeChild(document.getElementById('taxRate').firstChild); }
                        document.getElementById('taxRate').appendChild(document.createTextNode((schedule.taxRate * 100) + '%'));
                        if (document.getElementById('rateAppliesToAmountOver').firstChild) { document.getElementById('rateAppliesToAmountOver').removeChild(document.getElementById('rateAppliesToAmountOver').firstChild); }
                        document.getElementById('rateAppliesToAmountOver').appendChild(document.createTextNode(tax.formatCurrency(schedule.rateAppliesToAmountOver)));
                        if (document.getElementById('baseAmount').firstChild) { document.getElementById('baseAmount').removeChild(document.getElementById('baseAmount').firstChild); }
                        document.getElementById('baseAmount').appendChild(document.createTextNode(tax.formatCurrency(schedule.baseAmount)));
                        if (document.getElementById('taxTotal').firstChild) { document.getElementById('taxTotal').removeChild(document.getElementById('taxTotal').firstChild); }
                        document.getElementById('taxTotal').appendChild(document.createTextNode(tax.formatCurrency(((income - schedule.rateAppliesToAmountOver) * schedule.taxRate) + schedule.baseAmount)));
                        if (document.getElementById('formula').firstChild) { document.getElementById('formula').removeChild(document.getElementById('formula').firstChild); }
                        document.getElementById('formula').appendChild(document.createTextNode("((" + tax.formatCurrency(income) + " - " + tax.formatCurrency(schedule.rateAppliesToAmountOver) + ") x " + schedule.taxRate * 100 + "%) + " + tax.formatCurrency(schedule.baseAmount)));
                    }
                }
            }
        },
        formatCurrency: function (number) {
            return '$' + parseFloat(number).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
        }

    };

request.open("GET", "../json/FederalTaxes2013.json", true);
request.onreadystatechange = function () {
    if (request.responseText && request.responseText !== "" && !tax.schedulesLoaded) {
        try {
            tax.schedules = JSON.parse(request.responseText);
            tax.loadSchedules();
            tax.schedulesLoaded = true;
        } catch (err) {

        }
    }
};
request.send();