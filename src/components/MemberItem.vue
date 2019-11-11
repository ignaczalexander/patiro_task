<template>
  <li class="member-item-container" :class="memberClass" @click="getMember(member.id)">
    <div class="col">
      <div class="info-item">
        <div class="title">ID</div>
        <div class="info">{{member.id}}</div>
      </div>
      <div class="info-item">
        <div class="title">NAME</div>
        {{member.fullName || '-'}}
      </div>
    </div>
    <div class="col">
      <div class="row">
        <div class="info-item">
          <div class="title">AGE</div>
          <div class="info">{{member.age || '-'}}</div>
        </div>

        <div class="info-item">
          <div class="title">GENDER</div>
          <div class="info">{{member.gender && member.gender.name || '-'}}</div>
        </div>
      </div>
      <div class="info-item">
        <div class="title">COUNTRY</div>
        <div class="info">{{member.country && member.country.name || '-'}}</div>
      </div>
    </div>
    <button @click="openModal">
      <i class="fas fa-info-circle"></i>
    </button>
  </li>
</template>

<script>
import { mapActions } from "vuex";
import constants from "../constants";
export default {
  name: "MemberItem",
  props: ["member"],
  methods: {
    ...mapActions(["getMember"]),
    openModal() {
      this.$emit("open-modal");
    }
  },
  computed: {
    memberClass() {
      return {
        allowed: constants.allowedUserIds.includes(this.member.id.toString())
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.member-item-container {
  background-color: $bg_light_gray;
  border-radius: 3px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.col {
  flex: 1;
  div:last-child {
    margin-bottom: 0;
  }
}
.row {
  display: flex;
  div:first-child {
    margin-right: 2rem;
  }
}
.info-item {
  margin-bottom: 1rem;
  .title {
    font-size: 12px;
    color: gray;
  }
}
button {
  position: absolute;
  bottom: 0.25rem;
  right: 0.25rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  i {
    font-size: 1rem;
    color: gray;
  }
}
.allowed {
  background-color: rgb(212, 255, 215);
}
</style>