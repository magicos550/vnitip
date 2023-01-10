import { StyleSheet, View } from 'react-native'
import { DataTable, IconButton } from 'react-native-paper'
import { useState } from 'react'
import { useAppTheme } from '../../hooks/useCustomTheme'

interface iProps {
  columns: {
    name: string
    value: any
  }[]
  items: {
    [key: string]: any
  }[]
  itemsLength: number
  itemsPerPage: number
  handlers?: {
    delete?: (arg0: number) => void
  }
}

const CreateTable = (props: iProps): JSX.Element => {
  const theme = useAppTheme()
  const [page, setPage] = useState<number>(0)
  const startItemOnPage = page * props.itemsPerPage
  const endItemOnPage = page * props.itemsPerPage + props.itemsPerPage
  const paginationLabel = `${startItemOnPage + 1}-${endItemOnPage} из ${props.itemsLength}`

  return (
    <View style={styles.container}>
      <DataTable style={styles.table}>
        <DataTable.Header>
          {props.columns.map((item) => (
            <DataTable.Title key={item.name}>{item.name}</DataTable.Title>
          ))}

          {props.handlers && <DataTable.Title numeric>Управление</DataTable.Title>}
        </DataTable.Header>

        <View style={styles.tableRows}>
          {props.items.slice(startItemOnPage, endItemOnPage).map((item) => (
            <DataTable.Row key={item.ID}>
              {props.columns.map((column) => (
                <DataTable.Cell key={column.name}>{item[column.value]}</DataTable.Cell>
              ))}
              {props.handlers && props.handlers.delete && (
                <DataTable.Cell numeric>
                  <IconButton
                    icon='delete'
                    iconColor={theme.colors.error}
                    size={30}
                    onPress={() => props.handlers?.delete?.(item.ID)}
                  />
                </DataTable.Cell>
              )}
            </DataTable.Row>
          ))}
        </View>

        {props.itemsLength > props.itemsPerPage && (
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.floor(props.itemsLength / props.itemsPerPage) + 1}
            onPageChange={(page) => setPage(page)}
            label={paginationLabel}
            numberOfItemsPerPage={2}
          />
        )}
      </DataTable>
    </View>
  )
}

const styles = StyleSheet.create({
  table: {
    height: '100%',
    justifyContent: 'space-between',
  },
  tableRows: {
    flex: 1,
  },
  container: {
    height: '100%',
  },
})

export default CreateTable
