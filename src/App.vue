<template>
    <div id="app">
        <TodoHeader></TodoHeader>
        <TodoInput v-on:addTodo="addTodo"></TodoInput>

        <TodoList class="favorite-todo-list" type="favorite" v-bind:todoLists="favoriteTodoItems" @removeTodo="removeTodo" @modifyTodo="modifyTodo" @modifyIsDone="modifyIsDone">
            <h3 slot="header">favorite todo list</h3>
        </TodoList>

        <TodoList v-bind:todoLists="todoItems" type="normal" @removeTodo="removeTodo" @modifyTodo="modifyTodo" @modifyIsDone="modifyIsDone">
            <h3 slot="header">todo list</h3>
        </TodoList>

        <TodoFooter v-on:removeAll="clearAll"></TodoFooter>
    </div>
</template>

<script>
    import TodoHeader from './components/TodoHeader.vue'
    import TodoInput from './components/TodoInput.vue'
    import TodoList from './components/TodoList.vue'
    import TodoFooter from './components/TodoFooter.vue'

    export default {
        data() {
            return {
                localStorageItemKey: 'item',
                allTodoItems: [],
                favoriteTodoItems: [],
                todoItems: [],
            }
        },
        methods: {
            clearAll() {
                this.allTodoItems = [];
                this.localStorageUpdate();
            },

            addTodo(todoItem) {
                console.log('addTodo', todoItem);

                let tempTodoItem = {
                    'id': this.getNextId(),
                    'todo': todoItem,
                    'isFavorite': 0,
                    'isDone': 0,
                    'priority': this.getNextPriority()
                };

                this.allTodoItems.push(tempTodoItem);
                this.localStorageUpdate();
            },

            modifyTodo(id, todo) {
                this.allTodoItems[this.getItemIndex(id)].todo = todo;
                this.localStorageUpdate();
            },

            modifyIsDone(id, isDone) {
                this.allTodoItems[this.getItemIndex(id)].isDone = isDone;
                this.localStorageUpdate();
            },

            getItemIndex(id) {
                for(let i = 0; i < this.allTodoItems.length; i++) {
                    if (this.allTodoItems[i].id == id) {
                        return i;
                    }
                }
            },

            removeTodo(todoItemId) {
                this.allTodoItems.splice(this.getItemIndex(todoItemId), 1);
                this.localStorageUpdate();
            },

            localStorageUpdate() {
                localStorage.setItem(this.localStorageItemKey, JSON.stringify(this.allTodoItems));
            },

            getNextId() {
                let allTodoItemLength = this.allTodoItems.length;

                if (allTodoItemLength > 0) {
                    return this.allTodoItems[allTodoItemLength -1].id + 1;
                } else {
                    return 1;
                }
            },

            getNextPriority() {
                let todoItemLength = this.todoItems.length;
                let tempMaxPriority = 0;

                for (let i = 0; i < todoItemLength ; i++) {
                    if (this.todoItems[i].priority > tempMaxPriority) {
                        tempMaxPriority = this.todoItems[i].priority;
                    }
                }

                return tempMaxPriority + 1;
            },

            settingItems(data) {
                console.log(data);

                let tempFavoriteTodoItems, tempTodoItems = [];

                for (let i = 0; i < data.length; i++) {
                    if (data[i].isFavorite) {
                        tempFavoriteTodoItems.push(data[i]);
                    } else {
                        tempTodoItems.push(data[i]);
                    }
                }

                tempTodoItems.sort(function (a, b) {
                    if (a.priority < b.priority) {
                        return 1;
                    }

                    return 0;
                });

                this.favoriteTodoItems = tempFavoriteTodoItems;
                this.todoItems = tempTodoItems;
            }
        },

        created() {
            let localStorageItem = localStorage.getItem(this.localStorageItemKey);

            if (localStorageItem) {
                localStorageItem = JSON.parse(localStorageItem);
            } else {
                localStorageItem = [];
            }

            this.allTodoItems = localStorageItem;
            this.settingItems(this.allTodoItems);
        },

        watch: {
            allTodoItems(data) {
                this.settingItems(data);
            }
        },

        computed: {
        },

        components: {
            'TodoHeader': TodoHeader,
            'TodoInput': TodoInput,
            'TodoList': TodoList,
            'TodoFooter': TodoFooter,
        }
    }
</script>

<style>
    body {
        text-align: center;
        background-color: #F6F6F8;
    }

    input[type="text"] {
        border-style: groove;
        width: 200px;
    }

    button {
        border-style: groove;
    }

    .shadow {
        box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
    }
</style>
