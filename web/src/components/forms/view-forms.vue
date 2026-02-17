<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { useApi } from "@/composables/useApi";
import { getForms } from "@/services/forms";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { routes } from "@/router/routes";
import { formatDate } from "@/lib/utils";

const router = useRouter();

const { execute, data } = useApi({ fn: getForms });

const forms = computed(() => data.value?.data ?? []);

onMounted(() => execute({ status: "active" }));
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-6">
    <Item v-for="form in forms" :key="form._id" variant="outline">
      <ItemContent>
        <ItemTitle>{{ form.name }}</ItemTitle>
        <ItemDescription> {{ formatDate(form.updatedAt) }} </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm" @click="router.push(routes.service(form._id))"> Proceed </Button>
      </ItemActions>
    </Item>
  </div>
</template>
