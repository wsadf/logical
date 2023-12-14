<!-- SeuComponente.vue -->

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
      />
    </ul>
    <button @click="openModal" class="mt-4 p-2 bg-blue-500 text-white rounded">Adicionar Tarefa</button>

    <AddTaskModal :show="isModalOpen" @close="closeModal" @add-task="handleAddTask" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import TaskItem from './TaskItem.vue';
import AddTaskModal from './AddTaskModal.vue';

const store = useStore();
const tasks = computed(() => store.getters.getTasks);
const isModalOpen = ref(false);

const editTask = ({ taskId, newTitle }) => {
  store.dispatch('editTask', { taskId, newTitle });
};

const deleteTask = (taskId) => {
  store.dispatch('deleteTask', taskId);
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleAddTask = (newTaskTitle) => {
  store.dispatch('addTask', newTaskTitle);
  closeModal();
};
</script>
