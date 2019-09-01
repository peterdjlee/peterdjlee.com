window.onload = function () {
    var HttpClient = function () {
        this.get = function (aUrl, aCallback) {
            var anHttpRequest = new XMLHttpRequest();
            anHttpRequest.onreadystatechange = function () {
                if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                    aCallback(anHttpRequest.responseText);
            }

            anHttpRequest.open("GET", aUrl, true);
            anHttpRequest.send(null);
        }
    }

    var url = "https://api.github.com/users/peterdjlee/events";
    var client = new HttpClient();
    client.get(url, function (response) {
        var response = JSON.parse(response);
        var date = new Date(response[0]['created_at']);
        document.getElementById('github-activity').innerHTML = 'Last Github Activity: ' + timeago.format(date);
    });
}