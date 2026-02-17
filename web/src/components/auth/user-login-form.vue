<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ref } from "vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import TextInput from "../common/inputs/text-input.vue";
import { toast } from "vue-sonner";
import { AuthService } from "@/services/auth";
import { useRouter } from "vue-router";
import AppLogo from "../layouts/app-logo.vue";
import { routes } from "@/router/routes";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
const router = useRouter();

const username = ref("");
const password = ref("");

const APP_PASSWORD = "user123";

const handleLogin = () => {
  if (!username.value || !password.value) {
    toast.error("Please enter username and password.");
    return;
  }

  if (password.value !== APP_PASSWORD) {
    toast.error("Invalid username or password.");
    return;
  }
  AuthService.setAuth(username.value, "user");
  toast.success("Login successful!");
  router.push(routes.services());
};
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader>
        <div class="flex justify-center">
          <AppLogo :home-path="routes.home()" />
        </div>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription> Enter your username below to login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleLogin">
          <FieldGroup>
            <TextInput id="username" v-model="username" label="Username" placeholder="Enter username" required />
            <TextInput id="password" v-model="password" label="Password" placeholder="Enter password" required type="password" />
            <Field>
              <Button type="submit">Login</Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
