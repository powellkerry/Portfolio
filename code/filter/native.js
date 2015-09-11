var request = new XMLHttpRequest(),
    native = {
        presidents: [],
        origPresidents: [],
        renderPresidents: function () {

            var table = document.getElementById('nativeTable');

            while (table.firstChild) {
                table.removeChild(table.firstChild);
            }

            for (var i = 0; i < this.presidents.length; i++) {
                var president = this.presidents[i],
                    row = document.createElement('tr'),
                    firstName = document.createElement('td'),
                    lastName = document.createElement('td'),
                    order = document.createElement('td'),
                    years = document.createElement('td'),
                    birthplace = document.createElement('td'),
                    party = document.createElement('td');

                firstName.setAttribute('data-header', 'First Name');
                lastName.setAttribute('data-header', 'Last Name');
                order.setAttribute('data-header', 'Order');
                years.setAttribute('data-header', 'Years Served');
                birthplace.setAttribute('data-header', 'Birth State');
                party.setAttribute('data-header', 'Party');

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
        filter: function() {
            native.presidents = native.origPresidents;
            var val = document.getElementById('filter').value;
            if (val && val !== '') {
                this.presidents = filter.filterObjectArray(val, this.presidents);
            }
            this.renderPresidents();
        }
    };

request.open("GET", window.location.origin + 
                    window.location.pathname.substr(0, window.location.pathname.indexOf('/code')) +
                    "/code/json/USPresidents.json", true);
request.onreadystatechange = function () {

    if (request.responseText && request.responseText !== "") {
        try {
            var presidents = JSON.parse(request.responseText);
            native.presidents = presidents;
            native.origPresidents = presidents;
            native.renderPresidents();
        } catch (err) {

        }
    }
};
request.send();