import { openDB, type DBSchema, type IDBPDatabase } from "idb";

export interface FormAnswer {
  questionId: string;
  type: "text" | "number" | "file";
  value: string | number | File;
}

export interface Submission {
  id?: number;
  formId: string;
  userName: string;
  formData: FormAnswer[];
}

interface OfflineFormsDB extends DBSchema {
  submissions: {
    key: number;
    value: Submission;
    indexes: { formUser: [string, string] };
  };
}

export class IndexedDBService {
  private static dbPromise: Promise<IDBPDatabase<OfflineFormsDB>> = openDB<OfflineFormsDB>("OfflineFormsDB", 1, {
    upgrade(db) {
      const store = db.createObjectStore("submissions", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("formUser", ["formId", "userName"]);
    },
  });

  static async getAll(): Promise<Submission[]> {
    const db = await this.dbPromise;
    return db.getAll("submissions");
  }

  static async getById(id: number): Promise<Submission | undefined> {
    const db = await this.dbPromise;
    return db.get("submissions", id);
  }

  static async getOne(formId: string, userName: string): Promise<Submission | undefined> {
    const db = await this.dbPromise;
    return db.getFromIndex("submissions", "formUser", [formId, userName]);
  }

  static async create(data: Omit<Submission, "id">): Promise<number> {
    const db = await this.dbPromise;
    return db.add("submissions", data);
  }

  static async upsert(data: Omit<Submission, "id">): Promise<number> {
    const db = await this.dbPromise;
    const existing = await db.getFromIndex("submissions", "formUser", [data.formId, data.userName]);
    if (existing) {
      const updated: Submission = {
        ...existing,
        formData: data.formData,
      };
      await db.put("submissions", updated);
      return existing.id!;
    } else {
      return this.create(data);
    }
  }

  static async delete(id: number): Promise<void> {
    const db = await this.dbPromise;
    await db.delete("submissions", id);
  }

  static async clear(): Promise<void> {
    const db = await this.dbPromise;
    await db.clear("submissions");
  }
}
