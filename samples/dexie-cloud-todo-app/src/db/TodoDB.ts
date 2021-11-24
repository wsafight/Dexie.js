import Dexie from "dexie";
import dexieCloud, { DexieCloudTable } from "dexie-cloud-addon";
import type { TodoItem } from "./TodoItem";
import { TodoList } from "./TodoList";

export class TodoDB extends Dexie {
  // Table accessors are auto-generated by Dexie (from schema below)
  todoLists!: DexieCloudTable<TodoList, 'id'>;
  todoItems!: DexieCloudTable<TodoItem, 'id'>;

  constructor() {
    super('TodoDBCloud2', { addons: [dexieCloud] });
    this.version(3).stores({
      todoLists: `@id`,
      todoItems: `@id, [todoListId+realmId]`,
      members: `@id, realmId, [email+realmId]`, // We just indexes to built-in table. Keep both realmId and [realmId+email] in order to find members without email set.
    });
    this.todoLists.mapToClass(TodoList);
  }
}
