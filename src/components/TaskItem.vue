<template>
  <li
    data-testid="task-item"
    :class="{ 'bg-blue-200': !task.completed, 'bg-green-200': task.completed }"
    class="task p-4 mb-2 flex justify-between items-center"
  >
    <span :class="{ 'line-through': task.completed }">{{ task.title }}</span>
    <div class="flex">
      <button @click="editTask" class="button-blue">Editar</button>
      <button @click="deleteTask" class="button-red">Excluir</button>
    </div>

    <!-- Modal para edição/exclusão -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2 class="modal-title">{{ editMode ? 'Editar Tarefa' : 'Excluir Tarefa' }}</h2>

        <!-- Formulário para edição -->
        <form v-if="editMode" @submit.prevent="handleEdit">
          <label for="newTitle" class="block mb-2">Novo título:</label>
          <input v-model="newTitle" type="text" id="newTitle" class="input-field" />

          <div class="flex">
            <button type="submit" class="button-blue">Salvar</button>
            <button @click="closeModal" class="button-gray">Cancelar</button>
          </div>
        </form>

        <!-- Confirmação de exclusão -->
        <div v-else>
          <p>Tem certeza que deseja excluir a tarefa?</p>

          <div class="flex py-2">
            <button @click="confirmDelete" class="button-red">Confirmar</button>
            <button @click="closeModal" class="button-gray">Cancelar</button>
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

const openModal = () => showModal.value = true;
const closeModal = () => {
  showModal.value = false;
  editMode.value = false;
};
const editTask = () => {
  openModal();
  editMode.value = true;
};
const handleEdit = () => {
  emits('edit-task', { taskId: props.task.id, newTitle: newTitle.value });
  closeModal();
};
const deleteTask = () => openModal();
const confirmDelete = () => {
  emits('delete-task', props.task.id);
  closeModal();
};
</script>

<style scoped>
/* Estilos personalizados */
.button-blue {
  background-color: #3490dc;
  color: #ffffff;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.button-red {
  background-color: #e3342f;
  color: #ffffff;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.button-gray {
  background-color: #718096;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 0.5rem;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.input-field {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}
</style>
