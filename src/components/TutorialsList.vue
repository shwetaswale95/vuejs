<template>
  <div class="list row">
    <div class="col-md-12">
      <h4>Tutorials List</h4>
      <b-table :items="tutorials" :fields="fields" striped responsive="sm">
        <template #cell(actions)="data">
          <b-button size="sm" class="btn btn-success" @click="onEdit(data)">
            Edit
          </b-button>
          <b-button size="sm" class="btn btn-danger" @click="onDelete(data)">
            Delete
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
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
    };
  },
  methods: {
    retrieveTutorials() {
      TutorialDataService.getAll().then((response) => {
        this.tutorials = response.data;
      });
    },
    onEdit(data) {
      const id = this.tutorials[data.index].id;
      this.$router.push({
        name: "edit",
        params: { id: id },
      });
    },
    onDelete(data) {
      const id = this.tutorials[data.index].id;
      TutorialDataService.delete(id).then(() => {
        this.retrieveTutorials();
      });
    },
  },
  mounted() {
    this.retrieveTutorials();
  },
};
</script>
