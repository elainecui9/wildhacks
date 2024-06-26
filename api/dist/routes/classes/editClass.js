"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editClass = void 0;
const Class_1 = require("../../models/Class");
const editClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.mutable && req.body.owner !== req.body.payload._id) {
            res.status(400).send("You cannot edit this folder. Please try again");
        }
        yield Class_1.Class.findByIdAndUpdate(req.body.article, { $set: { name: req.body.name } });
        res.status(200).send("Successfully updated class name");
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.editClass = editClass;
