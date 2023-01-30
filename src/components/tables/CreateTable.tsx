import { StyleSheet, View } from 'react-native'
import { DataTable, IconButton, Text } from 'react-native-paper'
import { useState, memo, useEffect, useMemo } from 'react'
import { useAppTheme } from '../../hooks/useCustomTheme'

interface iProps {
  columns: {
    name: string
    value: any
    suffix?: string
  }[]
  items: {
    [key: string]: any
  }[]
  handlers?: {
    delete?: (arg0: number) => void
    edit?: (item: Record<string, unknown>) => void
  }
}

const CreateTable = (props: iProps): JSX.Element => {
  const theme = useAppTheme()
  const items = props.items
  const columns = props.columns
  const numberOfItemsPerPage = 8
  const currentPage = Math.floor((items.length - 1) / numberOfItemsPerPage)

  const [page, setPage] = useState(currentPage)
  const from = page * numberOfItemsPerPage
  const to = Math.min((page + 1) * numberOfItemsPerPage, items.length)

  useEffect(() => {
    setPage(currentPage >= 0 ? currentPage : 0)
  }, [currentPage])

  return (
    <View style={styles.container}>
      <DataTable style={styles.table}>
        <DataTable.Header>
          {columns.map((item) => (
            <DataTable.Title style={{ flexGrow: +(item.name === '№' ? 2 : 1) }} key={item.name}>
              {item.name}
            </DataTable.Title>
          ))}

          {props.handlers && <DataTable.Title numeric>Управление</DataTable.Title>}
        </DataTable.Header>

        <View>
          {items.slice(from, to).map((item) => (
            <DataTable.Row key={item.ID}>
              {columns.map((column) => (
                <DataTable.Cell
                  key={column.name}
                  style={{ flexGrow: +(column.name === '№' ? 2 : 1) }}
                >
                  <Text variant='labelLarge'>
                    {item[column.value]} {column.suffix && column.suffix}
                  </Text>
                </DataTable.Cell>
              ))}
              {props.handlers && (
                <DataTable.Cell numeric style={{ flexGrow: 1 }}>
                  {props.handlers.edit && (
                    <IconButton
                      icon='pencil'
                      iconColor={theme.colors.primary}
                      size={20}
                      onPress={() => props.handlers?.edit?.(item)}
                    />
                  )}
                  {props.handlers.delete && (
                    <IconButton
                      icon='delete'
                      iconColor={theme.colors.error}
                      size={20}
                      onPress={() => props.handlers?.delete?.(item.ID)}
                    />
                  )}
                </DataTable.Cell>
              )}
            </DataTable.Row>
          ))}
        </View>

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
          onPageChange={(page) => setPage(page)}
          // label={`${from + 1}-${to} из ${items.length}`}
          style={{}}
          showFastPaginationControls
          // numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={numberOfItemsPerPage}
          // onItemsPerPageChange={onItemsPerPageChange}
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    </View>
  )
}

const styles = StyleSheet.create({
  table: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  container: {
    // height: '100%',
  },
  cell: {
    fontSize: 10,
  },
})

export default memo(CreateTable)
