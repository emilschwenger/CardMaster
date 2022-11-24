import * as SQLite from 'expo-sqlite';
import { SQLError, SQLTransaction } from 'expo-sqlite';

export const databaseName: string = "cardmaster_data";

function openCB() {
    console.log("Database OPENED");
}

const db = SQLite.openDatabase(databaseName);

function performQuery(query: string, callback: (tx: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => void) {
    db.transaction(
        (tx: SQLite.SQLTransaction) => {
            //transaction
            tx.executeSql(query, [], callback);
        }, (error: SQLite.SQLError) => {
            //error
            console.log('Transaction failed');
            console.log(error.code, error.message);
            return false;
        },()=>{
            //success
    });
}

export interface box {
    boxID: number,
    name: string
}

export function dropBoxTable() {
    console.log('Drop table Box');
    performQuery('DROP TABLE IF EXISTS Box',()=>{});
}

export function checkBoxTable(callback: (success: boolean) => void) {
    performQuery(
        'CREATE TABLE IF NOT EXISTS Box (boxID INTEGER NOT NULL PRIMARY KEY,name TEXT NOT NULL)',
        (tx: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
            console.log('Created Box table');
        }
    )
}

export function createBox(boxName: string, callback: () => void) {
    console.log('Create Box');
    performQuery(
        'INSERT INTO Box(name) VALUES(\''+boxName+'\')',
        (tx: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
            callback();
        }
    )
}

export function readBoxByID(boxID: number, callback: (result: SQLite.SQLResultSet) => void){
    console.log('Read Box by ID');
    performQuery(
        'SELECT * FROM Box WHERE boxID=' + boxID,
        (tx: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
            callback(result);
        }
    )
}

export function readAllBox(callback: (result: SQLite.SQLResultSet) => void){
    console.log('Read all box');
    performQuery(
        'SELECT * FROM Box',
        (tx: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
            callback(result);
        }
    )
}

export function updateBox(box: box, callback: () => void) {
    console.log('Update box');
    performQuery(
        'UPDATE Box SET name=\'' +box.name+ '\' WHERE boxID=' + box.boxID,
        (tx: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
            callback();
        }
    );
}

export function deleteBox(boxID: number, callback: () => void) {
    console.log('Delete Box');
    performQuery(
        'DELETE FROM Box WHERE boxID=' + boxID,
        (tx: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
            callback();
        }
    );
}

export function deleteAllBox(callback: () => void) {
    console.log('Delete all box');
    performQuery(
        'DELETE FROM Box',
        (tx: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
            callback();
        }
    )
}
 

export interface card {
    cardID: number,
    vorderseite: string,
    rueckseite: string,
    boxID: number
}

export function dropCardTable() {
    console.log('Drop Card table');
    performQuery('DROP TABLE IF EXISTS Card',()=>{});
}

export function checkCardTable() {
    performQuery(
        'CREATE TABLE IF NOT EXISTS Card '+
        '(cardID INTEGER NOT NULL PRIMARY KEY,vorderseite TEXT NOT NULL,rueckseite TEXT NOT NULL, boxID INTEGER)',
        (tx: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
            console.log('Created Card table');
        }
    )
}

export function createCard(card: card, callback: () => void) {
    console.log('Create card');
    performQuery(
        'INSERT INTO Card(vorderseite, rueckseite, boxID) VALUES(\''+card.vorderseite+'\' , \''+card.rueckseite+'\' , \''+card.boxID+'\')',
        (tx: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
            callback();
        }
    )
}

export function readCardByID(cardID: number, callback: (result: SQLite.SQLResultSet) => void) {
    console.log('Read card by ID');
    performQuery(
        'SELECT * FROM Card WHERE cardID=' + cardID,
        (tx: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
            callback(result);
        }
    )
}

export function readAllCardByBoxID(boxID: number, callback: (result: SQLite.SQLResultSet) => void) {
    console.log('Read all cards by box id');
    performQuery(
        'SELECT * FROM Card WHERE boxID=' + boxID,
        (tx: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
            callback(result);
        }
    )
}

export function updateCard(card: card) {
}

export function deleteCard(cardID: number, callback: () => void ) {
    console.log('Delete Card');
    performQuery(
        'DELETE FROM Card WHERE cardID=' + cardID,
        (tx: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
            callback();
        }
    );
}