import { db } from '../DatabaseInitialization'
import { iAppraisalItem } from '../../store/slices/jobs/appraisalSlice'
import moment from 'moment'

export const appraisalLoad = async (): Promise<iAppraisalItem[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM appraisal',
        [],
        (_, { rows: { _array } }) => {
          resolve(_array as iAppraisalItem[])
        },
        (_, error) => {
          reject(error)
          return false
        },
      )
    })
  })
}

export const appraisalDelete = async (id: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM appraisal WHERE ID=?',
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

export const appraisalDeleteAll = async (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM appraisal',
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

export const appraisalAdd = async (
  user: string,
  barcode: string,
  mass: number,
  chest: number,
  legs: number,
  remark: string,
): Promise<iAppraisalItem> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'insert into appraisal (User, Barcode, Mass, Chest, Legs, Remark, Date) values (?, ?, ?, ?, ?, ?, ?)',
        [user, barcode, mass, chest, legs, remark, moment().format('DD.MM.YYYY H:m:s')],
        (transaction, result) => {
          if (result.insertId) {
            resolve({
              ID: result.insertId,
              User: user,
              Barcode: barcode,
              Mass: mass,
              Chest: chest,
              Legs: legs,
              Remark: remark,
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

export const appraisalEdit = async (
  id: number,
  user: string,
  barcode: string,
  mass: number,
  chest: number,
  legs: number,
  remark: string,
): Promise<iAppraisalItem> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'update appraisal set Mass = ?, Chest = ?, Legs = ?, Remark = ?, Date = ? where ID = ?',
        [mass, chest, legs, remark, moment().format('DD.MM.YYYY H:m:s'), id],
        (transaction, result) => {
          if (result.rowsAffected > 0) {
            resolve({
              ID: id,
              User: user,
              Barcode: barcode,
              Mass: mass,
              Chest: chest,
              Legs: legs,
              Remark: remark,
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
