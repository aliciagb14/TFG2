<template>
    <n-modal :show="show" :mask-closable="false" @update:show="emit('update:show', false)">
      <n-card title="Editar Usuario" style="width: 400px;">
        <FormUser v-model:value="newUser"/>
        <div class="botones">
          <n-button type="info" @click="confirmDelete">Editar</n-button>
          <n-button @click="closeModal">Cancelar</n-button>
        </div>
      </n-card>
    </n-modal>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import {NModal, NCard, NButton} from 'naive-ui'
  
  const props = defineProps({
    show: Boolean,
    user: Object,
  });
  
  const emit = defineEmits(['update:show', 'deleteUser']);
  
  const closeModal = () => {
    emit('update:show', false);
  };
  
  const confirmDelete = () => {
    emit('deleteUser', { ...props.user}); // Emitir evento con el usuario a eliminar
    closeModal();
  };
  </script>