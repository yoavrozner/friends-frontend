<template>
  <div>
    <Header :txt="$t('createGroup')" />
    <GroupForm @complete="onComplete" />
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import GroupForm from "@/components/group/GroupForm";

export default {
  name: "CreateGroup",
  components: { Header, GroupForm },
  methods: {
    onComplete(group) {
      console.log(group);
    },
  },
};
</script>

<style scoped>
</style>