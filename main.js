Vue.component('item', {
  props: ['data'],
  methods: {
    delete_item() {
      this.$emit('delete_item');
    },
  },
  template:
        `<li class="item" :class="{checked:data.completed} ">
            <input type="checkbox" id="checkbox" v-model="data.completed">
            <h6 class="col-xs col-sm-10 item__text">{{data.text}}</h6>
            <h6 class="item__text">{{data.priority}}</h6>
            <button @click="delete_item" class="btn btn-danger" type="submit">
            <i class="fas fa-trash"></i>
            </button>
        </li>`,
  // data : function(){
  //   return{

  //   }
  // }
});
const app = new Vue({
  el: '#app',
  data: {
    search: "",
    tittle: 'ToDo',
    newItem: {
      text: '',
      priority: '',
      completed: false
    },
    items: [],
  },
  methods: {
    addItem() {
      if (this.newItem.text !== '') {
        this.items.push({
          text: this.newItem.text,
          priority: this.newItem.priority,
        });
        this.newItem.text = '';
        this.newItem.priority = '';
      }
    },
    
    deleteThisItem(index) {
      this.items.splice(index, 1);
    },
  },
  computed: {
    progress() {
      return this.items.length > 0 ? Math.round(this.tasksDone / this.items.length * 100) : 0;
    },
    tasksDone(){
      return this.items.filter(item => item.completed).length;
    }
  },
});
