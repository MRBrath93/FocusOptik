<script setup>
// App-opsætning
</script>

<template>
  <div id="app">
    <!-- Navigation -->
    
    <!-- Indhold -->
    <main>
      <!-- Router View viser det indhold, der matcher den aktuelle rute -->
      <router-view />
    </main>

    <!-- Footer -->
    <footer>
      <p>&copy; 2024 BrilleWebshop</p>
    </footer>
  </div>
</template>

<style scoped>
/* App layout styling */
#app {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background: #f8f9fa;
  padding: 10px 20px;
  margin-bottom: 20px;
}

nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  margin-right: 15px;
}

nav a {
  text-decoration: none;
  color: #007bff;
}

nav a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}

main {
  padding: 20px 0;
}

footer {
  text-align: center;
  margin-top: 20px;
  color: #777;
  font-size: 14px;
}
</style>
