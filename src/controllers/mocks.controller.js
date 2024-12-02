import MocksServices from "../services/mocks.service.js";
import { generateInfoError } from "../services/errors/info.js";
import { EErrors } from "../services/errors/enum.js";
import CustomError from "../services/errors/custom-error.js";
import { usersService } from "../services/index.js";
import userModel from "../dao/models/User.js";
import { use } from "chai";

class MocksController {
    static async getMockingPets(req, res, next) {
        const petsQuantity = req.body.petsQuantity;
        try {
            if (!petsQuantity || typeof petsQuantity === "string") {
                throw CustomError.crearError({
                    nombre: "MockingPets, Falta la cantidad",
                    causa: generateInfoError({ petsQuantity }),
                    mensaje: "Error al intentar crear mockingPets",
                    codigo: EErrors.TIPO_INALIDO,
                });
            }
            const pets = await MocksServices.generatePets(petsQuantity);
            res.send({ status: "success", payload: pets });
        } catch (error) {
            next(error);
        }
    }

    static async getMockingUser(req, res, next) {
        const usersQuantity = req.body.usersQuantity || 50

        try {
            if (!usersQuantity || typeof usersQuantity === "string") {
                throw CustomError.crearError({
                    nombre: "MockingUser, Falta la cantidad",
                    causa: generateInfoError({ usersQuantity }),
                    mensaje: "Error al intentar crear mockingUsers",
                    codigo: EErrors.TIPO_INALIDO,
                });
            }
            const users = await MocksServices.genetareUsers(usersQuantity);
            res.send({ status: "success", payload: users });
        } catch (error) {
            next(error);
        }
    }

    static async postMockingData(req, res, next) {
        const usersQuantity = req.body.usersQuantity || 50
        const petsQuantity = req.body.petsQuantity || 50
        try {
            // if (!usersQuantity) {
            //     throw CustomError.crearError({
            //         nombre: "MockingData, Falta la cantidad",
            //         causa: generateInfoError({petsQuantity, usersQuantity} ),
            //         mensaje: "Error al intentar crear mockingUsers",
            //         codigo: EErrors.TIPO_INALIDO,
            //     });
            // }

            await MocksServices.generateData(usersQuantity, petsQuantity);
           
            
            res.send({ status: "success", message: `users created${usersQuantity} and pets created ${petsQuantity}` });
        } catch (error) {
            next(error);
        }
    }
}

export default MocksController;
