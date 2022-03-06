async function editPostHandler(event) {
    event.preventDefault();
    const title = document.querySelector('input[name="edit-post-title"').value;
    const content = document.querySelector('textarea[name="edit-post-content"').value;
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}
document.querySelector('.edit-post-form').addEventListener('submit', editPostHandler);