import * as SQLite from 'expo-sqlite'

export const db = SQLite.openDatabase('vnitip')

const createEggCollectionTable = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS egg_collection (ID INTEGER PRIMARY KEY AUTOINCREMENT, Barcode TEXT, Date TEXT)',
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

const createEggMassTable = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS egg_mass (ID INTEGER PRIMARY KEY AUTOINCREMENT, Barcode TEXT, Mass INTEGER, Date TEXT)',
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

const createLiveWeightTable = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS live_weight (ID INTEGER PRIMARY KEY AUTOINCREMENT, Barcode TEXT, Mass INTEGER, Date TEXT)',
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

const createAppraisalTable = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS appraisal (ID INTEGER PRIMARY KEY AUTOINCREMENT, Barcode TEXT, Mass INTEGER, Chest INTEGER, Legs INTEGER, Remark TEXT, Date TEXT)',
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

Promise.all([
  createEggCollectionTable(),
  createEggMassTable(),
  createLiveWeightTable(),
  createAppraisalTable,
])
  .then(() => {
    console.log('ALL TABLES ARE CREATED SUCCESSFULLY')
  })
  .catch((err) => {
    console.log(err)
  })
