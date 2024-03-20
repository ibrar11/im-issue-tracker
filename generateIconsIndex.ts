const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')

const generateIndexFile = (iconPath: string) => {
  const iconIndexPath = path.join(iconPath, 'index.ts')
  const iconFiles = getAllIcons(iconPath)

  const existingContent = fs.existsSync(iconIndexPath)
    ? fs.readFileSync(iconIndexPath, 'utf-8')
    : ''

  const newIcons = iconFiles.filter((file: string) => {
    const iconName = getIconName(file)
    const relativePath = `./${path.relative(iconPath, file)}`
    return !existingContent.includes(
      `export { default as ${iconName} } from '${relativePath}';`,
    )
  })

  const removedIcons = existingContent
    .split('\n')
    .filter((line: string) => line.trim().startsWith('export { default as'))
    .filter((line: string) => {
      const iconName = line.split(' ')[4]
      return !iconFiles.some((file: string) => getIconName(file) === iconName)
    })

  if (newIcons.length > 0 || removedIcons.length > 0) {
    const exportStatements = iconFiles.map((file: string) => {
      const iconName = getIconName(file)
      return `export { default as ${iconName} } from './${path.relative(
        iconPath,
        file,
      )}';`
    })

    const newIndexContent = exportStatements.join('\n')

    fs.writeFileSync(iconIndexPath, newIndexContent)
    console.log('Updated index.ts')
  }
}

const getAllIcons = (dir: string): string[] => {
  const files = fs.readdirSync(dir)
  const iconFiles: string[] = []

  files.forEach((file: string) => {
    const filePath = path.join(dir, file)
    const isDirectory = fs.statSync(filePath).isDirectory()

    if (isDirectory) {
      iconFiles.push(...getAllIcons(filePath))
    } else if (file.endsWith('.tsx')) {
      iconFiles.push(filePath)
    }
  })

  return iconFiles
}

const getIconName = (filePath: string): string => {
  const fileName = path.parse(filePath).name
  return fileName.replace(/[^\w\d]/g, '')
}

const iconsPath = path.join(__dirname, 'public/icons')

const watcher = chokidar.watch(iconsPath, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
})

watcher
  .on('add', () => generateIndexFile(iconsPath))
  .on('change', () => generateIndexFile(iconsPath))
  .on('unlink', () => generateIndexFile(iconsPath))

console.log('Watching for changes in the icons directory...')
