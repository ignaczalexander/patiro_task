<template>
  <div @click="$emit('close-modal')" class="modal" v-show="value">
    <div @click.stop class="modal-container">
      <div class="no-data" v-if="memberEmpty">Sorry, there is no additional data for this member.</div>
      <template v-else>
        <h1 class="header">{{memberInfo.fullName}}</h1>
        <div class="info-container">
          <div class="col">
            <div class="info-item">
              <div class="title">ID</div>
              <div class="info">{{memberInfo.id}}</div>
            </div>
            <div class="info-item">
              <div class="title">NAME</div>
              <div class="info">{{memberInfo.fullName}}</div>
            </div>
            <div class="info-item">
              <div class="title">EMAIL</div>
              <div class="info">{{memberInfo.email}}</div>
            </div>
            <div class="info-item">
              <div class="title">DATE OF BIRTH</div>
              <div class="info">{{memberInfo.email}}</div>
            </div>
            <div class="info-item">
              <div class="title">ADDRESS</div>
              <div class="info">{{memberInfo.streetAddress1}}</div>
              <div class="info">{{memberInfo.city}}</div>
              <div class="info">{{memberInfo.zipCode}}</div>
              <div class="info">{{memberInfo.country && memberInfo.country.name}}</div>
            </div>
          </div>
          <div class="col">
            <div class="row">
              <div class="info-item">
                <div class="title">AGE</div>
                <div class="info">{{memberInfo.age}}</div>
              </div>
              <div class="info-item">
                <div class="title">GENDER</div>
                <div class="info">{{memberInfo.gender && memberInfo.gender.name}}</div>
              </div>
            </div>
            <div class="row">
              <div class="info-item">
                <div class="title">WEIGHT</div>
                <div class="info">{{memberInfo.weightInKg}}</div>
              </div>
              <div class="info-item">
                <div class="title">HEIGHT</div>
                <div class="info">{{memberInfo.heightInCm}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="survey-container">
          <div class="title title-margin">SURVEY RESPONSES</div>
          <SurveyItem :key="survey.survey.id" v-for="survey in surveyInfo" :survey="survey" />
        </div>
      </template>
      <button class="btn-close" @click.prevent="$emit('close-modal')">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SurveyItem from "./MemberModal/SurveyItem";
export default {
  name: "MemberModal",
  props: ["value"],
  components: {
    SurveyItem
  },
  computed: {
    ...mapGetters(["currentMember"]),
    memberInfo() {
      return this.currentMember.info;
    },
    surveyInfo() {
      return this.currentMember.surveyResponses;
    },
    memberEmpty() {
      return Object.keys(this.currentMember.info).length === 0;
    }
  }
};
</script>
<style lang="stylus" scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.75);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 999;
}

.modal-container {
  width: 90%;
  box-sizing: border-box;
  max-width: 500px;
  height: 80vh;
  background-color: white;
  border-radius: 3px;
  padding: 1.5rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: auto;
}

.header {
  margin: 0;
  margin-bottom: 2rem;
  font-size: 1.25rem;
  text-align: center;
}

.info-container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 1.25rem;

  .info-item {
    text-align: left;
    margin-bottom: 1.5rem;
  }
}

.title {
  font-size: 12px;
  color: #999;
  text-align: left;

  &-margin {
    margin-bottom: 0.5rem;
  }
}

.no-data {
  color: gray;
  display: flex;
  justify-content: center;
  padding-top: 10rem;
}

.row {
  display: grid;
  grid-template-columns: 70px 70px;
}

.btn-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover i {
    color: black;
  }

  i {
    font-size: 1rem;
    color: gray;
  }
}

@media screen and (min-width: 600px) {
  .info-container {
    flex-direction: row;
  }
}
</style>
