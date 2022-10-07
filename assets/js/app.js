

var courseApi = 'http://localhost:3000/courses';

function start() {
    getCourses(renderCourses);

    handleCreateCourse();
}

start();




// Functions
function getCourses(callback) {
    fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function createCourse(data, callback) {
    options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    }
    fetch(courseApi, options)
    .then(function (response) {
            return response.json();
        })
    .then(callback)
}

function handleDeleteCourse(id) {
    options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(id),
    }
    fetch(courseApi + '/' + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function(){
            var courseItem = document.querySelector('.course-item-' + id) 
            if (courseItem) {
                courseItem.remove();
            } 
        })
}

function renderCourses(courses) {
    var ListCoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function(Course){
        return  `
            <li class="course-item-id${Course.id}"> 
                <h4>${Course.name}</h4>
                <p>${Course.content}</p>
                <button onclick="handleDeleteCourse(${Course.id})">Xóa</button>
            </li>
            `;
    }) 
    ListCoursesBlock.innerHTML = htmls.join('');
}

function handleCreateCourse() {
    var createBtn = document.querySelector('#create')

    createBtn.onclick = function () {
        var name = document.querySelector('input[name="name"]')
        var content = document.querySelector('input[name="content"]')

        var formData = {
            name: name,
            content: content,       
        }
        createCourse(formData, function(){
            getCourses(renderCourses);
        });

    }
}

