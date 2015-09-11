var jquery = {
    presidents: [],
    origPresidents: [],
    renderPresidents: function () {
        var rows = "",
            tbody = $('#jqueryTable');
        $(tbody).empty();

        $.each(this.presidents, function (index, president) {
            rows = rows +
                '<tr>' +
                '<td data-header="First Name">' + president.firstName + '</td>' +
                '<td data-header="Last Name">' + president.lastName + '</td>' +
                '<td data-header="Order">' + president.order + '</td>' +
                '<td data-header="Years">' + president.years + '</td>' +
                '<td data-header="Birth Place">' + president.birthplace + '</td>' +
                '<td data-header="Party">' + president.party + '</td>' +
                '</tr>';
        });

        $(tbody).append(rows);
    },
    filter: function () {
        jquery.presidents = jquery.origPresidents;
        var val = $('#filter').val();
        if (val && val !== '') {
            jquery.presidents = filter.filterObjectArray(val, this.presidents);
        }
        jquery.renderPresidents();
    },
    loadPresidents: function () {
        $.ajax('../json/USPresidents.json').done(function (data) {
            jquery.presidents = data;
            jquery.origPresidents = data;
            jquery.renderPresidents();
        });
    }
};

jquery.loadPresidents();