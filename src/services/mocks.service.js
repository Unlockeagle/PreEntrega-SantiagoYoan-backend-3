import { faker } from "@faker-js/faker";
import { createHash } from "../utils/index.js";
import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";

class MocksServices {
    //  generar mascotas (sin owner y con adopted en “false”) de acuerdo a un parámetro numérico.
    static async generatePets(petsQuantity) {
        const pets = [];

        for (let i = 0; i < petsQuantity; i++) {
            pets.push({
                name: faker.person.firstName(),
                specie: faker.animal.type(),
                adopted: false,
                // brithday: faker.date.past(),
                image: "http://via.placeholder.com/150",
            });
        }
        return await pets;
    }

    static async genetareUsers(usersQuantity) {
        const users = [];
        const roles = ["user", "admin"];

        for (let i = 0; i < usersQuantity; i++) {
            let first_name = faker.person.firstName();
            let last_name = faker.person.lastName();
            let email =  faker.internet.exampleEmail({ firstName: first_name });

            users.push({
                _id: faker.database.mongodbObjectId(),
                first_name: first_name,
                last_name: last_name,
                email: email,
                password:  createHash("coder123"),
                role: faker.helpers.arrayElement(roles),
                pets: [],
            });
        }
        return await users;
    }

    static async generateData(usersQuantity, petsQuantity) {

        const users = [];
        const roles = ["user", "admin"];
        
        for (let i = 0; i < usersQuantity; i++) {
            let first_name = await faker.person.firstName();  // Esperamos la respuesta de faker
            let last_name = await faker.person.lastName();
            let email = await faker.internet.exampleEmail({ firstName: first_name });
            const pets = await this.generatePets(petsQuantity);  // Esperamos que se generen las mascotas
        
            users.push({
                _id: faker.database.mongodbObjectId(),
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: await createHash("coder123"),  // Esperamos que se cree el hash de la contraseña
                role: await faker.helpers.arrayElement(roles),  // Esperamos que se seleccione un rol aleatorio
                pets: pets
            });
        }
        console.log(users);
        await userModel.insertMany(users)
        await users.save()
        
        return await users
    }

   
}

export default MocksServices;
