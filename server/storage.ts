import { contactSubmissions, type InsertContactSubmission } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createContactSubmission(contact: InsertContactSubmission): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createContactSubmission(contact: InsertContactSubmission): Promise<void> {
    await db.insert(contactSubmissions).values(contact);
  }
}

export const storage = new DatabaseStorage();
