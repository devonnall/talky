<script setup>
    import { ref } from 'vue';
    import PocketBase from 'pocketbase';
    import { useTaskStore } from '../useTaskStore';

    const pb = new PocketBase('http://127.0.0.1:8090');
    const { addTask } = useTaskStore();

    const taskName = ref('');
    const dueDate = ref(new Date());
    const description = ref('');
    const newTask = ref(null);

    const createTask = async () => {
        const data = {
            name: taskName.value,
            description: description.value,
            dueDate: dueDate.value,
        };

        try {
            const record = await pb.collection('tasks').create(data);
            newTask.value = record;
            addTask(record); 
            taskName.value = '';
            dueDate.value = '';
            dueDateField.value = false;
            description.value = '';
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const dueDateField = ref(false);
    const showCreateTaskScreen = ref(false)

    const cancelDueDateEntry = () => {
        dueDateField.value = false;
    };

    let taskNameInputPlaceholder = ref("+ Add task")
    
    const expandTaskCreation = () => {
        taskNameInputPlaceholder.value = "Task name"
        showCreateTaskScreen.value = true
    }

    const cancelCreateTask = () => {
        taskName.value = '';
        dueDate.value = '';
        dueDateField.value = false;
        showCreateTaskScreen.value = false;
        taskNameInputPlaceholder.value = "+ Add task"
        description.value = ''
    };
    
</script>


<template>
    <div class="flex flex-col justify-center items-start text-sm rounded-md border border-[#ddd] bg-white">
        <input v-model="taskName" @keyup.enter="createTask()" :placeholder="taskNameInputPlaceholder" class="w-full py-2 px-3 rounded-md outline-none" @input="expandTaskCreation()">
        
        <!-- <button v-if="!showCreateTaskScreen" @click="showCreateTaskScreen = !showCreateTaskScreen" class="flex p-2 rounded-lg text-neutral-950 hover:text-blue-500 w-full justify-start">+ Add task</button> -->
        
        <Transition>   
            <div v-if="showCreateTaskScreen" class="flex flex-col justify-start p-2 pt-0 w-full">
                <div class="flex flex-col pb-3 mb-3 border-b border-[#ddd]">
                    <!-- <input ref="taskNameInput" v-model="taskName" @keyup.enter="createTask()" placeholder="Task name" class="text-neutral-950 p-1 outline-none w-full"> -->
                    <textarea v-model="description" placeholder="Description" class="text-neutral-950 p-1 outline-none w-full resize-none"></textarea>
                    <div v-if="dueDateField" class="flex items-center gap-2 w-1/2 md:w-1/2 lg:w-1/2 text-nowrap">
                        <VueDatePicker v-model="dueDate" text-input auto-apply :enable-time-picker="false" />
                        <button @click="cancelDueDateEntry()">Cancel</button>
                    </div>
                    <button v-else class="py-1 px-3 rounded text-gray-400 justify-start flex w-min text-nowrap border border-[#dddddd] hover:bg-neutral-100" @click="dueDateField = !dueDateField">Due date</button>
                </div>
                
                <div class="flex gap-2 justify-end">
                    <button @click="cancelCreateTask()" class="bg-red-500 text-white p-2 rounded">Cancel</button>
                    <button @click="createTask()" :disabled="taskName === ''" :class="taskName == '' ? 'bg-opacity-50' : 'bg-opacity-100'" class="bg-blue-500 text-white p-2 rounded">Create Task</button>
                </div>
            </div>
        </Transition>
        
    </div>
</template>

<style>
    .v-enter-active {
        transition: opacity 0.5s ease;
    }
    .v-enter-from {
        opacity: 0;
    }
</style>