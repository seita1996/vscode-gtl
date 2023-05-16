const jsonData = [
    {
        id: 1,
        repository: 'this is repository name',
        unreadCount: 4,
        title: 'this is title',
        type: 'MR',
        avatar: 'https://avatars.githubusercontent.com/u/19267892?v=4',
        notificatonType: 'you are assigned',
        url: 'https://gitlab.com',
    },
    {
        id: 2,
        repository: 'this is repository name2',
        unreadCount: 1,
        title: 'this is title2',
        type: 'Issue',
        avatar: 'https://avatars.githubusercontent.com/u/19267892?v=4',
        notificatonType: 'you are mentioned',
        url: 'https://google.com',
    },
];

function displayJSONData(data) {
    var outputDiv = document.getElementById("output");
    var html = "";

    for (var i = 0; i < data.length; i++) {
        html += `
            <div class="card linkbox">
                <div class="card-header">
                    <div class="flex-between mb-4">
                        <div class="notification__repository">
                            ${data[i].repository}
                        </div>
                        <div class="notification__badge">
                            ${data[i].unreadCount}
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="flex-start mb-4">
                        <div class="notification__icon mr-4">
                            <img src="${data[i].avatar}" alt="Avatar" />
                        </div>
                        <div class="notification__title">
                            ${data[i].title}
                        </div>
                    </div>
                    <div class="flex-start">
                        <div class="notification__tag mr-4">
                            ${data[i].type}
                        </div>
                        <div class="notification__type">
                            ${data[i].notificatonType}
                        </div>
                    </div>
                </div>
                <a href="${data[i].url}"></a>
            </div>
        `;
    }

    outputDiv.innerHTML = html;
}

displayJSONData(jsonData);