<script setup lang="ts">
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
import { AuthService } from "@/services/auth";
import { Home, Inbox, PowerCircle, Settings } from "lucide-vue-next";
import { useRouter } from "vue-router";
import AppLogo from "./app-logo.vue";
import { ref } from "vue";

const router = useRouter();
const isSidebarOpen = ref(false);

const items = [
  { title: "Overview", url: "#", icon: Home },
  { title: "Leads", url: "#", icon: Inbox },
  { title: "Forms", url: "#", icon: Settings },
];

const logoutUser = () => {
  AuthService.clearAuth();
  router.push("/admin/login");
  return;
};
</script>

<template>
  <SidebarProvider v-model:open="isSidebarOpen">
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <AppLogo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton as-child>
                  <a :href="item.url">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter class="mb-5">
        <SidebarMenuButton as-child>
          <span class="cursor-pointer" @click="logoutUser">
            <PowerCircle />
            <span>Logout</span>
          </span>
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
      >
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <AppLogo v-if="!isSidebarOpen" class="transition-opacity duration-200" />
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div class="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <slot />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
