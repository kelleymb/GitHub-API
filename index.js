function getUserHandle(username) {
    const url = `https://api.github.com/users/${username}/repos`
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayUser(responseJson, username))
        .catch(error => {
            errorDisplay(error.message);
        });
}

function userSubmission() {
    $('form').submit(event => {
        event.preventDefault();
        const username = $('#handle').val();
        console.log(username);
        getUserHandle(username);
    });
}

function displayUser(responseJson, username) {
    $('.results').empty();
    $('.list').empty();
    $('.results').html(`<h3>User Handle: ${username}</h3>
    <h3>Repos: ${responseJson.length}</h3>`);
    for (let i = 0; i < responseJson.length; i++) {
        $('.list').append(`
        <li><a href="${responseJson[i].html_url}" target="_blank">
        <h3>${responseJson[i].name}</h3></a>
        </li><p class="description">${responseJson[i].description}</p><br>
        `
    )};
}
    
function errorDisplay(error) {
    $('.error').html(`<h3>Error has occured:${error}</h3>`)
}

$(userSubmission);