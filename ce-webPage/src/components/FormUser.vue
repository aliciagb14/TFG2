<template>
    <n-form ref="formRef" v-model:value="props.newUser" label-placement="top">
        <n-form-item label="Nombre" 
            :feedback="errors.firstName" 
            :validation-status="errors.firstName ? 'error' : (props.newUser?.firstName ? 'success' : '')"
        >
            <n-input :value="props.newUser?.firstName" placeholder="Nombre" @input="isFormValid"/>
        </n-form-item>
            
          <n-form-item label="Apellidos" 
            :feedback="errors.lastName" 
            :validation-status="errors.lastName ? 'error' : (props.newUser?.lastName ? 'success' : '')"
            >
            <n-input :value="props.newUser?.lastName" placeholder="Apellidos" @input="isFormValid"/>
          </n-form-item>
    
          <n-form-item label="Correo Electrónico" 
            :feedback="errors.email" 
            :validation-status="errors.email ? 'error' : (props.newUser?.email ? 'success' : '')"
            >
            <n-input :value="props.newUser?.email" placeholder="user@alumnos.upm.es" @input="isFormValid"/>
          </n-form-item>
    
          <n-form-item label="Contraseña" 
            :feedback="errors.password" 
            :validation-status="errors.password ? 'error' : (props.newUser?.password ? 'success' : '')"
            >
        <n-input :value="props.newUser?.password" type="password" placeholder="Ingrese la contraseña" @input="isFormValid" />
        </n-form-item>
    </n-form>
</template>

<script setup>

import { ref, computed, watch } from 'vue';
  import { NCard, NButton, NForm, NFormItem, NInput, NIcon, NModal } from 'naive-ui';
  import { createUserKeycloak } from '@/services/UserService';
  
  const props = defineProps({
    newUser: Object,
    show: Boolean
  });
  
  const emit = defineEmits(['update:show', 'userAdded', 'close']);
  
//   const newUser = ref({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: ''
//   });

  const errors = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const isValidMail = (email) => {
    return email.endsWith('@alumnos.upm.es');
  };

  const isValidPassword = (password) => {
    return /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password);
  };

  const isFormValid = computed(() => {
    console.log(props.newUser?.firstName)
    const validations = [
      { field: 'firstName', condition: !props.newUser?.value.firstName, message: "El campo nombre no puede estar vacío" },
      { field: 'lastName', condition: !props.newUser?.value.lastName, message: "El campo apellido no puede estar vacío" },
      { field: 'email', condition: !props.newUser?.value.email, message: "El mail debe acabar en @alumnos.upm.es" },
      { field: 'password', condition: !props.newUser?.value.password , message: "La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial" }
    ];

    let valid = true;

    validations.forEach(({ field, condition, message }) => {
      if (condition) {
        errors.value[field] = message;
        valid = false;
      } else {
        errors.value[field] = "";
      }
    });

    return valid;
  });

  watch(props.newUser, (newVal) => {
  console.log('newUser es: ', newVal);
});
</script>