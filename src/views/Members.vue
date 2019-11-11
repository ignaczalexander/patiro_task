<template>
  <div class="container">
    <h1>Members</h1>
    <Filters :members="members" />
    <ul>
      <MemberItem
        v-for="member in filteredMembers"
        :key="member.id"
        @open-modal="openModal"
        :member="member"
      />
    </ul>
    <MemberModal @close-modal="closeModal" v-model="modalOpen" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MemberItem from "../components/MemberItem";
import MemberModal from "../components/MemberModal";
import Filters from "../components/Filters";

export default {
  name: "members",
  data() {
    return {
      modalOpen: false
    };
  },
  components: {
    MemberItem,
    MemberModal,
    Filters
  },
  computed: {
    ...mapGetters(["members", "filteredMembers"])
  },
  methods: {
    ...mapActions(["fetchMembers"]),
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    }
  },
  created() {
    this.fetchMembers();
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding: 1.5rem;
  margin: auto;
  max-width: $max_width;
}
h1 {
  margin-top: 0;
  font-size: 1.5rem;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>