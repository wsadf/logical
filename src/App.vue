<!-- src/App.vue -->
<template>
  <div id="app">
    <TaskList />
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue';

export default {
  components: {
    TaskList,
  },
};
</script>

<style>
/* Estilos Tailwind ou personalizados */
</style>
