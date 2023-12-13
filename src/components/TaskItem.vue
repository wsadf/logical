<template>
  <li data-testid="task-item" :class="{ 'bg-blue-200': !task.completed, 'bg-green-200': task.completed }" class="task p-4 mb-2 flex justify-between items-center">
    <span :class="{ 'line-through': task.completed }">{{ task.title }}</span>
    <div>
      <button @click="editTask" class="mr-2 text-blue-600 hover:text-blue-800">Editar</button>
      <button @click="deleteTask" class="text-red-600 hover:text-red-800">Excluir</button>
    </div>

    <!-- Modal para edição/exclusão -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg">
        <h2 class="text-lg font-bold mb-4">{{ editMode ? 'Editar Tarefa' : 'Excluir Tarefa' }}</h2>
        
        <!-- Formulário para edição -->
        <form v-if="editMode" @submit.prevent="handleEdit">
          <label for="newTitle" class="block mb-2">Novo título:</label>
          <input v-model="newTitle" type="text" id="newTitle" class="w-full p-2 border rounded mb-4" />
          
          <!-- Adicionando classe de flex aos botões -->
          <div class="flex">
            <button type="submit" class="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Salvar</button>
            <button @click="closeModal" class="flex-1 ml-2 text-gray-600 hover:text-gray-800">Cancelar</button>
          </div>
        </form>

        <!-- Confirmação para exclusão -->
        <div v-else>
          <p>Tem certeza que deseja excluir a tarefa?</p>
          
          <!-- Adicionando classe de flex aos botões -->
          <div class="flex py-2">
            <button @click="confirmDelete" class="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Confirmar</button>
            <button @click="closeModal" class="flex-1 ml-2 text-gray-600 hover:text-gray-800">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue';

const props = defineProps(['task']);
const emits = defineEmits(['edit-task', 'delete-task']);
const showModal = ref(false);
const editMode = ref(false);
const newTitle = ref(props.task.title);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editMode.value = false;
};

const editTask = () => {
  openModal();
  editMode.value = true;
};

const handleEdit = () => {
  // Emitir um evento para notificar o componente pai sobre a edição da tarefa
  emits('edit-task', { taskId: props.task.id, newTitle: newTitle.value });
  closeModal();
};

const deleteTask = () => {
  openModal();
};

const confirmDelete = () => {
  // Emitir um evento para notificar o componente pai sobre a exclusão da tarefa
  emits('delete-task', props.task.id);
  closeModal();
};
</script>
