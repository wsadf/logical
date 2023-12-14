<template>
  <div class="bg-gray-100 p-4">
    <h2 class="text-xl font-bold mb-4">CRUD com Vue3, Vuex e Tailwind.</h2>
    <ul>
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit-task="editTask"
        @delete-task="deleteTask"
        class="mb-2"
      />
    </ul>
    <button @click="openModal" class="flex items-center mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        ></path>
      </svg>
      Adicionar Tarefa
    </button>

    <AddTaskModal :show="isModalOpen" @close="closeModal" @add-task="handleAddTask" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import TaskItem from './TaskItem.vue';
import AddTaskModal from './AddTaskModal.vue';

const store = useStore();
const tasks = computed(() => store.getters.getTasks);
const isModalOpen = ref(false);

const editTask = ({ taskId, newTitle }) => store.dispatch('editTask', { taskId, newTitle });
const deleteTask = (taskId) => store.dispatch('deleteTask', taskId);

const openModal = () => isModalOpen.value = true;
const closeModal = () => isModalOpen.value = false;

const handleAddTask = (newTaskTitle) => {
  store.dispatch('addTask', newTaskTitle);
  closeModal();
};
</script>
