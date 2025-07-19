import fs from 'fs';
import path from 'path';
const DB_PATH = path.join(process.cwd(),"src/lib/db.json");

export function readDB(dbName: string){
    const database:any = JSON.parse(fs.readFileSync(DB_PATH,"utf-8"));
    return database[dbName]
}

export function writeDB(dbName:string, newData:any){
    // const database = readDB(dbName); // bookmarks.
     const database:any = JSON.parse(fs.readFileSync(DB_PATH,"utf-8"));
    console.log('===write debug 1 ', database[dbName])
    console.log('===write debug 2', newData)
    database[dbName] = newData;
    fs.writeFileSync(DB_PATH, JSON.stringify(database))

}