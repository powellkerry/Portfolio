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
                '<td>' + president.firstName + '</td>' +
                '<td>' + president.lastName + '</td>' +
                '<td>' + president.order + '</td>' +
                '<td>' + president.years + '</td>' +
                '<td>' + president.birthplace + '</td>' +
                '<td>' + president.party + '</td>' +
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