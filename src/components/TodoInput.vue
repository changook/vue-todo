<template>
    <div class="inputBox shadow">
        <b-row class="text-center">
            <b-col sm="3" class="text-left">
                <date-picker :date="todoDatetime" :option="option" :limit="limit"></date-picker>
            </b-col>

            <b-col sm="7" class="text-center">
                <input type="text" v-model="newTodoItem" placeholder="Type what you have to do" v-on:keyup.enter="addTodo">
            </b-col>

            <b-col sm="2" class="text-right">
                <span class="addContainer text-center" v-on:click="addTodo">
                  <i class="addBtn fa fa-plus" aria-hidden="true"></i>
                </span>
            </b-col>
        </b-row>

        <modal v-if="showModal" @close="showModal = false">
            <h3 slot="header">경고</h3>
            <span slot="footer" @click="showModal = false">할 일 및 일정기일을 입력하세요.
                <i class="closeModalBtn fa fa-times" aria-hidden="true"></i>
            </span>
        </modal>
    </div>
</template>

<script>
    import Modal from './common/Modal.vue'

    export default {
        data() {
            return {
                newTodoItem: '',
                showModal: false,
                todoDatetime: {
                    time: null
                },

                option: {
                    type: 'day',
                    week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    format: 'YYYY-MM-DD',
                    placeholder: 'when?',
                    inputStyle: {
                        'display': 'inline-block',
                        'margin-left' : '6px',
                        'width': '100px',
                        'padding': '6px',
                        'line-height': '22px',
                        'font-size': '16px',
                        'border': '2px solid #fff',
                        'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
                        'border-radius': '2px',
                        'color': '#5F5F5F'
                    },
                    color: {
                        header: '#ccc',
                        headerText: '#f00'
                    },
                    buttons: {
                        ok: 'Ok',
                        cancel: 'Cancel'
                    },
                    overlayOpacity: 0.5, // 0.5 as default
                    dismissible: true // as true as default
                },
                timeoption: {
                    type: 'min',
                    week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    format: 'YYYY-MM-DD HH:mm'
                },
                multiOption: {
                    type: 'multi-day',
                    week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    format: "YYYY-MM-DD HH:mm"
                },
                limit: [
                    // {
                    //     type: 'weekday',
                    //     available: [1, 2, 3, 4, 5]
                    // },
                    // {
                    //     type: 'fromto',
                    //     from: '2016-02-01',
                    //     to: '2016-02-20'
                    // }
                ]
            }
        },
        methods: {
            addTodo() {
                if (this.newTodoItem !== "" && this.todoDatetime.time) {
                    var value = this.newTodoItem && this.newTodoItem.trim();
                    this.$emit('addTodo', value, this.todoDatetime.time);
                    this.clearInput();

                } else {
                    this.showModal = !this.showModal;
                }
            },
            clearInput() {
                this.newTodoItem = '';
                this.todoDatetime = {time: null};
            }
        },
        components: {
            Modal: Modal
        }
    }
</script>

<style>
    .cov-picker-box {
        height: auto !important;
    }
</style>

<style scoped>
    input:focus {
        outline: none;
    }

    .inputBox {
        background: white;
        line-height: 50px;
        border-radius: 5px;
    }

    .inputBox input {
        border-style: none;
        font-size: 0.9rem;
    }

    .addContainer {
        float: right;
        background: linear-gradient(to right, #6478FB, #8763FB);
        display: inline-block;
        width: 3rem;
        border-radius: 0 5px 5px 0;
    }

    .addBtn {
        color: white;
        vertical-align: middle;
    }

</style>
