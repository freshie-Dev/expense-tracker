"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocument = void 0;
exports.swaggerDocument = {
    openapi: '3.0.3',
    info: {
        title: 'Budget Tracker API',
        version: '1.0.0',
        description: 'Production-ready REST API for personal budget tracking'
    },
    tags: [
        { name: 'Health' },
        { name: 'Plans' },
        { name: 'Categories' },
        { name: 'Expenses' },
        { name: 'Dashboard' },
        { name: 'Settings' }
    ],
    components: {
        schemas: {
            ApiEnvelope: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    message: { type: 'string' },
                    data: { type: 'object', nullable: true },
                    errors: { type: 'array', items: { type: 'object' } },
                    meta: { type: 'object' }
                }
            }
        }
    },
    paths: {
        '/api/health': { get: { tags: ['Health'], responses: { '200': { description: 'OK' } } } },
        '/api/plans': {
            post: { tags: ['Plans'], responses: { '201': { description: 'Created' } } },
            get: { tags: ['Plans'], responses: { '200': { description: 'List plans' } } }
        },
        '/api/plans/active': { get: { tags: ['Plans'], responses: { '200': { description: 'Active plan' } } } },
        '/api/plans/{id}': {
            get: { tags: ['Plans'], responses: { '200': { description: 'Single plan' } } },
            delete: { tags: ['Plans'], responses: { '200': { description: 'Delete plan' } } }
        },
        '/api/plans/{id}/activate': {
            patch: { tags: ['Plans'], responses: { '200': { description: 'Activate plan' } } }
        },
        '/api/categories': {
            post: { tags: ['Categories'], responses: { '201': { description: 'Create category' } } }
        },
        '/api/categories/plan/{planId}': {
            get: { tags: ['Categories'], responses: { '200': { description: 'List plan categories' } } }
        },
        '/api/categories/{id}': {
            get: { tags: ['Categories'], responses: { '200': { description: 'Single category' } } },
            patch: { tags: ['Categories'], responses: { '200': { description: 'Update category' } } },
            delete: { tags: ['Categories'], responses: { '200': { description: 'Delete category' } } }
        },
        '/api/expenses': {
            post: { tags: ['Expenses'], responses: { '201': { description: 'Create expense' } } }
        },
        '/api/expenses/plan/{planId}': {
            get: { tags: ['Expenses'], responses: { '200': { description: 'List expenses with pagination' } } }
        },
        '/api/expenses/{id}': {
            get: { tags: ['Expenses'], responses: { '200': { description: 'Single expense' } } },
            patch: { tags: ['Expenses'], responses: { '200': { description: 'Update expense' } } },
            delete: { tags: ['Expenses'], responses: { '200': { description: 'Delete expense' } } }
        },
        '/api/dashboard/active': {
            get: { tags: ['Dashboard'], responses: { '200': { description: 'Active plan dashboard' } } }
        },
        '/api/dashboard/plan/{planId}': {
            get: { tags: ['Dashboard'], responses: { '200': { description: 'Plan dashboard' } } }
        },
        '/api/settings': {
            get: { tags: ['Settings'], responses: { '200': { description: 'Get settings' } } },
            patch: { tags: ['Settings'], responses: { '200': { description: 'Update settings' } } }
        }
    }
};
