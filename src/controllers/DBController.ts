import {
  SQLResultSet,
  SQLTransaction,
  WebSQLDatabase,
  openDatabase,
} from "expo-sqlite"

export class DBController {
  private db: WebSQLDatabase

  constructor() {
    this.db = openDatabase("yomuy.db")
    this.init()
  }

  public executeSQL<T>(
    sql: string,
    args?: (number | string | null)[],
    callback?: (result: SQLResultSet) => void,
  ) {
    const cb: (tran: SQLTransaction, result: SQLResultSet) => void = callback
      ? (_, result) => callback(result)
      : (_, result) => {
          console.log("> result: ", result.rows)
        }
    this.db.transaction(
      (transaction) => {
        transaction.executeSql(sql, args, cb)
      },
      (err) => {
        console.log(`[${err.code}] ${err.message}`)
        this.deleteConnection()
        console.log("closed", this.db)
      },
      () => {
        // console.log(`"${sql}" executed!!`)
      },
    )
  }

  public deleteConnection() {
    this.db.closeAsync()
  }

  // ********************* PRIVATE *********************

  private init() {
    this.fetchMaster()
  }

  private fetchMaster() {
    this.executeSQL(`select * from sqlite_master`, undefined, (result) => {
      const tables: string[] = result.rows._array.map((r) => r.name)

      if (!tables.includes("setting")) this.createTableOfSetting()
    })
  }

  private createTableOfSetting() {
    const sql = `CREATE TABLE setting (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );`
    this.executeSQL(sql)
  }
}
