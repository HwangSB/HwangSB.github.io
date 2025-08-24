let todos = [];

function initTodos() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    
    function loadTodos() {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            todos = JSON.parse(savedTodos);
        } else {
            todos = [];
        }
        showTodos();
    }
    
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2);
    }
    
    function createTodo(text) {
        return {
            id: generateId(),
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };
    }
    
    function addTodo(text) {
        if (text && text.trim()) {
            const newTodo = createTodo(text);
            todos = [newTodo, ...todos];
            saveTodos();
            showTodos();
        }
    }
    
    function toggleTodo(id) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        saveTodos();
        showTodos();
    }
    
    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        showTodos();
    }
    
    function createTodoElement(todo) {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', todo.id);
        
        li.innerHTML = `
            <span class="todo-text">${todo.text}</span>
            <div class="todo-actions">
                <button class="complete-btn" onclick="window.toggleTodo('${todo.id}')">
                    ${todo.completed ? '취소' : '완료'}
                </button>
                <button class="delete-btn" onclick="window.deleteTodo('${todo.id}')">
                    삭제
                </button>
            </div>
        `;
        
        return li;
    }
    
    function showTodos() {
        if (!todoList) return;
        
        todoList.innerHTML = '';
        
        if (todos.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'todo-item';
            emptyMessage.innerHTML = '<span class="todo-text" style="opacity: 0.7; font-style: italic;">아직 할 일이 없습니다. 새로운 할 일을 추가해보세요!</span>';
            todoList.appendChild(emptyMessage);
            return;
        }
        
        // Sort todos: incomplete first, then completed
        const sortedTodos = [...todos].sort((a, b) => {
            if (a.completed === b.completed) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return a.completed - b.completed;
        });
        
        sortedTodos.forEach(todo => {
            const todoElement = createTodoElement(todo);
            todoList.appendChild(todoElement);
        });
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        
        const text = todoInput.value.trim();
        if (text) {
            addTodo(text);
            todoInput.value = '';
            todoInput.focus();
        }
    }
    
    function clearTodoDisplay() {
        if (todoList) {
            todoList.innerHTML = '';
        }
    }
    
    if (todoForm) {
        todoForm.addEventListener('submit', handleSubmit);
    }
    
    if (todoInput) {
        todoInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                handleSubmit(event);
            }
        });
    }
    
    // This is for auth.js to call
    window.toggleTodo = toggleTodo;
    window.deleteTodo = deleteTodo;
    window.clearTodoDisplay = clearTodoDisplay;
    
    loadTodos();
}