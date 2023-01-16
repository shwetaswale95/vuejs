<template>
  <div class="submit-form">
    <div v-if="errors.length" class="text-danger">
      <b>Please correct the following errors</b>
      <ul>
        <li v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div class="form-group">
      <label for="title">Title</label>
      <input
        type="text"
        class="form-control"
        id="title"
        required
        v-model="tutorial.title"
      />
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <input
        class="form-control"
        id="description"
        required
        v-model="tutorial.description"
        name="description"
      />
    </div>
    <button
      v-if="$route.params.id"
      @click="saveTutorial()"
      class="btn btn-success"
    >
      Update
    </button>
    <button v-if="$route.params.id" @click="goToList()" class="btn">
      cancel
    </button>
    <button v-else @click="saveTutorial" class="btn btn-success">Submit</button>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
export default {
  name: "AddTutorial",
  data() {
    return {
      tutorial: {
        id: null,
        title: "",
        description: "",
      },
      errors: [],
    };
  },
  methods: {
    saveTutorial() {
      this.errors = [];
      if (!this.tutorial.title) {
        this.errors.push("title required.");
      }
      if (!this.tutorial.description) {
        this.errors.push("Description required.");
      }
      if (this.errors.length > 0) {
        return;
      }
      const data = {
        title: this.tutorial.title,
        description: this.tutorial.description,
      };
      if (this.$route.params.id) {
        this.updateTutorial(data);
      } else {
        TutorialDataService.create(data).then((response) => {
          this.tutorial.id = response.data.id;
          this.$router.push({ name: "tutorials" });
        });
      }
    },
    getTutorial(id) {
      TutorialDataService.get(id).then((response) => {
        this.tutorial = response.data;
      });
    },
    updateTutorial(data) {
      let selectedId = this.$route.params.id;
      TutorialDataService.update(selectedId, data).then(() => {
        this.$router.push({ name: "tutorials" });
      });
    },
    goToList() {
      this.$router.push({ name: "tutorials" });
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.getTutorial(this.$route.params.id);
    }
  },
};
</script>
<style>
.form-group {
  margin-bottom: 20px;
}
.btn {
  margin: 0 4px;
}
</style>
