const API_URL = ' http://localhost:3000/products';

function getPosts() {
    return fetch(API_URL)
        .then(response => response.json());
}

function renderPosts(posts) {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    posts.forEach(post => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
    <tr>
        <td>${post.id}</td>
        <td>${post.name}</td>
        <td>${post.price}</td>
       
    </tr>
    <button onclick="editPost(${post.id})">Edit</button>
    <button onclick="deletePost(${post.id}) ">Delete</button>
        `;
        postList.appendChild(tr);
    });
}
getPosts()
    .then(renderPosts);
//add




function addPost(post) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(response => response.json());
}

function resetForm() {
    document.getElementById('add-post-form').reset();
}

function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('title').value;
    const price = document.getElementById('body').value;
    addPost({
            name,
            price
        })
        .then(getPosts)
        .then(renderPosts)
        .then(resetForm);
}
document.getElementById('add-post-form')
    .addEventListener('submit', handleSubmit);




// update


function deletePost(id) {
    if (!window.confirm('bạn có muốn xóa không')) return;
    return fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    }).then(response => response.json());
}