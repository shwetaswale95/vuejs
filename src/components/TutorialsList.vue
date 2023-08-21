<template>
  <div class="list row">
    <div class="text-xl font-bold">Tutorials List</div>
    <div
      v-if="showSuccess"
      class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      <span class="font-medium">{{ message }}</span>
    </div>
    <div class="col-md-12">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th scope="col" class="px-6 py-3">Title</th>
              <th scope="col" class="px-6 py-3">Description</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in tutorials"
              :key="item.id"
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            >
              <td class="px-6 py-3">{{ item.title }}</td>
              <td class="px-6 py-4 truncate max-w-[10px]">
                {{ item.description }}
              </td>
              <td>
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  @click="onEdit(item)"
                >
                  Edit
                </button>
                <button
                  id="button"
                  data-modal-target="popup-modal"
                  data-modal-toggle="popup-modal"
                  type="button"
                  @click="showConfirmation(item)"
                  class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      id="popup-modal"
      tabindex="-1"
      class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-6 text-center">
            <svg
              class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3
              class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
            >
              Are you sure you want to delete
              <span class="font-bold">{{ selectedRecord?.title }}</span> ?
            </h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              @click="onDelete()"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
import {
  initFlowbite,
  initDrawers,
  initDropdowns,
  initModals,
  initPopovers,
} from "flowbite";
export default {
  name: "TutorialsList",
  data() {
    return {
      tutorials: [],
      fields: [
        {
          key: "title",
          label: "Title",
        },
        {
          key: "description",
          label: "Description",
        },
        { key: "actions", label: "Actions" },
      ],
      selectedRecord: {
        id: null,
        title: "",
      },
      showSuccess: false,
      message: "",
    };
  },
  methods: {
    retrieveTutorials() {
      TutorialDataService.getAll().then((response) => {
        this.tutorials = response.data;
      });
    },
    onEdit(data) {
      const id = data.id;
      this.$router.push({
        name: "edit",
        params: { id: id },
      });
    },
    showConfirmation(data) {
      this.selectedRecord = data;
    },
    onDelete() {
      TutorialDataService.delete(this.selectedRecord.id).then(() => {
        this.retrieveTutorials();
        this.showSuccess = true;
        this.message = this.selectedRecord.title + " deleted successfully !!!";
        setTimeout(() => {
          this.showSuccess = false;
        }, 2000);
      });
    },
  },
  mounted() {
    this.retrieveTutorials();
    initFlowbite();
    initDrawers();
    initDropdowns();
    initModals();
    initPopovers();
  },
};
</script>
