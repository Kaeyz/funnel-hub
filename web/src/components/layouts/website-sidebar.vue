<script setup lang="ts">
import { ref, computed, type Component } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppLogo from "./app-logo.vue";
import { AuthService } from "@/services/auth";
import { Home, Inbox, Settings, PowerCircle } from "lucide-vue-next";
import { routes } from "@/router/routes";

const isSidebarOpen = ref(true);
const router = useRouter();
const route = useRoute();

type SidebarItem = {
  title: string;
  icon: Component;
  path: string;
};

const sidebarItems: SidebarItem[] = [
  { title: "Home", icon: Home, path: routes.home() },
  { title: "About", icon: Inbox, path: routes.about() },
  { title: "Services", icon: Settings, path: routes.services() },
];

const logout = () => {
  AuthService.clearAuth("user");
  router.replace(routes.home());
};

const activePath = computed(() => route.path);
</script>

<template>
  <SidebarProvider v-model:open="isSidebarOpen">
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <AppLogo :home-path="routes.home()" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem
                v-for="item in sidebarItems"
                :key="item.title"
                :class="{ 'bg-muted/20': activePath === item.path }"
              >
                <SidebarMenuButton as-child>
                  <router-link :to="item.path" class="flex items-center gap-2">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                  </router-link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter class="mb-5">
        <SidebarMenuButton as-child>
          <button class="flex items-center gap-2" @click="logout">
            <PowerCircle />
            <span>Logout</span>
          </button>
        </SidebarMenuButton>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>

    <SidebarInset>
      <header
        class="flex h-16 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
      >
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger />
          <AppLogo v-if="!isSidebarOpen" class="transition-opacity duration-200" :home-path="routes.home()" />
        </div>
      </header>

      <main class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div class="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <slot />
        </div>
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
