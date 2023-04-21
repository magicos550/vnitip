import XLSX from 'xlsx'
import * as FileSystem from 'expo-file-system'

interface iData {
  [key: string]: any
}

const { StorageAccessFramework } = FileSystem

const saveAndroidFile = async (fileUri: string, fileName = 'File', content: string) => {
  try {
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync()
    if (!permissions.granted) {
      return
    }

    try {
      await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'text/csv')
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, content, {
            encoding: FileSystem.EncodingType.UTF8,
          })
          alert(`Файл с именем ${fileName}.csv успешно сохранен`)
        })
        .catch((err) => console.error(err))
    } catch (err) {
      console.error(err)
    }
  } catch (err) {
    console.error(err)
  }
}

export async function useMakeCSV(data: iData[], filename: string) {
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(data)

  XLSX.utils.book_append_sheet(wb, ws, 'Data')

  const csv = XLSX.utils.sheet_to_csv(ws, { FS: ';' })
  const fileUri = FileSystem.documentDirectory + 'formData.csv'

  await saveAndroidFile(fileUri, filename, `\ufeff ${csv}`)
}
