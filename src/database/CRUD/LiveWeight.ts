import { db } from '../DatabaseInitialization'
import { iLiveWeightItem } from '../../store/slices/jobs/liveWeightSlice'
import moment from 'moment'

export const liveWeightLoad = async (): Promise<iLiveWeightItem[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM live_weight',
        [],
        (_, { rows: { _array } }) => {
          resolve(_array as iLiveWeightItem[])
        },
        (_, error) => {
          reject(error)
          return false
        },
      )
    })
  })
}

export const liveWeightDelete = async (id: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM live_weight WHERE ID=?',
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

export const liveWeightDeleteAll = async (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM live_weight',
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

export const liveWeightAdd = async (
  user: string,
  barcode: string,
  mass: number,
): Promise<iLiveWeightItem> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'insert into live_weight (User, Barcode, Mass, Date) values (?, ?, ?, ?)',
        [user.replace(/(\r\n|\n|\r)/gm, ''), barcode, mass, moment().format('DD.MM.YYYY H:m:s')],
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

export const liveWeightEdit = async (
  id: number,
  user: string,
  mass: number,
  date: string,
  barcode: string,
): Promise<iLiveWeightItem> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'update live_weight set Mass = ?, Date = ? where ID = ?',
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
