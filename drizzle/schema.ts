import { pgTable, foreignKey, integer, varchar, timestamp, text, numeric, boolean, unique, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const role = pgEnum("role", ['admin', 'sub_admin', 'engineer', 'logistic'])
export const workOrderStatus = pgEnum("work_order_status", ['pending', 'in_progress', 'completed', 'cancelled'])


export const machines = pgTable("machines", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "machines_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	tenantId: integer().notNull(),
	hospitalId: integer().notNull(),
	name: varchar({ length: 255 }).notNull(),
	model: varchar({ length: 255 }),
	serialNumber: varchar({ length: 255 }),
	installationDate: timestamp({ mode: 'string' }),
	status: varchar({ length: 50 }).default('operational').notNull(),
	notes: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "machines_tenantId_tenants_id_fk"
		}),
	foreignKey({
			columns: [table.hospitalId],
			foreignColumns: [hospitals.id],
			name: "machines_hospitalId_hospitals_id_fk"
		}),
]);

export const parts = pgTable("parts", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "parts_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	tenantId: integer().notNull(),
	name: varchar({ length: 255 }).notNull(),
	partNumber: varchar({ length: 100 }),
	description: text(),
	unitPrice: numeric({ precision: 10, scale:  2 }),
	quantityInStock: integer().default(0).notNull(),
	minStockLevel: integer().default(0),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "parts_tenantId_tenants_id_fk"
		}),
]);

export const tools = pgTable("tools", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "tools_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	tenantId: integer().notNull(),
	name: varchar({ length: 255 }).notNull(),
	toolNumber: varchar({ length: 100 }),
	description: text(),
	condition: varchar({ length: 50 }).default('good'),
	isAvailable: boolean().default(true).notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "tools_tenantId_tenants_id_fk"
		}),
]);

export const workOrderParts = pgTable("work_order_parts", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "work_order_parts_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	workOrderId: integer().notNull(),
	partId: integer().notNull(),
	quantityUsed: integer().default(1).notNull(),
	quantityReturned: integer().default(0),
	wasUsed: boolean().default(false).notNull(),
	notes: text(),
}, (table) => [
	foreignKey({
			columns: [table.workOrderId],
			foreignColumns: [workOrders.id],
			name: "work_order_parts_workOrderId_work_orders_id_fk"
		}),
	foreignKey({
			columns: [table.partId],
			foreignColumns: [parts.id],
			name: "work_order_parts_partId_parts_id_fk"
		}),
]);

export const workOrderTools = pgTable("work_order_tools", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "work_order_tools_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	workOrderId: integer().notNull(),
	toolId: integer().notNull(),
	wasUsed: boolean().default(false).notNull(),
	notes: text(),
}, (table) => [
	foreignKey({
			columns: [table.workOrderId],
			foreignColumns: [workOrders.id],
			name: "work_order_tools_workOrderId_work_orders_id_fk"
		}),
	foreignKey({
			columns: [table.toolId],
			foreignColumns: [tools.id],
			name: "work_order_tools_toolId_tools_id_fk"
		}),
]);

export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "users_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 255 }).notNull(),
	tenantId: integer().notNull(),
	email: varchar({ length: 255 }).notNull(),
	passwordHash: varchar({ length: 255 }).notNull(),
	role: role().default('engineer').notNull(),
	phone: varchar({ length: 50 }),
	isActive: boolean().default(true).notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "users_tenantId_tenants_id_fk"
		}),
	unique("users_email_unique").on(table.email),
]);

export const tenants = pgTable("tenants", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "tenants_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	phone: varchar({ length: 50 }),
	address: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("tenants_email_unique").on(table.email),
]);

export const hospitals = pgTable("hospitals", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "hospitals_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	tenantId: integer().notNull(),
	name: varchar({ length: 255 }).notNull(),
	address: text().notNull(),
	city: varchar({ length: 100 }),
	state: varchar({ length: 100 }),
	pincode: varchar({ length: 20 }),
	contactPerson: varchar({ length: 255 }),
	contactPhone: varchar({ length: 50 }),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "hospitals_tenantId_tenants_id_fk"
		}),
]);

export const workOrders = pgTable("work_orders", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "work_orders_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	tenantId: integer().notNull(),
	hospitalId: integer().notNull(),
	machineId: integer().notNull(),
	assignedEngineerId: integer(),
	createdById: integer().notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text(),
	status: workOrderStatus().default('pending').notNull(),
	priority: varchar({ length: 20 }).default('normal'),
	scheduledDate: timestamp({ mode: 'string' }),
	completedAt: timestamp({ mode: 'string' }),
	notes: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "work_orders_tenantId_tenants_id_fk"
		}),
	foreignKey({
			columns: [table.hospitalId],
			foreignColumns: [hospitals.id],
			name: "work_orders_hospitalId_hospitals_id_fk"
		}),
	foreignKey({
			columns: [table.machineId],
			foreignColumns: [machines.id],
			name: "work_orders_machineId_machines_id_fk"
		}),
	foreignKey({
			columns: [table.assignedEngineerId],
			foreignColumns: [users.id],
			name: "work_orders_assignedEngineerId_users_id_fk"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [users.id],
			name: "work_orders_createdById_users_id_fk"
		}),
]);
