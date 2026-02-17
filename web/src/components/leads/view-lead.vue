<script setup lang="ts">
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { useApi } from "@/composables/useApi";
import { computed, onMounted, reactive, ref } from "vue";
import { getFormSections } from "@/services/form-sections";
import { getQuestions } from "@/services/questions";
import TextInput from "../common/inputs/text-input.vue";
import type { Question, QuestionType } from "@/services/types/question.type";
import { getLead } from "@/services/leads";
import FileViewer from "../common/file-viewer.vue";

const props = defineProps<{ leadId: string }>();

const selectedSectionId = ref("");
const currentSectionIndex = ref(0);

const { execute: executeGetFormSections, data: formSections } = useApi({
  fn: getFormSections,
  onSuccess: (_m, d) => {
    const firstSection = d.data[0]?._id;
    if (firstSection) {
      currentSectionIndex.value = 0;
      onSectionSelect(firstSection);
    }
  },
});

const { execute: executeGetLead, data: leadResponse } = useApi({
  fn: getLead,
  onSuccess: async (_m, v) => {
    await executeGetFormSections({
      formId: v.formId,
      sortKey: "order",
      sortDir: "asc",
      formSectionIds: Object.keys(v.formStructure),
    });
  },
});
const lead = computed(() => leadResponse.value);

type FormAnswer = {
  questionId: string;
  type: QuestionType;
  value: any;
};

const formData = reactive<Record<string, FormAnswer>>({});

const sections = computed(() => formSections.value?.data ?? []);

const { execute: executeGetQuestions, data: formQuestions } = useApi({
  fn: getQuestions,
  onSuccess: (_m, v) => {
    Object.values(v.data).forEach((q) => {
      updateAnswer(q, lead.value?.formData[q._id] || "");
    });
  },
});
const questions = computed(() => formQuestions.value?.data ?? []);

onMounted(() => executeGetLead(props.leadId));

const onSectionSelect = async (formSectionId: string) => {
  selectedSectionId.value = formSectionId;
  await executeGetQuestions({
    formSectionId,
    sortKey: "order",
    sortDir: "asc",
    questionIds: lead.value?.formStructure[formSectionId] as string[],
  });
};

const goToSectionByIndex = async (index: number) => {
  const section = sections.value[index];
  if (!section) return;
  currentSectionIndex.value = index;
  await onSectionSelect(section._id);
};

const updateAnswer = async (question: Question, value: string | File) => {
  formData[question._id] = { questionId: question._id, type: question.type, value };
};

const getAnswerValue = (id: string) => formData[id]?.value ?? "";
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
          <FileViewer :label="question.label" :file="formData[question._id]?.value" />
        </div>

        <TextInput
          v-else
          :id="question._id"
          :label="question.label"
          :placeholder="question.label"
          :required="question.validation.required"
          :type="question.type"
          :model-value="getAnswerValue(question._id)"
          :disabled="true"
          @update:model-value="(val) => updateAnswer(question, val)"
        />
      </div>
    </div>
  </div>
</template>
