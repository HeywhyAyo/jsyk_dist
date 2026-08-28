"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OrdersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const orders_entity_1 = require("./entities/orders.entity");
const order_status_1 = require("./enum/order.status");
const rethrow_exception_1 = require("../shared/utilities/rethrow-exception");
const apiResponse_1 = require("../shared/utilities/apiResponse");
let OrdersService = OrdersService_1 = class OrdersService {
    orderRepo;
    logger = new common_1.Logger(OrdersService_1.name);
    constructor(orderRepo) {
        this.orderRepo = orderRepo;
    }
    async getStats() {
        const [totalOrders, confirmedOrders, shippedOrders, deliveredOrders,] = await Promise.all([
            this.orderRepo.count(),
            this.orderRepo.count({
                where: { status: order_status_1.OrderStatus.CONFIRMED },
            }),
            this.orderRepo.count({
                where: { status: order_status_1.OrderStatus.SHIPPED },
            }),
            this.orderRepo.count({
                where: { status: order_status_1.OrderStatus.DELIVERED },
            }),
        ]);
        return {
            totalOrders,
            confirmedOrders,
            shippedOrders,
            deliveredOrders,
        };
    }
    async getOrderStats() {
        try {
            const stats = await this.getStats();
            return (0, apiResponse_1.createResponse)(true, 'Order stats retrieved successfully', stats);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findAll(query) {
        const { search, status, from, to, page = 1, limit = 20, } = query;
        const qb = this.orderRepo
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.user', 'user')
            .leftJoinAndSelect('order.shippingAddress', 'shippingAddress')
            .leftJoinAndSelect('order.payment', 'payment');
        if (search) {
            qb.andWhere(`(
                    order.orderNumber ILIKE :search
                    OR user.firstName ILIKE :search
                    OR user.lastName  ILIKE :search
                    OR user.email     ILIKE :search
                )`, { search: `%${search}%` });
        }
        if (status) {
            qb.andWhere('order.status = :status', { status });
        }
        if (from) {
            qb.andWhere('order.createdAt >= :from', {
                from: new Date(from),
            });
        }
        if (to) {
            const toDate = new Date(to);
            toDate.setHours(23, 59, 59, 999);
            qb.andWhere('order.createdAt <= :to', { to: toDate });
        }
        qb.orderBy('order.createdAt', 'DESC');
        qb.skip((page - 1) * limit).take(limit);
        const [data, total] = await qb.getManyAndCount();
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findAllOrders(query) {
        try {
            const orders = await this.findAll(query);
            return (0, apiResponse_1.createResponse)(true, 'Orders retrieved successfully', orders);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findOne(id) {
        const order = await this.orderRepo.findOne({
            where: { id },
            relations: {
                user: true,
                shippingAddress: true,
                items: true,
                payment: true,
                shipment: true,
                coupon: true,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order #${id} not found.`);
        }
        return order;
    }
    async findSingleOrderAdmin(id) {
        try {
            const order = await this.findOne(id);
            return (0, apiResponse_1.createResponse)(true, 'Order retrieved successfully', order);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findByOrderNumber(orderNumber) {
        const order = await this.orderRepo.findOne({
            where: { orderNumber },
            relations: {
                user: true,
                shippingAddress: true,
                items: true,
                payment: true,
                shipment: true,
                coupon: true,
            },
        });
        if (!order) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Order "${orderNumber}" not found.`);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        return order;
    }
    async findByOrderNumberAfterPayment(orderNumber) {
        try {
            const order = await this.findByOrderNumber(orderNumber);
            return (0, apiResponse_1.createResponse)(true, 'Order retrieved successfully', order);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findMyOrders(userId, page = 1, limit = 10) {
        const [data, total] = await this.orderRepo.findAndCount({
            where: { userId },
            relations: {
                items: true,
                payment: true,
                shipment: true,
            },
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findByUserOrders(userId, page, limit) {
        try {
            const userOrders = await this.findMyOrders(userId, page, limit);
            return (0, apiResponse_1.createResponse)(true, 'User orders retrieved successfully', userOrders);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findMyOrder(orderId, userId) {
        const order = await this.orderRepo.findOne({
            where: { id: orderId, userId },
            relations: {
                shippingAddress: true,
                items: true,
                payment: true,
                shipment: true,
                coupon: true,
            },
        });
        if (!order) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Order #${orderId} not found.`);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        return order;
    }
    async findByUserOrder(orderid, userid) {
        try {
            const order = await this.findMyOrder(orderid, userid);
            return (0, apiResponse_1.createResponse)(true, 'Order retrieved successfully', order);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async updateStatus(id, status) {
        const order = await this.orderRepo.findOneBy({ id });
        if (!order) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Order #${id} not found.`);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        order.status = status;
        return this.orderRepo.save(order);
    }
    async updateOrderStatus(id, status) {
        try {
            const updatedOrder = await this.updateStatus(id, status);
            return (0, apiResponse_1.createResponse)(true, 'Order status updated successfully', updatedOrder);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async updatePrintifyTracking(dto) {
        const order = await this.orderRepo.findOne({
            where: {
                printifyOrderId: dto.printifyOrderId,
            },
        });
        if (!order) {
            this.logger.warn(`Order with Printify ID ${dto.printifyOrderId} not found`);
            return;
        }
        order.printifyOrderStatus =
            dto.status;
        if (dto.carrier) {
            order.shippingCarrier =
                dto.carrier;
        }
        if (dto.trackingNumber) {
            order.trackingNumber =
                dto.trackingNumber;
        }
        if (dto.trackingUrl) {
            order.trackingUrl =
                dto.trackingUrl;
        }
        if (dto.shippedAt) {
            order.shippedAt =
                dto.shippedAt;
        }
        if (dto.deliveredAt) {
            order.deliveredAt =
                dto.deliveredAt;
        }
        await this.orderRepo.save(order);
    }
    async updatePrintifyStatus(printifyOrderId, status) {
        const order = await this.orderRepo.findOne({
            where: {
                printifyOrderId,
            },
        });
        if (!order) {
            this.logger.warn(`Order with Printify ID ${printifyOrderId} not found`);
            return;
        }
        order.printifyOrderStatus = status;
        await this.orderRepo.save(order);
        return order;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = OrdersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map