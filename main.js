Vue.component('item', {
  props: ['item'],
  methods: {
    delete_item() {
      this.$emit('delete_item');
    },
  },
  template: `<li class="item" :class="{checked:item.completed}" >
            <input type="checkbox" id="checkbox" v-model="item.completed">
            <h6 class="col-xs col-sm-10 item__text">{{item.text}}</h6>
            <h6 class="item__text">{{item.priority}}</h6>
            <button @click="delete_item" class="btn btn-danger" type="submit">
            <i class="fas fa-trash"></i>
            </button>
        </li>`,
});
const app = new Vue({
  el: '#app',
  data: {
    search: '',
    tittle: 'ToDo',
    newItem: {
      text: '',
      priority: '0',
      completed: false,
    },
    status: 'All',
    priority: 0,
    items: [],
  },
  methods: {
    addItem() {
      if (this.newItem.text !== '') {
        this.items.push({
          text: this.newItem.text,
          priority: this.newItem.priority,
          completed: this.newItem.completed,
        });
        this.newItem.text = '';
        this.newItem.priority = '';
      }
    },
    orderFilter(order) {
      if (order === 'Ascending') {
        this.items = this.items.sort((a, b) => (+a.priotity > +b.priotity ? 1 : -1));
      } else if (order === 'Descending') {
        this.items = this.items.sort((a, b) => (+b.priotity < +a.priotity ? 1 : -1));
      }
    },
    itemStatus(status) {
      this.status = status;
    },
    deleteThisItem(index) {
      this.items.splice(index, 1);
    },
  },
  computed: {
    progress() {
      return this.items.length > 0 ? Math.round((this.tasksDone / this.items.length) * 100) : 0;
    },
    tasksDone() {
      return this.items.filter((item) => item.completed).length;
    },
    visibleItems() {
      let arr = [];
      arr = this.items.filter((el) => el.text.toLowerCase().includes(this.search));
      if (this.status === 'Done') {
        arr = arr.filter((el) => el.completed);
      } else if (this.status === 'Undone') {
        arr = arr.filter((el) => !el.completed);
      }
      return arr;
    },
  },
});
