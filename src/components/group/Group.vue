<template>
  <v-card id="group">
    <v-img v-if="!isSecOrDist()" src="@/assets/dist.png" id="icontypegroup"></v-img>
    <v-img v-if="isSecOrDist()" src="@/assets/sec.png" id="icontypegroup"></v-img>
    <div style="cursor: pointer;" @click="$emit('click', group.id)">
      <h3 id="group-name">{{ group.displayName }}</h3>
      <p>{{ $t("group.owner") }}: {{ group.owner.displayName }}</p>
      <p>{{ $t("group.attendeesNumber") }}: {{ group.attendees }}</p>
    </div>
    <v-card-actions class="card-actions">
      <IconButton id="joinButton" icon="mdi-account-plus" color="orange" :tooltip="$t('groups.join')" @click="onJoinClick" />    
      <JoinPopup ref="groupJoin" />
    </v-card-actions>
  </v-card>
</template>

<script>
import IconButton from "@/components/common/button/IconButton";
import JoinPopup from "@/components/group/JoinGroupPopup.vue";

export default {
  name: "Group",
  props: ["group"],
  components: { IconButton, JoinPopup },
  methods: {
    onJoinClick() {
      this.$refs.groupJoin.open(this.group);
    },
    isSecOrDist() {
      if (this.group.type == "Security Group") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
#group {
  width: 300px;
  height: 170px;
  font-size: 13px;
  text-align: right;
  padding: 20px;
  margin: 10px;
}

#divGroup {
  height: 170px;
}

#group-name {
  text-align: center;
  margin-top: 10px;
}

.card-actions {
  position: absolute;
  top: 120px;
  right: 240px;
}

#icontypegroup {
  height: 20px;
  width: 20px;
  position: absolute;
  left: 265px;
  top: 10px;
}


</style>
