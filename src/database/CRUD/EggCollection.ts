import { db } from '../DatabaseInitialization'
import { iEggCollectionItem } from '../../store/slices/jobs/eggCollectionSlice'
import moment from 'moment'

export const eggCollectionLoad = async (): Promise<iEggCollectionItem[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM egg_collection',
        [],
        (_, { rows: { _array } }) => {
          resolve(_array as iEggCollectionItem[])
        },
        (_, error) => {
          reject(error)
          return false
        },
      )
    })
  })
}

export const eggColllectionDelete = async (id: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM egg_collection WHERE ID=?',
        [id],
        () => resolve(true),
        (_, error) => {
          reject(error)
          return false
        },
      )
    })
  })
}

export const eggCollectionAdd = async (barcode: string): Promise<iEggCollectionItem> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'insert into egg_collection (Barcode) values (?)',
        [barcode],
        (transaction, result) => {
          if (result.insertId) {
            resolve({
              ID: result.insertId,
              Barcode: barcode,
              Date: moment().format('DD.MM.YYYY H:m:s'),
            })
          }
        },
        (_, error) => {
          reject(error)
          return false
        },
      )
    })
  })
}
