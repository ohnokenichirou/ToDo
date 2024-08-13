const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

// ローカルストレージから取得
const todos = JSON.parse(localStorage.getItem("todos"))

// ローカルストレージから取得したデータを表示
if (todos) {
    todos.forEach(todo => {
        add(todo);
    })
}

// 入力したものを表示
form.addEventListener("submit", function (event) {
    event.preventDefault();
    add();
});

function add(todo) {
    let todoText = input.value;

    if (todo){
        todoText = todo.text;
    }

    if (todoText) {
        const li = document.createElement("li");
        li.innerText = todoText;
        li.classList.add("list-group-item");

        // 完了したものは停止線を表示
        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        }

        // 右クリックで削除する
        li.addEventListener("contextmenu", function
        (event) {
            event.preventDefault();
            li.remove();
            saveData();
        });

        // 左クリックで完了する
        li.addEventListener("click", function () {
            li.classList.toggle("text-decoration-line-through")
            saveData();
        });

        ul.appendChild(li);
        input.value = "";
        saveData();
    }
}

// ローカルストレージに保存
function saveData() {
    const lists = document.querySelectorAll("li");
    let todos = [];
    lists.forEach(list => {
        let todo = {
            text: list.innerText,
            completed: list.classList.contains("text-decoration-line-through")
        };
        todos.push(todo);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}