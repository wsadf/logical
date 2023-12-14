<template>
    <div v-show="props.show" class="fixed inset-0 flex items-center justify-center">
      <div class="bg-black opacity-50 fixed inset-0"></div>
      <div class="bg-white p-6 rounded shadow-md z-10">
        <h2 class="text-xl font-bold mb-4">Adicionar Nova Tarefa</h2>
        <input v-model="newTaskTitle" type="text" class="border p-2 mb-4 w-full" placeholder="Título da Tarefa">
        <div class="flex justify-end">
          <button @click="cancel" class="mr-2">Cancelar</button>
          <button @click="addTask" class="bg-blue-500 text-white px-4 py-2 rounded">Adicionar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  const props = defineProps(['show']);
  const emits = defineEmits(['close', 'add-task']);
  const newTaskTitle = ref('');
  
  const addTask = () => {
    emits('add-task', newTaskTitle.value);
    close();
  };
  
  const cancel = () => {
    close();
  };
  
  const close = () => {
    emits('close');
  };
  </script>
  