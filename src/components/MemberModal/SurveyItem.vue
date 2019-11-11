<template>
  <div class="survey-item">
    <div class="header">
      <h2 @click="toggleOpen">{{survey.survey.name}}</h2>
      <i :class="{down:isOpen}" class="fas fa-caret-down"></i>
    </div>
    <div v-show="isOpen" class="responses">
      <div
        :key="question.questionID"
        v-for="question in survey.questionResponses"
        class="survey-response"
      >
        <div>{{question.question}}</div>
        <div class="answer">{{question.responses.join(' ')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    }
  },
  name: "SurveyItem",
  props: ["survey"]
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 1rem;
  text-align: center;
  padding: 1rem;
  margin: 0;
  margin-right: 0.75rem;
  cursor: pointer;
}

.responses {
  padding: 0 1rem 1rem 1rem;
}

.survey-item {
  background-color: $bg_light_gray;
  border-radius: 3px;
  margin-bottom: 0.5rem;

  .header {
    position: relative;
  }

  .survey-response {
    text-align: left;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid $bg_gray;
  }

  .answer {
    color: #418db8;
  }

  i {
    position: absolute;
    top: 50%;
    right: 0.75rem;
    transform: translateY(-50%);
    transition: all 0.5s ease;

    &.down {
      transform: rotate(180deg) translateY(50%);
    }
  }
}
</style>
