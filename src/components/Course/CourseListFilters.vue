<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {CourseFilterBuilder} from "../../helpers/CourseFilterBuilder.ts";
import {CourseFilterHelper} from "../../helpers/CourseFilterHelper.ts";

const emit = defineEmits(["filterChanged", "filterInitialized"])

const dateOption = ref("Today")
const search = ref("")
const emitFilter = () => {
  const dateFilterOption = CourseFilterHelper.getDateRangeForFilter(dateOption.value);

  const filter = new CourseFilterBuilder()
      .withSearch(search.value)
      .withDateStart(dateFilterOption.dateStart!)
      .withDateEnd(dateFilterOption.dateEnd!)
      .build()

  emit('filterChanged', filter);
}

onMounted(() => {
  const dateFilterOption = CourseFilterHelper.getDateRangeForFilter(dateOption.value);

  const filter = new CourseFilterBuilder()
      .withDateStart(dateFilterOption.dateStart!)
      .withDateEnd(dateFilterOption.dateEnd!)
      .build()

  emit("filterInitialized", filter)
})

watch([dateOption, search], emitFilter)
</script>

<template>
  <div id="courses-list-filters">
    <select name="course-date" id="course-date-filter" v-model="dateOption">
      <option value="Today">Today</option>
      <option value="Tomorrow">Tomorrow</option>
      <option value="NextWeek">Next week</option>
      <option value="Past">Past</option>
      <option value="Future">Future</option>
      <option value="All">All</option>
    </select>

    <div>
      <input id="course-search-filter-input" type="text" placeholder="Name, group, location..." v-model="search">
    </div>

  </div>
</template>

<style scoped>
#courses-list-filters {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
}

select {
  text-align: center;
  min-width: 150px;
  padding: 5px;
}

#course-search-filter-input {
  border: none;
  border-radius: 5pt;
  padding: 10px;
  min-width: 300px;
}

@media (min-width: 1024px) {
  #courses-list-filters {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>