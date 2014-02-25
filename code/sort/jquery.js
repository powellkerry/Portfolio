var jquery = {
    presidents: [],
    sortConfig: [{
        field: 'order',
        direction: 'ASC'
    }],
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
    sort: function (event, key) {
        var found = false;
        for (var i=0; i < this.sortConfig.length; i++) {
            var obj = this.sortConfig[i];
            if (obj.field === key) {
                found = true;
                if (event.target.classList.contains('asc')) {
                    event.target.classList.remove('asc');
                    this.sortConfig.splice(i, 1);
                } else if (event.target.classList.contains('desc')) {
                    event.target.classList.add('asc');
                    event.target.classList.remove('desc');
                    this.sortConfig[i].direction = 'ASC';
                } else {
                    event.target.classList.add('desc');
                    this.sortConfig[i].direction = 'DESC';
                }
            }
        }
        if (!found) {
            event.target.classList.add('desc');
            this.sortConfig.push({
                direction: 'DESC',
                field: key
            });
        }
        this.presidents = sort.sortObjectArray(this.presidents, this.sortConfig);
        this.renderPresidents();
    },
    loadPresidents: function() {
        $.ajax('../json/USPresidents.json').done(function(data) {
            jquery.presidents = data;
            jquery.renderPresidents();
        });
    }
};
jquery.loadPresidents();