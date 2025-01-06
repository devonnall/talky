<script setup>
    import { ref } from 'vue'
    import PocketBase from 'pocketbase';

    const pb = new PocketBase('http://127.0.0.1:8090');
    
    const taskName = ref('')
    const dueDate = ref(new Date())
    const description = ref('')
    const newTask = ref(null)

    const createTask = async () => {
        const data = {
            name: taskName.value, 
            description: description.value,
            dueDate: dueDate.value, 
        };

        try {
            const record = await pb.collection('tasks').create(data);
            newTask.value = record;
            taskName.value = ''
            dueDate.value = ''
            dueDateField.value = false 
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const dueDateField = ref(false)
    const showCreateTaskScreen = ref(false)

    const cancelCreateTask = () => {
        taskName.value = ''
        dueDate.value = ''
        dueDateField.value = false
        showCreateTaskScreen.value = false
    }

    const cancelDueDateEntry = () => {
        dueDateField.value = false
    }
</script>

<template>
    <div class="flex flex-col space-y-4 justify-center items-start text-sm">
        <button v-if="!showCreateTaskScreen" @click="showCreateTaskScreen = !showCreateTaskScreen" class="flex p-2 rounded-lg text-neutral-950 hover:text-blue-500 w-full justify-start">+ Add task</button>
        
        <div v-if="showCreateTaskScreen" class="flex flex-col justify-start border-2 border-[#dddddd] rounded-lg p-2 w-full">
            <div class="flex flex-col border-b border-[#dddddd] pb-3 mb-3">
                <input v-model="taskName" placeholder="Task name" class="text-neutral-950 p-1 outline-none w-full">
                <textarea v-model="description" placeholder="Description" class="text-neutral-950 p-1 outline-none w-full resize-none"></textarea>
                <div v-if="dueDateField" class="flex items-center gap-2 w-1/4 text-nowrap">
                    <VueDatePicker  v-model="dueDate" text-input auto-apply :enable-time-picker="false" />
                    <button @click="cancelDueDateEntry()">Cancel</button>
                </div>
                <button v-else class="py-1 px-2 rounded text-gray-400 justify-start flex w-min text-nowrap border border-[#dddddd] hover:bg-neutral-100" @click="dueDateField = !dueDateField">Due date</button>
            </div>
            
            <div class="flex gap-2 justify-end">
                <button @click="cancelCreateTask()" class="bg-red-500 text-white p-2 rounded">Cancel</button>
                <button @click="createTask()" :disabled="taskName === ''" :class="taskName == '' ? 'bg-opacity-50' : 'bg-opacity-100'" class="bg-blue-500 text-white p-2 rounded">Create Task</button>
            </div>
        </div>
    </div>
</template>

<style>
    :root {
        /*General*/
        --dp-font-family: -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans",
        "Helvetica Neue", sans-serif;
        --dp-border-radius: 4px; /*Configurable border-radius*/
        --dp-cell-border-radius: 4px; /*Specific border radius for the calendar cell*/
        --dp-common-transition: all 0.1s ease-in; /*Generic transition applied on buttons and calendar cells*/

        /*Sizing*/
        --dp-button-height: 35px; /*Size for buttons in overlays*/
        --dp-month-year-row-height: 35px; /*Height of the month-year select row*/
        --dp-month-year-row-button-size: 35px; /*Specific height for the next/previous buttons*/
        --dp-button-icon-height: 20px; /*Icon sizing in buttons*/
        --dp-cell-size: 35px; /*Width and height of calendar cell*/
        --dp-cell-padding: 5px; /*Padding in the cell*/
        --dp-common-padding: 10px; /*Common padding used*/
        --dp-input-icon-padding: 35px; /*Padding on the left side of the input if icon is present*/
        --dp-input-padding: 3.5px 35px 3.5px 12px; /*Padding in the input*/
        --dp-menu-min-width: 260px; /*Adjust the min width of the menu*/
        --dp-action-buttons-padding: 2px 5px; /*Adjust padding for the action buttons in action row*/
        --dp-row-margin:  5px 0; /*Adjust the spacing between rows in the calendar*/
        --dp-calendar-header-cell-padding:  0.5rem; /*Adjust padding in calendar header cells*/
        --dp-two-calendars-spacing:  10px; /*Space between multiple calendars*/
        --dp-overlay-col-padding:  3px; /*Padding in the overlay column*/
        --dp-time-inc-dec-button-size:  32px; /*Sizing for arrow buttons in the time picker*/
        --dp-menu-padding: 6px 8px; /*Menu padding*/
        
        /*Font sizes*/
        --dp-font-size: 0.875rem; /*Default font-size*/
        --dp-preview-font-size: 0.875rem; /*Font size of the date preview in the action row*/
        --dp-time-font-size: 0.875rem; /*Font size in the time picker*/
        
        /*Transitions*/
        --dp-animation-duration: 0.1s; /*Transition duration*/
        --dp-menu-appear-transition-timing: cubic-bezier(.4, 0, 1, 1); /*Timing on menu appear animation*/
        --dp-transition-timing: ease-out; /*Timing on slide animations*/
    }

    .dp__theme_light {
        --dp-background-color: #fff;
        --dp-text-color: #0a0a0a;
        --dp-hover-color: #f3f3f3;
        --dp-hover-text-color: #0a0a0a;
        --dp-hover-icon-color: #959595;
        --dp-primary-color: #1976d2;
        --dp-primary-disabled-color: #6bacea;
        --dp-primary-text-color: #f8f5f5;
        --dp-secondary-color: #c0c4cc;
        --dp-border-color: #ddd;
        --dp-menu-border-color: #ddd;
        --dp-border-color-hover: #ddd;
        --dp-border-color-focus: #ddd;
        --dp-disabled-color: #f6f6f6;
        --dp-scroll-bar-background: #f3f3f3;
        --dp-scroll-bar-color: #959595;
        --dp-success-color: #76d275;
        --dp-success-color-disabled: #a3d9b1;
        --dp-icon-color: #959595;
        --dp-danger-color: #ff6f60;
        --dp-marker-color: #ff6f60;
        --dp-tooltip-color: #fafafa;
        --dp-disabled-color-text: #8e8e8e;
        --dp-highlight-color: rgb(25 118 210 / 10%);
        --dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);
        --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
        --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
    }
    .dp__theme_dark {
        --dp-background-color: #212121;
        --dp-text-color: #fff;
        --dp-hover-color: #484848;
        --dp-hover-text-color: #fff;
        --dp-hover-icon-color: #959595;
        --dp-primary-color: #005cb2;
        --dp-primary-disabled-color: #61a8ea;
        --dp-primary-text-color: #fff;
        --dp-secondary-color: #a9a9a9;
        --dp-border-color: #2d2d2d;
        --dp-menu-border-color: #2d2d2d;
        --dp-border-color-hover: #aaaeb7;
        --dp-border-color-focus: #aaaeb7;
        --dp-disabled-color: #737373;
        --dp-disabled-color-text: #d0d0d0;
        --dp-scroll-bar-background: #212121;
        --dp-scroll-bar-color: #484848;
        --dp-success-color: #00701a;
        --dp-success-color-disabled: #428f59;
        --dp-icon-color: #959595;
        --dp-danger-color: #e53935;
        --dp-marker-color: #e53935;
        --dp-tooltip-color: #3e3e3e;
        --dp-highlight-color: rgb(0 92 178 / 20%);
        --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
        --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
        --dp-range-between-border-color: var(--dp-hover-color, #fff);
    }
</style>