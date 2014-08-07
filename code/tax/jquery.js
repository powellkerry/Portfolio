var tax = {
    schedules: [],

    loadSchedules: function () {
        $.ajax('../json/FederalTaxes2013.json').success(function (data) {
            tax.schedules = data;
            tax.populateScheduleSelector();
        });
    },

    populateScheduleSelector: function () {
        var usedSchedules = [],
            options = "";
        $.each(tax.schedules, function (index, schedule) {
            if (usedSchedules.indexOf(schedule.status) === -1) {
                usedSchedules.push(schedule.status);
                options = options + '<option value="' + schedule.status + '">' + schedule.status + '</option>';
            }
        });
        $('#scheduleDdl').append(options);
    },

    selectSchedule: function () {
        var selectedSchedule = $('#scheduleDdl').val(),
            income = $('#income').val();

        if (selectedSchedule && income) {
            income = parseInt(income, 10);
            $.each(tax.schedules, function (index, schedule) {
                if (
                    schedule.status === selectedSchedule && (
                        (schedule.lowerBound < income && schedule.upperBound > income) ||
                        (schedule.lowerBound < income && schedule.upperBound === null)
                    )
                ) {
                    $('#status').text(schedule.status);
                    $('#incomeRange').text(tax.formatCurrency(schedule.lowerBound) + ' - ' + tax.formatCurrency(schedule.upperBound));
                    $('#taxRate').text((schedule.taxRate * 100) + '%');
                    $('#rateAppliesToAmountOver').html(tax.formatCurrency(schedule.rateAppliesToAmountOver));
                    $('#baseAmount').text(tax.formatCurrency(schedule.baseAmount));
                    $('#taxTotal').text(tax.formatCurrency(((income - schedule.rateAppliesToAmountOver) * schedule.taxRate) + schedule.baseAmount));
                    $('#formula').text("((" + tax.formatCurrency(income) + " - " + tax.formatCurrency(schedule.rateAppliesToAmountOver) + ") x " + schedule.taxRate * 100 + "%) + " + tax.formatCurrency(schedule.baseAmount));
                }
            });
        }
    },

    formatCurrency: function (number) {
        return '$' + parseFloat(number).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
    }
};
tax.loadSchedules();