const jsonData = [
    {
        "name": "John Doe",
        "age": 30,
        "city": "New York"
    },
    {
        "name": "Jane Smith",
        "age": 25,
        "city": "London"
    },
    {
        "name": "Bob Johnson",
        "age": 40,
        "city": "Osaka"
    }
];

function displayJSONData(data) {
    var outputDiv = document.getElementById("output");
    var html = "";

    for (var i = 0; i < data.length; i++) {
        html += "<p>Name: " + data[i].name + "</p>";
        html += "<p>Age: " + data[i].age + "</p>";
        html += "<p>City: " + data[i].city + "</p>";
        html += "<hr>";
    }

    outputDiv.innerHTML = html;
}

// JSONデータの表示を実行
displayJSONData(jsonData);