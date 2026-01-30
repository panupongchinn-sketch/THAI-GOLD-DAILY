<template>
  <div class="min-h-screen text-white bg-gradient-to-b from-[#2a0507] via-[#4b0f14] to-[#2a0507]">
    <!-- Top bar -->
    <header class="sticky top-0 z-30 bg-white text-slate-900 border-b border-slate-200">
      <div class="w-full px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <!-- ✅ โลโก้ (เอารูปจาก public/unnamed.jpg) -->
          <div class="w-9 h-9 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center">
            <img src="/unnamed.jpg" alt="logo" class="w-full h-full object-contain" />
          </div>

          <div class="leading-tight">
            <div class="font-black">ทองไทยเดลี่</div>
            <div class="text-[11px] text-slate-500">ราคาทองรายวัน</div>
          </div>
        </div>
        <!-- ✅ ไม่มีปุ่ม Refresh -->
      </div>

      <!-- mini menu -->
      <div class="bg-[#4b0f14] text-white">
        <div class="w-full px-4 sm:px-6 h-10 flex items-center gap-6 text-xs font-semibold">
          <span class="opacity-90">ราคาทองวันนี้</span>
          <span class="opacity-60">กราฟ</span>
          <span class="opacity-60">เกี่ยวกับเรา</span>
        </div>
      </div>
    </header>

    <!-- Body wrapper เต็มจอ -->
    <div class="w-full px-4 sm:px-6 py-8">
      <div
        class="w-full rounded-[28px] border border-[#e7c36a]/40 bg-[#3b0b10]/60 shadow-[0_0_0_1px_rgba(231,195,106,0.12),0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden"
      >
        <!-- HERO -->
        <section class="relative h-[220px] sm:h-[280px] md:h-[320px]" :style="heroStyle">
          <div class="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-[#3b0b10]/85"></div>
          <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#e7c36a]/60 to-transparent"></div>

          <div class="relative h-full flex items-end">
            <div class="w-full p-5 sm:p-8">
              <div class="max-w-5xl">
                <div
                  class="inline-flex items-center gap-2 rounded-full border border-[#e7c36a]/35 bg-black/25 px-3 py-1 text-[11px] tracking-[0.18em] uppercase"
                >
                  THAI GOLD DAILY
                </div>

                <h2 class="mt-3 text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                  <span
                    class="bg-clip-text text-transparent bg-gradient-to-r from-[#fff3c4] via-[#e7c36a] to-[#fff9df] drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
                  >
                    ราคาทองคำวันนี้
                  </span>
                </h2>

                <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <div class="text-white/85">
                    อัปเดตล่าสุด:
                    <span class="font-semibold text-white">
                      <!-- ✅ กัน prerender: ให้โชว์เวลาปัจจุบันเฉพาะ client -->
                      <ClientOnly>
                        {{ nowDateThai }} {{ nowTimeThai }}
                      </ClientOnly>
                      <span v-if="!isClient">-</span>
                    </span>
                  </div>

                  <div class="h-4 w-px bg-white/20 hidden sm:block"></div>

                  <div class="text-white/75">
                    เปลี่ยนแปลงรอบก่อนหน้า:
                    <span class="font-black" :class="changeTextColor">
                      {{ changeText }}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <main class="p-5 sm:p-8">
          <!-- Error -->
          <div v-if="error" class="mb-4 p-3 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm">
            {{ error }}
          </div>

          <div class="grid xl:grid-cols-2 gap-6">
            <!-- LEFT: 2 กล่องราคาทอง -->
            <section class="space-y-4">
              <!-- ✅ ทองคำแท่ง 96.5% -->
              <div class="rounded-2xl border-[3px] border-[#c9a24b] bg-[#fbfaf8] text-[#5b1b1b] overflow-hidden">
                <div class="pt-5 pb-3 px-5 text-center">
                  <div class="text-[24px] sm:text-[30px] font-black tracking-tight text-[#6b1f1f]">
                    ทองคำแท่ง 96.5%
                  </div>
                  <div class="mt-3 h-px bg-[#c9a24b]/70"></div>
                </div>

                <div class="px-5 pb-2">
                  <div class="grid grid-cols-2 items-end">
                    <div class="text-center">
                      <div class="text-[12px] sm:text-[14px] font-black text-[#b61f1f]">รับซื้อ</div>
                    </div>
                    <div class="text-center">
                      <div class="text-[12px] sm:text-[14px] font-black text-[#128a43]">ขายออก</div>
                    </div>
                  </div>
                  <div class="mt-2 h-px bg-[#c9a24b]/50"></div>
                </div>

                <div class="px-5 pb-5">
                  <div class="grid grid-cols-2 gap-3 items-start">
                    <div class="text-center">
                      <div class="text-[28px] sm:text-[36px] font-black text-[#6b1f1f] tabular-nums leading-none tracking-tight">
                        <!-- {{ gold?.price.gold_bar.buy || '-' }} -->
                        {{ gold?.price.gold_bar.sell || '-' }}
                      </div>
                    </div>

                    <div class="text-center">
                      <div class="text-[28px] sm:text-[36px] font-black text-[#6b1f1f] tabular-nums leading-none tracking-tight">
                        <!-- {{ gold?.price.gold_bar.sell || '-' }} -->
                        {{ gold?.price.gold_bar.buy || '-' }}
                      </div>
                    </div>
                  </div>

                  <div class="mt-4 flex justify-center">
                    <div
                      class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-white font-black shadow-sm"
                      :class="changeBadgeClass"
                      title="เทียบรอบก่อนหน้า (จาก API)"
                    >
                      <span class="text-[14px] leading-none">{{ changeArrow }}</span>
                      <span class="text-[14px] leading-none">{{ changeNumber }}</span>
                    </div>
                  </div>

                  <div class="mt-3 text-[12px] text-[#6b1f1f]/70 text-center">
                    อัปเดตล่าสุด (เวลาปัจจุบัน)
                    <ClientOnly>{{ nowDateThai }} {{ nowTimeThai }}</ClientOnly><span v-if="!isClient">-</span>
                  </div>
                </div>
              </div>

              <!-- ✅ ทองรูปพรรณ -->
              <div class="rounded-2xl border-[3px] border-[#c9a24b] bg-[#fbfaf8] text-[#5b1b1b] overflow-hidden">
                <div class="pt-5 pb-3 px-5 text-center">
                  <div class="text-[24px] sm:text-[30px] font-black tracking-tight text-[#6b1f1f]">
                    ทองรูปพรรณ
                  </div>
                  <div class="mt-3 h-px bg-[#c9a24b]/70"></div>
                </div>

                <div class="px-5 pb-2">
                  <div class="grid grid-cols-2 items-end">
                    <div class="text-center">
                      <div class="text-[12px] sm:text-[14px] font-black text-[#b61f1f]">รับซื้อ</div>
                    </div>
                    <div class="text-center">
                      <div class="text-[12px] sm:text-[14px] font-black text-[#128a43]">ขายออก</div>
                    </div>
                  </div>
                  <div class="mt-2 h-px bg-[#c9a24b]/50"></div>
                </div>

                <div class="px-5 pb-5">
                  <div class="grid grid-cols-2 gap-3 items-start">
                    <div class="text-center">
                      <div class="text-[28px] sm:text-[36px] font-black text-[#6b1f1f] tabular-nums leading-none tracking-tight">
                        <!-- {{ gold?.price.gold.buy || '-' }} -->
                        {{ gold?.price.gold.sell || '-' }}
                      </div>
                    </div>

                    <div class="text-center">
                      <div class="text-[28px] sm:text-[36px] font-black text-[#6b1f1f] tabular-nums leading-none tracking-tight">
                        <!-- {{ gold?.price.gold.sell || '-' }} -->
                        {{ gold?.price.gold.buy || '-' }}
                      </div>
                    </div>
                  </div>

                  <div class="mt-3 text-[12px] text-[#6b1f1f]/70 text-center">
                    อัปเดตล่าสุด (เวลาปัจจุบัน)
                    <ClientOnly>{{ nowDateThai }} {{ nowTimeThai }}</ClientOnly><span v-if="!isClient">-</span>
                  </div>
                </div>
              </div>
            </section>

            <!-- RIGHT: กราฟ -->
            <section class="space-y-4">
              <div class="rounded-2xl border border-[#e7c36a]/25 bg-white/5 overflow-hidden">
                <div class="px-4 py-3 border-b border-[#e7c36a]/15 flex items-center justify-between">
                  <div class="font-black">กราฟราคาทอง (ตัวอย่าง)</div>
                  <div class="text-xs opacity-70">TradingView</div>
                </div>

                <div class="bg-black/20">
                  <iframe
                    class="w-full h-[520px]"
                    src="https://s.tradingview.com/embed-widget/advanced-chart/?locale=th#%7B%22symbol%22%3A%22OANDA%3AXAUUSD%22%2C%22interval%22%3A%2260%22%2C%22timezone%22%3A%22Asia%2FBangkok%22%2C%22theme%22%3A%22dark%22%2C%22style%22%3A%221%22%2C%22withdateranges%22%3Atrue%2C%22hide_side_toolbar%22%3Afalse%2C%22allow_symbol_change%22%3Atrue%2C%22details%22%3Atrue%7D"
                    frameborder="0"
                    allowtransparency="true"
                    scrolling="no"
                  ></iframe>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type GoldApi = {
  status: string
  response: {
    date: string
    update_time: string
    price: {
      gold: { buy: string; sell: string }
      gold_bar: { buy: string; sell: string }
      change: { compare_previous: string; compare_yesterday: string }
    }
  }
}

const gold = ref<GoldApi['response'] | null>(null)
const loading = ref(true)
const error = ref('')

// ✅ บอก template ว่าตอนนี้ฝั่ง client ไหม (กัน prerender)
const isClient = process.client

// ✅ เวลาปัจจุบัน (อัปเดทเฉพาะ client)
const now = ref(new Date())
let timer: any = null

const safeFormat = (opts: Intl.DateTimeFormatOptions) => {
  try {
    return new Intl.DateTimeFormat('th-TH', opts).format(now.value)
  } catch {
    // fallback กัน ICU/timeZone พังบนเครื่อง build
    const { timeZone, ...rest } = opts as any
    return new Intl.DateTimeFormat('th-TH', rest).format(now.value)
  }
}

const nowDateThai = computed(() => {
  if (!process.client) return '' // กัน SSR/prerender ไม่ให้รัน timezone
  return safeFormat({ timeZone: 'Asia/Bangkok', day: '2-digit', month: 'long', year: 'numeric' })
})

const nowTimeThai = computed(() => {
  if (!process.client) return '' // กัน SSR/prerender ไม่ให้รัน timezone
  return safeFormat({ timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit', second: '2-digit' })
})

const loadGold = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await $fetch<GoldApi>('https://api.chnwt.dev/thai-gold-api/latest')
    gold.value = res.response
  } catch (e: any) {
    error.value = e?.message || 'โหลดราคาทองไม่สำเร็จ'
  } finally {
    loading.value = false
  }
}

const changeText = computed(() => gold.value?.price.change.compare_previous || '—')

const changeArrow = computed(() => {
  const v = gold.value?.price.change.compare_previous || ''
  if (!v) return '▲'
  return /-/.test(v) ? '▼' : '▲'
})

const changeNumber = computed(() => {
  const v = gold.value?.price.change.compare_previous || ''
  const m = v.match(/[+-]?\d+(\.\d+)?/)
  return m?.[0] ?? '—'
})

const changeBadgeClass = computed(() => {
  const v = gold.value?.price.change.compare_previous || ''
  const isDown = /-/.test(v)
  return isDown ? 'bg-gradient-to-r from-red-700 to-red-500' : 'bg-gradient-to-r from-emerald-700 to-emerald-500'
})

const changeTextColor = computed(() => {
  const v = gold.value?.price.change.compare_previous || ''
  const isDown = /-/.test(v)
  return isDown ? 'text-red-300' : 'text-emerald-300'
})

const heroStyle = computed(() => ({
  backgroundImage: `url('/gold-hero.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}))

onMounted(() => {
  loadGold()
  // ✅ อัปเดทเวลาปัจจุบันทุก 1 วินาที (เฉพาะ client)
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>
