<template>
  <div>
    <Header :txt="$t('pages.createGroup')" />
    <GroupForm @complete="onComplete" />
  </div>
</template>

<script>
import Header from "@/components/common/text/Header";
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

<style scoped></style>
