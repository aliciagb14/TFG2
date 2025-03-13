<template>
    <div>
      <input type="file" @change="handleFileUpload" accept=".zip" />
      <button @click="uploadFile">Subir Archivo</button>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        file: null,
        message: '',
      };
    },
    methods: {
      handleFileUpload(event) {
        this.file = event.target.files[0];
      },
      async uploadFile() {
        if (!this.file) return alert('Selecciona un archivo .zip');
  
        const formData = new FormData();
        formData.append('file', this.file);
  
        try {
          const response = await axios.post('http://localhost:5000/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          this.message = response.data.message;
        } catch (error) {
          console.error('Error subiendo archivo:', error);
        }
      },
    },
  };
  </script>
  