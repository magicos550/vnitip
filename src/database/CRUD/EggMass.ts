import { db } from '../DatabaseInitialization'
import { iEggMassItem } from '../../store/slices/jobs/eggMassSlice'
import moment from 'moment'

export const eggMassLoad = async (): Promise<iEggMassItem[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM egg_mass',
        [],
        (_, { rows: { _array } }) => {
          resolve(_array as iEggMassItem[])
        },
        (_, error) => {
          reject(error)
          return false
        },
      )
    })
  })
}

export const eggMassDelete = async (id: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM egg_mass WHERE ID=?',
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

export const eggMassAdd = async (barcode: string, mass: number): Promise<iEggMassItem> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'insert into egg_mass (Barcode, Mass) values (? , ?)',
        [barcode, mass],
        (transaction, result) => {
          if (result.insertId) {
            resolve({
              ID: result.insertId,
              Barcode: barcode,
              Mass: mass,
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
