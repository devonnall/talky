<script setup>
  // import SimpleCounter from './components/SimpleCounter.vue'; 
  import CreateTask from './components/CreateTask.vue';
  import TaskList from './components/TaskList.vue'
</script>

<template>
  <div id="app" class="flex flex-col gap-6 justify-center mx-56">
    <h1 class="text-3xl font-bold flex justify-start">Taskly</h1>
    <TaskList />
    <CreateTask />
  </div>
</template>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 4rem;
}
</style>
