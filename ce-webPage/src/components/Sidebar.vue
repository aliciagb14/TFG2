<template>
  <div class="sidebar">
    <h1>Menú</h1>
    <ul>
      <li><router-link to="/home/files">Files</router-link></li>
      <li><router-link to="/settings">Settings</router-link></li>
      <li><router-link to="/profile">Profile</router-link></li>
    </ul>
  </div>
</template>

<script setup></script>

<style>
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}
.sidebar ul {
  list-style-type: disc;
  padding-left: 20px;
}
.sidebar li {
  margin: 15px 0;
}
</style>
