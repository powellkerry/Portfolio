var request = new XMLHttpRequest(),
    native = {
        presidents: [],
        sortConfig: [
            {
                field: 'order',
                direction: 'ASC'
            }
        ],
        renderPresidents: function() {
            var table = document.getElementById('nativeTable');

            while(table.firstChild) {
                table.removeChild(table.firstChild);
            }

            for(var i = 0; i < this.presidents.length; i++) {
                var president = this.presidents[i],
                    row = document.createElement('tr'),
                    firstName = document.createElement('td'),
                    lastName = document.createElement('td'),
                    order = document.createElement('td'),
                    years = document.createElement('td'),
                    birthplace = document.createElement('td'),
                    party = document.createElement('td');


                firstName.appendChild(document.createTextNode(president.firstName));
                lastName.appendChild(document.createTextNode(president.lastName));
                order.appendChild(document.createTextNode(president.order));
                years.appendChild(document.createTextNode(president.years));
                birthplace.appendChild(document.createTextNode(president.birthplace));
                party.appendChild(document.createTextNode(president.party));


                row.appendChild(firstName);
                row.appendChild(lastName);
                row.appendChild(order);
                row.appendChild(years);
                row.appendChild(birthplace);
                row.appendChild(party);
                row.classList.add('president');

                table.appendChild(row);
            }
        },
        sort: function(event, key) {
            var found = false;
            for(var i=0; i < this.sortConfig.length; i++) {
                var obj = this.sortConfig[i];
                if (obj.field == key) {
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
        }
    };


request.open("GET", "/code/json/USPresidents.json", true);
request.onreadystatechange = function () {

    if (request.responseText && request.responseText != "") {
        try {
            native.presidents = JSON.parse(request.responseText);
            native.renderPresidents();
        } catch (err) {
            //console.warn('failed to load:'+request.responseText);
        }
    };
};
request.send();