<template>
  <div class="hello" id="testApp">
    <h1>{{ msg }}</h1>
    <input v-model="input" placeholder="Search project" class="search-input" />
    <ul v-if="input.length > 2" class="answer-list">
      <li
        v-for="todo in filterList"
        :key="todo"
        v-html="$options.filters.highlight(todo, debouncedInput)"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  filters: {
    highlight(words, query) {
      const reg = new RegExp(query, 'gi');
      return words.replace(reg, function(str) {
        return '<strong>' + str + '</strong>';
      });
    },
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      debouncedInput: '',
      searchInputValue: '',
      timeout: null,
      todos: [
        'Animal is a big organism',
        'Monkey is an animal too',
        'Animal Animal',
      ],
    };
  },
  computed: {
    input: {
      get() {
        return this.debouncedInput;
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.debouncedInput = val;
        }, 500);
      },
    },
    filterList() {
      return this.todos.filter((item) => {
        return item.toLowerCase().includes(this.debouncedInput.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
.answer-list {
  background: #000;
  width: 420px;
  margin: 0 auto;
  border: 1px solid #fff;
  color: #fff;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-left: 0;
  border-radius: 5px;
  box-sizing: border-box;
}
.search-input {
  background-color: rgb(62 84 107);
  border: none;
  color: #bbb3b3;
  height: 30px;
  width: 400px;
  border-radius: 5px;
  padding: 0 10px;
  transition: 0.5s;
}
.search-input:focus {
  transition: 0.5s;
  outline: none;
  -webkit-box-shadow: 4px 4px 30px 13px rgba(26, 127, 204, 0.2);
  -moz-box-shadow: 4px 4px 30px 13px rgba(26, 127, 204, 0.2);
  box-shadow: 4px 4px 30px 13px rgba(26, 127, 204, 0.2);
}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
