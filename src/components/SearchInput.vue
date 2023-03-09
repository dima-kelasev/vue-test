<template>
  <div class="hello" id="testApp">
    <h1>{{ msg }}</h1>
    <input v-model="input" placeholder="Search project" class="search-input" />
    <ul v-if="input.length > 2" class="answer-list">
      <li
        v-for="(todo, idx) in filterList"
        :key="idx"
        v-html="
          $options.filters.highlight(
            todo.title,
            todo.description,
            debouncedInput
          )
        "
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  filters: {
    highlight(word1, word2, query) {
      const reg = new RegExp(query, 'gi');
      const strong1 = word1.replace(reg, function(str) {
        const a = `<strong style='color: #40b883'>${str}</strong>`;
        return a;
      });
      const strong2 = word2.replace(reg, function(str) {
        const p = `<strong style='color: #40b883'>${str}</strong>`;
        return p;
      });
      const dropDownList = `<div><p style='margin: 0'>${strong1}</p><p style='margin: 0;font-size: 12px;'>${strong2}</p></div>`;
      return dropDownList;
    },
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      debouncedInput: '',
      searchInputValue: '',
      timeout: null,
      todos: [
        { title: ' hello hello', description: 'Animal Animal too' },
        {
          title: 'Monkey is an animal too have',
          description: 'they have many types',
        },
        {
          title: 'Animal is a big organism',
          description: 'animals have lived everywhere',
        },
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
      const filteredArray = this.todos.filter((item) => {
        return (
          item.title
            .toLowerCase()
            .includes(this.debouncedInput.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(this.debouncedInput.toLowerCase())
        );
      });
      const index = filteredArray.findIndex((el) =>
        el.title.toLowerCase().includes(this.debouncedInput.toLowerCase())
      );

      filteredArray.unshift(...filteredArray.splice(index, 1));

      return filteredArray;
    },
  },
};
</script>

<style scoped>
.searchList {
  display: flex;
  flex-direction: column;
}
p {
  margin: 0;
}
.description {
  font-size: 12px;
}
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

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
  border-bottom: 1px solid gray;
  cursor: pointer;
}
</style>
