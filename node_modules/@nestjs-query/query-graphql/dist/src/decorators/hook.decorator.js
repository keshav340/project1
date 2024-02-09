"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHookForType = exports.BeforeFindOne = exports.BeforeQueryMany = exports.BeforeDeleteMany = exports.BeforeDeleteOne = exports.BeforeUpdateMany = exports.BeforeUpdateOne = exports.BeforeCreateMany = exports.BeforeCreateOne = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const core_1 = require("@nestjs-query/core");
const hooks_1 = require("../hooks");
const hookMetaDataKey = (hookType) => `nestjs-query:${hookType}`;
const hookDecorator = (hookType) => {
    const key = hookMetaDataKey(hookType);
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (data) => 
    // eslint-disable-next-line @typescript-eslint/ban-types
    (target) => {
        if ((0, hooks_1.isHookClass)(data)) {
            return Reflect.defineMetadata(key, data, target);
        }
        const hook = (0, hooks_1.createDefaultHook)(data);
        return Reflect.defineMetadata(key, hook, target);
    };
};
exports.BeforeCreateOne = hookDecorator(hooks_1.HookTypes.BEFORE_CREATE_ONE);
exports.BeforeCreateMany = hookDecorator(hooks_1.HookTypes.BEFORE_CREATE_MANY);
exports.BeforeUpdateOne = hookDecorator(hooks_1.HookTypes.BEFORE_UPDATE_ONE);
exports.BeforeUpdateMany = hookDecorator(hooks_1.HookTypes.BEFORE_UPDATE_MANY);
exports.BeforeDeleteOne = hookDecorator(hooks_1.HookTypes.BEFORE_DELETE_ONE);
exports.BeforeDeleteMany = hookDecorator(hooks_1.HookTypes.BEFORE_DELETE_MANY);
exports.BeforeQueryMany = hookDecorator(hooks_1.HookTypes.BEFORE_QUERY_MANY);
exports.BeforeFindOne = hookDecorator(hooks_1.HookTypes.BEFORE_FIND_ONE);
const getHookForType = (hookType, DTOClass) => (0, core_1.getClassMetadata)(DTOClass, hookMetaDataKey(hookType), true);
exports.getHookForType = getHookForType;
//# sourceMappingURL=hook.decorator.js.map