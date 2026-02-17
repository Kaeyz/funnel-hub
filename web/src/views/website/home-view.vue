<script setup lang="ts"></script>

<template>
  <div class="p-6 space-y-6">
    <!-- Hero -->
    <div>
      <h2 class="text-3xl font-bold">Welcome to Funnel Hub</h2>
      <p class="text-muted-foreground mt-2">Grow your business with powerful funnel tools.</p>
    </div>

    <!-- Cards -->
    <div class="grid gap-4 md:grid-cols-3">
      <div class="p-6 rounded-xl border bg-card shadow-sm">
        <h3 class="font-semibold">Create Funnel</h3>
        <p class="text-sm text-muted-foreground mt-2">Build high-converting funnels.</p>
      </div>

      <div class="p-6 rounded-xl border bg-card shadow-sm">
        <h3 class="font-semibold">Analytics</h3>
        <p class="text-sm text-muted-foreground mt-2">Track your performance.</p>
      </div>

      <div class="p-6 rounded-xl border bg-card shadow-sm">
        <h3 class="font-semibold">Manage Leads</h3>
        <p class="text-sm text-muted-foreground mt-2">Organize your contacts.</p>
      </div>
    </div>

    <!-- Metrics -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="p-4 rounded-xl border bg-card text-center">
        <p class="text-2xl font-bold">1.2k</p>
        <p class="text-sm text-muted-foreground">Visitors</p>
      </div>

      <div class="p-4 rounded-xl border bg-card text-center">
        <p class="text-2xl font-bold">350</p>
        <p class="text-sm text-muted-foreground">Leads</p>
      </div>

      <div class="p-4 rounded-xl border bg-card text-center">
        <p class="text-2xl font-bold">$12.5k</p>
        <p class="text-sm text-muted-foreground">Sales</p>
      </div>

      <div class="p-4 rounded-xl border bg-card text-center">
        <p class="text-2xl font-bold">8.5%</p>
        <p class="text-sm text-muted-foreground">Conversion</p>
      </div>
    </div>
  </div>
</template>
