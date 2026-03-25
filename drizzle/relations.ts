import { relations } from "drizzle-orm/relations";
import { tenants, machines, hospitals, parts, tools, workOrders, workOrderParts, workOrderTools, users } from "./schema";

export const machinesRelations = relations(machines, ({one, many}) => ({
	tenant: one(tenants, {
		fields: [machines.tenantId],
		references: [tenants.id]
	}),
	hospital: one(hospitals, {
		fields: [machines.hospitalId],
		references: [hospitals.id]
	}),
	workOrders: many(workOrders),
}));

export const tenantsRelations = relations(tenants, ({many}) => ({
	machines: many(machines),
	parts: many(parts),
	tools: many(tools),
	users: many(users),
	hospitals: many(hospitals),
	workOrders: many(workOrders),
}));

export const hospitalsRelations = relations(hospitals, ({one, many}) => ({
	machines: many(machines),
	tenant: one(tenants, {
		fields: [hospitals.tenantId],
		references: [tenants.id]
	}),
	workOrders: many(workOrders),
}));

export const partsRelations = relations(parts, ({one, many}) => ({
	tenant: one(tenants, {
		fields: [parts.tenantId],
		references: [tenants.id]
	}),
	workOrderParts: many(workOrderParts),
}));

export const toolsRelations = relations(tools, ({one, many}) => ({
	tenant: one(tenants, {
		fields: [tools.tenantId],
		references: [tenants.id]
	}),
	workOrderTools: many(workOrderTools),
}));

export const workOrderPartsRelations = relations(workOrderParts, ({one}) => ({
	workOrder: one(workOrders, {
		fields: [workOrderParts.workOrderId],
		references: [workOrders.id]
	}),
	part: one(parts, {
		fields: [workOrderParts.partId],
		references: [parts.id]
	}),
}));

export const workOrdersRelations = relations(workOrders, ({one, many}) => ({
	workOrderParts: many(workOrderParts),
	workOrderTools: many(workOrderTools),
	tenant: one(tenants, {
		fields: [workOrders.tenantId],
		references: [tenants.id]
	}),
	hospital: one(hospitals, {
		fields: [workOrders.hospitalId],
		references: [hospitals.id]
	}),
	machine: one(machines, {
		fields: [workOrders.machineId],
		references: [machines.id]
	}),
	user_assignedEngineerId: one(users, {
		fields: [workOrders.assignedEngineerId],
		references: [users.id],
		relationName: "workOrders_assignedEngineerId_users_id"
	}),
	user_createdById: one(users, {
		fields: [workOrders.createdById],
		references: [users.id],
		relationName: "workOrders_createdById_users_id"
	}),
}));

export const workOrderToolsRelations = relations(workOrderTools, ({one}) => ({
	workOrder: one(workOrders, {
		fields: [workOrderTools.workOrderId],
		references: [workOrders.id]
	}),
	tool: one(tools, {
		fields: [workOrderTools.toolId],
		references: [tools.id]
	}),
}));

export const usersRelations = relations(users, ({one, many}) => ({
	tenant: one(tenants, {
		fields: [users.tenantId],
		references: [tenants.id]
	}),
	workOrders_assignedEngineerId: many(workOrders, {
		relationName: "workOrders_assignedEngineerId_users_id"
	}),
	workOrders_createdById: many(workOrders, {
		relationName: "workOrders_createdById_users_id"
	}),
}));