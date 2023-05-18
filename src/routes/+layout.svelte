<script>
  import '../app.css';
</script>

<div class="h-screen flex flex-col">
  <header class="sticky top-0 z-50 navbar bg-base-100">
    <a class="btn btn-ghost normal-case text-xl" href="/">Units</a>
    <a class="btn btn-ghost normal-case text-xl" href="/growths/">Overall Growths</a>
    <a class="btn btn-ghost normal-case text-xl" href="/about/">About</a>
  </header>

  <main class="relative">
    <slot />
  </main>
</div>
