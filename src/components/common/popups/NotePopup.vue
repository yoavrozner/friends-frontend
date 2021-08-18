<template>
  <v-dialog v-model="dialog" max-width="700">
    <v-card color="white" id="note">
      <div id="note-icon">
        <img class="popup-icon" src="@/assets/icons/note.svg" />
      </div>

      <p id="notice">{{ note.title }}</p>
      <p class="secret">{{ note.subtitle }}</p>
      <p class="secret">{{ note.terms }}</p>
      <div id="marks" class="space-right">
        <v-checkbox
          v-for="mark in note.marks"
          :key="mark"
          :value="mark"
          :label="mark"
          color="red"
          v-model="selected"
        ></v-checkbox>
        <v-checkbox
          :disabled="selected.length !== note.marks.length"
          :label="note.lastTerm"
          color="red"
          v-model="agreed"
        ></v-checkbox>
      </div>
      <v-card-actions class="popup-confirm">
        <SubmitButton @click="onConfirm" :label="note.agree" :disabled="!agreed" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SubmitButton from "@/components/common/button/SubmitButton";

export default {
  name: "Note",
  props: ["note"],
  components: { SubmitButton },
  data() {
    return {
      selected: [],
      agreed: false,
      dialog: false,
      request: undefined,
    };
  },
  watch: {
    selected: function(val) {
      if (val.length !== this.note.marks.length) {
        this.agreed = false;
      }
    },
    dialog: function(val) {
      if (val) {
        this.selected = [];
        this.agreed = false;
      }
    },
  },
  methods: {
    onConfirm() {
      this.$emit("complete", this.request);
      this.close();
    },
    open(request) {
      this.request = request;
      this.dialog = true;
    },
    close() {
      this.request = undefined;
      this.dialog = false;
      this.selected = [];
    },
  },
};
</script>

<style scoped>
#note {
  text-align: center;
  padding: 20px;
}
#notice {
  font-size: 40px;
}
.secret {
  font-size: 18px;
}
.popup-icon {
  padding: 15px 0;
  width: 100px;
}
.popup-confirm {
  display: flex;
  justify-content: center;
}
.space-right {
  padding-right: 20px;
}
</style>
