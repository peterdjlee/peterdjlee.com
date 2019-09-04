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
        var url;
        if (response[0]["type"] == "PushEvent") {
            url = "https://www.github.com/";
            url += response[0]["repo"]["name"];
            url += "/commit/"
            url += response[0]["payload"]["commits"][0]["sha"];
            document.getElementById('github-activity').innerHTML = 'Last Github Activity: <a href="'+url+'">' + timeago.format(date) + '</a>';
        } else {
            document.getElementById('github-activity').innerHTML = 'Last Github Activity: ' + timeago.format(date);
        }
    });
}