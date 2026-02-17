<script setup lang="ts">
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { useApi } from "@/composables/useApi";
import { computed, onMounted, reactive, ref, toRaw } from "vue";
import { getFormSections } from "@/services/form-sections";
import { useRoute, useRouter } from "vue-router";
import { getQuestions } from "@/services/questions";
import TextInput from "../common/inputs/text-input.vue";
import { Button } from "../ui/button";
import { IndexedDBService } from "@/lib/index-db/index-db-service";
import { AuthService } from "@/services/auth";
import type { Question, QuestionType } from "@/services/types/question.type";
import { toast } from "vue-sonner";
import { submitLeadData } from "@/services/leads";
import { routes } from "@/router/routes";

const route = useRoute();
const router = useRouter();
const formId = route.params.serviceId as string;
const userName = AuthService.getUsername("user") || "";

const selectedSectionId = ref("");
const currentSectionIndex = ref(0);

type FormAnswer = {
  questionId: string;
  type: QuestionType;
  value: any;
};
const formData = reactive<Record<string, FormAnswer>>({});
const formStructure = reactive<Record<string, string[]>>({});

const {
  execute: executeGetFormSections,
  data: formSections,
  loading: isLoadingQuestions,
} = useApi({
  fn: getFormSections,
  onSuccess: (_m, d) => {
    const firstSection = d.data[0]?._id;
    if (firstSection) {
      currentSectionIndex.value = 0;
      onSectionSelect(firstSection);
    }
  },
});
const sections = computed(() => formSections.value?.data ?? []);
const isFirstSection = computed(() => currentSectionIndex.value === 0);
const isLastSection = computed(() => currentSectionIndex.value === sections.value.length - 1);

const { execute: executeGetQuestions, data: formQuestions } = useApi({ fn: getQuestions });
const questions = computed(() => formQuestions.value?.data ?? []);

onMounted(async () => {
  await executeGetFormSections({
    status: "active",
    formId,
    sortKey: "order",
    sortDir: "asc",
  });

  const saved = await IndexedDBService.getOne(formId, userName);
  if (saved) {
    saved.formData.forEach((answer) => {
      formData[answer.questionId] = answer;
    });
  }
});

const onSectionSelect = async (formSectionId: string) => {
  selectedSectionId.value = formSectionId;
  await executeGetQuestions({
    status: "active",
    formSectionId,
    sortKey: "order",
    sortDir: "asc",
  });
};

const goToSectionByIndex = async (index: number) => {
  const section = sections.value[index];
  if (!section) return;
  currentSectionIndex.value = index;
  await onSectionSelect(section._id);
};
const goNext = async () => {
  if (selectedSectionId.value) {
    formStructure[selectedSectionId.value] = formQuestions.value?.data.map((v) => v._id) || [];
  }
  if (!isLastSection.value) {
    await IndexedDBService.upsert({
      formId,
      userName,
      formData: Object.values(toRaw(formData)),
    });
    await goToSectionByIndex(currentSectionIndex.value + 1);
  }
};
const goPrevious = async () => {
  if (!isFirstSection.value) await goToSectionByIndex(currentSectionIndex.value - 1);
};

const updateAnswer = async (question: Question, value: string | File) => {
  formData[question._id] = { questionId: question._id, type: question.type, value };
};

const onFileChange = (event: Event, question: Question) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];
  if (file) updateAnswer(question, file);
};

const getAnswerValue = (id: string) => formData[id]?.value ?? "";

const { execute: submitFormData, loading: submitLoading } = useApi({
  fn: submitLeadData,
  onSuccess: async (m) => {
    const saved = await IndexedDBService.getOne(formId, userName);
    if (saved) await IndexedDBService.delete(saved.id!);
    Object.keys(formData).forEach((key) => {
      delete formData[key];
    });
    toast.success(m);
    router.push(routes.services());
  },
  onError: (e) => {
    toast.error(e);
  },
});

const handleSubmit = async () => {
  if (selectedSectionId.value) {
    formStructure[selectedSectionId.value] = formQuestions.value?.data.map((v) => v._id) || [];
  }
  await IndexedDBService.upsert({
    formId,
    userName,
    formData: Object.values(toRaw(formData)),
  });
  if (!navigator.onLine) {
    toast.error("Unable to connect to network, try again when network connection is restored");
    return;
  }
  await submitFormData(formData, formStructure, formId, userName);
};
</script>

<template>
  <div class="flex flex-row gap-2">
    <div class="flex w-max h-max flex-col gap-2 border p-2">
      <h3>Section</h3>
      <Item
        v-for="(section, index) in sections"
        :key="section._id"
        variant="outline"
        size="sm"
        as-child
        :class="`cursor-pointer ${section._id === selectedSectionId && 'bg-primary text-white'}`"
        @click="goToSectionByIndex(index)"
      >
        <ItemContent>
          <ItemTitle>{{ section.name }}</ItemTitle>
        </ItemContent>
      </Item>
    </div>

    <div class="border w-full rounded p-4 grid gap-4">
      <div v-for="question in questions" :key="question._id">
        <div v-if="question.type === 'file'">
          <TextInput
            :id="question._id"
            :label="question.label"
            :type="question.type"
            :required="question.validation.required"
            @change="onFileChange($event, question)"
          />
          <p v-if="getAnswerValue(question._id)" class="text-sm text-gray-600">
            Selected file: {{ (getAnswerValue(question._id) as File).name }}
          </p>
        </div>

        <TextInput
          v-else
          :id="question._id"
          :label="question.label"
          :placeholder="question.label"
          :required="question.validation.required"
          :type="question.type"
          :model-value="getAnswerValue(question._id)"
          @update:model-value="(val) => updateAnswer(question, val)"
        />
      </div>

      <div class="flex mt-4 justify-between">
        <div class="flex gap-4">
          <Button variant="outline" :disabled="isFirstSection || isLoadingQuestions" @click="goPrevious"> Previous </Button>
          <Button variant="secondary" :disabled="isLastSection || isLoadingQuestions" @click="goNext"> Next </Button>
        </div>

        <Button :disabled="!isLastSection || isLoadingQuestions" :loading="submitLoading" @click="handleSubmit"> Submit </Button>
      </div>
    </div>
  </div>
</template>
