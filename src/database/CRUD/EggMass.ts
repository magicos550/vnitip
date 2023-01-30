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

export const eggMassDeleteAll = async (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM egg_mass',
        [],
        () => resolve(true),
        (_, error) => {
          reject(error)
          return false
        },
      )
    })
  })
}

export const eggMassAdd = async (
  user: string,
  barcode: string,
  mass: number,
): Promise<iEggMassItem> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'insert into egg_mass (User, Barcode, Mass, Date) values (?, ?, ?, ?)',
        [user, barcode, mass, moment().format('DD.MM.YYYY H:m:s')],
        (transaction, result) => {
          if (result.insertId) {
            resolve({
              ID: result.insertId,
              User: user,
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

export const eggMassEdit = async (
  id: number,
  user: string,
  mass: number,
  date: string,
  barcode: string,
): Promise<iEggMassItem> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'update egg_mass set Mass = ?, Date = ? where ID = ?',
        [mass, moment().format('DD.MM.YYYY H:m:s'), id],
        (transaction, result) => {
          if (result.rowsAffected > 0) {
            resolve({
              ID: id,
              User: user,
              Barcode: barcode,
              Mass: mass,
              Date: date,
            })
          }
          /* if (result.insertId) {

          } */
        },
        (_, error) => {
          reject(error)
          return false
        },
      )
    })
  })
}
