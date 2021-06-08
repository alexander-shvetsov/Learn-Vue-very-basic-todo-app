const App = {
  data() {
    return {
      title: "Notes",
      input: {
        value: "",
        placeholder: "Type something",
      },
      notes: ["task #1", "task #2", "task #3"],
      editingNote: null,
      actionButton: "Add node",
    };
  },
  // default tasks, if localStorage is blank
  mounted() {
    this.getNotes();
  },
  // check array of notes
  watch: {
    notes: {
      handler(updatedList) {
        localStorage.setItem("notes", JSON.stringify(updatedList));
      },
      deep: true,
    },
  },
  methods: {
    // default tasks, if localStorage is blank
    getNotes() {
      const localNotes = localStorage.getItem("notes");
      if (localNotes) {
        this.notes = JSON.parse(localNotes);
      }
    },
    // white note
    onSubmit() {
      // write new note
      if (this.editingNote == null) {
        this.notes.push(this.input.value);
        // edit note
      } else {
        this.notes[this.editingNote] = this.input.value;
        this.actionButton = "Add note";
        this.editingNote = null;
      }
      // reset input
      this.input.value = "";
    },
    // delete note
    removeNote(index) {
      this.notes.splice(index, 1);
    },
    // edit note
    editNote(index) {
      this.focusInput();
      this.actionButton = "Update";
      this.input.value = this.notes[index];
      this.editingNote = index;
    },
    // focus input on edit
    focusInput() {
      this.$refs.input.focus();
    },
  },
};

Vue.createApp(App).mount("#app");
