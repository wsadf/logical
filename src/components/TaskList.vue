<!-- src/components/TaskList.vue -->
<template>
  <div class="bg-gray-100 p-4">
    <h2 class="text-xl font-bold mb-4">Lista de Tarefas</h2>
    <ul>
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit-task="editTask"
        @delete-task="deleteTask"
        :onEditTask="editTask"
        :onDeleteTask="deleteTask"
      />
    </ul>
    <button @click="openModal" class="mt-4 p-2 bg-blue-500 text-white rounded">Adicionar Tarefa</button>

    <AddTaskModal :show="isModalOpen" @close="closeModal" @add-task="handleAddTask" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TaskItem from './TaskItem.vue';
import AddTaskModal from './AddTaskModal.vue';

const tasks = ref([
  { id: 1, title: 'Vue 3' },
  { id: 2, title: 'Tailwind' },
]);

const isModalOpen = ref(false);

const editTask = ({ taskId, newTitle }) => {
  updateTaskTitle(taskId, newTitle);
};

const deleteTask = (taskId) => {
  removeTask(taskId);
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleAddTask = (newTaskTitle) => {
  const newTask = { id: tasks.value.length + 1, title: newTaskTitle };
  tasks.value.push(newTask);
  closeModal();
};

const updateTaskTitle = (taskId, newTitle) => {
  const taskToUpdate = tasks.value.find((task) => task.id === taskId);
  if (taskToUpdate) {
    taskToUpdate.title = newTitle;
  }
};

const removeTask = (taskId) => {
  tasks.value = tasks.value.filter((task) => task.id !== taskId);
};
</script>

<style scoped>
.add-task-button {
  margin-bottom: 2rem;
}
</style>
