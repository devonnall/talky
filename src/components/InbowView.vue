<script setup>
    import { useTaskStore } from '../useTaskStore';
    import { format, isThisYear, add } from 'date-fns';
    import PocketBase from 'pocketbase';
    import CreateTask from './ManageTask.vue'
    
    const pb = new PocketBase('http://127.0.0.1:8090');

    const { tasks, fetchTasks, deleteTask, markComplete } = useTaskStore();

    fetchTasks();

    function formatDate(isoDate) {
        if (!isoDate) return '';
            const date = new Date(isoDate);
        if (isNaN(date)) return ''; 

        const today = new Date()
        const tomorrow = add(new Date(), { days: 1 });
        const formattedDate = format(date, "MM/dd/yyyy")
        const formattedToday = format(today, "MM/dd/yyyy")
        const formattedTomorrow = format(tomorrow, "MM/dd/yyyy")
        
        if (formattedDate == formattedToday) {
            return "Today"
        } else if (formattedDate == formattedTomorrow) {
            return "Tomorrow"
        } else if (isThisYear(date)) {
            return format(date, "MMM d"); 
        } else {
            return format(date, "MMM d yyyy"); 
        }
    }


    const removeTask = async (task) => {
        if (!confirm(`Are you sure you want to delete "${task.name}"?`)) {
            return;
        }

        try {
            await pb.collection('tasks').delete(task.id)
            // this.tasks = this.tasks.filter(t => t.id !== task.id)
            deleteTask(task)
        } catch (error) {
            console.error('Error deleting task:', error)
        }
    }

    const markAsComplete = async (task) => {
        try {
            await pb.collection('tasks').update(task.id, {
                "complete": true,
            });

            markComplete(task)
        
        } catch (error) {
            console.error('Error updating task:', error);
            task.complete = !task.complete;
        }
    }

</script>

<template>
    <div class="flex flex-col gap-3 w-3/4 md:w-1/2 lg:w-1/3 mx-auto">
        <h1 class="text-3xl font-bold flex justify-start">Taskly</h1>
        <CreateTask />
        <ul class="flex flex-col gap-2 text-sm" tag="ul" vue:is="transition">
            <li 
                v-for="task in tasks" 
                :key="task.id" 
                class="hover:bg-neutral-50 bg-white p-2 rounded-md group/task" 
                :class="{'opacity-50': task.complete}"
                style="transition: opacity 0.5s ease;"
            >
                <div class="flex justify-between items-center">
                    <div class="flex gap-2">
                        <button 
                            @click="markAsComplete(task)" 
                            class="w-6 h-6 rounded-md flex items-center group/check justify-center border border-[#dddddd] transition-all ease-linear"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" :class="{'fill-neutral-950': task.complete}" class="scale-0 group-hover/check:scale-100 group-hover/check:fill-neutral-500 transition ease-linear" width="18" height="18" viewBox="0 -960 960 960"><path d="M400-304 240-464l56-56 104 104 264-264 56 56z"/></svg>
                        </button>
                        <div class="flex flex-col gap-1">
                            <span :class="{'line-through': task.complete}" class="font-light text-left text-neutral-700">{{ task.name }}</span>
                            <span v-if="task.dueDate != ''" class="flex font-extralight text-xs text-neutral-500 w-min text-nowrap rounded-md">
                                {{ formatDate(task.dueDate) }}
                            </span>
                        </div>
                    </div>
                    <button @click="removeTask(task)" class="py-2 px-2 rounded-md scale-0 group-hover/task:scale-100 group-hover/task:text-neutral-500 group-hover/task:hover:bg-red-500 group-hover/task:hover:text-white transition">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>
    