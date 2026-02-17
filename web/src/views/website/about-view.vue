<script setup lang="ts"></script>

<template>
  <div class="p-6 space-y-10">
    <!-- Intro -->
    <div>
      <h2 class="text-3xl font-bold">About Funnel Hub</h2>
      <p class="text-muted-foreground mt-2 max-w-2xl">We help businesses scale through optimized sales funnels.</p>
    </div>

    <!-- Mission -->
    <div class="grid md:grid-cols-2 gap-6 items-center">
      <div>
        <h3 class="text-xl font-semibold mb-2">Our Mission</h3>
        <p class="text-muted-foreground">To simplify growth by providing powerful yet easy-to-use tools.</p>
      </div>

      <div class="rounded-xl border bg-card h-48 flex items-center justify-center">
        <span class="text-muted-foreground">Image Placeholder</span>
      </div>
    </div>

    <!-- Team -->
    <div>
      <h3 class="text-xl font-semibold mb-6">Our Team</h3>

      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <div class="p-6 rounded-xl border bg-card text-center">
          <div class="w-16 h-16 rounded-full bg-muted mx-auto mb-4" />
          <h4 class="font-semibold">Sarah Johnson</h4>
          <p class="text-sm text-muted-foreground">CEO</p>
        </div>

        <div class="p-6 rounded-xl border bg-card text-center">
          <div class="w-16 h-16 rounded-full bg-muted mx-auto mb-4" />
          <h4 class="font-semibold">Mark Thompson</h4>
          <p class="text-sm text-muted-foreground">Marketing Director</p>
        </div>

        <div class="p-6 rounded-xl border bg-card text-center">
          <div class="w-16 h-16 rounded-full bg-muted mx-auto mb-4" />
          <h4 class="font-semibold">Lisa Wong</h4>
          <p class="text-sm text-muted-foreground">Lead Developer</p>
        </div>
      </div>
    </div>
  </div>
</template>
