<template>
    <section>
        <slot name="header">
            <!--  -->
        </slot>

        <!--<transition-group name="list" tag="ul">-->
        <ul name="list">
            <li v-for="(todoItem, index) in todoLists" :key="todoItem.id" class="shadow" :data-itemid="todoItem.id" @click="liClick()">
                <b-row class="text-center">
                    <b-col sm="1" class="text-left">
                        <i class="checkBtn fa fa-check" aria-hidden="true" v-show="todoItem.isDone"></i>
                        <input type="checkbox" v-model="todoItem.isDone" v-show="!todoItem.isDone" @click="modify_done(todoItem.id)" />
                    </b-col>

                    <b-col sm="8" class="text-left">
                        <a @click="showModifyTodo(todoItem)">{{ todoItem.todo }}</a>
                    </b-col>

                    <b-col sm="2" class="text-right">
                        <span class="text-right">{{ leftDate(todoItem.endDateTime) }}</span>
                    </b-col>

                    <b-col sm="1" class="text-right">
                        <span class="removeBtn" @click="removeTodo(todoItem.id)">
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </span>
                    </b-col>
                </b-row>
            </li>
        </ul>
        <!--</transition-group>-->

        <InputModal v-if="showInputModal" @close="showInputModal = false" :todoItem="targetModifyItem" @modifyTodo="modifyTodo">
            <h3 slot="header">수정</h3>
            <span slot="footer" @click="showInputModal = false">할 일을 입력하세요.
                <i class="closeModalBtn fa fa-times" aria-hidden="true"></i>
            </span>
        </InputModal>
    </section>
</template>

<script>
    import InputModal from './common/InputModal.vue'

    export default {
        data() {
            return {
                type: null,
                showInputModal: false,
                targetModifyItem: null,
            };
        },

        props: {
            'todoLists': null
        },
        methods: {
            removeTodo(todoItemId) {
                this.$emit('removeTodo', todoItemId);
            },
            showModifyTodo(todoItem) {
                this.targetModifyItem = todoItem;
                this.showInputModal = true;
            },
            modifyTodo(id, todo)
            {
                this.$emit('modifyTodo', id, todo)
            },
            modify_done(id)
            {
                this.$emit('modifyIsDone', id, true);
            },

            liClick()
            {
                $('li').attr('aria-grabbed', false);
            },

            leftDate(datetime) {
                let nowDate = new Date();
                let diffDays = nowDate.diffDays(new Date(datetime));

                if (diffDays > 0) {
                    return 'D' + '+' + diffDays;
                } else if (diffDays == 0) {
                    return 'D-day';
                } else {
                    return 'D' + diffDays;
                }
            }
        },
        mounted() {
        },

        components: {
            'InputModal': InputModal,
        }
    }
</script>

<style>
    .item-dropzone-area {
        height: 50px;
        background: #c7c7c7;
        opacity: 0.8;
        animation-duration: 0.5s;
        animation-name: nodeInserted;
    }

    .custom-control.custom-checkbox {
        margin-top:12px;
    }

</style>

<style scoped>
    section {
        margin-top:20px;
    }

    ul {
        padding-top:15px;
        padding-bottom:50px;
        margin-bottom:0;
        list-style-type: none;
        padding-left: 0px;
        margin-top: 0;
        text-align: left;
    }

    li {
        display: flex;
        min-height: 50px;
        height: 50px;
        line-height: 50px;
        margin: 0.5rem 0;
        padding: 0 0.9rem;
        background: white;
        border-radius: 5px;
    }

    input[type="checkbox"] {
        height: 50px;
        width: 16px;
        margin-right: 10px;
    }

    .checkBtn {
        line-height: 50px;
        color: #62acde;
        margin-right: 10px;
    }

    .removeBtn {
        margin-left: auto;
        color: #de4343;
    }

    .list-item {
        display: inline-block;
        margin-right: 10px;
    }

    .list-move {
        transition: transform 1s;
    }

    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }

    .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }

    /* drop target state */
    ul[aria-dropeffect="move"] {
        border-color:#c7c7c7;
        background:#fff;
    }

    /* drop target focus and dragover state */
    ul[aria-dropeffect="move"]:focus,
    ul[aria-dropeffect="move"].dragover
    {
        padding-bottom:15px;
        outline:none;
        box-shadow:0 0 0 1px #fff, 0 0 0 3px #68b;
    }

    /* draggable items */
    li {
        display:block;
        /*list-style-type:none;*/
        /*margin:0 0 2px 0;*/
        /*padding:0.2em 0.4em;*/
        /*border-radius:0.2em;*/
    }

    li:hover {
        box-shadow:0 0 0 2px #68b, inset 0 0 0 1px #ddd;
    }

    /* items focus state */
    li:focus
    {
        outline:none;
        box-shadow:0 0 0 2px #68b, inset 0 0 0 1px #ddd;
    }

    /* items grabbed state */
    li[aria-grabbed="true"]
    {
        background:#5cc1a6;
        color:#fff;
    }

    @keyframes nodeInserted {
        from { opacity: 0.2; }
        to { opacity: 0.8; }
    }

</style>
