declare module "node-firebird" {

    export const
        ISOLATION_READ_UNCOMMITTED: number,
        ISOLATION_READ_COMMITED: number,
        ISOLATION_REPEATABLE_READ: number,
        ISOLATION_SERIALIZABLE: number,
        ISOLATION_READ_COMMITED_READ_ONLY: number;

    export interface IOptions {
        host: string,
        port?: number,
        database?: string,
        user: string,
        password: string,
        role?: string,
        filename?: string,
        pageSize?: number
    }

    export interface IDB {
        query(query: string, params: Array<any>, Callback: (err: Error, result?: Array<any>) => void): void;
        execute(query: string, params: Array<any>, Callback: (err: Error, result?: Array<Array<any>>) => void): void;
        sequentially(query: string, params: Array<any>, ItemFunction: (row: number, index: number) => void, ErrorCallback: (error: Error) => void)
        detach(Callback: (err: Error) => void): void;
    }
    export interface IPool {
        get(callback: (error: Error, db: IDB) => void);
    }
    export interface ITransaction {
        query(query: string, params: Array<any>, Callback: (err: Error, result?: Array<any>) => void): void;
        execute(query: string, params: Array<any>, Callback: (err: Error, result?: Array<Array<any>>) => void): void;
        commit(Callback: (err: Error) => void): void;
        rollback(Callback: (err: Error) => void): void;
    }

    function escape(value: any): string;
    function attach(IOptions, callback?: (error: Error, db: IDB) => void);
    function create(IOptions, callback?: (error: Error, db: IDB) => void);
    function attachOrCreate(IOptions, callback?: (error: Error, db: IDB) => void);
    function pool(max: number, IOptions): IPool;
    function transaction(isolation, Callback: (err: Error, transaction: ITransaction) => void);


    //function on(event : string,EventEmitter : ()=>void);
}