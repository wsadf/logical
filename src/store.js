// store.js

import { createStore } from 'vuex';

const store = createStore({
  state: {
    tasks: [
      { id: 1, title: 'Vue 3' },
      { id: 2, title: 'Tailwind' },
    ],
  },
  mutations: {
    addTask(state, newTaskTitle) {
      const newTask = { id: state.tasks.length + 1, title: newTaskTitle };
      state.tasks.push(newTask);
    },
    editTask(state, { taskId, newTitle }) {
      const taskToUpdate = state.tasks.find((task) => task.id === taskId);
      if (taskToUpdate) {
        taskToUpdate.title = newTitle;
      }
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      commit('addTask', newTaskTitle);
    },
    editTask({ commit }, { taskId, newTitle }) {
      commit('editTask', { taskId, newTitle });
    },
    deleteTask({ commit }, taskId) {
      commit('deleteTask', taskId);
    },
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
  },
});

export default store;
