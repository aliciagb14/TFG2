<template>
    <n-modal :show="show" :mask-closable="false" @update:show="emit('update:show', false)">
      <n-card title="Eliminar Usuario" style="width: 400px;">
        <p>¿Estás seguro de que deseas eliminar a <strong>{{ user?.firstName }} {{ user?.lastName }}</strong>?</p>
        <div class="botones">
          <n-button type="error" @click="confirmDelete">Eliminar</n-button>
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

<style scoped>
.botones{
    margin: 10px;
}
</style>