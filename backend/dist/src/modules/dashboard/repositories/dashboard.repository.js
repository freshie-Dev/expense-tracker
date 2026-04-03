"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRepository = void 0;
const category_schema_1 = require("../../categories/schemas/category.schema");
const plan_schema_1 = require("../../plans/schemas/plan.schema");
const mongoose_1 = require("mongoose");
class DashboardRepository {
    async aggregateByPlanId(planId) {
        const planObjectId = new mongoose_1.Types.ObjectId(planId);
        const rows = await plan_schema_1.BudgetPlanModel.aggregate([
            { $match: { _id: planObjectId, isDeleted: false } },
            {
                $lookup: {
                    from: 'categories',
                    let: { planId: '$_id' },
                    pipeline: [
                        { $match: { $expr: { $and: [{ $eq: ['$planId', '$$planId'] }, { $eq: ['$isDeleted', false] }] } } },
                        {
                            $lookup: {
                                from: 'expenses',
                                let: { categoryId: '$_id' },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: { $and: [{ $eq: ['$categoryId', '$$categoryId'] }, { $eq: ['$isDeleted', false] }] }
                                        }
                                    },
                                    { $group: { _id: null, spent: { $sum: '$amount' }, count: { $sum: 1 } } }
                                ],
                                as: 'expenseAgg'
                            }
                        },
                        {
                            $addFields: {
                                spent: { $ifNull: [{ $arrayElemAt: ['$expenseAgg.spent', 0] }, 0] },
                                expenseCount: { $ifNull: [{ $arrayElemAt: ['$expenseAgg.count', 0] }, 0] }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                id: { $toString: '$_id' },
                                name: 1,
                                allocated: '$allocatedAmount',
                                spent: 1,
                                remaining: { $subtract: ['$allocatedAmount', '$spent'] },
                                utilizationPercent: {
                                    $cond: [
                                        { $eq: ['$allocatedAmount', 0] },
                                        0,
                                        { $multiply: [{ $divide: ['$spent', '$allocatedAmount'] }, 100] }
                                    ]
                                },
                                status: {
                                    $switch: {
                                        branches: [
                                            { case: { $gt: ['$spent', '$allocatedAmount'] }, then: 'exceeded' },
                                            {
                                                case: {
                                                    $and: [
                                                        { $lte: ['$spent', '$allocatedAmount'] },
                                                        { $gte: [{ $divide: ['$spent', '$allocatedAmount'] }, 0.8] }
                                                    ]
                                                },
                                                then: 'warning'
                                            }
                                        ],
                                        default: 'safe'
                                    }
                                },
                                expenseCount: 1
                            }
                        }
                    ],
                    as: 'categories'
                }
            },
            {
                $project: {
                    _id: 0,
                    plan: {
                        id: { $toString: '$_id' },
                        name: '$name',
                        totalIncome: '$totalIncome',
                        startDate: '$startDate',
                        endDate: '$endDate',
                        isActive: '$isActive'
                    },
                    summary: {
                        totalIncome: '$totalIncome',
                        totalAllocated: { $sum: '$categories.allocated' },
                        totalSpent: { $sum: '$categories.spent' },
                        categoryCount: { $size: '$categories' },
                        expenseCount: { $sum: '$categories.expenseCount' }
                    },
                    categories: '$categories'
                }
            },
            {
                $addFields: {
                    summary: {
                        $mergeObjects: [
                            '$summary',
                            {
                                remainingBalance: { $subtract: ['$summary.totalIncome', '$summary.totalSpent'] },
                                allocationRemaining: { $subtract: ['$summary.totalIncome', '$summary.totalAllocated'] }
                            }
                        ]
                    }
                }
            }
        ]);
        return rows[0] ?? null;
    }
    async findActivePlanId() {
        const plan = await plan_schema_1.BudgetPlanModel.findOne({ isDeleted: false, isActive: true }).lean();
        return plan ? String(plan._id) : null;
    }
    async listCategoriesWithSpent(planId) {
        const planObjectId = new mongoose_1.Types.ObjectId(planId);
        return category_schema_1.CategoryModel.aggregate([
            { $match: { planId: planObjectId, isDeleted: false } },
            {
                $lookup: {
                    from: 'expenses',
                    localField: '_id',
                    foreignField: 'categoryId',
                    pipeline: [{ $match: { isDeleted: false } }],
                    as: 'expenses'
                }
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    spent: { $sum: '$expenses.amount' }
                }
            }
        ]);
    }
    async monthlyComparison(months) {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);
        return category_schema_1.CategoryModel.aggregate([
            { $match: { isDeleted: false } },
            {
                $lookup: {
                    from: 'expenses',
                    localField: '_id',
                    foreignField: 'categoryId',
                    pipeline: [
                        { $match: { isDeleted: false, date: { $gte: start } } },
                        {
                            $group: {
                                _id: {
                                    y: { $year: '$date' },
                                    m: { $month: '$date' }
                                },
                                totalSpent: { $sum: '$amount' }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                month: {
                                    $concat: [
                                        { $toString: '$_id.y' },
                                        '-',
                                        {
                                            $cond: [{ $lt: ['$_id.m', 10] }, { $concat: ['0', { $toString: '$_id.m' }] }, { $toString: '$_id.m' }]
                                        }
                                    ]
                                },
                                totalSpent: 1
                            }
                        }
                    ],
                    as: 'monthly'
                }
            },
            { $unwind: '$monthly' },
            {
                $group: {
                    _id: '$monthly.month',
                    totalSpent: { $sum: '$monthly.totalSpent' }
                }
            },
            { $project: { _id: 0, month: '$_id', totalSpent: 1 } },
            { $sort: { month: 1 } }
        ]);
    }
}
exports.DashboardRepository = DashboardRepository;
