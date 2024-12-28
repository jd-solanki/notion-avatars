<script lang="ts" setup>
const props = defineProps<{ avatarPreviewRef: HTMLDivElement | null }>()
const downloadFormat = useCookie<'svg' | 'png' | 'jpg'>('downloadFormat', { default: () => 'svg' })
const downloadAvatar = async () => {
  const svgElement = props.avatarPreviewRef?.querySelector('svg')
  if (!svgElement) return

  if (downloadFormat.value === 'svg') {
    const svgContent = svgElement.outerHTML
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(svgBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `notion-avatar.${downloadFormat.value}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    return
  }

  // For PNG/JPG conversion
  const img = new Image()
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = 1080
  canvas.height = 1080

  return new Promise((resolve) => {
    img.onload = () => {
      if (!ctx) return
      // Only set background for JPG
      if (downloadFormat.value === 'jpg') {
        ctx.fillStyle = '#FFFEFC' // White background for JPG
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      canvas.toBlob((blob) => {
        if (!blob) return
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `notion-avatar.${downloadFormat.value}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        resolve(true)
      }, `image/${downloadFormat.value}`, 1.0)
    }

    // Convert SVG to base64 data URL
    const svgContent = svgElement.outerHTML
    const svgBase64 = btoa(svgContent)
    img.src = `data:image/svg+xml;base64,${svgBase64}`
  })
}
</script>

<template>
  <div class="flex items-center">
    <Button
      variant="outline"
      class="border-[3px] border-primary rounded-full px-16 py-6 text-base font-bold rounded-r-none"
      @click="downloadAvatar"
    >
      <img
        src="/icons/download.svg"
        alt="icon-dice"
        class="size-6"
      >
      Download
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger class="border-[3px] border-l-0 border-primary ps-4 pe-6 py-3 text-base font-bold rounded-full rounded-l-none flex items-center uppercase">
        <span>{{ downloadFormat }}</span>
        <img
          src="https://api.iconify.design/lucide:chevron-down.svg"
          alt="iconify-chevron-down"
          class="size-5 ms-1 mt-1"
        >
      </DropdownMenuTrigger>
      <DropdownMenuContent class="border-[3px] border-primary rounded-lg font-bold">
        <DropdownMenuItem @click="downloadFormat = 'svg'">
          SVG
        </DropdownMenuItem>
        <DropdownMenuItem @click="downloadFormat = 'png'">
          PNG
        </DropdownMenuItem>
        <DropdownMenuItem @click="downloadFormat = 'jpg'">
          JPG
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
