<template>
    <n-modal 
    v-model:show="props.show" 
    :mask-closable="false"
    preset="dialog"
    positive-text="Confirm"
    negative-text="Cancel"
    @positive-click="closeModal"
    @negative-click="closeModal"
    >
      <n-card 
        title="Añadir Usuario"
        style="width: 400px;"
        :bordered="false"
      >
        <n-form ref="formRef" :model="newUser" label-placement="top">
          <n-form-item label="Nombre" >
            <n-input v-model:value="newUser.firstName" placeholder="Nombre" />
          </n-form-item>
          
          <n-form-item label="Apellidos">
            <n-input v-model:value="newUser.lastName" placeholder="Apellidos" />
          </n-form-item>
  
          <n-form-item label="Correo Electrónico">
            <n-input v-model:value="newUser.email" placeholder="user@alumnos.upm.es" />
          </n-form-item>
  
          <n-form-item label="Contraseña">
            <n-input v-model:value="newUser.password" type="password" placeholder="Ingrese la contraseña" />
          </n-form-item>
        </n-form>
      </n-card>
    </n-modal>
  </template>
  
<script setup>
  import { ref, computed } from 'vue';
  import { NCard, NButton, NForm, NFormItem, NInput, NIcon, NModal } from 'naive-ui';
  import {CloseOutline as CloseIcon } from '@vicons/ionicons5'
  import { createUser } from '@/services/UserService';
  
  const props = defineProps({
    show: Boolean
  });
  
  const emit = defineEmits(['update:show', 'userAdded', 'close']);
  
  const newUser = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const onPositiveClick = () => {
    closeModal();
  };

  const onNegativeClick = () => {
    closeModal();
  };

  const closeModal = () => {
    emit('update:show', false);
  };

  const isFormValid = computed(() => {
    return newUser.value.firstName && newUser.value.lastName && newUser.value.email && newUser.value.password;
  });
  
  const addUser = async () => {
    if (!isFormValid.value) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    try {
      if (!newUser.value.firstName || !newUser.value.lastName || !newUser.value.email || !newUser.value.password) {
        alert('Por favor, complete todos los campos');
        return;
      }
      await createUser(newUser.value);
      emit('userAdded', {
        firstName: newUser.value.firstName,
        lastName: newUser.value.lastName,
        email: newUser.value.email,
      });
      closeModal();
      newUser.value = { firstName: '', lastName: '', email: '', password: '' };
       
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };
</script>

<style scoped>
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
}
.layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #a8c3ff;
}

.sidebar {
  flex: 0 0 20%;
  background-color: #4a4a32;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #a8c3ff;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.add-user-btn {
  font-size: 1rem;
  color: #4a4a32;
  cursor: pointer;
}

.table-container {
  width: 100%;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
}
</style>
