<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ref } from "vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "vue-sonner";
import { AuthService } from "@/services/auth";
import { useRouter } from "vue-router";
import AppLogo from "../layouts/app-logo.vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
const router = useRouter();

const username = ref("");
const password = ref("");

const APP_PASSWORD = "admin123";

const handleLogin = () => {
  if (!username.value || !password.value) {
    toast.error("Please enter username and password.");
    return;
  }

  if (password.value !== APP_PASSWORD) {
    toast.error("Invalid username or password.");
    return;
  }
  AuthService.setAuth(username.value);
  toast.success("Login successful!");
  router.push("/admin");
};
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader>
        <div class="flex justify-center">
          <AppLogo />
        </div>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription> Enter your username below to login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleLogin">
          <FieldGroup>
            <Field>
              <FieldLabel for="username">Username</FieldLabel>
              <Input id="username" v-model="username" type="text" placeholder="Enter username" required />
            </Field>
            <Field>
              <div class="flex items-center">
                <FieldLabel for="password"> Password </FieldLabel>
              </div>
              <Input id="password" v-model="password" type="password" placeholder="******" required />
            </Field>
            <Field>
              <Button type="submit">Login</Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
